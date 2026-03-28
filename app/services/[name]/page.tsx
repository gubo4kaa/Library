import ServicePage from "@/components/ServicePage/ServicePage";
import JsonLd from "@/components/Seo/JsonLd";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  createBreadcrumbJsonLd,
  createCanonicalUrl,
  normalizeExternalUrl,
  shareImagePath,
} from "@/seo";

type Props = {
  params: {
    name: string;
  };
};

export async function generateMetadata({
  params: { name },
}: Props): Promise<Metadata> {
  const service = await getService(name);

  if (!service?.id) {
    notFound();
  }

  const decodedName = decodeURIComponent(name);
  const title = service?.name || decodedName;
  const description =
    service?.description || `Browse ${decodedName} in the Library.`;
  const serviceImage =
    service?.avatar && process.env.NEXT_PUBLIC_LIBRARY_API
      ? `${process.env.NEXT_PUBLIC_LIBRARY_API}${service.id}/avatar/${service.avatar}`
      : shareImagePath;

  return {
    title,
    description,
    alternates: {
      canonical: `/services/${name}`,
    },
    openGraph: {
      url: createCanonicalUrl(`/services/${name}`),
      title: `${title} | Library`,
      description,
      images: [
        {
          url: serviceImage,
          alt: title,
        },
      ],
    },
    twitter: {
      title: `${title} | Library`,
      description,
      images: [serviceImage],
    },
  };
}

export const revalidate = 10;

async function getService(name: string) {
  const services = await fetch(
    `${process.env.LOCAL_LIBRARY_API}library/find-item/?name=${name}`,
    {
      next: {
        revalidate: 60,
      },
    },
  );
  return services.json();
}

async function getFindLastService(categoryName: string) {
  const services = await fetch(
    `${process.env.LOCAL_LIBRARY_API}library/search-by-category/?category=${encodeURIComponent(categoryName)}&amount=4`,
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
  const normalizedServices = Array.isArray(services) ? services : [];

  return normalizedServices.map((item: IServiceInterface) => ({
    name: encodeURIComponent(item.name),
  }));
}

function findCategory(categories: ICategory[], categoryId: number) {
  return categories.filter((e: ICategory) => e.id == categoryId);
}

function deleteService(
  services: IServiceInterface[],
  deleteName: string,
): IServiceInterface[] {
  const freeServices: IServiceInterface[] = [];
  services.map((e) => {
    if (encodeURIComponent(e.name) != deleteName) {
      freeServices.push(e);
    }
  });

  if (freeServices.length > 3) {
    freeServices.pop();
  }

  return freeServices;
}

export default async function Service({ params: { name } }: Props) {
  const service = await getService(name);
  if (!service?.id) {
    notFound();
  }

  const categories = await getCategory();
  if (!Array.isArray(categories) || !categories.length) {
    notFound();
  }

  const categoryName = findCategory(categories, service.categoryId);
  if (!categoryName[0]) {
    notFound();
  }

  const lastService = await getFindLastService(categoryName[0].nameCategory);
  const category = categories.find(
    (el: ICategory) => el.id == service.categoryId,
  );
  if (!category) {
    notFound();
  }

  const finishLastService = deleteService(
    Array.isArray(lastService) ? lastService : [],
    name,
  );
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    {
      label: category.nameCategory,
      href: `/category/${encodeURIComponent(category.nameCategory)}`,
    },
    { label: service.name },
  ];

  const serviceImage =
    service.avatar && process.env.NEXT_PUBLIC_LIBRARY_API
      ? `${process.env.NEXT_PUBLIC_LIBRARY_API}${service.id}/avatar/${service.avatar}`
      : createCanonicalUrl(shareImagePath);

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${service.name} | Library`,
    description: service.description,
    url: createCanonicalUrl(`/services/${name}`),
    primaryImageOfPage: serviceImage,
    about: {
      "@type": "Thing",
      name: category.nameCategory,
    },
    mainEntity: {
      "@type": "CreativeWork",
      name: service.name,
      description: service.description,
      image: serviceImage,
      url: normalizeExternalUrl(service.url),
    },
    isPartOf: {
      "@type": "WebSite",
      name: "Library",
      url: createCanonicalUrl("/"),
    },
  };

  return (
    <>
      <JsonLd data={[createBreadcrumbJsonLd(breadcrumbItems), serviceJsonLd]} />
      <ServicePage
        service={service}
        categories={categories}
        lastService={finishLastService}
        category={category}
      />
    </>
  );
}
