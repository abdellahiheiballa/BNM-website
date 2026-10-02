-- ============================================
-- BNM - English translations for the LIVE database
--
-- Populates titre_en / contenu_en (actualites) and titre_en /
-- description_en (offres) for the rows that actually exist in production.
--
-- Slugs below were taken from the live server on 2026-10-02. They differ from
-- the legacy seed file (scripts/import-json-data.sql), which uses older
-- slugs such as bnm-presence-elevage or compte-courant-particulier.
--
-- Idempotent: each UPDATE only fills columns that are still empty, so
-- re-running will not overwrite translations edited through the admin UI.
-- ============================================

-- ---------- Actualités (5 rows) ----------

UPDATE actualites SET
  titre_en = 'The National Bank strengthens its presence in the livestock sector',
  contenu_en = 'On the open day held to promote the livestock sector in Mauritania, the National Bank of Mauritania honoured its commitment to grant one billion ouguiya (100,000,000 MRU) in financing to project developers in the sector.'
WHERE slug = 'la-banque-nationale-renforce-sa-presence-dans-le-secteur-de-lelevage'
  AND (titre_en IS NULL OR titre_en = '');

UPDATE actualites SET
  titre_en = 'Sport and social inclusion',
  contenu_en = 'The National Bank of Mauritania is supporting the Women National Basketball association in organising a West African basketball tournament.'
WHERE slug = 'sport-et-inclusion-sociale'
  AND (titre_en IS NULL OR titre_en = '');

UPDATE actualites SET
  titre_en = 'Opening of the first bank branch in Barkéwol',
  contenu_en = 'The National Bank of Mauritania opens a Watani branch dedicated to Islamic banking operations.'
WHERE slug = 'inauguration-de-la-premiere-agence-bancaire-de-barkewol'
  AND (titre_en IS NULL OR titre_en = '');

UPDATE actualites SET
  titre_en = 'Improving the payment instruments process',
  contenu_en = 'Payment instruments are at the heart of the National Bank''s business activity.'
WHERE slug = 'amelioration-du-processus-des-moyens-de-paiement'
  AND (titre_en IS NULL OR titre_en = '');

UPDATE actualites SET
  titre_en = 'AiChat BNM: your banking assistant on WhatsApp',
  contenu_en = 'The National Bank of Mauritania has made AiChat BNM available to its customers, a banking assistant accessible directly through WhatsApp.

AiChat BNM allows users to quickly get information about the bank''s products and services and to benefit from simple, practical assistance from their phone.

This new solution is part of BNM''s commitment to developing its digital services, making information easier to access, and improving the customer experience.

AiChat BNM is available on WhatsApp.'
WHERE slug = 'aichat-bnm-votre-assistant-bancaire-sur-whatsapp'
  AND (titre_en IS NULL OR titre_en = '');

-- ---------- Offres (8 rows) ----------

UPDATE offres SET
  titre_en = 'Business Account',
  description_en = 'A complete bank account to manage your company''s operations efficiently.'
WHERE slug = 'compte-entreprise'
  AND (titre_en IS NULL OR titre_en = '');

UPDATE offres SET
  titre_en = 'Watani Islamic Account',
  description_en = 'Our Sharia-compliant banking solutions to meet your financial needs in line with Islamic principles.'
WHERE slug = 'compte-islamique'
  AND (titre_en IS NULL OR titre_en = '');

UPDATE offres SET
  titre_en = 'Personalised Current Account',
  description_en = 'Manage your everyday banking with our personalised current account, tailored to all your daily needs.'
WHERE slug = 'compte-courant-personnalise'
  AND (titre_en IS NULL OR titre_en = '');

UPDATE offres SET
  titre_en = 'Savings Account',
  description_en = 'Save with confidence through our savings account, which generates competitive interest and secures your future.'
WHERE slug = 'compte-epargne'
  AND (titre_en IS NULL OR titre_en = '');

UPDATE offres SET
  titre_en = 'Bank Card',
  description_en = 'Enjoy the convenience of our bank card for all your everyday payments and withdrawals.'
WHERE slug = 'carte-bancaire'
  AND (titre_en IS NULL OR titre_en = '');

UPDATE offres SET
  titre_en = 'Personal Loan',
  description_en = 'Fund your personal projects with our personal loan at a competitive rate and with flexible terms.'
WHERE slug = 'pret-personnel'
  AND (titre_en IS NULL OR titre_en = '');

UPDATE offres SET
  titre_en = 'Professional Account',
  description_en = 'Optimise the management of your business with our professional account, designed for entrepreneurs.'
WHERE slug = 'compte-professionnel'
  AND (titre_en IS NULL OR titre_en = '');

UPDATE offres SET
  titre_en = 'Payment Solutions',
  description_en = 'Digitise your professional transactions with our innovative and secure payment solutions.'
WHERE slug = 'solutions-paiement'
  AND (titre_en IS NULL OR titre_en = '');