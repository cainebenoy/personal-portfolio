import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Social card on the working sheet: paper, drafting grid, ink serif name
// with the red-pen strike and correction, mono sign-off. Fonts are the
// committed static instances in assets/fonts.

const PAPER = "#f4f1e8";
const GRID = "#c8d0da";
const INK = "#211f1a";
const ACCENT = "#2e4a7a";
const RED = "#b23b2e";

export const ogImageSize = { width: 1200, height: 630 };
export const ogImageContentType = "image/png";
export const ogImageAlt = "Caine Benoy — Jack of All Trades";

export async function renderOgImage() {
  const [fraunces, frauncesItalic, fragmentMono] = await Promise.all([
    readFile(join(process.cwd(), "assets/fonts/fraunces-display-500.ttf")),
    readFile(join(process.cwd(), "assets/fonts/fraunces-display-italic.ttf")),
    readFile(join(process.cwd(), "assets/fonts/fragment-mono-400.ttf")),
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
            opacity: 0.6,
            fontFamily: "Fragment Mono",
            fontSize: 20,
            letterSpacing: 4,
          }}
        >
          <span style={{ color: RED, opacity: 1 }}>01</span>
          <div style={{ flex: 1, height: 1, backgroundColor: `${INK}33` }} />
          <span>PORTFOLIO · INDEX OF RANGE</span>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 52,
            fontFamily: "Fraunces",
            fontSize: 92,
            lineHeight: 1.0,
            color: INK,
            letterSpacing: -2,
          }}
        >
          Caine Benoy.
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: 44,
            fontFamily: "Fraunces Italic",
            fontStyle: "italic",
            fontSize: 34,
            color: INK,
            opacity: 0.85,
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
                transform: "rotate(-1.4deg)",
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
            marginTop: 72,
            fontFamily: "Fragment Mono",
            fontSize: 20,
            letterSpacing: 4,
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
        { name: "Fraunces", data: fraunces, style: "normal", weight: 500 },
        {
          name: "Fraunces Italic",
          data: frauncesItalic,
          style: "italic",
          weight: 400,
        },
        { name: "Fragment Mono", data: fragmentMono, style: "normal", weight: 400 },
      ],
    },
  );
}
