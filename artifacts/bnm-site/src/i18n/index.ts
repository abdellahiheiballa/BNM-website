import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ar, { products as productsAr } from "./locales/ar";
import fr, { products as productsFr } from "./locales/fr";

export const supportedLanguages = ["fr", "ar"] as const;
export type SupportedLanguage = (typeof supportedLanguages)[number];

export const languageStorageKey = "bnm-language-v1";

export const resources = {
  fr: { translation: { ...fr, products: productsFr } },
  ar: { translation: { ...ar, products: productsAr } },
} as const;

const getInitialLanguage = (): SupportedLanguage => {
  if (typeof window === "undefined") return "fr";
  const savedLanguage = window.localStorage.getItem(languageStorageKey);
  return savedLanguage === "ar" ? "ar" : "fr";
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
