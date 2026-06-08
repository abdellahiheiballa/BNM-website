import { db, actualitesTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const records = [
  {
    id: 6,
    titre: "La Banque Nationale renforce sa présence dans le secteur de l'élevage",
    contenu: "BNM announced financing of one billion ouguiyas (100,000,000 MRU) for livestock-sector projects and introduced products such as Al Mounami and Al Mara'i to support animal feed and agricultural development."
  },
  {
    id: 7,
    titre: "Sport et inclusion sociale",
    contenu: "BNM supported the Women National Basketball association in organizing a West African basketball tournament involving Mauritania, Senegal, Gambia, and Mali, promoting sport and social inclusion."
  },
  {
    id: 8,
    titre: "Inauguration de la première agence bancaire de Barkéwol",
    contenu: "BNM opened a Watani Islamic banking branch in Barkéwol to expand banking services and financial inclusion."
  },
  {
    id: 9,
    titre: "Amélioration du processus des moyens de paiement",
    contenu: "BNM launched a system to digitize requests for bank cards and cheque books to improve productivity, traceability, and customer experience."
  }
];

async function fixUtf8() {
  for (const record of records) {
    await db.update(actualitesTable)
      .set({ titre: record.titre, contenu: record.contenu })
      .where(eq(actualitesTable.id, record.id));
    console.log(`✓ Fixed record ${record.id}: ${record.titre}`);
  }
  console.log("\n✅ All records updated with correct UTF-8 encoding");
  process.exit(0);
}

fixUtf8().catch(err => {
  console.error("Error:", err);
  process.exit(1);
});
