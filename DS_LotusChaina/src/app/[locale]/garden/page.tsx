import { PendingPage } from "@/components/layout/PendingPage";

export default async function GardenPage({ params }: PageProps<"/[locale]/garden">) {
  const { locale } = await params;
  return <PendingPage locale={locale === "en" ? "en" : "th"} page="garden" />;
}
