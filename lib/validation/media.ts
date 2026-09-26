/**
 * Shared by the media form (client) and saveSiteImage (server) so the two
 * can't drift apart. Kept out of lib/actions/media.ts because "use server"
 * files may only export async functions.
 *
 * next.config.ts raises the Server Action body limit to 3mb — this cap
 * must stay below it, leaving room for the multipart overhead.
 */
export const MAX_SITE_IMAGE_BYTES = 2 * 1024 * 1024;

/** Raster formats only, mapped to the extension we store them under. SVG is
 * excluded because it can carry script, and the storage buckets enforce the
 * same list (0007_security_hardening.sql). */
export const ALLOWED_IMAGE_TYPES = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
  "image/avif": "avif",
} as const;

/** For `<input type="file" accept>`. */
export const IMAGE_ACCEPT = Object.keys(ALLOWED_IMAGE_TYPES).join(",");

/** Storage extension for an already-validated file. */
export function imageExtension(type: string) {
  return ALLOWED_IMAGE_TYPES[type as keyof typeof ALLOWED_IMAGE_TYPES] ?? "png";
}

export function formatFileSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/** Returns an error message for a file that can't be uploaded, else null. */
export function validateSiteImageFile(file: { size: number; type: string }) {
  if (!(file.type in ALLOWED_IMAGE_TYPES)) return "Please choose a PNG, JPEG, WebP or AVIF image.";
  if (file.size > MAX_SITE_IMAGE_BYTES) {
    return `Image is ${formatFileSize(file.size)} — the limit is ${formatFileSize(MAX_SITE_IMAGE_BYTES)}. Please choose a smaller file.`;
  }
  return null;
}
