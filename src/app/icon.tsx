import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

const CREAM = "#f7f4ec";
const GRID = "#c9d2db";
const INK = "#2b2b2b";

export default async function Icon() {
  const kalam = await readFile(
    join(process.cwd(), "assets/fonts/Kalam-Regular.ttf"),
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: CREAM,
          backgroundImage: `linear-gradient(${GRID} 1px, transparent 1px), linear-gradient(90deg, ${GRID} 1px, transparent 1px)`,
          backgroundSize: "16px 16px",
        }}
      >
        <span
          style={{
            fontFamily: "Kalam",
            fontSize: 40,
            color: INK,
            transform: "rotate(-8deg)",
          }}
        >
          *
        </span>
      </div>
    ),
    { ...size, fonts: [{ name: "Kalam", data: kalam, style: "normal", weight: 400 }] },
  );
}
