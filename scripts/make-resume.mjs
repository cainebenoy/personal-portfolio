// Renders /resume to public/resume.pdf via headless Chromium print.
//
// Usage:
//   1. npm i --no-save playwright   (and `npx playwright install chromium`
//      the first time — neither is a project dependency on purpose)
//   2. npm run build && npx next start -p 3111
//   3. node scripts/make-resume.mjs
//
// Re-run whenever resume content changes so the committed PDF stays true.
import { chromium } from "playwright";

const URL = process.env.RESUME_URL ?? "http://localhost:3111/resume";
const OUT = "public/resume.pdf";

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(URL, { waitUntil: "networkidle" });
await page.emulateMedia({ media: "print" });
await page.pdf({
  path: OUT,
  format: "A4",
  printBackground: true,
  margin: { top: "14mm", bottom: "14mm", left: "15mm", right: "15mm" },
});
await browser.close();
console.log(`wrote ${OUT}`);
