-- ============================================
-- BNM - IMPORT COMPLET DEPUIS JSON (UPSERT)
-- PostgreSQL 18 / pgAdmin
-- ============================================

-- Note: This script uses UPSERT logic - inserts new records, updates existing ones

INSERT INTO actualites (id, titre, slug, contenu, image, categorie, date_publication, created_at) VALUES
(1, 'La BNM renforce sa présence dans les régions', 'bnm-renforce-presence-regions', 'La Banque Nationale de Mauritanie a inauguré trois nouvelles agences dans les wilayas de Hodh El Gharbi, Assaba et Gorgol, dans le cadre de sa stratégie d''expansion et d''inclusion financière. Ces ouvertures témoignent de la volonté de la banque de rapprocher les services bancaires des populations des zones rurales et semi-urbaines.', '/placeholder-news-1.jpg', 'Institution', '2026-05-02 10:28:02', '2026-05-04 10:28:02'),
(2, 'Lancement du produit Al Watani Plus', 'lancement-al-watani-plus', 'La BNM lance Al Watani Plus, une nouvelle solution de financement islamique dédiée aux projets immobiliers. Ce produit innovant, conforme aux principes de la charia, permet aux clients d''acquérir leur résidence principale sans recourir aux intérêts conventionnels. Le produit est disponible dans toutes les agences BNM dès aujourd''hui.', '/placeholder-news-2.jpg', 'Produits', '2026-04-27 10:28:02', '2026-05-04 10:28:02'),
(3, 'Résultats financiers du premier trimestre 2025', 'resultats-financiers-t1-2025', 'La Banque Nationale de Mauritanie publie ses résultats financiers pour le premier trimestre 2025. Le produit net bancaire progresse de 12% par rapport à la même période de l''année précédente, reflétant la dynamique positive de l''activité commerciale et la solidité du bilan de la banque.', '/placeholder-news-3.jpg', 'Finance', '2026-04-20 10:28:02', '2026-05-04 10:28:02'),
(4, 'Partenariat stratégique avec la BAD', 'partenariat-strategique-bad', 'La BNM signe un accord de partenariat avec la Banque Africaine de Développement pour le financement de projets d''infrastructure en Mauritanie. Cet accord porte sur une enveloppe de 50 milliards MRU destinée à soutenir les secteurs de l''énergie, des transports et de l''agriculture.', '/placeholder-news-4.jpg', 'Partenariats', '2026-04-13 10:28:02', '2026-05-04 10:28:02'),
(5, 'BNM Mobile : nouvelle version disponible', 'bnm-mobile-nouvelle-version', 'La BNM met à jour son application mobile avec de nouvelles fonctionnalités : virements instantanés, suivi des crédits en temps réel, et authentification biométrique renforcée. La nouvelle version est disponible sur App Store et Google Play dès maintenant.', '/placeholder-news-5.jpg', 'Digital', '2026-04-04 10:28:02', '2026-05-04 10:28:02'),
(6, 'La Banque Nationale renforce sa présence dans le secteur de l’élevage', 'bnm-presence-elevage', 'BNM announced financing of one billion ouguiyas (100,000,000 MRU) for livestock-sector projects and introduced products such as Al Mounami and Al Mara’i to support animal feed and agricultural development.', '/assets/actualites/bnm-elevage.jpg', 'Agriculture', '2022-05-30 00:00:00', '2024-06-03 00:00:00'),
(7, 'Sport et inclusion sociale', 'sport-inclusion-sociale', 'BNM supported the Women National Basketball association in organizing a West African basketball tournament involving Mauritania, Senegal, Gambia, and Mali, promoting sport and social inclusion.', '/assets/actualites/bnm-sport-inclusion.jpg', 'Sport', '2022-07-28 00:00:00', '2024-06-03 00:00:00'),
(8, 'Inauguration de la première agence bancaire de Barkéwol', 'inauguration-agence-barkewol', 'BNM opened a Watani Islamic banking branch in Barkéwol to expand banking services and financial inclusion.', '/assets/actualites/bnm-barkewol.jpg', 'Agence', '2022-03-14 00:00:00', '2024-06-03 00:00:00'),
(9, 'Amélioration du processus des moyens de paiement', 'amelioration-processus-moyens-paiement', 'BNM launched a system to digitize requests for bank cards and cheque books to improve productivity, traceability, and customer experience.', '/assets/actualites/bnm-paiements.jpg', 'Digital', '2022-08-08 00:00:00', '2024-06-03 00:00:00')
ON CONFLICT (slug) DO UPDATE SET
    titre = EXCLUDED.titre,
    contenu = EXCLUDED.contenu,
    image = EXCLUDED.image,
    categorie = EXCLUDED.categorie,
    date_publication = EXCLUDED.date_publication,
    created_at = EXCLUDED.created_at;

INSERT INTO offres (id, titre, slug, description, icone, categorie, ordre) VALUES
(1, 'Compte Courant Particulier', 'compte-courant-particulier', 'Gérez votre quotidien avec notre compte courant. Chéquier, carte bancaire, et accès en ligne inclus. Ouverture rapide dans toutes nos agences.', 'CreditCard', 'particuliers', 1),
(2, 'Épargne Classique', 'epargne-classique', 'Faites fructifier votre épargne avec un taux d''intérêt compétitif. Disponibilité à tout moment et opérations sécurisées.', 'PiggyBank', 'particuliers', 2),
(3, 'Crédit Immobilier', 'credit-immobilier', 'Réalisez votre projet immobilier avec nos solutions de financement adaptées. Durée jusqu''à 25 ans et taux préférentiels.', 'Home', 'particuliers', 3),
(4, 'Carte Visa Particulier', 'carte-visa-particulier', 'Profitez de la liberté de paiement en Mauritanie et à l''international avec notre carte Visa. Retraits aux guichets automatiques 24h/24.', 'Wallet', 'particuliers', 4),
(5, 'Compte Professionnel', 'compte-professionnel', 'Un compte dédié à votre activité professionnelle avec des services adaptés : domiciliation de revenus, facilités de caisse, et découvert autorisé.', 'Briefcase', 'professionnels', 1),
(6, 'Financement Professionnel', 'financement-professionnel', 'Développez votre activité grâce à nos solutions de financement sur mesure pour les professionnels libéraux, artisans et commerçants.', 'TrendingUp', 'professionnels', 2),
(7, 'Terminal de Paiement', 'terminal-de-paiement', 'Acceptez les paiements par carte bancaire dans votre établissement avec nos terminaux de paiement dernière génération.', 'Smartphone', 'professionnels', 3),
(8, 'Cash Management', 'cash-management', 'Optimisez la gestion de votre trésorerie d''entreprise avec nos outils de cash management : centralisation des flux, prévisions de trésorerie, et reporting avancé.', 'BarChart2', 'entreprises', 1),
(9, 'Trade Finance', 'trade-finance', 'Facilitez vos opérations de commerce international : lettres de crédit, remises documentaires, garanties bancaires et financement des exportations.', 'Globe', 'entreprises', 2),
(10, 'Crédit Investissement', 'credit-investissement', 'Financez vos projets d''investissement à moyen et long terme avec des solutions adaptées à la taille et aux besoins de votre entreprise.', 'Building2', 'entreprises', 3),
(11, 'Murabaha Immobilier', 'murabaha-immobilier', 'Financez votre bien immobilier conformément aux principes de la charia. La BNM achète le bien et vous le revend à terme avec une marge bénéficiaire transparente.', 'Home', 'islamique', 1),
(12, 'Murabaha Véhicule', 'murabaha-vehicule', 'Acquérez votre véhicule personnel ou professionnel sans intérêts grâce à notre produit Murabaha conforme aux règles de la finance islamique.', 'Car', 'islamique', 2),
(13, 'Épargne Al Baraka', 'epargne-al-baraka', 'Un compte d''épargne participatif basé sur le principe de la Moudaraba. Vos dépôts sont investis dans des projets halal et vous partagez les bénéfices.', 'Star', 'islamique', 3)
ON CONFLICT (slug) DO UPDATE SET
    titre = EXCLUDED.titre,
    description = EXCLUDED.description,
    icone = EXCLUDED.icone,
    categorie = EXCLUDED.categorie,
    ordre = EXCLUDED.ordre;

INSERT INTO agences (id, nom, adresse, ville, telephone, latitude, longitude, horaires) VALUES
(1, 'Agence Principale Nouakchott', 'Avenue Gamal Abdel Nasser, BP 623', 'Nouakchott', '+222 45 25 26 02', 18.07350000, -15.95820000, 'Dim-Jeu: 08h00-16h00'),
(2, 'Agence Tevragh Zeina', 'Rue des Ambassades, Tevragh Zeina', 'Nouakchott', '+222 45 24 12 34', 18.09890000, -15.96630000, 'Dim-Jeu: 08h00-16h00'),
(3, 'Agence Dar Naim', 'Avenue de l''Indépendance, Dar Naim', 'Nouakchott', '+222 45 30 45 67', 18.11230000, -15.94010000, 'Dim-Jeu: 08h00-16h00'),
(4, 'Agence Nouadhibou', 'Boulevard Médian, BP 41', 'Nouadhibou', '+222 45 74 21 30', 20.93400000, -17.03150000, 'Dim-Jeu: 08h00-15h30'),
(5, 'Agence Rosso', 'Rue du Port, Centre-ville', 'Rosso', '+222 36 96 11 22', 16.51500000, -15.80200000, 'Dim-Jeu: 08h00-15h30'),
(6, 'Agence Kiffa', 'Place de l''Indépendance', 'Kiffa', '+222 36 72 00 10', 16.61670000, -11.40000000, 'Dim-Jeu: 08h00-15h30'),
(7, 'Agence Zouerate', 'Avenue des Mines', 'Zouerate', '+222 45 75 10 20', 22.73330000, -12.46670000, 'Dim-Jeu: 08h00-15h00'),
(8, 'Agence Kaédi', 'Avenue Principale', 'Kaédi', '+222 36 83 00 05', 16.15000000, -13.50000000, 'Dim-Jeu: 08h00-15h30')
ON CONFLICT (id) DO UPDATE SET
    nom = EXCLUDED.nom,
    adresse = EXCLUDED.adresse,
    ville = EXCLUDED.ville,
    telephone = EXCLUDED.telephone,
    latitude = EXCLUDED.latitude,
    longitude = EXCLUDED.longitude,
    horaires = EXCLUDED.horaires;

SELECT 'actualites' AS table_name, COUNT(*) AS row_count FROM actualites
UNION ALL
SELECT 'offres', COUNT(*) FROM offres
UNION ALL
SELECT 'agences', COUNT(*) FROM agences
UNION ALL
SELECT 'contacts', COUNT(*) FROM contacts
UNION ALL
SELECT 'newsletter_subscribers', COUNT(*) FROM newsletter_subscribers;

SELECT id, titre, categorie, date_publication::DATE AS date_pub FROM actualites ORDER BY date_publication DESC;
SELECT categorie, COUNT(*) AS total FROM offres GROUP BY categorie;
SELECT ville, COUNT(*) AS total FROM agences GROUP BY ville;
