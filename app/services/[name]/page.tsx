import ServicePage from "@/components/ServicePage/ServicePage";
import SuggestedSection from "@/components/ServicePage/serviceComponents/Suggested/SuggestedSection";
import JsonLd from "@/components/Seo/JsonLd";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { createBreadcrumbJsonLd, createCanonicalUrl } from "@/seo";

type Props = {
  params: {
    name: string;
  };
};

export async function generateMetadata({
  params: { name },
}: Props): Promise<Metadata> {
  const decodedName = decodeURIComponent(name);
  const description = `Browse ${decodedName} on Library.`;

  return {
    title: decodedName,
    description,
    alternates: {
      canonical: `/services/${name}`,
    },
    openGraph: {
      url: createCanonicalUrl(`/services/${name}`),
      title: `${decodedName} | Library`,
      description,
    },
  };
}

export const revalidate = 10;

async function getService(name: string) {
  const services = await fetch(
    `${process.env.LOCAL_LIBRARY_API}library/find-item/?name=${encodeURIComponent(name)}`,
    {
      next: {
        revalidate: 60,
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

export async function generateStaticParams() {
  const services = await fetch(
    `${process.env.LOCAL_LIBRARY_API}library/find-items`,
    {
      next: {
        revalidate: 60,
      },
    },
  ).then((res) => res.json());
  return services.map((item: IServiceInterface) => ({
    name: encodeURIComponent(item.name),
  }));
}

function findCategory(categories: ICategory[], categoryId: number) {
  return categories.filter((e: ICategory) => e.id == categoryId);
}

export default async function Service({ params: { name } }: Props) {
  const decodedName = decodeURIComponent(name);
  const [service, categories] = await Promise.all([
    getService(decodedName),
    getCategory(),
  ]);

  if (!service?.id) {
    notFound();
  }

  if (!Array.isArray(categories) || !categories.length) {
    notFound();
  }

  const categoryName = findCategory(categories, service.categoryId);
  if (!categoryName[0]) {
    notFound();
  }
  const category = categories.find(
    (el: ICategory) => el.id == service.categoryId,
  );
  if (!category) {
    notFound();
  }

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    {
      label: category.nameCategory,
      href: `/category/${encodeURIComponent(category.nameCategory)}`,
    },
    { label: service.name },
  ];

  return (
    <>
      <JsonLd data={createBreadcrumbJsonLd(breadcrumbItems)} />
      <div>
        <ServicePage service={service} category={category} />
        <Suspense fallback={null}>
          <SuggestedSection
            categoryName={category.nameCategory}
            categories={categories}
            deleteName={name}
          />
        </Suspense>
      </div>
    </>
  );
}
