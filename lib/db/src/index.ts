import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema";

const { Pool } = pg;

function getConnectionString() {
  if (process.env.DATABASE_URL) return process.env.DATABASE_URL;

  // Local fallback for development.
  const host = process.env.DB_HOST ?? "localhost";
  const port = process.env.DB_PORT ?? "5432";
  const user = process.env.DB_USER ?? "postgres";
  const password = process.env.DB_PASSWORD ?? "2023";
  const database = process.env.DB_NAME ?? "postgres";

  return `postgresql://${encodeURIComponent(user)}:${encodeURIComponent(password)}@${host}:${port}/${database}`;
}

const connectionString = getConnectionString();

export const pool = new Pool({ connectionString });
export const db = drizzle(pool, { schema });

// Helpful startup/runtime check: ensure at least one expected table exists.
// This prevents opaque 500s later when the DB is empty or points to the wrong schema.
async function assertExpectedTables() {
  // Only run in dev/local contexts where PORT is commonly used.
  if (process.env.NODE_ENV === "production") return;

  const expected = ["actualites", "offres", "agences", "admins"];

  // DEBUG: confirm which DB/host is used by the API at runtime.
  // (Safe: no credentials.)
  const host = process.env.DB_HOST ?? "localhost";
  const port = process.env.DB_PORT ?? "5432";
  const dbUser = process.env.DB_USER ?? "postgres";
  const dbName = process.env.DB_NAME ?? "postgres";
  console.error(`[db] env DB_HOST=${host} DB_PORT=${port} DB_USER=${dbUser} DB_NAME=${dbName} DATABASE_URL=${process.env.DATABASE_URL ? "(set)" : "(not set)"}`);


  // Log where we are connected so it’s obvious if DATABASE_URL points to the wrong DB.
  // Avoid printing credentials.
  const currentDb = await pool
    .query(`select current_database() as db, current_schema() as schema`)
    .then((r) => r.rows[0] as { db: string; schema: string })
    .catch(() => null);

  if (currentDb) {
    console.error(
      `[db] connected database=${currentDb.db} schema=${currentDb.schema}`,
    );
  }

  // NOTE: we do NOT rely on `search_path` because the generated SQL from
  // Drizzle uses unqualified table names. We’ll instead ensure the
  // drizzle table definitions are schema-qualified.


  const anyExists = await pool
    .query(
      `select 1 as ok from information_schema.tables where table_schema = 'public' and table_name = any($1) limit 1`,
      [expected],
    )
    .then((r) => (r.rowCount ?? 0) > 0)
    .catch(() => false);



  if (!anyExists) {
    // Throwing here will make the server fail fast with a clear message.
    throw new Error(
      `Database looks empty or wrong. None of these tables exist in schema public: ${expected.join(", ")}. ` +
        `Check your DATABASE_URL/DB_* env vars and run migrations/seed.`,
    );
  }
}

assertExpectedTables().catch((err) => {
  // Let the error be visible immediately.
  console.error(err);
  // Re-throw so the app does not serve broken 500s.
  throw err;
});

export * from "./schema";

