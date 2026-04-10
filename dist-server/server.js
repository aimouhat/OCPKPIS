import express from "express";
import sql from "mssql";
import cors from "cors";
import dotenv from "dotenv";
//import process from 'process';
import path from "path";
import { fileURLToPath } from "url";
const startServer = async () => {
    dotenv.config();
    const app = express();
    app.use(cors());
    app.use(express.json());
    //app.use((req, res, next) => {
    //const time = new Date().toLocaleDateString();
    //console.log(`---------`);
    //console.log(`[${time} DECEIVED: ${[req.method]} ${[req.url]}`)
    //if (req.method === 'POST' || req.method === 'PUT') {
    //    console.log('   Payload:', JSON.stringify(req.body));
    //} 
    //next();
    //});
    //const port = process.env.API_PORT || 3001;
    const port = Number(process.env.API_PORT) || 3001;
    const host = '0.0.0.0';
    const dbConfig = {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        server: process.env.DB_SERVER,
        database: process.env.DB_DATABASE,
        port: Number(process.env.DB_PORT),
        options: {
            trustServerCertificate: process.env.DB_TRUST_SERVER_CERTIFICATE === 'true',
        },
    };
    try {
        await sql.connect(dbConfig);
        console.log("Connected to the database successfully!");
    }
    catch (err) {
        console.error("Database connection failed:", err);
        process.exit(1);
    }
    // --- API Endpoints --- 
    const actualHandler = async (req, res) => {
        const { tagNames } = req.body;
        if (!tagNames || !Array.isArray(tagNames) || tagNames.length === 0) {
            res.status(400).send("tagNames array is required.");
        }
        else {
            try {
                const request = new sql.Request();
                //const parameters = tagNames.map((_, index) => `@tag${index}`).join(", "); 
                const tagList = tagNames
                    .map((t) => `N'${String(t).replace(/'/g, "''")}'`)
                    .join(", ");
                const query = `
          SELECT 
              t.TAGAlias as tagname,
              t.Value as value,
              t.TIMESTAMP as timestamp
          FROM APM_Tag_Data t
          INNER JOIN (
              SELECT TAGAlias, MAX(TIMESTAMP) as MaxDate
              FROM APM_Tag_Data
              WHERE TAGAlias IN (${tagList})
              AND TIMESTAMP <= DATEADD(minute,-12,SYSDATETIMEOFFSET() )
              GROUP BY TAGAlias
          ) tm ON t.TAGAlias = tm.TAGAlias AND t.TIMESTAMP = tm.MaxDate
        ;
          `;
                // --- LOGGING THE QUERY ---
                //console.log("----- EXECUTING SQL QUERY -----");
                //console.log(query);
                //console.log("Parameters:", tagNames);
                //console.log("-------------------------------");
                tagNames.forEach((tag, i) => {
                    request.input(`tag${i}`, sql.VarChar, tag);
                });
                const result = await request.query(query);
                res.json(result.recordset);
            }
            catch (err) {
                console.error("API_Actual Error:", err);
                res.status(500).send("Error fetching data from the database.");
            }
        }
    };
    const timeSeriesHandler = async (req, res) => {
        const { tagNames, timePeriodInHours, startTime, endTime } = req.body;
        if (!tagNames || !Array.isArray(tagNames) || tagNames.length === 0) {
            res.status(400).send("tagNames array is required.");
        }
        else if (!timePeriodInHours && (!startTime || !endTime)) {
            res.status(400).send("Either timePeriodInHours or both startTime and endTime are required.");
        }
        else {
            try {
                const request = new sql.Request();
                let timeCondition = "";
                if (startTime && endTime) {
                    timeCondition = `AND TIMESTAMP BETWEEN @startTime AND @endTime`;
                    request.input('startTime', sql.DateTimeOffset, startTime);
                    request.input('endTime', sql.DateTimeOffset, endTime);
                }
                else {
                    timeCondition = `AND TIMESTAMP >= DATEADD(hour, -@timePeriod, SYSDATETIMEOFFSET())`;
                    request.input('timePeriod', sql.Int, timePeriodInHours);
                }
                const query = `
              SELECT 
                TAGAlias as tagname, 
                Value as value, 
                TIMESTAMP as timestamp 
              FROM APM_Tag_Data 
              WHERE TAGAlias IN (${tagNames.map((_, i) => `@tag${i}`).join(',')})
              ${timeCondition}
              ORDER BY TIMESTAMP ASC;
          `;
                tagNames.forEach((tag, i) => {
                    request.input(`tag${i}`, sql.NVarChar, tag);
                });
                // --- LOGGING THE QUERY ---
                // console.log("----- EXECUTING SQL QUERY -----");
                // console.log(query);
                // console.log("Parameters:", tagNames);
                // console.log("-------------------------------");
                // -------------------------
                const result = await request.query(query);
                res.json(result.recordset);
            }
            catch (err) {
                console.error("API_TimeSeries Error:", err);
                res.status(500).send("Error fetching data from the database.");
            }
        }
    };
    const aggregatedHandler = async (req, res) => {
        const { tagNames, timePeriodInHours, startTime, endTime } = req.body;
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
                joinTimeFilter = `AND t.TIMESTAMP BETWEEN @startTime AND @endTime`;
                request.input('startTime', sql.DateTimeOffset, startTime);
                request.input('endTime', sql.DateTimeOffset, endTime);
            }
            else if (timePeriodInHours) {
                joinTimeFilter = `AND t.TIMESTAMP >= DATEADD(hour, -@timePeriod, SYSDATETIMEOFFSET())`;
                request.input('timePeriod', sql.Int, timePeriodInHours);
            }
            const query = `
          SELECT
              t.TAGAlias as tagname, 
              ISNULL(SUM(t.Value), 0) as value
          FROM
              APM_Tag_Data t  
          WHERE
              t.TAGAlias IN (${tagNames.map((_, i) => `@tag${i}`).join(',')}) ${joinTimeFilter}
          GROUP BY
              t.TAGAlias;
      `;
            // --- LOGGING THE QUERY ---
            // console.log("----- EXECUTING SQL QUERY -----");
            // console.log(query);
            // console.log("Parameters:", tagNames);
            // console.log("-------------------------------");
            // ------------------------- 
            tagNames.forEach((tag, i) => {
                request.input(`tag${i}`, sql.NVarChar, tag);
            });
            const result = await request.query(query);
            res.json(result.recordset);
        }
        catch (err) {
            console.error("API_Aggregated Error:", err);
            res.status(500).send("Error fetching data from the database.");
        }
    };
    const lastUpdatedHandler = async (req, res) => {
        const { tagNames } = req.body;
        if (!tagNames || !Array.isArray(tagNames) || tagNames.length === 0) {
            return res.status(400).send("tagNames array is required.");
        }
        try {
            const request = new sql.Request();
            const query = `
            WITH NumberedRecords AS (
                SELECT 
                    r.value,    
                    r.timestamp,    
                    r.TAGAlias,    
                    ROW_NUMBER() OVER (PARTITION BY r.TAGAlias ORDER BY r.timestamp) as rn_total,
                    ROW_NUMBER() OVER (PARTITION BY r.TAGAlias, r.value ORDER BY r.timestamp) as rn_value_group 
                FROM
                    APM_Tag_Data r 
                WHERE
                  r.TAGAlias IN (${tagNames.map((_, i) => `@tag${i}`).join(',')})
                  AND r.timestamp >= DATEADD(day, -30 , SYSDATETIMEOFFSET())
                  AND r.timestamp <= DATEADD(minute, -12 , SYSDATETIMEOFFSET())
            ), 
            
            GroupedRecords AS (
                SELECT
                    value, timestamp, TAGAlias,
                    (rn_total - rn_value_group) as value_group_id
                FROM NumberedRecords
            ), 
            
            GroupedWithTime AS (
                SELECT 
                    *,
                    -- Find the earliest timestamp for this specific group.
                    -- We use this to know "When did this group start?"
                    MIN(timestamp) OVER (
                        PARTITION BY TAGAlias, value_group_id, value 
                    ) as group_start_time
                FROM GroupedRecords
            ),

            /* MODIFIED FINAL STEP */
            FinalRecords AS (
                SELECT
                    value, timestamp, TAGAlias,
                    
                    -- Identify the first row inside the group (to get the start time row later)
                    ROW_NUMBER() OVER (
                        PARTITION BY TAGAlias, value_group_id, value 
                        ORDER BY timestamp ASC
                    ) as rn_first_in_group,

                    -- REPLACED LOGIC: Rank groups by TIME, not ID.
                    -- DESC order ensures the most recent start time gets Rank 1.
                    DENSE_RANK() OVER (
                        PARTITION BY TAGAlias 
                        ORDER BY group_start_time DESC
                    ) as group_rank

                FROM GroupedWithTime
            )

            /* Final Select remains the same */
            SELECT 
                value, timestamp, TAGAlias as tagname
            FROM FinalRecords
            WHERE group_rank = 1
            AND rn_first_in_group = 1;

        `;
            tagNames.forEach((tag, i) => {
                request.input(`tag${i}`, sql.NVarChar, tag);
            });
            const result = await request.query(query);
            res.json(result.recordset);
        }
        catch (err) {
            console.error("API_LastUpdated Error:", err);
            res.status(500).send("Error fetching data from the database.");
        }
    };
    const downtimeHandler = async (req, res) => {
        const { assetNames, startTime, endTime } = req.body;
        if (!assetNames || !Array.isArray(assetNames) || assetNames.length === 0) {
            return res.status(400).send("assetNames array is required.");
        }
        if (!startTime || !endTime) {
            return res.status(400).send("startTime and endTime are required.");
        }
        try {
            const request = new sql.Request();
            // Prepare parameters for the stored procedure
            request.input('st', sql.DateTime2, new Date(startTime));
            request.input('et', sql.DateTime2, new Date(endTime));
            // The procedure doesn't filter by asset name, so we fetch all and filter later.
            const result = await request.execute('UAS_DOWNTIME_HRS_PIVOT');
            const procedureData = result.recordset;
            // --- IMPORTANT LOGIC (Note 1) ---
            // Handle assets that were requested but had no downtime events.
            const processedData = assetNames.map(requestedAssetName => {
                const foundAsset = procedureData.find(record => record.Name === requestedAssetName);
                if (foundAsset) {
                    // Asset was found, return its data from the procedure
                    return foundAsset;
                }
                else {
                    // Asset not found, create a default record with 0 downtime
                    const start = new Date(startTime);
                    const end = new Date(endTime);
                    const totalHours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
                    return {
                        Name: requestedAssetName,
                        DisplayName: requestedAssetName, // Use Name as DisplayName if not found
                        OT: totalHours,
                        STOP: 0,
                        OD: 0, 'Awaiting Ore': 0, 'Belt Drift': 0, Blockage: 0, Cleaning: 0,
                        Contamination: 0, Emergency: 0, 'Human Error': 0, inspection: 0,
                        'Machine Move': 0, Overload: 0, 'Switch/Sensor Activation': 0,
                        SD: 0, 'Awaiting Train': 0, 'External Services - Power/Water': 0,
                        'Full/Empty Stockpile': 0, 'No Feed': 0, Weather: 0,
                        UM: 0, 'Breakdown Maintenance': 0, 'Predictive Maintenance': 0,
                        'Scheduled Maintenance Overrun': 0, 'Scheduled Maintenance': 0,
                    };
                }
            });
            res.json(processedData);
        }
        catch (err) {
            console.error("API_Downtime Error:", err);
            res.status(500).send("Error executing UAS_DOWNTIME_HRS_PIVOT procedure.");
        }
    };
    app.post('/api/alarm-summary', async (req, res) => {
        const { startTime, endTime } = req.body;
        if (!startTime || !endTime) {
            return res.status(400).json({ error: "Missing startTime or endTime" });
        }
        try {
            const request = new sql.Request();
            request.input('StartTime', sql.DateTimeOffset, new Date(startTime));
            //request.input('StartTime', sql.DateTime2, new Date(startTime));
            request.input('EndTime', sql.DateTimeOffset, new Date(endTime));
            //request.input('EndTime', sql.DateTime2, new Date(endTime));
            // We query the existing table directly since the aggregation job runs hourly.
            // We need to group these hourly records into 12-hour shifts for the visualization.
            // The logic below groups data by 12-hour blocks starting at 06:00 and 18:00.
            const query = `
        SELECT 
            -- Calculate the start of the 12-hour shift for each record
            CASE 
                WHEN DATEPART(HOUR, StartTime) >= 6 AND DATEPART(HOUR, StartTime) < 18 
                THEN DATETIMEFROMPARTS(YEAR(StartTime), MONTH(StartTime), DAY(StartTime), 6, 0, 0, 0)
                ELSE 
                    CASE 
                        WHEN DATEPART(HOUR, StartTime) < 6 
                        THEN DATEADD(day, -1, DATETIMEFROMPARTS(YEAR(StartTime), MONTH(StartTime), DAY(StartTime), 18, 0, 0, 0))
                        ELSE DATETIMEFROMPARTS(YEAR(StartTime), MONTH(StartTime), DAY(StartTime), 18, 0, 0, 0)
                    END
            END as ShiftStart,
                    
            SUM(OpenAlmUrgentCount) as Urgent,
            SUM(OpenAlmHiCount) as High,
            SUM(OpenAlmLowCount) as Low

        FROM DYN_OCPCustomKPIs
        WHERE StartTime >= @StartTime AND StartTime <= @EndTime
        GROUP BY 
            CASE 
                WHEN DATEPART(HOUR, StartTime) >= 6 AND DATEPART(HOUR, StartTime) < 18 
                THEN DATETIMEFROMPARTS(YEAR(StartTime), MONTH(StartTime), DAY(StartTime), 6, 0, 0, 0)
                ELSE 
                    CASE 
                        WHEN DATEPART(HOUR, StartTime) < 6 
                        THEN DATEADD(day, -1, DATETIMEFROMPARTS(YEAR(StartTime), MONTH(StartTime), DAY(StartTime), 18, 0, 0, 0))
                        ELSE DATETIMEFROMPARTS(YEAR(StartTime), MONTH(StartTime), DAY(StartTime), 18, 0, 0, 0)
                    END
            END
        ORDER BY ShiftStart ASC
      `;
            const result = await request.query(query);
            res.json(result.recordset);
        }
        catch (err) {
            console.error("Error executing Alarm Summary query:", err);
            res.status(500).json({ error: "Database error" });
        }
    });
    app.post('/api/alarm-history', async (req, res) => {
        // 1. Get the limit from the request (Default to 50 if not provided)
        const { limit } = req.body;
        const safeLimit = limit ? parseInt(limit) : 50;
        try {
            const request = new sql.Request();
            // 2. Pass the limit as a parameter (SQL Injection safe)
            request.input('Limit', sql.Int, safeLimit);
            // 3. The Query
            // We select the 8 most important columns for the operator
            const query = `
        SELECT TOP (@Limit)
            VT_Start,           -- 1. Time
            AssetPath,          -- 2. Area/Asset
            TagName,            -- 3. Tag ID
            TagDescription,     -- 4. Description
            Value,              -- 5. Value at Event
            Limit,              -- 6. Alarm Limit (Trip Point)
            Priority,           -- 7. Priority (1, 2, 3...)
            Message             -- 8. Text Message
        FROM DYN_Event_Data
        ORDER BY VT_Start DESC  -- Newest first
      `;
            const result = await request.query(query);
            console.log(`[AlarmHistory] Fetched last ${safeLimit} alarms.`);
            res.json(result.recordset);
        }
        catch (err) {
            console.error("Error executing Alarm History query:", err);
            res.status(500).json({ error: "Database error", details: err.message });
        }
    });
    app.post("/api/actual", actualHandler);
    app.post("/api/timeseries", timeSeriesHandler);
    app.post("/api/aggregated", aggregatedHandler);
    // Register the new route
    app.post("/api/last-updated", lastUpdatedHandler);
    app.post("/api/downtime", downtimeHandler); // Register the new route
    // --- Serve Static Frontend Files ---
    // Because we are in an ES Module (type: module), we need to reconstruct __dirname
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    // Frontend is built to 'dist' in the project root. Backend runs from 'dist-server'.
    const distPath = path.join(__dirname, '../dist');
    app.use(express.static(distPath));
    // Handle client-side routing (SPA)
    app.get('*', (req, res) => {
        res.sendFile(path.join(distPath, 'index.html'));
    });
    //app.listen(port,  () => {
    //app.listen(port, '172.26.4.3',  () => {
    app.listen(port, host, () => {
        //console.log(`Backend API server running on http://localhost:${port}`);
        //console.log(`Backend API server running on http://172.26.4.3:${port}`);
        console.log(`Backend API server running on http://${host}:${port}`);
    });
};
startServer();
//# sourceMappingURL=server.js.map