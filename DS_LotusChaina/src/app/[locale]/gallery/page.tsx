import { PendingPage } from "@/components/layout/PendingPage";

export default async function GalleryPage({ params }: PageProps<"/[locale]/gallery">) {
  const { locale } = await params;
  return <PendingPage locale={locale === "en" ? "en" : "th"} page="gallery" />;
}
