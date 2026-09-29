// USING GLOBAL CSS: [src/styles/layout.css]
import Link from "next/link";
import { localePath, navigationItems, type Locale } from "@/lib/site-navigation";

export function SiteFooter({ locale }: { locale: Locale }) {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <Link className="site-footer__brand" href={localePath(locale)}>Lotus Pavilion</Link>
        <nav aria-label={locale === "th" ? "ลิงก์ท้ายหน้า" : "Footer navigation"}>
          {navigationItems.slice(1).map((item) => <Link key={item.path} href={localePath(locale, item.path)}>{item.label[locale]}</Link>)}
        </nav>
        <p>{locale === "th" ? "เมื่อดอกบัวพบกับผืนน้ำอันสงบ" : "Where the lotus meets still water"}</p>
      </div>
    </footer>
  );
}
