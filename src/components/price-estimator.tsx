"use client";

import { CheckCircle, Minus, Plus, WhatsappLogo } from "@phosphor-icons/react";
import { useState } from "react";
import { WHATSAPP_NUMBER, type Locale } from "@/data/portfolio";

type SiteType = "landing" | "business" | "commerce" | "platform";
type OptionKey = "bilingual" | "motion" | "hosting" | "management";
type CurrencyCode = "JOD" | "SAR" | "AED" | "QAR" | "USD";

const INCLUDED_PAGES: Record<SiteType, number> = { landing: 1, business: 4, commerce: 5, platform: 5 };
const SITE_TYPES: SiteType[] = ["landing", "business", "commerce", "platform"];
const CURRENCY_CODES: CurrencyCode[] = ["JOD", "SAR", "AED", "QAR", "USD"];
const PRICE_FORMATTER = new Intl.NumberFormat("en-US");

type CurrencyPricing = {
  labels: Record<Locale, string>;
  selectorLabels: Record<Locale, string>;
  landingPages: readonly [number, number, number, number];
  sitePrices: Record<Exclude<SiteType, "landing">, number>;
  extraPage: number;
  extras: Record<OptionKey, number>;
  complexHosting: number;
};

const PRICING: Record<CurrencyCode, CurrencyPricing> = {
  JOD: {
    labels: { ar: "دينار", en: "JOD" },
    selectorLabels: { ar: "دينار أردني", en: "Jordanian dinar" },
    landingPages: [69, 79, 109, 149],
    sitePrices: { business: 149, commerce: 299, platform: 560 },
    extraPage: 18,
    extras: { bilingual: 30, motion: 25, hosting: 60, management: 60 },
    complexHosting: 80,
  },
  SAR: {
    labels: { ar: "ريال سعودي", en: "SAR" },
    selectorLabels: { ar: "ريال سعودي", en: "Saudi riyal" },
    landingPages: [249, 299, 449, 599],
    sitePrices: { business: 599, commerce: 1199, platform: 2199 },
    extraPage: 79,
    extras: { bilingual: 129, motion: 99, hosting: 249, management: 249 },
    complexHosting: 349,
  },
  AED: {
    labels: { ar: "درهم إماراتي", en: "AED" },
    selectorLabels: { ar: "درهم إماراتي", en: "UAE dirham" },
    landingPages: [249, 299, 449, 599],
    sitePrices: { business: 599, commerce: 1099, platform: 1999 },
    extraPage: 79,
    extras: { bilingual: 129, motion: 99, hosting: 249, management: 249 },
    complexHosting: 349,
  },
  QAR: {
    labels: { ar: "ريال قطري", en: "QAR" },
    selectorLabels: { ar: "ريال قطري", en: "Qatari riyal" },
    landingPages: [249, 299, 449, 599],
    sitePrices: { business: 599, commerce: 1199, platform: 2199 },
    extraPage: 79,
    extras: { bilingual: 129, motion: 99, hosting: 249, management: 249 },
    complexHosting: 349,
  },
  USD: {
    labels: { ar: "دولار", en: "USD" },
    selectorLabels: { ar: "دولار أمريكي", en: "US dollar" },
    landingPages: [79, 99, 149, 199],
    sitePrices: { business: 199, commerce: 399, platform: 799 },
    extraPage: 29,
    extras: { bilingual: 49, motion: 39, hosting: 99, management: 99 },
    complexHosting: 129,
  },
};

type EstimatorCopy = {
  calculatorTitle: string;
  calculatorIntro: string;
  siteType: string;
  pages: string;
  extras: string;
  oneTime: string;
  annual: string;
  from: string;
  priceNote: string;
  sendEstimate: string;
  types: Record<SiteType, readonly [string, string]>;
  options: Record<OptionKey, readonly [string, string]>;
};

type EstimateSelection = {
  currency: CurrencyCode;
  currencyLabel: string;
  locale: Locale;
  options: Record<OptionKey, boolean>;
  pages: number;
  siteType: SiteType;
  text: EstimatorCopy;
  totals: { oneTime: number; annual: number };
};

function MoneyAmount({ currency, emphasized = false, locale, value }: { currency: string; emphasized?: boolean; locale: Locale; value: number | string }) {
  return (
    <bdi className={`money-inline ${locale === "ar" ? "money-inline--ar" : ""}`} dir="ltr">
      {emphasized ? <strong className="money-value">{value}</strong> : <span className="money-value">{value}</span>}
      <span className="money-unit">{currency}</span>
    </bdi>
  );
}

function isComplexSite(siteType: SiteType) {
  return siteType === "commerce" || siteType === "platform";
}

function formatPrice(price: number) {
  return PRICE_FORMATTER.format(price);
}

function getStartingPrice(pricing: CurrencyPricing, siteType: SiteType) {
  return siteType === "landing" ? pricing.landingPages[0] : pricing.sitePrices[siteType];
}

function getOptionPrice(pricing: CurrencyPricing, siteType: SiteType, option: OptionKey) {
  if (!isComplexSite(siteType)) return pricing.extras[option];
  if (option === "hosting") return pricing.complexHosting;
  if (option === "bilingual" || option === "management") return pricing.extras[option] * 2;
  return pricing.extras[option];
}

function getSitePrice(pricing: CurrencyPricing, siteType: SiteType, pages: number) {
  if (siteType === "landing") {
    if (pages <= pricing.landingPages.length) return pricing.landingPages[pages - 1];
    return pricing.landingPages[3] + (pages - pricing.landingPages.length) * pricing.extraPage;
  }

  const extraPages = Math.max(0, pages - INCLUDED_PAGES[siteType]);
  const extraPagePrice = pricing.extraPage * (isComplexSite(siteType) ? 2 : 1);
  return pricing.sitePrices[siteType] + extraPages * extraPagePrice;
}

function calculateTotals(pricing: CurrencyPricing, siteType: SiteType, pages: number, options: Record<OptionKey, boolean>) {
  const oneTime = getSitePrice(pricing, siteType, pages)
    + (options.bilingual ? getOptionPrice(pricing, siteType, "bilingual") : 0)
    + (options.motion ? getOptionPrice(pricing, siteType, "motion") : 0);
  const annual = (options.hosting ? getOptionPrice(pricing, siteType, "hosting") : 0)
    + (options.management ? getOptionPrice(pricing, siteType, "management") : 0);
  return { oneTime, annual };
}

function createWhatsAppMessage({ currency, currencyLabel, locale, options, pages, siteType, text, totals }: EstimateSelection) {
  const selectedExtras = (Object.keys(options) as OptionKey[])
    .filter((key) => options[key])
    .map((key) => text.options[key][0])
    .join(locale === "ar" ? "، " : ", ");

  return locale === "ar"
    ? `مرحباً إبراهيم، أريد موقعاً من نوع: ${text.types[siteType][0]}. عدد الصفحات: ${pages}. العملة: ${currencyLabel}. الإضافات: ${selectedExtras || "لا توجد"}. التقدير الظاهر: ${totals.oneTime} ${currencyLabel} للإنشاء${totals.annual ? ` و${totals.annual} ${currencyLabel} سنوياً` : ""}. أريد مناقشة المشروع.`
    : `Hi Ibrahim, I’m interested in a ${text.types[siteType][0]}. Pages: ${pages}. Currency: ${currency}. Extras: ${selectedExtras || "None"}. Displayed estimate: ${totals.oneTime} ${currency} to build${totals.annual ? ` and ${totals.annual} ${currency} annually` : ""}. I’d like to discuss the project.`;
}

export function PriceEstimator({ locale, text }: { locale: Locale; text: EstimatorCopy }) {
  const [siteType, setSiteType] = useState<SiteType>("landing");
  const [currency, setCurrency] = useState<CurrencyCode>("JOD");
  const [pages, setPages] = useState(1);
  const [options, setOptions] = useState<Record<OptionKey, boolean>>({
    bilingual: false,
    motion: false,
    hosting: true,
    management: false,
  });

  const pricing = PRICING[currency];
  const totals = calculateTotals(pricing, siteType, pages, options);
  const currencyLabel = pricing.labels[locale];
  const toggleOption = (key: OptionKey) => setOptions((current) => {
    if (key === "hosting" && current.management) return current;
    if (key === "management") {
      const management = !current.management;
      return { ...current, hosting: management ? true : current.hosting, management };
    }
    return { ...current, [key]: !current[key] };
  });
  const setBilingual = (enabled: boolean) => setOptions((current) => ({ ...current, bilingual: enabled }));
  const whatsappMessage = createWhatsAppMessage({ currency, currencyLabel, locale, options, pages, siteType, text, totals });

  return (
    <section id="pricing" className="estimator-section" aria-labelledby="estimator-heading">
      <div className="estimator-shell">
        <form className="estimator-form" onSubmit={(event) => event.preventDefault()}>
          <header className="estimator-heading">
            <h2 id="estimator-heading">{text.calculatorTitle}</h2>
            <p>{text.from}{" "}<MoneyAmount currency={currencyLabel} emphasized locale={locale} value={formatPrice(pricing.landingPages[0])} /></p>
          </header>

          <fieldset className="project-type-fieldset">
            <legend>{text.siteType}</legend>
            <div className="segmented-options">
              {SITE_TYPES.map((type) => (
                <label key={type} className={siteType === type ? "is-selected" : ""}>
                  <input type="radio" name="site-type" value={type} checked={siteType === type} onChange={() => setSiteType(type)} />
                  {siteType === type && <CheckCircle aria-hidden="true" weight="fill" />}
                  <span>{text.types[type][0]}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="currency-fieldset">
            <legend>{locale === "ar" ? "العملة" : "Currency"}</legend>
            <div className="currency-options">
              {CURRENCY_CODES.map((code) => (
                <button
                  key={code}
                  type="button"
                  className={currency === code ? "is-selected" : ""}
                  onClick={() => setCurrency(code)}
                  aria-pressed={currency === code}
                  aria-label={PRICING[code].selectorLabels[locale]}
                  title={PRICING[code].selectorLabels[locale]}
                >
                  {currency === code && <CheckCircle aria-hidden="true" weight="fill" />}
                  <bdi dir="ltr">{code}</bdi>
                </button>
              ))}
            </div>
          </fieldset>

          <div className="estimator-fields">
            <fieldset className="page-stepper-fieldset">
              <legend>{text.pages}</legend>
              <div className="page-stepper">
                <button type="button" onClick={() => setPages((current) => Math.max(1, current - 1))} aria-label={locale === "ar" ? "تقليل الصفحات" : "Decrease pages"}>
                  <Minus aria-hidden="true" weight="light" />
                </button>
                <output aria-live="polite"><bdi dir="ltr">{pages}</bdi></output>
                <button type="button" onClick={() => setPages((current) => Math.min(12, current + 1))} aria-label={locale === "ar" ? "زيادة الصفحات" : "Increase pages"}>
                  <Plus aria-hidden="true" weight="light" />
                </button>
              </div>
            </fieldset>

            <fieldset className="language-fieldset">
              <legend>{locale === "ar" ? "اللغات" : "Languages"}</legend>
              <div className="binary-options">
                <button type="button" className={!options.bilingual ? "is-selected" : ""} onClick={() => setBilingual(false)}>
                  {!options.bilingual && <CheckCircle aria-hidden="true" weight="fill" />}
                  {locale === "ar" ? "عربي" : "Arabic"}
                </button>
                <button type="button" className={options.bilingual ? "is-selected" : ""} onClick={() => setBilingual(true)}>
                  {options.bilingual && <CheckCircle aria-hidden="true" weight="fill" />}
                  {locale === "ar" ? "عربي + English" : "Arabic + English"}
                </button>
              </div>
            </fieldset>
          </div>

          <fieldset className="compact-extras-fieldset">
            <legend>{text.extras}</legend>
            <div className="compact-extras">
              {(["motion", "hosting", "management"] as OptionKey[]).map((key) => (
                <label
                  key={key}
                  className={`${options[key] ? "is-selected" : ""} ${key === "hosting" && options.management ? "is-required" : ""}`.trim()}
                  title={key === "hosting" && options.management ? (locale === "ar" ? "مشمولة تلقائياً مع الإدارة الكاملة" : "Automatically included with full management") : undefined}
                >
                  <input type="checkbox" checked={options[key]} disabled={key === "hosting" && options.management} onChange={() => toggleOption(key)} />
                  <span>{text.options[key][0]}</span>
                  <b><MoneyAmount currency={currencyLabel} locale={locale} value={`+${formatPrice(getOptionPrice(pricing, siteType, key))}`} /></b>
                  <i>{options[key] && <CheckCircle aria-hidden="true" weight="fill" />}</i>
                </label>
              ))}
            </div>
          </fieldset>
        </form>

        <aside className="estimate-summary" aria-live="polite">
          <p>{text.oneTime}</p>
          <div className="price"><MoneyAmount currency={currencyLabel} emphasized locale={locale} value={formatPrice(totals.oneTime)} /></div>
          <small>{text.from}{" "}<MoneyAmount currency={currencyLabel} locale={locale} value={formatPrice(getStartingPrice(pricing, siteType))} /></small>
          <div className="annual-price"><span>{text.annual}</span><strong><MoneyAmount currency={currencyLabel} locale={locale} value={formatPrice(totals.annual)} /></strong></div>
          <p className="price-note">{text.priceNote}</p>
          <a className="estimate-cta" href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`} target="_blank" rel="noreferrer">
            <WhatsappLogo aria-hidden="true" weight="regular" />
            {text.sendEstimate}
          </a>
        </aside>
      </div>
    </section>
  );
}
