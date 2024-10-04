import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.CONNECTION_STRING as string;

const pool = new Pool({
  connectionString,
});

export default pool;
