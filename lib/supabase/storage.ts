import { env } from "@/lib/env";

// Building public Storage URLs is pure string concatenation once you know
// the project URL and bucket/path — no network call or client needed.
const STORAGE_PUBLIC_PREFIX = `${env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public`;

/**
 * `updatedAt` (the owning row's updated_at) is appended as `?v=` so the URL
 * changes whenever the row does. Storage serves files with max-age=3600 and
 * next/image caches optimized copies for hours, both keyed by URL, so a file
 * replaced at the same path would otherwise keep showing the old image.
 */
export function getPublicStorageUrl(bucket: string, path: string, updatedAt?: string) {
  const url = `${STORAGE_PUBLIC_PREFIX}/${bucket}/${path}`;
  const version = updatedAt ? Date.parse(updatedAt) : NaN;
  return Number.isNaN(version) ? url : `${url}?v=${version}`;
}
