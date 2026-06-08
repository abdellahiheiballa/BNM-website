import pg from 'pg';

const { Client } = pg;

const records = [
  {
    id: 6,
    titre: "La Banque Nationale renforce sa présence dans le secteur de l'élevage",
  },
  {
    id: 7,
    titre: "Sport et inclusion sociale",
  },
  {
    id: 8,
    titre: "Inauguration de la première agence bancaire de Barkéwol",
  },
  {
    id: 9,
    titre: "Amélioration du processus des moyens de paiement",
  }
];

async function fixUtf8() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL || 'postgresql://postgres:2023@localhost:5432/bnm_db'
  });
  
  await client.connect();
  console.log('Connected to database');
  
  for (const record of records) {
    const result = await client.query(
      'UPDATE actualites SET titre = $1 WHERE id = $2',
      [record.titre, record.id]
    );
    console.log(`✓ Updated record ${record.id}: ${record.titre}`);
  }
  
  // Verify the updates
  console.log('\nVerifying updates:');
  const query = await client.query('SELECT id, titre FROM actualites WHERE id IN (6,7,8,9) ORDER BY id');
  for (const row of query.rows) {
    console.log(`ID ${row.id}: ${row.titre}`);
  }
  
  await client.end();
  console.log('\n✅ UTF-8 encoding fixed successfully');
}

fixUtf8().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
