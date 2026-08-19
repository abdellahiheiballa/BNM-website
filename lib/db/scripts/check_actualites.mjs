import fs from 'node:fs/promises';
import pg from 'pg';

const { Client } = pg;
const client = new Client({ connectionString: 'postgresql://postgres:2026@localhost:5432/bnm_db' });

try {
  await client.connect();
  const res = await client.query(
    'SELECT id, titre, slug, categorie, image, date_publication FROM actualites ORDER BY date_publication DESC'
  );
  const payload = {
    count: res.rowCount,
    rows: res.rows,
    generatedAt: new Date().toISOString(),
  };
  await fs.writeFile('C:/Users/pc bnm/Desktop/BNM-website/actualites_db_check.json', JSON.stringify(payload, null, 2));
  console.log('WROTE', payload.count);
} catch (error) {
  await fs.writeFile('C:/Users/pc bnm/Desktop/BNM-website/actualites_db_check.json', JSON.stringify({ error: String(error) }, null, 2));
  console.error(error);
  process.exitCode = 1;
} finally {
  await client.end();
}
