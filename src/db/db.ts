import { Pool, QueryResultRow } from "pg";

const { DB_USER, DB_NAME, DB_PASSWORD, DB_PORT, DB_HOST } = process.env;

const pool = new Pool({
  user: DB_USER,
  database: DB_NAME,
  password: DB_PASSWORD,
  port: Number(DB_PORT),
  host: DB_HOST,
});

export { pool };
