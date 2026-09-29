import { PendingPage } from "@/components/layout/PendingPage";

export default async function VisitPage({ params }: PageProps<"/[locale]/visit">) {
  const { locale } = await params;
  return <PendingPage locale={locale === "en" ? "en" : "th"} page="visit" />;
}
