import type { Metadata } from "next";

// Keeps every admin page (dashboard, login, password reset) out of search
// results. robots.txt also disallows /admin, but noindex is what actually
// prevents indexing if a URL gets linked from elsewhere.
export const metadata: Metadata = {
  title: { default: "Admin", template: "%s | Pixora Studio Admin" },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
