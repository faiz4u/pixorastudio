import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_POSTS, blogPath, formatPostDate, getPost, type BlogBlock } from "@/lib/content/blog";
import { getService, servicePath } from "@/lib/content/services";
import { ABOUT } from "@/lib/content/about";
import { articleJsonLd, jsonLdScript, pageMetadata } from "@/lib/seo";
import { Breadcrumbs } from "@/components/marketing/breadcrumbs";
import { primaryCta } from "@/components/marketing/page-header";

export const dynamicParams = false;

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return { title: "Page not found" };
  const metadata = pageMetadata({
    title: post.title,
    description: post.description,
    path: blogPath(post.slug),
    // Drop the " | Pixora Studio" suffix when it would push past ~60 characters.
    absoluteTitle: post.title.length > 44,
  });
  return {
    ...metadata,
    openGraph: {
      ...metadata.openGraph,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
    },
  };
}

function Block({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "h2":
      return <h2 className="mt-12 font-heading text-2xl font-bold text-foreground sm:text-3xl">{block.text}</h2>;
    case "p":
      return <p className="mt-5">{block.text}</p>;
    case "ul":
      return (
        <ul className="mt-5 flex list-disc flex-col gap-2 pl-5">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol className="mt-5 flex list-decimal flex-col gap-2 pl-5">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      );
  }
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  const service = getService(post.service);
  const author = ABOUT.founder.name || "Pixora Studio";
  const path = blogPath(post.slug);

  return (
    <main className="px-6 pt-10 pb-16 sm:px-10 sm:pt-14 sm:pb-20 lg:px-20 lg:pt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(
          articleJsonLd({
            title: post.title,
            description: post.description,
            path,
            datePublished: post.date,
            dateModified: post.updated,
            authorName: ABOUT.founder.name || undefined,
          }),
        )}
      />
      <article className="mx-auto max-w-3xl">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: post.title, path },
          ]}
        />
        <header>
          <p className="font-label text-xs uppercase tracking-widest text-brand-text">
            <time dateTime={post.date}>{formatPostDate(post.date)}</time> · {author}
          </p>
          <h1 className="mt-4 font-heading text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-5 text-xl leading-relaxed text-muted-foreground">{post.description}</p>
        </header>

        <div className="mt-10 rounded-3xl border border-border bg-background p-6 text-lg leading-relaxed text-muted-foreground sm:p-10 [&>*:first-child]:mt-0">
          {post.body.map((block, index) => (
            <Block key={index} block={block} />
          ))}
        </div>

        {service && (
          <aside className="mt-10 flex flex-col items-start gap-5 rounded-3xl border border-brand/40 bg-background p-8">
            <p className="font-label text-xs uppercase tracking-widest text-brand-text">Work with us</p>
            <h2 className="text-2xl font-bold">{service.h1}</h2>
            <p className="text-muted-foreground">{service.summary}</p>
            <Link href={servicePath(service.slug)} className={primaryCta}>
              Explore {service.name} <span aria-hidden>&rarr;</span>
            </Link>
          </aside>
        )}
      </article>
    </main>
  );
}
