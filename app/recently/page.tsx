import AllComponent from "@/components/AllComponent/AllComponent";
import JsonLd from "@/components/Seo/JsonLd";
import { Metadata } from "next";
import {
  createBreadcrumbJsonLd,
  createCanonicalUrl,
  shareImagePath,
} from "@/seo";

export const metadata: Metadata = {
  title: "Recently",
  description: "Browse the most recently added resources in the Library.",
  alternates: {
    canonical: "/recently",
  },
  openGraph: {
    url: createCanonicalUrl("/recently"),
    title: "Recently | Library",
    description: "Browse the most recently added resources in the Library.",
    images: [shareImagePath],
  },
  twitter: {
    title: "Recently | Library",
    description: "Browse the most recently added resources in the Library.",
    images: [shareImagePath],
  },
};

async function getService() {
  const data = await fetch(
    `${process.env.LOCAL_LIBRARY_API}library/find-items`,
    {
      next: {
        revalidate: 60,
      },
    },
  );
  return data.json();
}

async function getCategory() {
  const category = await fetch(
    `${process.env.LOCAL_LIBRARY_API}library/find-categories`,
    {
      next: {
        revalidate: 60,
      },
    },
  );
  return category.json();
}

export default async function recently() {
  const services = await getService();
  const category = await getCategory();
  const normalizedServices = Array.isArray(services) ? services : [];
  const normalizedCategories = Array.isArray(category) ? category : [];
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Recently Added" },
  ];

  const recentlyJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Recently Added | Library",
    description: "Browse the most recently added resources in the Library.",
    url: createCanonicalUrl("/recently"),
    isPartOf: {
      "@type": "WebSite",
      name: "Library",
      url: createCanonicalUrl("/"),
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: normalizedServices.length,
      itemListElement: normalizedServices
        .slice(0, 20)
        .map((service, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: service.name,
          url: createCanonicalUrl(
            `/services/${encodeURIComponent(service.name)}`,
          ),
        })),
    },
  };

  return (
    <>
      <JsonLd
        data={[createBreadcrumbJsonLd(breadcrumbItems), recentlyJsonLd]}
      />
      <AllComponent
        categories={normalizedCategories}
        services={normalizedServices}
        namePage="Recently Added"
        breadcrumbs={breadcrumbItems}
      />
    </>
  );
}
