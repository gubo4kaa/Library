export const siteUrl = "https://library.uiscore.io";
export const siteName = "Library";
export const siteDescription =
  "The library offers useful services for designers, developers and all Internet users. On our resource you will find a wide selection of tools, resources and programs that will help you improve your skills, increase your work efficiency and create high-quality projects. We offer services for design, programming, data analysis, project management and many other areas.";
export const shareImagePath = "/Thumbnail.png";
export const siteLogoPath = "/libraryLogoFull.png";

export type BreadcrumbSchemaItem = {
  label: string;
  href?: string;
};

export function createCanonicalUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}

export function createOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Uiscore",
    url: "https://uiscore.io",
    logo: createCanonicalUrl(siteLogoPath),
  };
}

export function createWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
    description: siteDescription,
    inLanguage: "en",
  };
}

export function createBreadcrumbJsonLd(items: BreadcrumbSchemaItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: createCanonicalUrl(item.href) } : {}),
    })),
  };
}
