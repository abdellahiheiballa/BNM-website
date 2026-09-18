# BNM Website i18n TODO

**Languages:** French (`fr`) and Arabic (`ar`)  
**Default language:** French  
**Direction:** French `ltr`, Arabic `rtl`  
**Scope:** Public website, admin area, API-driven content, validation messages, metadata, and shared layout

## Definition of done

- [ ] Every visible user-facing string is translated in French and Arabic.
- [ ] Language selection persists across refreshes and navigation.
- [ ] Arabic switches the document direction to `rtl`; French switches it to `ltr`.
- [ ] Layouts, tables, forms, maps, charts, icons, drawers, dialogs, and pagination work in both directions.
- [ ] Dates, numbers, currencies, pluralization, validation messages, loading states, empty states, and API errors use the active locale.
- [ ] Dynamic article and offer content has a defined translation policy: translated fields, fallback language, or explicitly marked untranslated content.
- [ ] Browser title, description, Open Graph metadata, accessible labels, and image alt text are localized.
- [ ] Automated tests cover language switching, persistence, RTL, route navigation, and representative forms.
- [ ] French and Arabic builds pass typecheck and production build.

## Foundation and architecture

- [x] Choose and lock `i18next` + `react-i18next` as the frontend i18n library.
- [x] Create `src/i18n/` with French and Arabic locale resources.
- [x] Create translation namespaces: `common`, `navigation`, `home`, `products`, `news`, `forms`, `contact`, `agencies`, `simulator`, `admin`, `errors`, `accessibility`, and `metadata`.
- [x] Add typed i18next resource declarations so translation keys are checked during development.
- [x] Add `I18nextProvider` and locale synchronization at the application root.
- [x] Detect the saved language and default to French when no Arabic preference exists.
- [x] Persist the active language in `localStorage` using the versioned `bnm-language-v1` key.
- [x] Update `<html lang>` and `<html dir>` whenever the language changes.
- [x] Add an accessible desktop language switcher with `Français` and `العربية`, current-state indication, and keyboard support.
- [x] Ensure language changes do not reset form state or lose the current route.
- [x] Add locale helpers for `Intl.NumberFormat`, `Intl.DateTimeFormat`, currency, and pluralization.
- [x] Define Arabic font and typography requirements; verify Arabic glyph coverage and line height.
- [x] Define fallback behavior for missing translations and log missing keys in development.
- [ ] Add translation review ownership and a glossary for BNM, banking, Islamic finance, legal, and product terms.

## Shared layout and site-wide elements

### Header: `src/components/layout/Header.tsx`

- [x] Translate primary navigation: individuals, professionals, businesses, Islamic finance.
- [x] Translate secondary navigation: about, news, agencies, simulators, contact, become a client.
- [x] Translate the search accessible label.
- [x] Translate Click by BNM label and external-link accessibility text.
- [x] Translate the bank tagline.
- [x] Translate mobile menu labels and add mobile language controls.
- [x] Mirror menu alignment, spacing, icons, and active states in RTL.
- [x] Localize language switcher labels and selected state.

### Footer: `src/components/layout/Footer.tsx`

- [x] Translate bank description, quick links, contact heading, newsletter heading, and footer link labels.
- [x] Translate newsletter placeholder, submit button, loading state, success toast, and error toast.
- [x] Add localized accessible labels to social media links.
- [x] Localize the bank tagline, footer description, and copyright text.
- [ ] Add or implement routes for legal notices, privacy policy, and pricing before exposing translated links.

### Global behavior and UI

- [ ] Translate shared buttons, dialogs, tooltips, tabs, pagination, skeleton/empty/error states, and toast messages.
- [ ] Translate all `aria-label`, `sr-only`, `title`, `placeholder`, and `alt` values.
- [ ] Remove hardcoded French strings from shared UI components and hooks.
- [ ] Verify API/network errors do not expose untranslated technical messages.
- [ ] Verify RTL with keyboard navigation, focus rings, scrollbars, and responsive breakpoints.

## Public pages

### Home: `src/pages/Home.tsx`

- [x] Translate hero title, supporting copy, and CTA labels.
- [x] Translate statistics labels and locale-aware number formatting.
- [x] Translate solutions section, product audience cards, descriptions, and CTA labels.
- [x] Translate Click by BNM section, benefits, and external link text.
- [x] Translate Islamic finance banner text and simulator CTA.
- [x] Translate news headings, dates, categories, and all-news links.
- [ ] Define translation/fallback behavior for dynamic offer and news content.
- [ ] Verify Arabic hero line wrapping and card order.

### Individuals: `src/pages/Particuliers.tsx`

- [x] Translate the Individuals hero, section navigation, tabs, and CTA labels.
- [ ] Translate every account, card, savings, loan, and insurance offer title and description.
- [ ] Translate advantages, required documents, stats labels, fees, limits, and units.
- [ ] Localize MRU, EUR, percentages, days, and plural forms.
- [x] Translate the Individuals empty state and contact/simulator CTAs.
- [ ] Verify accordions/cards and directional icons in RTL.

### Professionals: `src/pages/Professionnels.tsx`

- [x] Translate the Professionals hero, section navigation, tabs, quick services, offer shell, and CTA.
- [ ] Translate offer descriptions, advantages, required documents, fees, limits, and CTAs.
- [ ] Localize banking terminology consistently with the glossary.
- [ ] Verify dynamic offers and fallback text in both languages.

### Businesses: `src/pages/Entreprises.tsx`

- [x] Translate the Businesses hero, section navigation, tabs, help CTA, corporate section, and Trade Finance shell.
- [ ] Translate treasury, investment, international, guarantees, transfers, and documentary-credit terminology.
- [ ] Translate documents, contact-advisor CTAs, loading, empty, and error states.
- [ ] Verify long Arabic labels in tables/cards and mobile layouts.

### Islamic finance: `src/pages/FinanceIslamique.tsx`

- [x] Translate page introduction, product-card fallback, and empty state.
- [x] Translate Sharia committee content and financing terminology.
- [x] Translate financing estimator panel and simulator CTA.
- [ ] Preserve approved Arabic religious/financial terminology and review it with the subject owner.

### News list: `src/pages/Actualites.tsx`

- [x] Translate page title, category filters, `all` label, read-more CTA, and empty state.
- [x] Localize publication dates and category fallback labels.
- [ ] Define article-content language fields and fallback behavior.
- [ ] Translate loading and request-error states.

### News detail: `src/pages/ActualiteDetail.tsx`

- [x] Translate back link, share label, category fallback, and missing-article state.
- [x] Localize publication date and article navigation.
- [ ] Support French and Arabic article title/body/content fields.

### New article page: `src/pages/ActualiteNew.tsx`

- [ ] Translate admin/editor headings, field labels, placeholders, validation, upload states, and buttons.
- [ ] Define whether an article requires both French and Arabic fields before publication.
- [ ] Translate success/error toasts and unsaved-change warnings.

### Become a client: `src/pages/DevenirClient.tsx`

- [ ] Translate onboarding title, introduction, required documents, accepted formats, and file-size limits.
- [ ] Translate every form label, placeholder, helper text, validation message, upload state, and submit button.
- [ ] Translate success and error alerts.
- [ ] Verify Arabic input direction and filename rendering.
- [ ] Confirm uploaded customer data remains language-neutral and correctly stored.

### Contact: `src/pages/Contact.tsx`

- [ ] Translate title, contact details, form labels, placeholders, helper text, validation, and CTA.
- [ ] Translate success, error, loading, and confirmation messages.
- [ ] Localize phone/address/email presentation without changing stored values.

### About: `src/pages/APropos.tsx`

- [ ] Translate history, mission, values, governance, figures, and CTA content.
- [ ] Localize dates, numbers, image alt text, and headings.
- [ ] Review official Arabic wording with communications/legal owners.

### Simulators: `src/pages/Simulateur.tsx`

- [ ] Translate simulator title, description, tabs, labels, helper text, and buttons.
- [ ] Translate classic-credit and Murabaha fields, results, schedules, and warnings.
- [ ] Localize MRU amounts, percentages, dates, months, years, and number grouping.
- [ ] Translate validation and calculation errors.
- [ ] Verify sliders, plus/minus controls, tables, and chart labels in RTL.

### Agencies: `src/pages/Agences.tsx`

- [ ] Translate search field, filters, map/list tabs, labels, result counts, and empty state.
- [ ] Localize agency addresses, opening information, phone labels, and directions.
- [ ] Translate map controls and attribution where legally permitted.
- [ ] Decide whether agency names/data are bilingual in the API.
- [ ] Verify RTL list/map layout and marker popovers.

### Not found: `src/pages/not-found.tsx`

- [x] Translate 404 heading, explanation, and return-home CTA.
- [x] Verify localized document title and direction.

## Admin pages

### Admin login: `src/pages/AdminLogin.tsx`

- [ ] Translate title, username/email and password labels, placeholders, submit button, loading state, and errors.
- [ ] Translate authentication failure, session expiry, and logout messages.
- [ ] Verify Arabic password/email fields remain `ltr` where appropriate.

### Admin dashboard: `src/pages/AdminDashboard.tsx`

- [ ] Translate dashboard title, return link, statistics labels, logout, tables, actions, and empty states.
- [ ] Translate delete confirmations and success/error toasts.
- [ ] Translate news and offer management headings, columns, and buttons.
- [ ] Localize dates and numbers.
- [ ] Verify RTL tables, action ordering, and confirmation dialogs.

### Admin article editor: `src/pages/AdminActualiteEdit.tsx`

- [ ] Translate editor headings, title/category/content fields, media upload, preview, validation, save, cancel, and delete actions.
- [ ] Add a defined bilingual editing workflow for French and Arabic content.
- [ ] Translate API errors and success toasts.
- [ ] Support RTL content editing and direction-aware preview.

### Admin offer editor: `src/pages/AdminOffreEdit.tsx`

- [ ] Translate offer fields, categories, descriptions, pricing/limits, validation, save, cancel, and status controls.
- [ ] Add French and Arabic product fields or the approved fallback policy.
- [ ] Translate API errors and success toasts.
- [ ] Verify numbers, currency, percentages, and RTL preview.

## API, database, and content model

- [ ] Inventory all API response fields containing user-facing text.
- [ ] Decide whether translations are stored as `titleFr/titleAr`, structured locale objects, or separate translation records.
- [ ] Add schema validation for localized content and fallback behavior.
- [ ] Update OpenAPI/Zod types for bilingual article, offer, agency, and form content.
- [ ] Update admin create/update endpoints to accept and validate both locales.
- [ ] Seed existing content with reviewed Arabic translations or an explicit French fallback marker.
- [ ] Keep codes, identifiers, URLs, email addresses, and database enum values language-neutral.
- [ ] Add API tests for missing locale, fallback locale, and invalid localized payloads.

## QA and release

- [ ] Test every route in French at desktop, tablet, and mobile widths.
- [ ] Test every route in Arabic at desktop, tablet, and mobile widths.
- [ ] Test direct navigation, refresh, back/forward, protected admin routes, and deep links.
- [ ] Test language persistence after refresh and logout/login.
- [ ] Test forms, uploads, validation, toasts, dialogs, maps, tables, sliders, and API errors in both locales.
- [ ] Check screenshots for overflow, clipped Arabic text, incorrect alignment, and mirrored icons.
- [ ] Run accessibility checks for language, direction, labels, focus order, and contrast.
- [ ] Run frontend typecheck and production build for both locale configurations.
- [ ] Add automated tests for translation key completeness between `fr` and `ar`.
- [ ] Have BNM communications/legal/product owners approve French and Arabic wording.
- [ ] Update deployment, support, analytics, SEO, and content-entry documentation.
- [ ] Release to pre-production, obtain sign-off, then enable Arabic in production.
