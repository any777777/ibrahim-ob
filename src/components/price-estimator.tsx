"use client";

import { Check, MessageCircle } from "lucide-react";
import { useMemo, useState } from "react";
import { WHATSAPP_NUMBER, type Locale } from "@/data/portfolio";

type SiteType = "landing" | "business" | "commerce" | "platform";
type OptionKey = "bilingual" | "motion" | "hosting" | "management";

const BASE_PRICES: Record<SiteType, number> = {
  landing: 79,
  business: 149,
  commerce: 229,
  platform: 300,
};

const INCLUDED_PAGES: Record<SiteType, number> = {
  landing: 1,
  business: 4,
  commerce: 5,
  platform: 5,
};

const EXTRA_PRICES: Record<OptionKey, number> = {
  bilingual: 30,
  motion: 25,
  hosting: 60,
  management: 60,
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
  jod: string;
  priceNote: string;
  sendEstimate: string;
  types: Record<SiteType, readonly [string, string]>;
  options: Record<OptionKey, readonly [string, string]>;
};

export function PriceEstimator({ locale, text }: { locale: Locale; text: EstimatorCopy }) {
  const [siteType, setSiteType] = useState<SiteType>("landing");
  const [pages, setPages] = useState(1);
  const [options, setOptions] = useState<Record<OptionKey, boolean>>({
    bilingual: false,
    motion: false,
    hosting: true,
    management: false,
  });

  const totals = useMemo(() => {
    const extraPages = Math.max(0, pages - INCLUDED_PAGES[siteType]);
    const oneTime = BASE_PRICES[siteType] + extraPages * 18 + (options.bilingual ? 30 : 0) + (options.motion ? 25 : 0);
    const annual = (options.hosting ? EXTRA_PRICES.hosting : 0) + (options.management ? EXTRA_PRICES.management : 0);
    return { oneTime, annual };
  }, [options, pages, siteType]);

  const toggleOption = (key: OptionKey) => setOptions((current) => ({ ...current, [key]: !current[key] }));

  const whatsappMessage = useMemo(() => {
    const selectedExtras = (Object.keys(options) as OptionKey[])
      .filter((key) => options[key])
      .map((key) => text.options[key][0])
      .join(locale === "ar" ? "، " : ", ");

    return locale === "ar"
      ? `مرحباً إبراهيم، أريد موقعاً من نوع: ${text.types[siteType][0]}. عدد الصفحات: ${pages}. الإضافات: ${selectedExtras || "لا توجد"}. التقدير الظاهر: ${totals.oneTime} د.أ للإنشاء${totals.annual ? ` و${totals.annual} د.أ سنوياً` : ""}. أريد مناقشة المشروع.`
      : `Hi Ibrahim, I’m interested in a ${text.types[siteType][0]}. Pages: ${pages}. Extras: ${selectedExtras || "None"}. Displayed estimate: ${totals.oneTime} JOD to build${totals.annual ? ` and ${totals.annual} JOD annually` : ""}. I’d like to discuss the project.`;
  }, [locale, options, pages, siteType, text, totals]);

  return (
    <section id="pricing" className="estimator-section" aria-labelledby="estimator-heading">
      <div className="estimator-intro">
        <h2 id="estimator-heading">{text.calculatorTitle}</h2>
        <p>{text.calculatorIntro}</p>
      </div>

      <div className="estimator-shell">
        <form className="estimator-form" onSubmit={(event) => event.preventDefault()}>
          <fieldset>
            <legend>{text.siteType}</legend>
            <div className="site-type-options">
              {(Object.keys(BASE_PRICES) as SiteType[]).map((type) => (
                <label key={type} className={siteType === type ? "is-selected" : ""}>
                  <input type="radio" name="site-type" value={type} checked={siteType === type} onChange={() => setSiteType(type)} />
                  <span className="option-check"><Check aria-hidden="true" /></span>
                  <strong>{text.types[type][0]}</strong>
                  <small>{text.types[type][1]}</small>
                  <b>{text.from} {BASE_PRICES[type]} {text.jod}</b>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="pages-fieldset">
            <div className="range-heading">
              <legend>{text.pages}</legend>
              <output htmlFor="page-count">{pages}</output>
            </div>
            <input
              id="page-count"
              type="range"
              min="1"
              max="12"
              value={pages}
              onChange={(event) => setPages(Number(event.target.value))}
              style={{ "--range-progress": `${((pages - 1) / 11) * 100}%` } as React.CSSProperties}
            />
            <div className="range-edges"><span>1</span><span>12</span></div>
          </fieldset>

          <fieldset>
            <legend>{text.extras}</legend>
            <div className="extra-options">
              {(Object.keys(EXTRA_PRICES) as OptionKey[]).map((key) => (
                <label key={key} className={options[key] ? "is-selected" : ""}>
                  <input type="checkbox" checked={options[key]} onChange={() => toggleOption(key)} />
                  <span className="toggle" aria-hidden="true"><i /></span>
                  <span><strong>{text.options[key][0]}</strong><small>{text.options[key][1]}</small></span>
                  <b>+{EXTRA_PRICES[key]} {text.jod}{key === "hosting" || key === "management" ? ` / ${locale === "ar" ? "سنة" : "year"}` : ""}</b>
                </label>
              ))}
            </div>
          </fieldset>
        </form>

        <aside className="estimate-summary" aria-live="polite">
          <p>{text.oneTime}</p>
          <div className="price"><strong>{totals.oneTime}</strong><span>{text.jod}</span></div>
          <div className="annual-price">
            <span>{text.annual}</span>
            <strong>{totals.annual} {text.jod}</strong>
          </div>
          <p className="price-note">{text.priceNote}</p>
          <a
            className="button button--accent estimate-cta"
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle aria-hidden="true" />
            {text.sendEstimate}
          </a>
        </aside>
      </div>
    </section>
  );
}

