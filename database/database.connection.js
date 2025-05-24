import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;

const db = new Pool({
  allowExitOnIdle: true,
  connectionString,
});

try {
  await db.query("SELECT NOW()");
  console.log("DATABASE CONNECTED ✔✔✔");
} catch (error) {
  console.log(error);
}

export default db;
