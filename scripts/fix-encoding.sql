SET client_encoding = 'UTF8';

-- Fix corrupted actualites (rows that exist with wrong data)
UPDATE actualites SET
  titre = 'La BNM renforce sa présence dans les régions',
  slug = 'bnm-renforce-presence-regions',
  contenu = 'La Banque Nationale de Mauritanie a inauguré trois nouvelles agences dans les wilayas de Hodh El Gharbi, Assaba et Gorgol, dans le cadre de sa stratégie d''expansion et d''inclusion financière. Ces ouvertures témoignent de la volonté de la banque de rapprocher les services bancaires des populations des zones rurales et semi-urbaines.',
  image = '/placeholder-news-1.jpg',
  categorie = 'Institution',
  date_publication = '2026-05-02 10:28:02',
  created_at = '2026-05-04 10:28:02'
WHERE id = 1;

UPDATE actualites SET
  titre = 'Lancement du produit Al Watani Plus',
  slug = 'lancement-al-watani-plus',
  contenu = 'La BNM lance Al Watani Plus, une nouvelle solution de financement islamique dédiée aux projets immobiliers. Ce produit innovant, conforme aux principes de la charia, permet aux clients d''acquérir leur résidence principale sans recourir aux intérêts conventionnels. Le produit est disponible dans toutes les agences BNM dès aujourd''hui.',
  image = '/placeholder-news-2.jpg',
  categorie = 'Produits',
  date_publication = '2026-04-27 10:28:02',
  created_at = '2026-05-04 10:28:02'
WHERE id = 2;

UPDATE actualites SET
  titre = 'Résultats financiers du premier trimestre 2025',
  slug = 'resultats-financiers-t1-2025',
  contenu = 'La Banque Nationale de Mauritanie publie ses résultats financiers pour le premier trimestre 2025. Le produit net bancaire progresse de 12% par rapport à la même période de l''année précédente, reflétant la dynamique positive de l''activité commerciale et la solidité du bilan de la banque.',
  image = '/placeholder-news-3.jpg',
  categorie = 'Finance',
  date_publication = '2026-04-20 10:28:02',
  created_at = '2026-05-04 10:28:02'
WHERE id = 3;

UPDATE actualites SET
  titre = 'Partenariat stratégique avec la BAD',
  slug = 'partenariat-strategique-bad',
  contenu = 'La BNM signe un accord de partenariat avec la Banque Africaine de Développement pour le financement de projets d''infrastructure en Mauritanie. Cet accord porte sur une enveloppe de 50 milliards MRU destinée à soutenir les secteurs de l''énergie, des transports et de l''agriculture.',
  image = '/placeholder-news-4.jpg',
  categorie = 'Partenariats',
  date_publication = '2026-04-13 10:28:02',
  created_at = '2026-05-04 10:28:02'
WHERE id = 4;

UPDATE actualites SET
  titre = 'BNM Mobile : nouvelle version disponible',
  slug = 'bnm-mobile-nouvelle-version',
  contenu = 'La BNM met à jour son application mobile avec de nouvelles fonctionnalités : virements instantanés, suivi des crédits en temps réel, et authentification biométrique renforcée. La nouvelle version est disponible sur App Store et Google Play dès maintenant.',
  image = '/placeholder-news-5.jpg',
  categorie = 'Digital',
  date_publication = '2026-04-04 10:28:02',
  created_at = '2026-05-04 10:28:02'
WHERE id = 5;

-- Fix corrupted offres (all rows)
UPDATE offres SET
  description = 'Gérez votre quotidien avec notre compte courant. Chéquier, carte bancaire, et accès en ligne inclus. Ouverture rapide dans toutes nos agences.'
WHERE id = 1;

UPDATE offres SET
  titre = 'Épargne Classique',
  description = 'Faites fructifier votre épargne avec un taux d''intérêt compétitif. Disponibilité à tout moment et opérations sécurisées.'
WHERE id = 2;

UPDATE offres SET
  titre = 'Crédit Immobilier',
  description = 'Réalisez votre projet immobilier avec nos solutions de financement adaptées. Durée jusqu''à 25 ans et taux préférentiels.'
WHERE id = 3;

UPDATE offres SET
  description = 'Profitez de la liberté de paiement en Mauritanie et à l''international avec notre carte Visa. Retraits aux guichets automatiques 24h/24.'
WHERE id = 4;

UPDATE offres SET
  titre = 'Compte Professionnel',
  description = 'Un compte dédié à votre activité professionnelle avec des services adaptés : domiciliation de revenus, facilités de caisse, et découvert autorisé.'
WHERE id = 5;

UPDATE offres SET
  description = 'Développez votre activité grâce à nos solutions de financement sur mesure pour les professionnels libéraux, artisans et commerçants.'
WHERE id = 6;

UPDATE offres SET
  description = 'Acceptez les paiements par carte bancaire dans votre établissement avec nos terminaux de paiement dernière génération.'
WHERE id = 7;

UPDATE offres SET
  description = 'Optimisez la gestion de votre trésorerie d''entreprise avec nos outils de cash management : centralisation des flux, prévisions de trésorerie, et reporting avancé.'
WHERE id = 8;

UPDATE offres SET
  description = 'Facilitez vos opérations de commerce international : lettres de crédit, remises documentaires, garanties bancaires et financement des exportations.'
WHERE id = 9;

UPDATE offres SET
  titre = 'Crédit Investissement',
  description = 'Financez vos projets d''investissement à moyen et long terme avec des solutions adaptées à la taille et aux besoins de votre entreprise.'
WHERE id = 10;

UPDATE offres SET
  description = 'Financez votre bien immobilier conformément aux principes de la charia. La BNM achète le bien et vous le revend à terme avec une marge bénéficiaire transparente.'
WHERE id = 11;

UPDATE offres SET
  titre = 'Murabaha Véhicule',
  description = 'Acquérez votre véhicule personnel ou professionnel sans intérêts grâce à notre produit Murabaha conforme aux règles de la finance islamique.'
WHERE id = 12;

UPDATE offres SET
  titre = 'Épargne Al Baraka',
  description = 'Un compte d''épargne participatif basé sur le principe de la Moudaraba. Vos dépôts sont investis dans des projets halal et vous partagez les bénéfices.'
WHERE id = 13;
