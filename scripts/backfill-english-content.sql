-- ============================================
-- BNM - English translations backfill
--
-- Populates titre_en / contenu_en (actualites) and
-- titre_en / description_en (offres) from the existing French content.
--
-- Idempotent and keyed on slug, so rows that are absent are simply skipped
-- and re-running will not overwrite later editorial corrections made through
-- the admin UI unless you clear the WHERE clause on the target column.
-- ============================================

-- ---------- Actualités ----------

UPDATE actualites SET
  titre_en = 'BNM strengthens its presence across the regions',
  contenu_en = 'The National Bank of Mauritania has inaugurated three new branches in the wilayas of Hodh El Gharbi, Assaba and Gorgol, as part of its expansion and financial inclusion strategy. These openings reflect the bank''s determination to bring banking services closer to populations in rural and semi-urban areas.'
WHERE slug = 'bnm-renforce-presence-regions'
  AND (titre_en IS NULL OR titre_en = '');

UPDATE actualites SET
  titre_en = 'Launch of the Al Watani Plus product',
  contenu_en = 'BNM is launching Al Watani Plus, a new Islamic financing solution dedicated to real estate projects. This innovative product, compliant with Sharia principles, enables customers to acquire their primary residence without relying on conventional interest. The product is available at all BNM branches from today.'
WHERE slug = 'lancement-al-watani-plus'
  AND (titre_en IS NULL OR titre_en = '');

UPDATE actualites SET
  titre_en = 'Financial results for the first quarter of 2025',
  contenu_en = 'The National Bank of Mauritania publishes its financial results for the first quarter of 2025. Net banking income grew by 12% compared with the same period of the previous year, reflecting the positive momentum of commercial activity and the strength of the bank''s balance sheet.'
WHERE slug = 'resultats-financiers-t1-2025'
  AND (titre_en IS NULL OR titre_en = '');

UPDATE actualites SET
  titre_en = 'Strategic partnership with the AfDB',
  contenu_en = 'BNM has signed a partnership agreement with the African Development Bank to finance infrastructure projects in Mauritania. The agreement covers an envelope of 50 billion MRU intended to support the energy, transport and agricultural sectors.'
WHERE slug = 'partenariat-strategique-bad'
  AND (titre_en IS NULL OR titre_en = '');

UPDATE actualites SET
  titre_en = 'BNM Mobile: new version available',
  contenu_en = 'BNM is updating its mobile application with new features: instant transfers, real-time loan tracking, and enhanced biometric authentication. The new version is available on the App Store and Google Play as of now.'
WHERE slug = 'bnm-mobile-nouvelle-version'
  AND (titre_en IS NULL OR titre_en = '');

UPDATE actualites SET
  titre_en = 'The National Bank strengthens its presence in the livestock sector',
  contenu_en = 'BNM announced financing of one billion ouguiyas (100,000,000 MRU) for livestock-sector projects and introduced products such as Al Mounami and Al Mara''i to support animal feed and agricultural development.'
WHERE slug = 'bnm-presence-elevage'
  AND (titre_en IS NULL OR titre_en = '');

UPDATE actualites SET
  titre_en = 'Sport and social inclusion',
  contenu_en = 'BNM supported the Women''s National Basketball association in organizing a West African basketball tournament involving Mauritania, Senegal, Gambia and Mali, promoting sport and social inclusion.'
WHERE slug = 'sport-inclusion-sociale'
  AND (titre_en IS NULL OR titre_en = '');

UPDATE actualites SET
  titre_en = 'Opening of the first bank branch in Barkéwol',
  contenu_en = 'BNM opened a Watani Islamic banking branch in Barkéwol to expand banking services and financial inclusion.'
WHERE slug = 'inauguration-agence-barkewol'
  AND (titre_en IS NULL OR titre_en = '');

UPDATE actualites SET
  titre_en = 'Improving the payment instruments process',
  contenu_en = 'BNM launched a system to digitize requests for bank cards and cheque books to improve productivity, traceability and customer experience.'
WHERE slug = 'amelioration-processus-moyens-paiement'
  AND (titre_en IS NULL OR titre_en = '');

-- ---------- Offres ----------

UPDATE offres SET
  titre_en = 'Personal Current Account',
  description_en = 'Manage your everyday banking with our current account. Cheque book, bank card and online access included. Fast opening at all our branches.'
WHERE slug = 'compte-courant-particulier'
  AND (titre_en IS NULL OR titre_en = '');

UPDATE offres SET
  titre_en = 'Classic Savings',
  description_en = 'Grow your savings with a competitive interest rate. Availability at any time and secure transactions.'
WHERE slug = 'epargne-classique'
  AND (titre_en IS NULL OR titre_en = '');

UPDATE offres SET
  titre_en = 'Home Mortgage',
  description_en = 'Realise your property project with our adapted financing solutions. Terms of up to 25 years and preferential rates.'
WHERE slug = 'credit-immobilier'
  AND (titre_en IS NULL OR titre_en = '');

UPDATE offres SET
  titre_en = 'Personal Visa Card',
  description_en = 'Enjoy the freedom to pay in Mauritania and abroad with our Visa card. Withdrawals at ATMs 24/7.'
WHERE slug = 'carte-visa-particulier'
  AND (titre_en IS NULL OR titre_en = '');

UPDATE offres SET
  titre_en = 'Business Account',
  description_en = 'A dedicated account for your professional activity with adapted services: revenue domiciliation, cash facilities and authorised overdraft.'
WHERE slug = 'compte-professionnel'
  AND (titre_en IS NULL OR titre_en = '');

UPDATE offres SET
  titre_en = 'Business Financing',
  description_en = 'Grow your business with our tailor-made financing solutions for self-employed professionals, craftsmen and merchants.'
WHERE slug = 'financement-professionnel'
  AND (titre_en IS NULL OR titre_en = '');

UPDATE offres SET
  titre_en = 'Payment Terminal',
  description_en = 'Accept card payments in your establishment with our next-generation payment terminals.'
WHERE slug = 'terminal-de-paiement'
  AND (titre_en IS NULL OR titre_en = '');

UPDATE offres SET
  titre_en = 'Cash Management',
  description_en = 'Optimise your corporate treasury management with our cash management tools: flow centralisation, cash flow forecasting and advanced reporting.'
WHERE slug = 'cash-management'
  AND (titre_en IS NULL OR titre_en = '');

UPDATE offres SET
  titre_en = 'Trade Finance',
  description_en = 'Facilitate your international trade operations: letters of credit, documentary remittances, bank guarantees and export financing.'
WHERE slug = 'trade-finance'
  AND (titre_en IS NULL OR titre_en = '');

UPDATE offres SET
  titre_en = 'Investment Credit',
  description_en = 'Finance your medium and long-term investment projects with solutions tailored to the size and needs of your company.'
WHERE slug = 'credit-investissement'
  AND (titre_en IS NULL OR titre_en = '');

UPDATE offres SET
  titre_en = 'Murabaha Real Estate',
  description_en = 'Finance your property in compliance with Sharia principles. BNM buys the asset and resells it to you over time with a transparent profit margin.'
WHERE slug = 'murabaha-immobilier'
  AND (titre_en IS NULL OR titre_en = '');

UPDATE offres SET
  titre_en = 'Murabaha Vehicle',
  description_en = 'Acquire your personal or professional vehicle interest-free with our Murabaha product, compliant with Islamic finance rules.'
WHERE slug = 'murabaha-vehicule'
  AND (titre_en IS NULL OR titre_en = '');

UPDATE offres SET
  titre_en = 'Al Baraka Savings',
  description_en = 'A participative savings account based on the Mudaraba principle. Your deposits are invested in halal projects and you share in the profits.'
WHERE slug = 'epargne-al-baraka'
  AND (titre_en IS NULL OR titre_en = '');