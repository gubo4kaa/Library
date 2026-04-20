import AllComponent from "@/components/AllComponent/AllComponent";
import JsonLd from "@/components/Seo/JsonLd";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  createBreadcrumbJsonLd,
  createCanonicalUrl,
  shareImagePath,
} from "@/seo";

type Props = {
  params: Promise<{
    name: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { name } = await params;
  const decodedName = decodeURIComponent(name);
  const slug = encodeURIComponent(decodedName);
  const description = `Browse ${decodedName} resources in the Library.`;

  return {
    title: decodedName,
    description,
    alternates: {
      canonical: `/category/${slug}`,
    },
    openGraph: {
      url: createCanonicalUrl(`/category/${slug}`),
      title: `${decodedName} | Library`,
      description,
      images: [shareImagePath],
    },
    twitter: {
      title: `${decodedName} | Library`,
      description,
      images: [shareImagePath],
    },
  };
}

export const revalidate = 10;

async function getServices(name: string) {
  const services = await fetch(
    `${process.env.LOCAL_LIBRARY_API}library/search-by-category/?category=${encodeURIComponent(name)}`,
    {
      next: {
        revalidate: 10,
      },
    },
  );
  return services.json();
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

function findCategoryBySlug(categories: ICategory[], slug: string) {
  return categories.find(
    (item) => encodeURIComponent(item.nameCategory) === slug,
  );
}

export async function generateStaticParams() {
  const categories = await fetch(
    `${process.env.LOCAL_LIBRARY_API}library/find-categories`,
    {
      next: {
        revalidate: 60,
      },
    },
  ).then((res) => res.json());

  const normalizedCategories = Array.isArray(categories) ? categories : [];

  return normalizedCategories.map((item: ICategory) => ({
    name: item.nameCategory,
  }));
}

export default async function Category({ params }: Props) {
  const { name } = await params;
  const decodedName = decodeURIComponent(name);
  const slug = encodeURIComponent(decodedName);
  const categories = await getCategory();
  if (!Array.isArray(categories)) {
    notFound();
  }

  const currentCategory = findCategoryBySlug(categories, slug);

  if (!currentCategory) {
    notFound();
  }

  const categoryName = decodedName;
  const services = await getServices(decodedName);
  const normalizedServices = Array.isArray(services) ? services : [];

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: categoryName },
  ];

  const categoryJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${categoryName} | Library`,
    description: `Browse ${categoryName} resources in the Library.`,
    url: createCanonicalUrl(`/category/${slug}`),
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
        data={[createBreadcrumbJsonLd(breadcrumbItems), categoryJsonLd]}
      />
      <AllComponent
        services={normalizedServices}
        namePage={categoryName}
        categories={categories}
        currentCategory={currentCategory}
        breadcrumbs={breadcrumbItems}
      />
    </>
  );
}
