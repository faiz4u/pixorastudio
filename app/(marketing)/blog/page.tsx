import Link from "next/link";
import { blogPath, formatPostDate, sortedPosts } from "@/lib/content/blog";
import { pageMetadata } from "@/lib/seo";
import { PageHeader, PageSection } from "@/components/marketing/page-header";
import { CtaBanner } from "@/components/marketing/cta-banner";

export const metadata = pageMetadata({
  title: "Design Guides for Bihar Businesses",
  description:
    "Plain-English guides on branding, UI/UX, websites and design process from Pixora Studio, a research-driven design studio in Patna.",
  path: "/blog",
});

export default function BlogPage() {
  const posts = sortedPosts();

  return (
    <main>
      <PageHeader
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ]}
        eyebrow="Blog"
        title="Guides and insights"
      >
        <p>
          Practical guides on branding, UI/UX and websites for business owners and founders in
          Bihar and across India.
        </p>
      </PageHeader>

      <PageSection>
        <ul className="grid gap-6 sm:grid-cols-2">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={blogPath(post.slug)}
                className="flex h-full flex-col gap-3 rounded-2xl border border-border bg-background p-8 transition-colors hover:border-brand"
              >
                <time dateTime={post.date} className="font-label text-xs uppercase tracking-widest text-brand-text">
                  {formatPostDate(post.date)}
                </time>
                <h2 className="text-xl font-bold leading-snug">{post.title}</h2>
                <p className="text-sm leading-relaxed text-muted-foreground">{post.description}</p>
                <span className="mt-auto text-sm font-semibold">
                  Read <span aria-hidden>&rarr;</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </PageSection>

      <CtaBanner href="/contact" />
    </main>
  );
}
