import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "var(--paper)",
        ink: "var(--ink)",
        highlight: "var(--highlight)",
        blueInk: "var(--blue-ink)",
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
        display: ["var(--font-abril)"],
        hand: ["var(--font-caveat)"],
        marker: ["var(--font-marker)"],
        messy: ["var(--font-reenie)"],
        code: ["var(--font-fira)"],
      },
      animation: {
        "spin-slow": "spin 8s linear infinite",
        bounce: "bounce 2s infinite",
      },
    },
  },
  plugins: [],
};
export default config;