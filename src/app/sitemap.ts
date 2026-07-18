import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/resume`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/now`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/colophon`, changeFrequency: "yearly", priority: 0.3 },
  ];
}
