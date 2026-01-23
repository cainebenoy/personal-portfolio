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
      keyframes: {
        tear: {
          "0%": { transform: "translateY(0) rotate(0deg)", opacity: "1" },
          "30%": { transform: "translateY(8px) rotate(-2deg)" },
          "60%": { transform: "translateY(40px) rotate(3deg)", filter: "blur(0.5px)" },
          "100%": { transform: "translateY(80px) rotate(6deg)", opacity: "0" },
        },
      },
      animation: {
        "spin-slow": "spin 8s linear infinite",
        bounce: "bounce 2s infinite",
        tear: "tear 0.7s ease-out forwards",
      },
      boxShadow: {
        paper: "0 6px 14px rgba(0,0,0,0.18)",
      },
    },
  },
  plugins: [],
};
export default config;