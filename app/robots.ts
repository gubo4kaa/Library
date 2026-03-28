import type { MetadataRoute } from "next";
import { createCanonicalUrl, siteUrl } from "@/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: createCanonicalUrl("/sitemap.xml"),
    host: siteUrl,
  };
}
