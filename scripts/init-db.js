import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./src/schema";

const { Pool } = pg;

const connectionString = "postgresql://postgres:postgres@db:5432/bnm_db";

async function main() {
  const pool = new Pool({ connectionString });
  const db = drizzle(pool, { schema });

  console.log("Creating tables...");
  
  await pool.query(`
    CREATE TABLE IF NOT EXISTS admins (
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      role VARCHAR(50) DEFAULT 'admin',
      created_at TIMESTAMP DEFAULT NOW()
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS actualites (
      id SERIAL PRIMARY KEY,
      titre VARCHAR(255) NOT NULL,
      slug VARCHAR(255) UNIQUE NOT NULL,
      contenu TEXT,
      image VARCHAR(255),
      categorie VARCHAR(100),
      date_publication TIMESTAMP DEFAULT NOW(),
      created_at TIMESTAMP DEFAULT NOW()
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS offres (
      id SERIAL PRIMARY KEY,
      titre VARCHAR(255) NOT NULL,
      slug VARCHAR(255) UNIQUE NOT NULL,
      description TEXT,
      image VARCHAR(255),
      icone VARCHAR(255),
      click_by_bnm BOOLEAN DEFAULT false,
      categorie VARCHAR(100),
      ordre INTEGER DEFAULT 0
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS contacts (
      id SERIAL PRIMARY KEY,
      nom VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      telephone VARCHAR(50),
      sujet VARCHAR(255),
      message TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS devenir_clients (
      id SERIAL PRIMARY KEY,
      nomComplet VARCHAR(255) NOT NULL,
      cinPasseport VARCHAR(100) NOT NULL,
      telephone VARCHAR(50) NOT NULL,
      adresse VARCHAR(500) NOT NULL,
      secteurActivite VARCHAR(255) NOT NULL,
      cinPasseportFile VARCHAR(500),
      justificatifFile VARCHAR(500),
      created_at TIMESTAMP DEFAULT NOW()
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS newsletter (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS agences (
      id SERIAL PRIMARY KEY,
      nom VARCHAR(255) NOT NULL,
      adresse VARCHAR(500),
      ville VARCHAR(100),
      telephone VARCHAR(50),
      latitude DECIMAL(10,8),
      longitude DECIMAL(11,8),
      horaires VARCHAR(255)
    )
  `);

  console.log("Tables created successfully!");
  
  const result = await pool.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'");
  console.log("Tables in database:", result.rows.map(r => r.table_name));

  await pool.end();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
