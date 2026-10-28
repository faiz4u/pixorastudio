import type { MetadataRoute } from "next";
import { LEGAL } from "@/lib/content/legal";
import { absoluteUrl } from "@/lib/seo";

/** Every public, indexable page. Add each new marketing route here. */
export default function sitemap(): MetadataRoute.Sitemap {
  const legalUpdated = new Date(LEGAL.lastUpdated);

  return [
    { url: absoluteUrl("/"), lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    {
      url: absoluteUrl("/privacy-policy"),
      lastModified: legalUpdated,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: absoluteUrl("/terms-of-use"),
      lastModified: legalUpdated,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}
