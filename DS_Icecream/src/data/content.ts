export type Flavor = {
  name: string;
  nameTh: string;
  asset: string;
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
  { name: "Vanilla Dream", nameTh: "วานิลลาดรีม", asset: "/assets/flavor-vanilla.webp", tone: "vanilla" },
  { name: "Strawberry Bliss", nameTh: "สตรอว์เบอร์รีบลิส", asset: "/assets/flavor-strawberry.webp", tone: "strawberry" },
  { name: "Mint Cloud", nameTh: "มินต์ช็อกชิพ", asset: "/assets/flavor-mint.webp", tone: "mint" },
  { name: "Mango Summer", nameTh: "แมงโก้ซัมเมอร์", asset: "/assets/flavor-mango.webp", tone: "mango" },
];

export const moments = Array.from({ length: 6 }, (_, index) => ({
  asset: `/assets/moments-0${index + 1}.webp`,
  alt: `Palmé beach moment ${index + 1}`,
}));

export const locations = [
  { name: "Indoor", detail: "Cozy Corner", asset: "/assets/atmosphere-indoor.webp" },
  { name: "Counter", detail: "Say Hello", asset: "/assets/atmosphere-counter.webp" },
  { name: "Outdoor", detail: "Sea Breeze", asset: "/assets/atmosphere-outdoor.webp" },
  { name: "Beach", detail: "Good Vibes", asset: "/assets/atmosphere-beach.webp" },
];
