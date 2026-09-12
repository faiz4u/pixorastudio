import { env } from "@/lib/env";

// Building public Storage URLs is pure string concatenation once you know
// the project URL and bucket/path — no network call or client needed.
const STORAGE_PUBLIC_PREFIX = `${env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public`;

export function getPublicStorageUrl(bucket: string, path: string) {
  return `${STORAGE_PUBLIC_PREFIX}/${bucket}/${path}`;
}
