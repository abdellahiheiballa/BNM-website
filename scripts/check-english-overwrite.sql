-- ============================================
-- BNM - Diagnostic: check for French columns overwritten by English
--
-- add-english-columns.sql copies _en into the default (titre/contenu/
-- description) columns. Run BEFORE the backfill, those columns are still
-- French, so the copy is a no-op. Run AFTER, it overwrites the French
-- defaults with English.
--
-- This script only reports; it changes nothing.
-- ============================================

\echo '--- actualites: rows where default no longer matches French ---'
SELECT id,
       slug,
       titre  = titre_fr  AS titre_matches_fr,
       contenu = contenu_fr AS contenu_matches_fr
FROM actualites
WHERE (titre_fr IS NOT NULL AND titre IS DISTINCT FROM titre_fr)
   OR (contenu_fr IS NOT NULL AND contenu IS DISTINCT FROM contenu_fr)
ORDER BY id;

\echo '--- offres: rows where default no longer matches French ---'
SELECT id,
       slug,
       titre = titre_fr AS titre_matches_fr,
       description = description_fr AS description_matches_fr
FROM offres
WHERE (titre_fr IS NOT NULL AND titre IS DISTINCT FROM titre_fr)
   OR (description_fr IS NOT NULL AND description IS DISTINCT FROM description_fr)
ORDER BY id;

\echo '--- translation coverage (expect 5 and 8) ---'
SELECT (SELECT count(*) FROM actualites) AS actualites_total,
       (SELECT count(*) FROM actualites WHERE titre_en IS NOT NULL AND titre_en <> '') AS actualites_en,
       (SELECT count(*) FROM offres) AS offres_total,
       (SELECT count(*) FROM offres WHERE titre_en IS NOT NULL AND titre_en <> '') AS offres_en;
