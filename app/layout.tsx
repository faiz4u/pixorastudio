import type { Metadata } from "next";
import { Archivo, Montserrat } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { env } from "@/lib/env";
import "./globals.css";

// Archivo (headings/body) and Montserrat (uppercase labels/eyebrow text) are
// the two typefaces used throughout the brand's design source.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_SITE_URL),
  title: {
    default: "Pixora Studio — Research-Driven Design Studio",
    template: "%s — Pixora Studio",
  },
  description:
    "Bihar's 1st research-driven design studio. Brand identity, UI/UX and social creative design rooted in research, strategy and design.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`dark ${archivo.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        {children}
        <Toaster theme="dark" richColors position="top-center" />
      </body>
    </html>
  );
}
