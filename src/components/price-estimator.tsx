"use client";

import { CheckCircle, Minus, Plus, WhatsappLogo } from "@phosphor-icons/react";
import { useState } from "react";
import { WHATSAPP_NUMBER, type Locale } from "@/data/portfolio";

type SiteType = "landing" | "business" | "commerce" | "platform";
type OptionKey = "bilingual" | "motion" | "hosting" | "management";

const BASE_PRICES: Record<SiteType, number> = { landing: 79, business: 149, commerce: 229, platform: 300 };
const INCLUDED_PAGES: Record<SiteType, number> = { landing: 1, business: 4, commerce: 5, platform: 5 };
const EXTRA_PRICES: Record<OptionKey, number> = { bilingual: 30, motion: 25, hosting: 60, management: 60 };

type EstimatorCopy = {
  calculatorTitle: string;
  calculatorIntro: string;
  siteType: string;
  pages: string;
  extras: string;
  oneTime: string;
  annual: string;
  from: string;
  jod: string;
  priceNote: string;
  sendEstimate: string;
  types: Record<SiteType, readonly [string, string]>;
  options: Record<OptionKey, readonly [string, string]>;
};

type EstimateSelection = {
  locale: Locale;
  options: Record<OptionKey, boolean>;
  pages: number;
  siteType: SiteType;
  text: EstimatorCopy;
  totals: { oneTime: number; annual: number };
};

function calculateTotals(siteType: SiteType, pages: number, options: Record<OptionKey, boolean>) {
  const extraPages = Math.max(0, pages - INCLUDED_PAGES[siteType]);
  const oneTime = BASE_PRICES[siteType] + extraPages * 18 + (options.bilingual ? 30 : 0) + (options.motion ? 25 : 0);
  const annual = (options.hosting ? EXTRA_PRICES.hosting : 0) + (options.management ? EXTRA_PRICES.management : 0);
  return { oneTime, annual };
}

function createWhatsAppMessage({ locale, options, pages, siteType, text, totals }: EstimateSelection) {
  const selectedExtras = (Object.keys(options) as OptionKey[])
    .filter((key) => options[key])
    .map((key) => text.options[key][0])
    .join(locale === "ar" ? "، " : ", ");

  return locale === "ar"
    ? `مرحباً إبراهيم، أريد موقعاً من نوع: ${text.types[siteType][0]}. عدد الصفحات: ${pages}. الإضافات: ${selectedExtras || "لا توجد"}. التقدير الظاهر: ${totals.oneTime} د.أ للإنشاء${totals.annual ? ` و${totals.annual} د.أ سنوياً` : ""}. أريد مناقشة المشروع.`
    : `Hi Ibrahim, I’m interested in a ${text.types[siteType][0]}. Pages: ${pages}. Extras: ${selectedExtras || "None"}. Displayed estimate: ${totals.oneTime} JOD to build${totals.annual ? ` and ${totals.annual} JOD annually` : ""}. I’d like to discuss the project.`;
}

export function PriceEstimator({ locale, text }: { locale: Locale; text: EstimatorCopy }) {
  const [siteType, setSiteType] = useState<SiteType>("landing");
  const [pages, setPages] = useState(1);
  const [options, setOptions] = useState<Record<OptionKey, boolean>>({
    bilingual: false,
    motion: false,
    hosting: true,
    management: false,
  });

  const totals = calculateTotals(siteType, pages, options);
  const toggleOption = (key: OptionKey) => setOptions((current) => ({ ...current, [key]: !current[key] }));
  const setBilingual = (enabled: boolean) => setOptions((current) => ({ ...current, bilingual: enabled }));
  const whatsappMessage = createWhatsAppMessage({ locale, options, pages, siteType, text, totals });

  return (
    <section id="pricing" className="estimator-section" aria-labelledby="estimator-heading">
      <div className="estimator-shell">
        <form className="estimator-form" onSubmit={(event) => event.preventDefault()}>
          <header className="estimator-heading">
            <h2 id="estimator-heading">{text.calculatorTitle}</h2>
            <p>{text.from} <strong>79</strong> {text.jod}</p>
          </header>

          <fieldset className="project-type-fieldset">
            <legend>{text.siteType}</legend>
            <div className="segmented-options">
              {(Object.keys(BASE_PRICES) as SiteType[]).map((type) => (
                <label key={type} className={siteType === type ? "is-selected" : ""}>
                  <input type="radio" name="site-type" value={type} checked={siteType === type} onChange={() => setSiteType(type)} />
                  {siteType === type && <CheckCircle aria-hidden="true" weight="fill" />}
                  <span>{text.types[type][0]}</span>
                </label>
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
                <output aria-live="polite">{pages}</output>
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
                <label key={key} className={options[key] ? "is-selected" : ""}>
                  <input type="checkbox" checked={options[key]} onChange={() => toggleOption(key)} />
                  <span>{text.options[key][0]}</span>
                  <b>+{EXTRA_PRICES[key]} {text.jod}</b>
                  <i>{options[key] && <CheckCircle aria-hidden="true" weight="fill" />}</i>
                </label>
              ))}
            </div>
          </fieldset>
        </form>

        <aside className="estimate-summary" aria-live="polite">
          <p>{text.oneTime}</p>
          <div className="price"><strong>{totals.oneTime}</strong><span>{text.jod}</span></div>
          <small>{text.from} {BASE_PRICES[siteType]} {text.jod}</small>
          <div className="annual-price"><span>{text.annual}</span><strong>{totals.annual} {text.jod}</strong></div>
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
