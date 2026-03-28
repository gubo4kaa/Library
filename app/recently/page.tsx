import AllComponent from "@/components/AllComponent/AllComponent";
import JsonLd from "@/components/Seo/JsonLd";
import { Metadata } from "next";
import { createBreadcrumbJsonLd, createCanonicalUrl } from "@/seo";

export const metadata: Metadata = {
  title: "Recently Added",
  description: "Browse the latest resources recently added to the Library.",
  alternates: {
    canonical: "/recently",
  },
  openGraph: {
    url: createCanonicalUrl("/recently"),
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
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Recently Added" },
  ];

  return (
    <>
      <JsonLd data={createBreadcrumbJsonLd(breadcrumbItems)} />
      <AllComponent
        categories={category}
        services={services}
        namePage="Recently Added"
        breadcrumbs={breadcrumbItems}
      />
    </>
  );
}
