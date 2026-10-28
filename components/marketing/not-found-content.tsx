import Link from "next/link";
import { primaryCta, secondaryCta } from "@/components/marketing/page-header";
import { SERVICES, servicePath } from "@/lib/content/services";

/** 404 body shared by app/not-found.tsx and app/(marketing)/not-found.tsx. */
export function NotFoundContent() {
  return (
    <main className="px-6 py-20 sm:px-10 lg:px-20 lg:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-5 font-label text-xs font-semibold uppercase tracking-[0.3em] text-brand-text">404</p>
        <h1 className="font-heading text-3xl font-extrabold uppercase leading-tight tracking-tight sm:text-5xl">
          This page doesn&apos;t exist
        </h1>
        <p className="mt-6 text-lg text-muted-foreground">
          The link may be old or mistyped. Here are some places to start instead.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <Link href="/" className={primaryCta}>
            Go to the homepage <span aria-hidden>&rarr;</span>
          </Link>
          <Link href="/contact" className={secondaryCta}>
            Contact us
          </Link>
        </div>
        <ul className="mt-12 flex flex-wrap justify-center gap-3">
          {SERVICES.map((service) => (
            <li key={service.slug}>
              <Link
                href={servicePath(service.slug)}
                className="inline-block rounded-full border border-brand/60 px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-brand hover:text-white"
              >
                {service.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
