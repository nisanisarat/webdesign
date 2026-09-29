import { PendingPage } from "@/components/layout/PendingPage";

export default async function PavilionPage({ params }: PageProps<"/[locale]/pavilion">) {
  const { locale } = await params;
  return <PendingPage locale={locale === "en" ? "en" : "th"} page="pavilion" />;
}
