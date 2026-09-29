"use client";

// USING GLOBAL CSS: [src/styles/layout.css]
import type { Locale } from "@/lib/site-navigation";

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  function switchLanguage(target: Locale) {
    const url = new URL(window.location.href);
    url.pathname = url.pathname.replace(/^\/(th|en)(?=\/|$)/, `/${target}`);
    window.location.assign(url.toString());
  }

  return (
    <div className="language-switcher" role="group" aria-label={locale === "th" ? "เลือกภาษา" : "Select language"}>
      <button type="button" lang="th" aria-pressed={locale === "th"} onClick={() => switchLanguage("th")}>TH</button>
      <span aria-hidden="true">|</span>
      <button type="button" lang="en" aria-pressed={locale === "en"} onClick={() => switchLanguage("en")}>EN</button>
    </div>
  );
}
