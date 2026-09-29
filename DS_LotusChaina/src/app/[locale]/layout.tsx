import type { Metadata } from "next";
import { Noto_Sans_Thai, Noto_Serif_Thai } from "next/font/google";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import type { Locale } from "@/lib/site-navigation";
import "../globals.css";

const locales = ["th", "en"] as const;
const displayFont = Noto_Serif_Thai({
  subsets: ["latin", "thai"],
  variable: "--font-display-loaded",
  display: "swap",
});
const bodyFont = Noto_Sans_Thai({
  subsets: ["latin", "thai"],
  variable: "--font-body-loaded",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lotus Pavilion",
  description: "Lotus Pavilion website",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;

  if (!locales.some((supportedLocale) => supportedLocale === locale)) {
    notFound();
  }

  return (
    <html lang={locale} className={`${displayFont.variable} ${bodyFont.variable}`}>
      <body>
        <SiteHeader locale={locale as Locale} />
        {children}
        <SiteFooter locale={locale as Locale} />
      </body>
    </html>
  );
}
