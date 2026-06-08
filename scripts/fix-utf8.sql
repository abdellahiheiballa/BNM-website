SET client_encoding = 'UTF8';
UPDATE actualites SET titre = 'La Banque Nationale renforce sa présence dans le secteur de l''élevage', contenu = 'BNM announced financing of one billion ouguiyas (100,000,000 MRU) for livestock-sector projects and introduced products such as Al Mounami and Al Mara''i to support animal feed and agricultural development.' WHERE id = 6;
UPDATE actualites SET titre = 'Sport et inclusion sociale' WHERE id = 7;
UPDATE actualites SET titre = 'Inauguration de la première agence bancaire de Barkéwol' WHERE id = 8;
UPDATE actualites SET titre = 'Amélioration du processus des moyens de paiement' WHERE id = 9;
SELECT id, titre FROM actualites WHERE id IN (6,7,8,9) ORDER BY id;
