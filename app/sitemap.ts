import type { MetadataRoute } from "next";

import { createCanonicalUrl } from "@/seo";

const sitemapRevalidateSeconds = 3600;

type SitemapService = {
  name: string;
  date?: string;
};

type SitemapCategory = {
  nameCategory: string;
};

async function getServices(): Promise<SitemapService[]> {
  if (!process.env.LOCAL_LIBRARY_API) {
    return [];
  }

  try {
    const response = await fetch(
      `${process.env.LOCAL_LIBRARY_API}library/find-items`,
      {
        next: {
          revalidate: sitemapRevalidateSeconds,
        },
      },
    );

    if (!response.ok) {
      return [];
    }

    return response.json();
  } catch {
    return [];
  }
}

async function getCategories(): Promise<SitemapCategory[]> {
  if (!process.env.LOCAL_LIBRARY_API) {
    return [];
  }

  try {
    const response = await fetch(
      `${process.env.LOCAL_LIBRARY_API}library/find-categories`,
      {
        next: {
          revalidate: sitemapRevalidateSeconds,
        },
      },
    );

    if (!response.ok) {
      return [];
    }

    return response.json();
  } catch {
    return [];
  }
}

function getValidDate(value?: string) {
  if (!value) {
    return new Date();
  }

  const parsedDate = new Date(value);
  return Number.isNaN(parsedDate.getTime()) ? new Date() : parsedDate;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, categories] = await Promise.all([
    getServices(),
    getCategories(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: createCanonicalUrl("/"),
      lastModified: new Date(),
    },
    {
      url: createCanonicalUrl("/recently"),
      lastModified: new Date(),
    },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = services.map((service) => ({
    url: createCanonicalUrl(`/services/${encodeURIComponent(service.name)}`),
    lastModified: getValidDate(service.date),
  }));

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((category) => ({
    url: createCanonicalUrl(
      `/category/${encodeURIComponent(category.nameCategory)}`,
    ),
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...serviceRoutes, ...categoryRoutes];
}
