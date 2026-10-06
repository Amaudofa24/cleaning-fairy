import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Cleaning Fairy - Professional Cleaning Services in Lagos";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 80px",
          backgroundColor: "#07090e",
          backgroundImage:
            "radial-gradient(circle at 85% 15%, rgba(31, 181, 166, 0.25) 0%, transparent 60%), radial-gradient(circle at 10% 85%, rgba(13, 143, 131, 0.2) 0%, transparent 50%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "16px",
              backgroundColor: "rgba(31, 181, 166, 0.2)",
              border: "2px solid rgba(31, 181, 166, 0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px",
            }}
          >
            🧚
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span
              style={{
                fontSize: "32px",
                fontWeight: 900,
                color: "#ffffff",
                letterSpacing: "-0.5px",
              }}
            >
              Cleaning Fairy
            </span>
            <span
              style={{
                fontSize: "16px",
                color: "#1fb5a6",
                fontWeight: 700,
                letterSpacing: "1px",
                textTransform: "uppercase",
              }}
            >
              Professional Cleaning in Lagos
            </span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <h1
            style={{
              fontSize: "64px",
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: "-1.5px",
              margin: 0,
              color: "#ffffff",
            }}
          >
            Not magic.
            <br />
            <span style={{ color: "#1fb5a6" }}>Just perfect cleaning.</span>
          </h1>

          <p
            style={{
              fontSize: "24px",
              color: "rgba(255, 255, 255, 0.8)",
              margin: 0,
              maxWidth: "800px",
            }}
          >
            Digital-first home and commercial cleaning across Lekki, Ikoyi, VI,
            Ikeja and Yaba. Book in 60 seconds with transparent upfront pricing.
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 20px",
              borderRadius: "999px",
              backgroundColor: "rgba(255, 255, 255, 0.08)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              fontSize: "16px",
              fontWeight: 700,
              color: "#ffffff",
            }}
          >
            100% Vetted Cleaners
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 20px",
              borderRadius: "999px",
              backgroundColor: "rgba(31, 181, 166, 0.15)",
              border: "1px solid rgba(31, 181, 166, 0.4)",
              fontSize: "16px",
              fontWeight: 700,
              color: "#1fb5a6",
            }}
          >
            Upfront Pricing - No WhatsApp
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 20px",
              borderRadius: "999px",
              backgroundColor: "rgba(255, 255, 255, 0.08)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              fontSize: "16px",
              fontWeight: 700,
              color: "#ffffff",
            }}
          >
            100% Guaranteed Satisfaction
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
