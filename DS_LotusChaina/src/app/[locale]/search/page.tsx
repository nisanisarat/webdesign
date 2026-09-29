import { PendingPage } from "@/components/layout/PendingPage";

export default async function SearchPage({ params }: PageProps<"/[locale]/search">) {
  const { locale } = await params;
  return <PendingPage locale={locale === "en" ? "en" : "th"} page="search" />;
}
