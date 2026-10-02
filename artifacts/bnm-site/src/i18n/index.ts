import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ar, { products as productsAr, admin as adminAr } from "./locales/ar";
import en, { products as productsEn, admin as adminEn } from "./locales/en";
import fr, { products as productsFr, admin as adminFr } from "./locales/fr";

export const supportedLanguages = ["fr", "ar", "en"] as const;
export type SupportedLanguage = (typeof supportedLanguages)[number];

export type LangCode = "fr" | "ar" | "en";

export const toLangCode = (value: string | undefined | null): LangCode =>
  value === "ar" || value === "en" ? value : "fr";

/**
 * i18next can only infer return/default types for statically known keys.
 * Use this for keys assembled at runtime so `returnObjects` still typechecks.
 */
type DottedKeys<T> = T extends string
  ? never
  : {
      [K in keyof T & string]: T[K] extends string ? K : `${K}.${DottedKeys<T[K]>}`;
    }[keyof T & string];

export type TranslationKey = DottedKeys<(typeof resources)["fr"]["translation"]>;

export const dynamicKey = (key: string) => key as TranslationKey;

/**
 * Same as {@link dynamicKey} but keeps the array shape that `returnObjects`
 * relies on, so translated string lists stay typed as `string[]`.
 */
export const dynamicListKey = (key: string) => key as TranslationKey & string[];

/**
 * Reads a translated string list. `returnObjects` cannot be inferred through a
 * runtime key, so the result is asserted here once instead of at each call site.
 */
type LooseTranslate = (key: never, options?: never) => unknown;

export const translateList = (
  t: LooseTranslate,
  key: string,
  fallback: string[],
): string[] => {
  const value = (t as (k: string, o?: Record<string, unknown>) => unknown)(key, {
    returnObjects: true,
    defaultValue: fallback,
  });
  return Array.isArray(value) ? (value as string[]) : fallback;
};

/** Same as {@link translateList} but for lists of `{ label, value }` objects. */
export const translateStats = (
  t: LooseTranslate,
  key: string,
  fallback: { label: string; value: string }[],
): { label: string; value: string }[] => {
  const value = (t as (k: string, o?: Record<string, unknown>) => unknown)(key, {
    returnObjects: true,
    defaultValue: fallback,
  });
  return Array.isArray(value) ? (value as { label: string; value: string }[]) : fallback;
};

export const languageStorageKey = "bnm-language-v1";

export const resources = {
  fr: { translation: { ...fr, products: productsFr, admin: adminFr } },
  ar: { translation: { ...ar, products: productsAr, admin: adminAr } },
  en: { translation: { ...en, products: productsEn, admin: adminEn } },
} as const;

const getInitialLanguage = (): SupportedLanguage => {
  if (typeof window === "undefined") return "fr";
  const savedLanguage = window.localStorage.getItem(languageStorageKey);
  if (savedLanguage === "ar" || savedLanguage === "en") return savedLanguage;
  return "fr";
};

export const getDir = (lang: SupportedLanguage): "ltr" | "rtl" => {
  return lang === "ar" ? "rtl" : "ltr";
};

export const getCurrentLocale = () => i18n.resolvedLanguage || i18n.language || "fr";

export const formatNumber = (value: number | string | undefined, options?: Intl.NumberFormatOptions) => {
  const numericValue = Number(value ?? 0);
  if (Number.isNaN(numericValue)) {
    return String(value ?? "");
  }
  return new Intl.NumberFormat(`${getCurrentLocale()}-u-nu-latn`, options).format(numericValue);
};

export const formatCurrency = (
  value: number | string | undefined,
  currency = "MRU",
  options?: Intl.NumberFormatOptions,
) => {
  const numericValue = Number(value ?? 0);
  if (Number.isNaN(numericValue)) {
    return String(value ?? "");
  }
  return new Intl.NumberFormat(`${getCurrentLocale()}-u-nu-latn`, {
    style: "currency",
    currency,
    ...options,
  }).format(numericValue);
};

export const formatDate = (value: Date | string, options?: Intl.DateTimeFormatOptions) => {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) {
    return String(value);
  }
  return new Intl.DateTimeFormat(getCurrentLocale(), options).format(date);
};

export const formatPercent = (value: number | string | undefined, digits = 2) => {
  const numericValue = Number(value ?? 0);
  if (Number.isNaN(numericValue)) {
    return String(value ?? "");
  }
  return new Intl.NumberFormat(`${getCurrentLocale()}-u-nu-latn`, {
    style: "percent",
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(numericValue / 100);
};

export const pluralize = (count: number, singular: string, plural: string) =>
  count === 1 ? singular : plural;

void i18n.use(initReactI18next).init({
  resources,
  supportedLngs: [...supportedLanguages],
  lng: getInitialLanguage(),
  fallbackLng: "fr",
  interpolation: { escapeValue: false },
  returnNull: false,
  missingKeyHandler: (lng, ns, key) => {
    if (import.meta.env.DEV) {
      console.warn(`[i18n] Missing translation for ${lng}/${ns}: ${key}`);
    }
  },
});

export default i18n;
