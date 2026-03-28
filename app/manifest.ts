import { MetadataRoute } from "next";

import { siteDescription, siteName, siteUrl } from "@/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteName,
    short_name: siteName,
    description: siteDescription,
    start_url: siteUrl,
    display: "standalone",
    background_color: "#fff",
    theme_color: "#fff",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "96x96",
        type: "image/x-icon",
      },
    ],
  };
}
