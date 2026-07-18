import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Social card as a page of the rough notebook: graph paper, the name in
// the writing hand, the motto in the printing hand with the red-pen strike.
// Fonts are the committed static instances in assets/fonts.

const PAPER = "#f4f1e8";
const GRID = "#c8d0da";
const INK = "#211f1a";
const ACCENT = "#2e4a7a";
const RED = "#b23b2e";

export const ogImageSize = { width: 1200, height: 630 };
export const ogImageContentType = "image/png";
export const ogImageAlt = "Caine Benoy — Jack of All Trades";

export async function renderOgImage() {
  const [caveat, architects] = await Promise.all([
    readFile(join(process.cwd(), "assets/fonts/caveat-600.ttf")),
    readFile(join(process.cwd(), "assets/fonts/architects-daughter-400.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: PAPER,
          backgroundImage: `linear-gradient(${GRID}66 1px, transparent 1px), linear-gradient(90deg, ${GRID}66 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
          padding: "0 96px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            color: INK,
            opacity: 0.65,
            fontFamily: "Architects Daughter",
            fontSize: 21,
            letterSpacing: 2,
          }}
        >
          <span style={{ color: RED, opacity: 1 }}>01</span>
          <div style={{ flex: 1, height: 1, backgroundColor: `${INK}33` }} />
          <span>PORTFOLIO · INDEX OF RANGE</span>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 44,
            fontFamily: "Caveat",
            fontSize: 132,
            lineHeight: 0.9,
            color: INK,
          }}
        >
          Caine Benoy.
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            marginTop: 46,
            fontFamily: "Architects Daughter",
            fontSize: 30,
            color: INK,
            opacity: 0.9,
          }}
        >
          &ldquo;A jack of all trades is a&nbsp;
          <span
            style={{
              display: "flex",
              position: "relative",
              alignItems: "center",
            }}
          >
            master of none
            <div
              style={{
                position: "absolute",
                left: "-1%",
                top: "54%",
                width: "102%",
                height: 4,
                backgroundColor: RED,
                transform: "rotate(-1.6deg)",
                borderRadius: 2,
              }}
            />
          </span>
          <span style={{ color: RED }}>
            ,&nbsp;but oftentimes better&hellip;&rdquo;
          </span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 64,
            fontFamily: "Architects Daughter",
            fontSize: 21,
            letterSpacing: 2,
            color: ACCENT,
          }}
        >
          <span>PRODUCT ENGINEER &amp; GENERALIST</span>
          <span>KERALA, IN</span>
        </div>
      </div>
    ),
    {
      ...ogImageSize,
      fonts: [
        { name: "Caveat", data: caveat, style: "normal", weight: 600 },
        {
          name: "Architects Daughter",
          data: architects,
          style: "normal",
          weight: 400,
        },
      ],
    },
  );
}
