export type SupportedLang = "fr" | "ar" | "en";

const LANGS: readonly SupportedLang[] = ["fr", "ar", "en"];

export function normalizeLang(value: unknown): SupportedLang {
  return LANGS.includes(value as SupportedLang) ? (value as SupportedLang) : "fr";
}

function pick(
  lang: SupportedLang,
  fr: string | null | undefined,
  ar: string | null | undefined,
  en: string | null | undefined,
  fallback: string,
): string {
  const candidates = lang === "ar" ? [ar, fr, en] : lang === "en" ? [en, fr, ar] : [fr, en, ar];
  for (const candidate of candidates) {
    if (candidate) return candidate;
  }
  return fallback;
}

export function localizedTitle(
  lang: SupportedLang,
  row: {
    titre: string;
    titre_fr?: string | null;
    titre_ar?: string | null;
    titre_en?: string | null;
  },
): string {
  return pick(lang, row.titre_fr, row.titre_ar, row.titre_en, row.titre);
}

export function localizedContent(
  lang: SupportedLang,
  row: {
    contenu: string;
    contenu_fr?: string | null;
    contenu_ar?: string | null;
    contenu_en?: string | null;
  },
): string {
  return pick(lang, row.contenu_fr, row.contenu_ar, row.contenu_en, row.contenu);
}

export function localizedDescription(
  lang: SupportedLang,
  row: {
    description?: string | null;
    description_fr?: string | null;
    description_ar?: string | null;
    description_en?: string | null;
  },
): string | null {
  return pick(
    lang,
    row.description_fr,
    row.description_ar,
    row.description_en,
    row.description ?? "",
  ) || null;
}