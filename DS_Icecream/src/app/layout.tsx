import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import "./globals.css";

const prompt = Prompt({
  subsets: ["latin", "thai"],
  weight: ["400", "700", "800"],
  display: "swap",
  variable: "--font-prompt",
});

export const metadata: Metadata = {
  title: "Palmé Beach Bar — Good Ice Cream, Brighter Days",
  description: "ไอศกรีมโฮมเมดและบรรยากาศริมทะเลจาก Palmé Beach Bar",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="th" className={prompt.variable}><body>{children}</body></html>;
}
