-- ============================================
-- BNM - English content columns
-- Adds titre_en / contenu_en (actualites) and
-- titre_en / description_en (offres).
--
-- Idempotent: safe to run more than once.
-- ============================================

ALTER TABLE actualites ADD COLUMN IF NOT EXISTS titre_en varchar(200);
ALTER TABLE actualites ADD COLUMN IF NOT EXISTS contenu_en text;

ALTER TABLE offres ADD COLUMN IF NOT EXISTS titre_en varchar(200);
ALTER TABLE offres ADD COLUMN IF NOT EXISTS description_en text;

-- Serve the English variant when a translation exists, otherwise keep the
-- French default. This keeps the public English view readable even for rows
-- that have not been translated yet.
UPDATE actualites
SET contenu = COALESCE(NULLIF(contenu_en, ''), contenu)
WHERE contenu_en IS NOT NULL AND contenu_en <> '';

UPDATE actualites
SET titre = COALESCE(NULLIF(titre_en, ''), titre)
WHERE titre_en IS NOT NULL AND titre_en <> '';

UPDATE offres
SET description = COALESCE(NULLIF(description_en, ''), description)
WHERE description_en IS NOT NULL AND description_en <> '';

UPDATE offres
SET titre = COALESCE(NULLIF(titre_en, ''), titre)
WHERE titre_en IS NOT NULL AND titre_en <> '';