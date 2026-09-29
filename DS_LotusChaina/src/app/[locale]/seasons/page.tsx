import { PendingPage } from "@/components/layout/PendingPage";

export default async function SeasonsPage({ params }: PageProps<"/[locale]/seasons">) {
  const { locale } = await params;
  return <PendingPage locale={locale === "en" ? "en" : "th"} page="seasons" />;
}
