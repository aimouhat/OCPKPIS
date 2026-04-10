import express, { type Request, type Response, type Application, type RequestHandler } from "express";
import sql from "mssql";
import cors from "cors";
import dotenv from "dotenv";

const startServer = async () => {
  dotenv.config();
  const app: Application = express();
  app.use(cors());
  app.use(express.json());
  const port = process.env.API_PORT || 3001;

  const dbConfig: sql.config = {
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    server: process.env.DB_SERVER!,
    database: process.env.DB_DATABASE!,
    port: Number(process.env.DB_PORT),
    options: {
      trustServerCertificate: process.env.DB_TRUST_SERVER_CERTIFICATE === 'true',
    },
  };

  try {
    await sql.connect(dbConfig);
    console.log("Connected to the database successfully!");
  } catch (err) {
    console.error("Database connection failed:", err);
    process.exit(1);
  }

  // --- API Endpoints ---

  const actualHandler: RequestHandler = async (req, res) => {
    const { tagNames } = req.body;
    if (!tagNames || !Array.isArray(tagNames) || tagNames.length === 0) {
      res.status(400).send("tagNames array is required.");
    } else { 
      try {
        const request = new sql.Request();
        const query = `
          WITH LatestRecords AS (
            SELECT
              r.value, r.timestamp, t.tagname,
              ROW_NUMBER() OVER(PARTITION BY r.PHDTagId ORDER BY r.timestamp DESC) as rn
            FROM Record r JOIN PHDTag t ON r.PHDTagId = t.id
            WHERE t.tagname IN (${tagNames.map((_, i: number) => `@tag${i}`).join(',')})
          )
          SELECT value, timestamp, tagname FROM LatestRecords WHERE rn = 1;
        `;
        tagNames.forEach((tag: string, i: number) => {
          request.input(`tag${i}`, sql.VarChar, tag);
        });
        const result = await request.query(query);
        res.json(result.recordset);
      } catch (err) {
        console.error("API_Actual Error:", err);
        res.status(500).send("Error fetching data from the database.");
      }
    }
  };

  const timeSeriesHandler: RequestHandler = async (req, res) => {
    const { tagNames, timePeriodInHours, startTime, endTime } = req.body;
    if (!tagNames || !Array.isArray(tagNames) || tagNames.length === 0) {
        res.status(400).send("tagNames array is required.");
    } else if (!timePeriodInHours && (!startTime || !endTime)) {
        res.status(400).send("Either timePeriodInHours or both startTime and endTime are required.");
    } else { 
        try {
            const request = new sql.Request();
            let timeCondition = "";
            if (startTime && endTime) {
                timeCondition = `AND r.timestamp BETWEEN @startTime AND @endTime`;
                request.input('startTime', sql.DateTimeOffset, startTime);
                request.input('endTime', sql.DateTimeOffset, endTime);
            } else {
                timeCondition = `AND r.timestamp >= DATEADD(hour, -@timePeriod, SYSDATETIMEOFFSET())`;
                request.input('timePeriod', sql.Int, timePeriodInHours);
            }

            const query = `
                SELECT r.value, r.timestamp, t.tagname
                FROM Record r
                JOIN PHDTag t ON r.PHDTagId = t.id
                WHERE t.tagname IN (${tagNames.map((_, i: number) => `@tag${i}`).join(',')})
                ${timeCondition}
                ORDER BY r.timestamp ASC;
            `;
            tagNames.forEach((tag: string, i: number) => {
                request.input(`tag${i}`, sql.VarChar, tag);
            });
            const result = await request.query(query);
            res.json(result.recordset);
        } catch (err) {
            console.error("API_TimeSeries Error:", err);
            res.status(500).send("Error fetching data from the database.");
        }
    }
  };

  const aggregatedHandler: RequestHandler = async (req, res) => {
    const { tagNames, timePeriodInHours, startTime, endTime } = req.body;
    
    // --- DIAGNOSTIC LOG 1 (Commented out) ---
    // console.log('\n--- Received /api/aggregated request ---');
    // console.log('Request Body:', req.body);

    if (!tagNames || !Array.isArray(tagNames) || tagNames.length === 0) {
        return res.status(400).send("tagNames array is required.");
    }
    if (!timePeriodInHours && (!startTime || !endTime)) {
        return res.status(400).send("Either timePeriodInHours or both startTime and endTime are required.");
    }

    try {
        const request = new sql.Request();
        let joinTimeFilter = '';

        if (startTime && endTime) {
            joinTimeFilter = `AND r.timestamp BETWEEN @startTime AND @endTime`;
            request.input('startTime', sql.DateTimeOffset, startTime);
            request.input('endTime', sql.DateTimeOffset, endTime);
        } else if (timePeriodInHours) {
            joinTimeFilter = `AND r.timestamp >= DATEADD(hour, -@timePeriod, SYSDATETIMEOFFSET())`;
            request.input('timePeriod', sql.Int, timePeriodInHours);
        }

        const query = `
            SELECT
                t.tagname,
                ISNULL(SUM(r.value), 0) as value
            FROM
                PHDTag t
            LEFT JOIN
                Record r ON t.id = r.PHDTagId ${joinTimeFilter}
            WHERE
                t.tagname IN (${tagNames.map((_, i) => `@tag${i}`).join(',')})
            GROUP BY
                t.tagname;
        `;
        
        tagNames.forEach((tag: string, i: number) => {
            request.input(`tag${i}`, sql.VarChar, tag);
        });

        // --- DIAGNOSTIC LOG 2 (Commented out) ---
        // console.log('Executing SQL Query:', query.replace(/\s+/g, ' ').trim());
        // console.log('With Parameters:', request.parameters);

        const result = await request.query(query);
        
        // --- DIAGNOSTIC LOG 3 (Commented out) ---
        // console.log('Database Result:', result.recordset);
        // console.log('--- Request Finished ---');
        
        res.json(result.recordset);
    } catch (err) {
        console.error("API_Aggregated Error:", err);
        res.status(500).send("Error fetching data from the database.");
    }
  };

  // --- NEW API ENDPOINT ---
  const lastUpdatedHandler: RequestHandler = async (req, res) => {
    const { tagNames } = req.body;
    if (!tagNames || !Array.isArray(tagNames) || tagNames.length === 0) {
        return res.status(400).send("tagNames array is required.");
    }

    try {
        const request = new sql.Request();
        // This query finds the timestamp of the last value change within the last 4 days.
        // It's a standard "gaps and islands" query.
        const query = `
            WITH NumberedRecords AS (
                SELECT
                    r.value,
                    r.timestamp,
                    t.tagname,
                    r.PHDTagId,
                    ROW_NUMBER() OVER (PARTITION BY r.PHDTagId ORDER BY r.timestamp) as rn_total,
                    ROW_NUMBER() OVER (PARTITION BY r.PHDTagId, r.value ORDER BY r.timestamp) as rn_value_group
                FROM
                    Record r
                JOIN
                    PHDTag t ON r.PHDTagId = t.id
                WHERE
                    t.tagname IN (${tagNames.map((_, i) => `@tag${i}`).join(',')})
                    AND r.timestamp >= DATEADD(day, -4, SYSDATETIMEOFFSET())
            ),
            GroupedRecords AS (
                SELECT
                    value,
                    timestamp,
                    tagname,
                    PHDTagId,
                    (rn_total - rn_value_group) as value_group_id
                FROM NumberedRecords
            ),
            FinalRecords AS (
                SELECT
                    value,
                    timestamp,
                    tagname,
                    ROW_NUMBER() OVER (PARTITION BY PHDTagId, value_group_id ORDER BY timestamp ASC) as rn_first_in_group,
                    DENSE_RANK() OVER (PARTITION BY PHDTagId ORDER BY value_group_id DESC) as group_rank
                FROM GroupedRecords
            )
            SELECT
                value,
                timestamp,
                tagname
            FROM FinalRecords
            WHERE
                group_rank = 1
                AND rn_first_in_group = 1;
        `;

        tagNames.forEach((tag: string, i: number) => {
            request.input(`tag${i}`, sql.VarChar, tag);
        });

        const result = await request.query(query);
        res.json(result.recordset);

    } catch (err) {
        console.error("API_LastUpdated Error:", err);
        res.status(500).send("Error fetching data from the database.");
    }
  };

  app.post("/api/actual", actualHandler);
  app.post("/api/timeseries", timeSeriesHandler);
  app.post("/api/aggregated", aggregatedHandler);
  // Register the new route
  app.post("/api/last-updated", lastUpdatedHandler);

  app.listen(port, () => {
    console.log(`Backend API server running on http://localhost:${port}`);
  });
};

startServer();
