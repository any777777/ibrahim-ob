"use client";

import {
  ArrowDownLeft,
  ArrowDownRight,
  ArrowUpLeft,
  ArrowUpRight,
  ChevronDown,
  Globe2,
  Headphones,
  MessageCircle,
  PenTool,
  Settings2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { copy, PHONE_DISPLAY, WHATSAPP_NUMBER, type Locale } from "@/data/portfolio";
import { PriceEstimator } from "@/components/price-estimator";
import { ProjectShowcase } from "@/components/project-showcase";

const serviceIcons = [PenTool, Globe2, Settings2, Headphones];

export function PortfolioPage() {
  const [locale, setLocale] = useState<Locale>("ar");
  const text = copy[locale];
  const isArabic = locale === "ar";
  const DownArrow = isArabic ? ArrowDownLeft : ArrowDownRight;
  const UpArrow = isArabic ? ArrowUpLeft : ArrowUpRight;

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
  }, [isArabic, locale]);

  const defaultMessage = encodeURIComponent(
    isArabic
      ? "مرحباً إبراهيم، لدي فكرة لموقع إلكتروني وأريد مناقشتها معك."
      : "Hi Ibrahim, I have a website idea and would like to discuss it with you.",
  );

  return (
    <div className="portfolio-page" dir={isArabic ? "rtl" : "ltr"}>
      <a href="#main-content" className="skip-link">{isArabic ? "انتقل إلى المحتوى" : "Skip to content"}</a>

      <header className="site-header">
        <a href="#top" className="brand" aria-label={isArabic ? "إبراهيم عبيدات، الرئيسية" : "Ibrahim Obaidat, home"}>
          <span>إبراهيم عبيدات</span>
          <small>Ibrahim Obaidat</small>
        </a>

        <nav aria-label={isArabic ? "التنقل الرئيسي" : "Primary navigation"}>
          <a href="#work">{text.nav.work}</a>
          <a href="#services">{text.nav.services}</a>
          <a href="#pricing">{text.nav.pricing}</a>
          <a href="#about">{text.nav.about}</a>
        </nav>

        <div className="header-actions">
          <button
            type="button"
            className="language-toggle"
            onClick={() => setLocale(isArabic ? "en" : "ar")}
            aria-label={isArabic ? "Switch to English" : "التبديل إلى العربية"}
          >
            <span className={isArabic ? "is-active" : ""}>ع</span>
            <i />
            <span className={!isArabic ? "is-active" : ""}>EN</span>
          </button>
          <a className="header-whatsapp" href={`https://wa.me/${WHATSAPP_NUMBER}?text=${defaultMessage}`} target="_blank" rel="noreferrer">
            <MessageCircle aria-hidden="true" />
            <span>{text.whatsapp}</span>
          </a>
        </div>
      </header>

      <main id="main-content">
        <section id="top" className="hero-section" aria-labelledby="hero-heading">
          <div className="hero-copy">
            <p className="availability"><span />{text.availability}</p>
            <h1 id="hero-heading">{text.heroTitle}</h1>
            <p className="hero-lead">{text.heroBody}</p>
            <div className="hero-actions">
              <a className="button button--accent" href={`https://wa.me/${WHATSAPP_NUMBER}?text=${defaultMessage}`} target="_blank" rel="noreferrer">
                <MessageCircle aria-hidden="true" />
                {text.whatsapp}
              </a>
              <a className="button button--quiet" href="#work">
                {text.seeWork}
                <DownArrow aria-hidden="true" />
              </a>
            </div>
          </div>

          <ProjectShowcase
            locale={locale}
            labels={{
              selectedWork: text.selectedWork,
              browseHint: text.browseHint,
              visitProject: text.visitProject,
              nextProject: text.nextProject,
              previousProject: text.previousProject,
            }}
          />

          <a href="#services" className="scroll-cue" aria-label={text.nav.services}>
            <span>{isArabic ? "مرر لتعرف كيف أعمل" : "Scroll to see how it works"}</span>
            <ChevronDown aria-hidden="true" />
          </a>
        </section>

        <section id="services" className="service-section" aria-labelledby="service-heading">
          <div className="section-intro">
            <h2 id="service-heading">{text.serviceTitle}</h2>
            <p>{text.serviceBody}</p>
          </div>

          <div className="service-list">
            {text.services.map(([title, description], index) => {
              const Icon = serviceIcons[index];
              return (
                <article key={title}>
                  <Icon aria-hidden="true" />
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="process-section" aria-labelledby="process-heading">
          <div className="process-intro">
            <h2 id="process-heading">{text.processTitle}</h2>
            <p>{text.processBody}</p>
          </div>
          <ol className="process-list">
            {text.process.map(([title, description], index) => (
              <li key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div><h3>{title}</h3><p>{description}</p></div>
              </li>
            ))}
          </ol>
        </section>

        <PriceEstimator locale={locale} text={text} />

        <section id="about" className="about-section" aria-labelledby="about-heading">
          <div className="about-mark" aria-hidden="true">إ</div>
          <div>
            <h2 id="about-heading">{text.aboutTitle}</h2>
            <p>{text.aboutBody}</p>
          </div>
          <dl>
            <div><dt>{isArabic ? "الموقع" : "Based in"}</dt><dd>{isArabic ? "الأردن" : "Jordan"}</dd></div>
            <div><dt>{isArabic ? "التواصل" : "Direct line"}</dt><dd><a href={`tel:+${WHATSAPP_NUMBER}`}>{PHONE_DISPLAY}</a></dd></div>
            <div><dt>{isArabic ? "اللغات" : "Languages"}</dt><dd>{isArabic ? "العربية والإنجليزية" : "Arabic & English"}</dd></div>
          </dl>
        </section>

        <section className="final-cta" aria-labelledby="final-heading">
          <div>
            <h2 id="final-heading">{text.finalTitle}</h2>
            <p>{text.finalBody}</p>
          </div>
          <a className="button button--light" href={`https://wa.me/${WHATSAPP_NUMBER}?text=${defaultMessage}`} target="_blank" rel="noreferrer">
            <MessageCircle aria-hidden="true" />
            {text.whatsapp}
            <UpArrow aria-hidden="true" />
          </a>
        </section>
      </main>

      <footer>
        <a href="#top" className="footer-brand">Ibrahim Obaidat</a>
        <p>{text.footer}</p>
        <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${defaultMessage}`} target="_blank" rel="noreferrer">WhatsApp · {PHONE_DISPLAY}</a>
      </footer>
    </div>
  );
}
