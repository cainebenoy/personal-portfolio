import {
  ogImageAlt,
  ogImageContentType,
  ogImageSize,
  renderOgImage,
} from "@/lib/og-image";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = ogImageAlt;

export default function Image() {
  return renderOgImage();
}
