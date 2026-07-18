import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

// Favicon: the operator's crosshair in drafting blue on graph paper — the
// one glyph that reads at 16px.
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f4f1e8",
          backgroundImage:
            "linear-gradient(#c8d0da88 1px, transparent 1px), linear-gradient(90deg, #c8d0da88 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      >
        <svg viewBox="0 0 24 24" width="44" height="44">
          <g
            fill="none"
            stroke="#2e4a7a"
            strokeWidth="1.8"
            strokeLinecap="round"
          >
            <circle cx="12" cy="12" r="6" />
            <path d="M12 2.5 V6" />
            <path d="M12 18 V21.5" />
            <path d="M2.5 12 H6" />
            <path d="M18 12 H21.5" />
          </g>
        </svg>
      </div>
    ),
    { ...size },
  );
}
