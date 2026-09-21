import type { NextConfig } from "next";

// Supabase project ref is embedded in the URL, e.g. https://<ref>.supabase.co
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseHostname = supabaseUrl ? new URL(supabaseUrl).hostname : undefined;

const nextConfig: NextConfig = {
  experimental: {
    // Server Actions reject request bodies over 1MB by default, which silently
    // broke admin image uploads. Keep in sync with MAX_SITE_IMAGE_BYTES
    // (lib/validation/media.ts), leaving headroom for multipart overhead.
    serverActions: { bodySizeLimit: "6mb" },
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
