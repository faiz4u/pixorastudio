import type { NextConfig } from "next";

// Supabase project ref is embedded in the URL, e.g. https://<ref>.supabase.co
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseHostname = supabaseUrl ? new URL(supabaseUrl).hostname : undefined;

// Baseline hardening for every response. The CSP is deliberately limited to
// directives that don't need per-request nonces for Next's inline scripts:
// no framing (clickjacking), no plugins, no <base> hijacking, and forms may
// only post back to this site.
const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: "frame-ancestors 'none'; object-src 'none'; base-uri 'self'; form-action 'self'",
  },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  // Browsers ignore this over plain http, so it's harmless in local dev.
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  experimental: {
    // Server Actions reject request bodies over 1MB by default, which silently
    // broke admin image uploads. Keep in sync with MAX_SITE_IMAGE_BYTES
    // (lib/validation/media.ts), leaving headroom for multipart overhead.
    serverActions: { bodySizeLimit: "3mb" },
  },
  images: {
    remotePatterns: supabaseHostname
      ? [
          {
            protocol: "https",
            hostname: supabaseHostname,
            pathname: "/storage/v1/object/public/**",
          },
        ]
      : [],
  },
};

export default nextConfig;
