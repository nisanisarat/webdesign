// USING GLOBAL CSS: [src/styles/layout.css]
import type { Locale } from "@/lib/site-navigation";

const pageTitles = {
  garden: { th: "สวนบัว", en: "The Garden" },
  pavilion: { th: "ศาลา", en: "The Pavilion" },
  seasons: { th: "ฤดูกาล", en: "Seasons" },
  gallery: { th: "แกลเลอรี", en: "Gallery" },
  journal: { th: "เรื่องเล่า", en: "Journal" },
  visit: { th: "วางแผนการเยี่ยมชม", en: "Plan Your Visit" },
  search: { th: "ค้นหา", en: "Search" },
} as const;

export function PendingPage({ locale, page }: { locale: Locale; page: keyof typeof pageTitles }) {
  return (
    <main id="main-content" className="pending-page">
      <p className="pending-page__label">Lotus Pavilion</p>
      <h1>{pageTitles[page][locale]}</h1>
      <p>{locale === "th" ? "เนื้อหาส่วนนี้กำลังจัดเตรียม" : "This part of the garden is being prepared."}</p>
    </main>
  );
}
