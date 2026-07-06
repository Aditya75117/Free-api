import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#3B6FD9",
          borderRadius: 36,
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: "white",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          {"{·}"}
        </div>
      </div>
    ),
    { ...size },
  );
}
