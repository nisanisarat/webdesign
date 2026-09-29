import type { Locale } from "@/lib/site-navigation";

const homeContent = {
  th: {
    hero: { eyebrow: "สวน · วัฒนธรรม · ความสงบ", subtitle: "เมื่อดอกบัวพบกับผืนน้ำอันสงบ", action: "สำรวจสวนบัว" },
    garden: { eyebrow: "ความงามที่มีชีวิต", title: "มากกว่าสวนบัว", description: "มองให้ลึกกว่าดอกไม้ แล้วพบเรื่องราวของน้ำ ใบ และชีวิตใต้ผิวน้ำ", action: "เรื่องราวของเรา" },
    pavilion: { eyebrow: "ประสบการณ์ในศาลา", title: "ที่แห่งการพักใจ", description: "ชา ทิวทัศน์ และจังหวะที่ช้าลงข้างสระบัว", action: "สำรวจศาลา" },
    seasons: {
      eyebrow: "บัวและกาลเวลา", title: "ผ่านสี่ฤดูกาล", note: "ต่างช่วงเวลา ผืนน้ำเดียวกัน",
      items: [
        { id: "spring", title: "ฤดูใบไม้ผลิ", detail: "เริ่มผลิบาน" },
        { id: "summer", title: "ฤดูร้อน", detail: "เบ่งบานเต็มที่" },
        { id: "autumn", title: "ฤดูใบไม้ร่วง", detail: "ความงามที่เปลี่ยนไป" },
        { id: "winter", title: "ฤดูหนาว", detail: "สงบอยู่ภายใน" },
      ],
    },
    gallery: { title: "เศษเสี้ยวของบทกวี", description: "ช่วงเวลา รายละเอียด และมุมสงบของ Lotus Pavilion", action: "ชมแกลเลอรี" },
    reflection: { title: "ความงามอยู่ในความสงบ", note: "ในผืนน้ำที่นิ่ง เราพบโลกที่ชัดเจนขึ้น" },
    visit: { eyebrow: "ดอกบัวเดิม เช้าวันใหม่", title: "มาเดินผ่านสวนด้วยกัน", action: "วางแผนการเยี่ยมชม" },
  },
  en: {
    hero: { eyebrow: "GARDEN · CULTURE · SERENITY", subtitle: "Where the lotus meets still water", action: "Explore the Garden" },
    garden: { eyebrow: "A LIVING TRADITION", title: "More Than a Garden", description: "Look beyond the bloom to discover the water, leaves, and life beneath the surface.", action: "Our Story" },
    pavilion: { eyebrow: "THE PAVILION EXPERIENCE", title: "A Place to Belong", description: "Tea, views, and a slower rhythm by the lotus lake.", action: "Experience More" },
    seasons: {
      eyebrow: "THE LOTUS", title: "Through the Seasons", note: "Different moments, the same peace",
      items: [
        { id: "spring", title: "Spring", detail: "Awakening" },
        { id: "summer", title: "Summer", detail: "In full bloom" },
        { id: "autumn", title: "Autumn", detail: "Graceful change" },
        { id: "winter", title: "Winter", detail: "Quiet within" },
      ],
    },
    gallery: { title: "Fragments of a Longer Poem", description: "Moments, details, and hidden corners of Lotus Pavilion.", action: "View Gallery" },
    reflection: { title: "Beauty Lives in Stillness", note: "In still water, we find a clearer world." },
    visit: { eyebrow: "SAME LOTUS, A BRIGHTER TOMORROW", title: "Come Walk the Garden", action: "Plan Your Visit" },
  },
} as const;

export function getHomeContent(locale: Locale) {
  return homeContent[locale];
}
