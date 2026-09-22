import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Palmé Beach Bar — Good Ice Cream, Brighter Days",
  description: "ไอศกรีมโฮมเมดและบรรยากาศริมทะเลจาก Palmé Beach Bar",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="th"><body>{children}</body></html>;
}
