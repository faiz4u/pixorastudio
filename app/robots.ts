import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Admin dashboard and Supabase auth callbacks are private; they also
      // send a noindex header via their layouts.
      disallow: ["/admin", "/auth"],
    },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
