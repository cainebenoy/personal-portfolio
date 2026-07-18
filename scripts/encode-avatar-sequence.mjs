// Re-encodes the raw avatar-sequence video frames into web-ready JPEGs.
//
// Input:  raw PNG frames (any name, sorted) in RAW_DIR
// Output: public/avatar-sequence/frame_000.webp … (720px wide, alpha kept)
//
// Usage: npm i --no-save sharp && node scripts/encode-avatar-sequence.mjs
import { mkdirSync, readdirSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const RAW_DIR =
  process.env.RAW_DIR ?? "C:/Projects/Personal Portfolio/assets/avatar-sequence-raw";
const OUT_DIR = "public/avatar-sequence";
const WIDTH = 720;
const QUALITY = 72;

mkdirSync(OUT_DIR, { recursive: true });
const frames = readdirSync(RAW_DIR)
  .filter((f) => f.toLowerCase().endsWith(".png"))
  .sort();

let i = 0;
for (const frame of frames) {
  const out = join(OUT_DIR, `frame_${String(i).padStart(3, "0")}.webp`);
  await sharp(join(RAW_DIR, frame))
    .resize({ width: WIDTH })
    .webp({ quality: QUALITY })
    .toFile(out);
  i++;
}
console.log(`encoded ${i} frames to ${OUT_DIR}`);
