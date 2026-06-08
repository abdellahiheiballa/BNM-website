-- UTF-8 Encoded Actualités Import
SET client_encoding = 'UTF8';

INSERT INTO actualites (id, titre, slug, contenu, image, categorie, date_publication, created_at) VALUES
(6, 'La Banque Nationale renforce sa présence dans le secteur de l''élevage', 'bnm-presence-elevage', 'BNM announced financing of one billion ouguiyas (100,000,000 MRU) for livestock-sector projects and introduced products such as Al Mounami and Al Mara''i to support animal feed and agricultural development.', '/assets/actualites/bnm-elevage.jpg', 'Agriculture', '2022-05-30 00:00:00', '2024-06-03 00:00:00'),
(7, 'Sport et inclusion sociale', 'sport-inclusion-sociale', 'BNM supported the Women National Basketball association in organizing a West African basketball tournament involving Mauritania, Senegal, Gambia, and Mali, promoting sport and social inclusion.', '/assets/actualites/bnm-sport-inclusion.jpg', 'Sport', '2022-07-28 00:00:00', '2024-06-03 00:00:00'),
(8, 'Inauguration de la première agence bancaire de Barkéwol', 'inauguration-agence-barkewol', 'BNM opened a Watani Islamic banking branch in Barkéwol to expand banking services and financial inclusion.', '/assets/actualites/bnm-barkewol.jpg', 'Agence', '2022-03-14 00:00:00', '2024-06-03 00:00:00'),
(9, 'Amélioration du processus des moyens de paiement', 'amelioration-processus-moyens-paiement', 'BNM launched a system to digitize requests for bank cards and cheque books to improve productivity, traceability, and customer experience.', '/assets/actualites/bnm-paiements.jpg', 'Digital', '2022-08-08 00:00:00', '2024-06-03 00:00:00')
ON CONFLICT (id) DO UPDATE SET
    titre = EXCLUDED.titre,
    contenu = EXCLUDED.contenu,
    image = EXCLUDED.image,
    categorie = EXCLUDED.categorie,
    date_publication = EXCLUDED.date_publication,
    created_at = EXCLUDED.created_at;
