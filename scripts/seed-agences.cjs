const pg = require("pg");
const { Pool } = pg;

const pool = new Pool({
  connectionString: "postgresql://postgres:2023@localhost:5432/bnm_db",
});

const agencies = [
  { nom: "Agence centrale (siège)", telephone: "45252602", latitude: 18.08736, longitude: -15.97942 },
  { nom: "Agence MAEC", telephone: "45257904", latitude: 18.08736, longitude: -15.97942 },
  { nom: "Agence Socim", telephone: "45257904", latitude: 18.07903, longitude: -15.97969 },
  { nom: "Agence mosquée", telephone: "45297299", latitude: 18.09158, longitude: -15.97347 },
  { nom: "Agence GAN", telephone: "45252968", latitude: 18.08931, longitude: -15.97500 },
  { nom: "Agence 28 novembre", telephone: "45254535", latitude: 18.10275, longitude: -15.95611 },
  { nom: "Agence sebkha 2", telephone: "45250041", latitude: 18.07242, longitude: -15.98678 },
  { nom: "Agence sebkha 1", telephone: "45464422", latitude: 18.07233, longitude: -15.07233 },
  { nom: "Agence Arafat 2", telephone: "45250041", latitude: 18.05714, longitude: -15.97436 },
  { nom: "Agence watani ksar 2", telephone: "45761416", latitude: 18.11344, longitude: -15.95292 },
  { nom: "Agence centrale Zouerate", telephone: "45440346", latitude: 22.73525, longitude: -12.47544 },
  { nom: "Agence Tintane", telephone: "45155106", latitude: 16.38089, longitude: -10.16436 },
  { nom: "Agence watani Chami", telephone: "44784899", latitude: 20.16761, longitude: -15.97283 },
  { nom: "Agence Kaédi", telephone: "45336522", latitude: 16.14733, longitude: -13.50367 },
  { nom: "Agence Atar", telephone: "46878721", latitude: 20.56228, longitude: -13.10633 },
  { nom: "Agence Kiffa", telephone: "45344337", latitude: 16.62172, longitude: -11.39978 },
  { nom: "Agence Akjoujt", telephone: "45761416", latitude: 19.74706, longitude: -14.38398 },
  { nom: "Agence Bassiknou", telephone: "47763555", latitude: 15.86797, longitude: -15.95258 },
  { nom: "Agence Rosso", telephone: "45569020", latitude: 16.50986, longitude: -15.80775 },
  { nom: "Agence Sélibabi", telephone: "47766550", latitude: 15.19478, longitude: -12.17261 },
  { nom: "Agence Watani Nouadhibou", telephone: "45744062", latitude: 20.91808, longitude: -17.04786 },
  { nom: "Agence centrale Nouadhibou", telephone: "45745045", latitude: 20.91694, longitude: -17.04950 },
  { nom: "Agence watani Zouerate", telephone: "45440346", latitude: 22.73236, longitude: -12.47514 },
  { nom: "Agence Cansado", telephone: "45749099", latitude: 20.85303, longitude: -17.03383 },
  { nom: "Agence watani Boghé", telephone: "45508725", latitude: 16.58458, longitude: -14.27489 },
  { nom: "Agence Watani Dar Naim", telephone: "45250532", latitude: 18.13156, longitude: -15.92706 },
  { nom: "Agence Watani TVZ (Taïba)", telephone: "45251699", latitude: 18.10281, longitude: -15.97567 },
  { nom: "Agence business center", telephone: "45252602", latitude: 18.10958, longitude: -15.99869 },
  { nom: "Agence Watani Aïoun", telephone: "43525354", latitude: 16.66156, longitude: -9.61450 },
  { nom: "Agence Ksar", telephone: "42141830", latitude: 18.10747, longitude: -15.95328 },
  { nom: "Agence Arafat 1", telephone: "45250041", latitude: 18.10031, longitude: -15.95211 },
  { nom: "Agence ksar El kheri", telephone: null, latitude: null, longitude: null },
  { nom: "Agence Barkéwol", telephone: "49690622", latitude: 18.10031, longitude: -15.95211 },
];

async function main() {
  const client = await pool.connect();
  try {
    for (const a of agencies) {
      const exists = await client.query("SELECT 1 FROM agences WHERE nom = $1", [a.nom]);
      if (exists.rows.length > 0) {
        console.log("Skipped (exists):", a.nom);
        continue;
      }
      await client.query(
        "INSERT INTO agences (nom, telephone, latitude, longitude, horaires, adresse, ville) VALUES ($1, $2, $3, $4, $5, $6, $7)",
        [a.nom, a.telephone, a.latitude, a.longitude, null, null, null]
      );
      console.log("Inserted:", a.nom);
    }
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
