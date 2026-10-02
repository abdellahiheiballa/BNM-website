import "i18next";
import fr, { products, admin } from "./locales/fr";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "translation";
    resources: {
      translation: typeof fr & { products: typeof products; admin: typeof admin };
    };
    returnNull: false;
  }
}
