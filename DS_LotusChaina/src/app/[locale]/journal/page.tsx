import { PendingPage } from "@/components/layout/PendingPage";

export default async function JournalPage({ params }: PageProps<"/[locale]/journal">) {
  const { locale } = await params;
  return <PendingPage locale={locale === "en" ? "en" : "th"} page="journal" />;
}
