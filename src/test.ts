import express, { type Request, type Response } from "express";
import sql from "mssql";
import cors from "cors"; // Add this
import dotenv from "dotenv"; // Add this

dotenv.config(); // Add this


// Add your entire dbConfig object here
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

const app = express();
const port = 3002;

app.post("/api/test", async (req: Request, res: Response) => {
  console.log("Test route was hit!");
  res.status(200).json({ message: "Success" });
});

app.listen(port, () => {
  console.log(`Minimal test server running on http://localhost:${port}`);
});