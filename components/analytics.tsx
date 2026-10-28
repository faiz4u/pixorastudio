"use client";

import { useEffect } from "react";
import Script from "next/script";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/** Sends a GA4 event; a no-op when analytics isn't loaded. */
export function trackEvent(name: string, params?: Record<string, unknown>) {
  window.gtag?.("event", name, params);
}

/**
 * GA4 plus the conversion events from the SEO report (section 15):
 * whatsapp_click, phone_click and email_click are tracked here from any link
 * on the site; form_submit is sent by the contact form. Only rendered when
 * NEXT_PUBLIC_GA_MEASUREMENT_ID is set (app/layout.tsx).
 */
export function Analytics({ measurementId }: { measurementId: string }) {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.("a[href]");
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      const params = { link_url: href, page_path: window.location.pathname };

      if (href.startsWith("https://wa.me/")) trackEvent("whatsapp_click", params);
      else if (href.startsWith("tel:")) trackEvent("phone_click", params);
      else if (href.startsWith("mailto:")) trackEvent("email_click", params);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${measurementId}');`}
      </Script>
    </>
  );
}
