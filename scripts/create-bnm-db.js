import pg from "pg";

const { Client } = pg;

async function main() {
  const client = new Client({
    user: "postgres",
    host: "localhost",
    port: 5432,
    password: "2026",
    database: "postgres",
  });

  try {
    await client.connect();
    const result = await client.query(
      `SELECT 1 FROM pg_database WHERE datname = 'bnm_db'`,
    );

    if (result.rowCount > 0) {
      console.log("Database bnm_db already exists");
      return;
    }

    await client.query(`CREATE DATABASE bnm_db`);
    console.log("Database bnm_db created");
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

main();
