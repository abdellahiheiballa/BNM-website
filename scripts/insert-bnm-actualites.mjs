import pg from 'pg';

const { Client } = pg;

const connectionString = process.env.DATABASE_URL ?? 'postgresql://postgres:2026@localhost:5432/bnm_db';

const rows = [
  {
    titre: 'La Banque Nationale renforce sa présence dans le secteur de l’élevage',
    slug: 'la-banque-nationale-renforce-sa-presence-dans-le-secteur-de-lelevage',
    contenu:
      'A la journée porte ouverte pour la promotion du secteur de l’élevage en Mauritanie, la Banque Nationale de Mauritanie a honoré son engagement d’octroyer un financement d’un milliard d’ouguiya (100.000.000 MRU) aux porteurs de projets du secteur. Cet accord vise à encourager la dynamique d’une meilleure exploitation de nos ressources animales. De nouveaux produits ont été présentés tels que le compte Al Mounami et Al Mara’i pour la fourniture d’aliments de bétails de haute qualité.',
    image: '/assets/actualites/bnm-elevage.jpg',
    categorie: 'Economie',
    date_publication: '2022-05-30T00:00:00Z'
  },
  {
    titre: 'Sport et inclusion sociale',
    slug: 'sport-et-inclusion-sociale',
    contenu:
      'La Banque Nationale de Mauritanie accompagne l’association Women National Basketball pour l’organisation d’un tournoi de basketball ouest africain entre la Mauritanie, le Sénégal, la Gambie et le Mali. Cette événement a été organisé en partenariat avec la fédération mauritanienne de basketball et s’est soldé par une victoire de l’équipe mauritanienne en finale face au Sénégal sur un score de 45 à 43. La Banque Nationale souhaite contribuer au dynamisme et rayonnement de ce sport dans le but de promouvoir l’inclusion sociale et de favoriser le développement de la pratique sportive.',
    image: '/assets/actualites/bnm-sport-inclusion.jpg',
    categorie: 'Evènements',
    date_publication: '2022-07-28T00:00:00Z'
  },
  {
    titre: 'Inauguration de la première agence bancaire de Barkéwol',
    slug: 'inauguration-de-la-premiere-agence-bancaire-de-barkewol',
    contenu:
      'La banque Nationale de Mauritanie ouvre une agence bancaire Watani dédiée aux opérations bancaires islamiques. L’objectif de cette nouvelle agence est de mettre à la disposition des populations de Barkéwol les meilleurs services bancaires conformément à la vision de la Banque Nationale. La satisfaction clientèle et l’inclusion financière au sein de la Mauritanie resteront toujours nos objectifs finaux et nous continuerons d’ouvrer pour les atteindre.',
    image: '/assets/actualites/bnm-barkewol.jpg',
    categorie: 'Banque',
    date_publication: '2022-03-14T00:00:00Z'
  },
  {
    titre: 'Amélioration du processus des moyens de paiement',
    slug: 'amelioration-du-processus-des-moyens-de-paiement',
    contenu:
      'La gestion des moyens de paiement est au cœur de l’activité de la Banque Nationale. Dans l’optique d’augmenter la productivité des conseillers financiers et d’améliorer l’expérience client, la Banque Nationale met en place un système pour digitaliser les demandes de cartes bancaires et de chéquiers pour une traçabilité.',
    image: '/assets/actualites/bnm-paiements.jpg',
    categorie: 'Communiqués',
    date_publication: '2022-08-08T00:00:00Z'
  }
];

const client = new Client({ connectionString });

try {
  await client.connect();

  for (const row of rows) {
    await client.query(
      `INSERT INTO actualites (titre, slug, contenu, image, categorie, date_publication, created_at)
       VALUES ($1, $2, $3, $4, $5, $6, NOW())
       ON CONFLICT (slug) DO UPDATE
       SET titre = EXCLUDED.titre,
           contenu = EXCLUDED.contenu,
           image = EXCLUDED.image,
           categorie = EXCLUDED.categorie,
           date_publication = EXCLUDED.date_publication;`,
      [row.titre, row.slug, row.contenu, row.image, row.categorie, row.date_publication],
    );
  }

  const result = await client.query(
    'SELECT id, titre, slug, categorie, image, date_publication FROM actualites ORDER BY date_publication DESC'
  );

  console.log(JSON.stringify(result.rows, null, 2));
} finally {
  await client.end();
}
