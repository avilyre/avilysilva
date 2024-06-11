import { SeoMetadata } from "@/@types/seo";
import { appConfig } from "@/app.config";

export async function generateSEO(
  seoMetadata?: SeoMetadata,
): Promise<SeoMetadata> {
  const pageTitle = seoMetadata?.title
    ? `${seoMetadata.title} // ${appConfig.title}`
    : appConfig.title;

  const pageDescription = seoMetadata?.description
    ? seoMetadata.description
    : appConfig.description;

  const metadata = {
    ...seoMetadata,
    title: pageTitle,
    description: pageDescription,
    metadataBase: new URL("https://www.avilysilva.com"),
    openGraph: {
      type: "profile",
      title: "avily silva",
      firstName: "Avily",
      lastName: "Silva",
      emails: ["avilyre@gmail.com"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  };

  return metadata;
}
