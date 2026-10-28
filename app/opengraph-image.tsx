import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { OG_IMAGE_ALT } from "@/lib/seo";

// Default social share card for every page that doesn't define its own.
export const alt = OG_IMAGE_ALT;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), "public/logo-transparent.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background:
            "radial-gradient(circle at top right, rgba(116,75,219,0.45) 0%, #12151a 60%)",
          backgroundColor: "#12151a",
          color: "#ffffff",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse needs a plain img */}
        <img src={logoSrc} width={456} height={96} alt="" />
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 30, letterSpacing: 8, color: "#744bdb", textTransform: "uppercase" }}>
            Research · Strategy · Design
          </div>
          <div style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.1, textTransform: "uppercase" }}>
            Design Studio in Patna
          </div>
          <div style={{ fontSize: 32, color: "#a3a3a3" }}>
            Brand identity, UI/UX, websites, social creatives and pitch decks.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
