/**
 * Shared by the media form (client) and saveSiteImage (server) so the two
 * can't drift apart. Kept out of lib/actions/media.ts because "use server"
 * files may only export async functions.
 *
 * next.config.ts raises the Server Action body limit to 6mb — this cap
 * must stay below it, leaving room for the multipart overhead.
 */
export const MAX_SITE_IMAGE_BYTES = 5 * 1024 * 1024;

export function formatFileSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/** Returns an error message for a file that can't be uploaded, else null. */
export function validateSiteImageFile(file: { size: number; type: string }) {
  if (!file.type.startsWith("image/")) return "Please choose an image file.";
  if (file.size > MAX_SITE_IMAGE_BYTES) {
    return `Image is ${formatFileSize(file.size)} — the limit is ${formatFileSize(MAX_SITE_IMAGE_BYTES)}. Please choose a smaller file.`;
  }
  return null;
}
