"use client";

// USING GLOBAL CSS: [src/styles/layout.css]
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { LanguageSwitcher } from "@/components/navigation/LanguageSwitcher";
import { localePath, navigationItems, searchLabel, visitLabel, type Locale } from "@/lib/site-navigation";

export function SiteHeader({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const menuButton = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDialogElement>(null);

  function closeMenu() {
    menu.current?.close();
  }

  return (
    <>
      <a className="skip-link" href="#main-content">
        {locale === "th" ? "ข้ามไปยังเนื้อหา" : "Skip to content"}
      </a>
      <header className={pathname === localePath(locale) ? "site-header site-header--home" : "site-header"}>
        <div className="site-header__inner">
          <Link className="site-brand" href={localePath(locale)} aria-label={locale === "th" ? "Lotus Pavilion หน้าหลัก" : "Lotus Pavilion home"}>
            <span className="site-brand__name">Lotus Pavilion</span>
            <span className="site-brand__line">{locale === "th" ? "เมื่อดอกบัวพบกับผืนน้ำอันสงบ" : "Where the lotus meets still water"}</span>
          </Link>

          <nav className="site-nav" aria-label={locale === "th" ? "เมนูหลัก" : "Main navigation"}>
            {navigationItems.map((item) => {
              const href = localePath(locale, item.path);
              return <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined}>{item.label[locale]}</Link>;
            })}
          </nav>

          <div className="site-header__actions">
            <div className="site-header__desktop-actions">
              <LanguageSwitcher locale={locale} />
              <Link className="site-header__search" href={localePath(locale, "search")}>{searchLabel[locale]}</Link>
              <Link className="site-header__visit" href={localePath(locale, "visit")}>{locale === "th" ? "เยี่ยมชม" : "Visit Us"}</Link>
            </div>
            <button ref={menuButton} className="site-header__menu-button" type="button" aria-haspopup="dialog" aria-controls="mobile-nav" onClick={() => menu.current?.showModal()}>
              {locale === "th" ? "เมนู" : "Menu"}
            </button>
          </div>
        </div>
      </header>

      <dialog id="mobile-nav" ref={menu} className="mobile-nav" onClose={() => menuButton.current?.focus()} onClick={(event) => { if (event.target === event.currentTarget) closeMenu(); }}>
        <div className="mobile-nav__content">
          <div className="mobile-nav__top">
            <span className="site-brand__name">Lotus Pavilion</span>
            <button type="button" onClick={closeMenu}>{locale === "th" ? "ปิด" : "Close"}</button>
          </div>
          <nav aria-label={locale === "th" ? "เมนูมือถือ" : "Mobile navigation"}>
            {navigationItems.map((item) => {
              const href = localePath(locale, item.path);
              return <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined} onClick={closeMenu}>{item.label[locale]}</Link>;
            })}
            <Link href={localePath(locale, "search")} onClick={closeMenu}>{searchLabel[locale]}</Link>
            <Link href={localePath(locale, "visit")} onClick={closeMenu}>{visitLabel[locale]}</Link>
          </nav>
          <LanguageSwitcher locale={locale} />
        </div>
      </dialog>
    </>
  );
}
