import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

const CREAM = "#f7f4ec";
const GRID = "#c9d2db";
const INK = "#2b2b2b";
const ACCENT = "#2e4a7a";

export const ogImageSize = { width: 1200, height: 630 };
export const ogImageContentType = "image/png";
export const ogImageAlt = "Caine Benoy — A Jack of All Trades";

export async function renderOgImage() {
  const [courierPrime, kalam] = await Promise.all([
    readFile(join(process.cwd(), "assets/fonts/CourierPrime-Regular.ttf")),
    readFile(join(process.cwd(), "assets/fonts/Kalam-Regular.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: CREAM,
          backgroundImage: `linear-gradient(${GRID} 1px, transparent 1px), linear-gradient(90deg, ${GRID} 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
          padding: "0 100px",
        }}
      >
        <div
          style={{
            fontFamily: "Courier Prime",
            fontSize: 52,
            lineHeight: 1.4,
            color: INK,
            textAlign: "center",
          }}
        >
          A jack of all trades is a master of none.
        </div>
        <div
          style={{
            fontFamily: "Kalam",
            fontSize: 38,
            color: ACCENT,
            marginTop: 28,
            textAlign: "center",
          }}
        >
          ...but oftentimes better than a master of one.
        </div>
        <div
          style={{
            fontFamily: "Kalam",
            fontSize: 26,
            color: INK,
            opacity: 0.7,
            marginTop: 44,
          }}
        >
          Caine Benoy
        </div>
      </div>
    ),
    {
      ...ogImageSize,
      fonts: [
        {
          name: "Courier Prime",
          data: courierPrime,
          style: "normal",
          weight: 400,
        },
        { name: "Kalam", data: kalam, style: "normal", weight: 400 },
      ],
    },
  );
}
