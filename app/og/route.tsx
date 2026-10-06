import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/app/lib/site";

/**
 * Branded 1200×630 social preview image.
 * Usage: /og?title=About&subtitle=The%20professional%20journey…
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = (searchParams.get("title") ?? siteConfig.name).slice(0, 60);
  const subtitle = (searchParams.get("subtitle") ?? siteConfig.role).slice(0, 140);

  const logo = await readFile(join(process.cwd(), "public", "logo.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: "#ece7f6",
          padding: 64,
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {/* Periwinkle glow */}
        <div
          style={{
            position: "absolute",
            right: -120,
            top: -160,
            width: 560,
            height: 560,
            borderRadius: 9999,
            backgroundColor: "#d4c2fc",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1, position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 72,
                height: 72,
                borderRadius: 20,
                backgroundColor: "#f9f5ff",
                border: "2px solid #d6cfe6",
                boxShadow: "5px 5px 0 #998fc7",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={logoSrc} width={56} height={56} alt="" />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 28, fontWeight: 700, color: "#28262c" }}>{siteConfig.name}</span>
              <span style={{ fontSize: 20, color: "#625e6c" }}>kareithi.vercel.app</span>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", maxWidth: 900 }}>
            <span style={{ fontSize: 88, fontWeight: 700, color: "#28262c", lineHeight: 1.05, letterSpacing: -2 }}>{title}</span>
            <span style={{ marginTop: 20, fontSize: 30, color: "#4a4752", lineHeight: 1.35 }}>{subtitle}</span>
          </div>

          <div style={{ display: "flex", gap: 12 }}>
            {["Full-Stack Developer", "Nairobi, Kenya"].map((tag) => (
              <span
                key={tag}
                style={{
                  display: "flex",
                  fontSize: 22,
                  padding: "10px 22px",
                  borderRadius: 9999,
                  backgroundColor: tag === "Full-Stack Developer" ? "#14248a" : "#f9f5ff",
                  color: tag === "Full-Stack Developer" ? "#f9f5ff" : "#28262c",
                  border: "2px solid #14248a",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: { "Cache-Control": "public, max-age=86400, s-maxage=604800, immutable" },
    },
  );
}
