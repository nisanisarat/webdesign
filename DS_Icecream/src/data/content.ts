export type Flavor = {
  name: string;
  nameTh: string;
  asset: string;
  detailBackground?: string;
  tone: "vanilla" | "strawberry" | "mint" | "mango";
};

export const navigation = [
  { label: "Home", href: "#home" },
  { label: "Menu", href: "#flavors" },
  { label: "Our Story", href: "#story" },
  { label: "Gallery", href: "#moments" },
  { label: "Contact", href: "#visit" },
];

export const flavors: Flavor[] = [
  { name: "Vanilla Dream", nameTh: "วานิลลาดรีม", asset: "/assets/flavors/vanilla-dream.png", detailBackground: "/assets/flavor-backgrounds/vanilla-dream.png", tone: "vanilla" },
  { name: "Strawberry Bliss", nameTh: "สตรอว์เบอร์รีบลิส", asset: "/assets/flavors/strawberry-bliss.png", detailBackground: "/assets/flavor-backgrounds/strawberry-bliss.png", tone: "strawberry" },
  { name: "Mint Cloud", nameTh: "มินต์ช็อกชิพ", asset: "/assets/flavors/mint-cloud.png", detailBackground: "/assets/flavor-backgrounds/mint-cloud.png", tone: "mint" },
  { name: "Mango Summer", nameTh: "แมงโก้ซัมเมอร์", asset: "/assets/flavors/mango-summer.png", detailBackground: "/assets/flavor-backgrounds/mango-summer.png", tone: "mango" },
];

export const moments = Array.from({ length: 6 }, (_, index) => ({
  asset: `/assets/moments/moment-0${index + 1}.png`,
  alt: `Palmé beach moment ${index + 1}`,
}));

export const locations = [
  { name: "Indoor", detail: "Cozy Corner", intro: "มุมนั่งสบาย แสงอุ่น และกลิ่นวาฟเฟิลโคนที่ชวนให้พักนานขึ้นอีกนิด", asset: "/assets/atmosphere/indoor.png" },
  { name: "Counter", detail: "Say Hello", intro: "แวะทักทาย เลือกรสโปรด และดูไอศกรีมโฮมเมดของเราถูกตักสด ๆ ที่หน้าเคาน์เตอร์", asset: "/assets/atmosphere/counter.png" },
  { name: "Outdoor", detail: "Sea Breeze", intro: "โต๊ะกลางแจ้งใต้ร่มสีสด รับลมทะเลและแสงแดดอ่อน ๆ ไปพร้อมกับไอศกรีมถ้วยโปรด", asset: "/assets/atmosphere/outdoor.png" },
  { name: "Beach", detail: "Good Vibes", intro: "เดินจากร้านไม่กี่ก้าวก็ถึงชายหาด พื้นที่สำหรับวันสบาย ๆ และช่วงเวลาดี ๆ ริมทะเล", asset: "/assets/atmosphere/beach.png" },
];
