import type { MetadataRoute } from "next";
import { createCanonicalUrl } from "@/seo";

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
          revalidate: 3600,
        },
      },
    );

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
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
          revalidate: 3600,
        },
      },
    );

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, categories] = await Promise.all([
    getServices(),
    getCategories(),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: createCanonicalUrl("/"),
      lastModified: new Date(),
    },
    {
      url: createCanonicalUrl("/recently"),
      lastModified: new Date(),
    },
  ];

  const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
    url: createCanonicalUrl(
      `/category/${encodeURIComponent(category.nameCategory)}`,
    ),
    lastModified: new Date(),
  }));

  const servicePages: MetadataRoute.Sitemap = services.map((service) => ({
    url: createCanonicalUrl(`/services/${encodeURIComponent(service.name)}`),
    lastModified: service.date ? new Date(service.date) : new Date(),
  }));

  return [...staticPages, ...categoryPages, ...servicePages];
}
