import AllComponent from "@/components/AllComponent/AllComponent";
import JsonLd from "@/components/Seo/JsonLd";
import { Metadata } from "next";
import { notFound } from "next/navigation";
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
  const description = `Browse ${decodedName} resources in the Library.`;

  return {
    title: decodedName,
    description,
    alternates: {
      canonical: `/category/${name}`,
    },
    openGraph: {
      url: createCanonicalUrl(`/category/${name}`),
      title: `${decodedName} | Library`,
      description,
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

export default async function Category({ params: { name } }: Props) {
  const categoryName = decodeURIComponent(name);
  const services = await getServices(categoryName);
  const categories = await getCategory();
  const currentCategory = categories.find(
    (item: ICategory) => item.nameCategory === categoryName,
  );

  if (!currentCategory) {
    notFound();
  }

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: currentCategory.nameCategory },
  ];

  return (
    <>
      <JsonLd data={createBreadcrumbJsonLd(breadcrumbItems)} />
      <AllComponent
        services={Array.isArray(services) ? services : []}
        namePage={categoryName}
        categories={categories}
        breadcrumbs={breadcrumbItems}
      />
    </>
  );
}
