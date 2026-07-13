import { ImageResponse } from "next/og";

export const alt = "ApiGenerator — Free Mock REST API and Fake JSON";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "64px",
          background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)",
          color: "white",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 16,
              background: "rgba(59, 111, 217, 0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
              color: "#3B6FD9",
            }}
          >
            {"{*}"}
          </div>
          <div style={{ display: "flex", fontSize: 56, fontWeight: 700, letterSpacing: -1 }}>
            <span style={{ color: "#3B6FD9" }}>Api</span>
            <span>Generator</span>
          </div>
        </div>
        <p style={{ fontSize: 32, color: "#94a3b8", margin: 0, maxWidth: 800, lineHeight: 1.4 }}>
          Free mock REST API and fake JSON generator. Any keyword, instant placeholder data.
        </p>
        <div
          style={{
            marginTop: 48,
            padding: "16px 24px",
            borderRadius: 12,
            background: "rgba(255,255,255,0.08)",
            fontFamily: "monospace",
            fontSize: 24,
            color: "#60a5fa",
          }}
        >
          GET /users?count=10
        </div>
      </div>
    ),
    { ...size },
  );
}
