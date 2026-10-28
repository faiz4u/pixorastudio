import type { Metadata } from "next";
import { NotFoundContent } from "@/components/marketing/not-found-content";

export const metadata: Metadata = {
  title: "Page not found",
};

/** notFound() from a marketing page (e.g. an unknown service slug). */
export default function MarketingNotFound() {
  return <NotFoundContent />;
}
