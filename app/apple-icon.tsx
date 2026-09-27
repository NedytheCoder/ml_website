import { ImageResponse } from "next/og";

// Home-screen icon: the favicon's trace mark, as a PNG for iOS
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#0e1530" }}>
        <svg width="180" height="180" viewBox="0 0 32 32">
          <path
            d="M4 10.5H10C12 10.5 13 22.5 16 22.5S20 15 22.5 15.5 25.5 16 28 16"
            fill="none"
            stroke="#8fdcff"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    ),
    size,
  );
}
