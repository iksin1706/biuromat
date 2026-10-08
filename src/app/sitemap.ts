import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";

// Tylko strony, które istnieją w tej aplikacji. Każdą nową podstronę dopisz tutaj.
// (Styleguide jest noindex, więc go nie ma.)
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteConfig.url}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
