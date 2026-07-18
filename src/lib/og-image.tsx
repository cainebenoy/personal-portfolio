import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Social card in the site's own material: monsoon night field, ivory
// serif thesis with the brass strike, italic correction, mono sign-off.
// Fonts are the committed static instances in assets/fonts.

const NIGHT = "#0a0d0b";
const IVORY = "#ebe6d8";
const BRASS = "#c7a44f";
const BRASS_BRIGHT = "#ddbe74";

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
          backgroundColor: NIGHT,
          padding: "0 96px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            color: IVORY,
            opacity: 0.55,
            fontFamily: "Fragment Mono",
            fontSize: 20,
            letterSpacing: 4,
          }}
        >
          <span style={{ color: BRASS, opacity: 1 }}>01</span>
          <div style={{ flex: 1, height: 1, backgroundColor: "#2a2e2a" }} />
          <span>PORTFOLIO — INDEX OF RANGE</span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 56,
            fontFamily: "Fraunces",
            fontSize: 84,
            lineHeight: 1.04,
            color: IVORY,
            letterSpacing: -2,
          }}
        >
          <span>A jack of all trades</span>
          <span style={{ display: "flex", alignItems: "center" }}>
            is a&nbsp;
            <span
              style={{
                display: "flex",
                position: "relative",
                alignItems: "center",
              }}
            >
              master of none.
              <div
                style={{
                  position: "absolute",
                  left: "-1%",
                  top: "52%",
                  width: "102%",
                  height: 5,
                  backgroundColor: BRASS,
                  transform: "rotate(-1.2deg)",
                  borderRadius: 3,
                }}
              />
            </span>
          </span>
        </div>

        <div
          style={{
            marginTop: 40,
            fontFamily: "Fraunces Italic",
            fontStyle: "italic",
            fontSize: 40,
            color: BRASS_BRIGHT,
          }}
        >
          …but oftentimes better than a master of one.
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 72,
            fontFamily: "Fragment Mono",
            fontSize: 20,
            letterSpacing: 4,
            color: IVORY,
            opacity: 0.6,
          }}
        >
          <span>CAINE BENOY — PRODUCT ENGINEER &amp; GENERALIST</span>
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
