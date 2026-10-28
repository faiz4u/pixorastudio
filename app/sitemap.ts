import type { MetadataRoute } from "next";
import { LEGAL } from "@/lib/content/legal";
import { SERVICES, servicePath } from "@/lib/content/services";
import { INDUSTRIES, industryPath } from "@/lib/content/industries";
import { publishedCaseStudies, caseStudyPath } from "@/lib/content/case-studies";
import { BLOG_POSTS, blogPath } from "@/lib/content/blog";
import { absoluteUrl } from "@/lib/seo";

/**
 * Every public, indexable page. Content-driven routes (services, industries,
 * case studies, posts) are picked up from their data files automatically;
 * add any new standalone page here by hand.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const legalUpdated = new Date(LEGAL.lastUpdated);

  const page = (
    path: string,
    priority: number,
    changeFrequency: "weekly" | "monthly" | "yearly" = "monthly",
    lastModified: Date = now,
  ) => ({ url: absoluteUrl(path), lastModified, changeFrequency, priority });

  return [
    page("/", 1, "weekly"),
    page("/services", 0.9),
    ...SERVICES.map((service) => page(servicePath(service.slug), 0.9)),
    page("/work", 0.8, "weekly"),
    ...publishedCaseStudies().map((study) => page(caseStudyPath(study.slug), 0.7)),
    page("/about", 0.7),
    page("/contact", 0.7),
    page("/pricing", 0.7),
    page("/industries", 0.6),
    ...INDUSTRIES.map((industry) => page(industryPath(industry.slug), 0.7)),
    page("/blog", 0.6, "weekly"),
    ...BLOG_POSTS.map((post) => page(blogPath(post.slug), 0.6, "monthly", new Date(post.updated ?? post.date))),
    page("/privacy-policy", 0.2, "yearly", legalUpdated),
    page("/terms-of-use", 0.2, "yearly", legalUpdated),
  ];
}
