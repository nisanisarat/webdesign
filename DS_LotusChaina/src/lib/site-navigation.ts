export type Locale = "th" | "en";

export const navigationItems = [
  { path: "", label: { th: "หน้าหลัก", en: "Home" } },
  { path: "garden", label: { th: "สวนบัว", en: "Garden" } },
  { path: "pavilion", label: { th: "ศาลา", en: "Pavilion" } },
  { path: "seasons", label: { th: "ฤดูกาล", en: "Seasons" } },
  { path: "gallery", label: { th: "แกลเลอรี", en: "Gallery" } },
  { path: "journal", label: { th: "เรื่องเล่า", en: "Journal" } },
] as const;

export const visitLabel = { th: "วางแผนการเยี่ยมชม", en: "Plan Your Visit" };
export const searchLabel = { th: "ค้นหา", en: "Search" };

export function localePath(locale: Locale, path = "") {
  return path ? `/${locale}/${path}` : `/${locale}`;
}
