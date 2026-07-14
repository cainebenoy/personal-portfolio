import type { MetadataRoute } from "next";
import { CASE_FILES } from "@/content/case-files";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/about`, changeFrequency: "yearly", priority: 0.8 },
    { url: `${SITE_URL}/archive`, changeFrequency: "monthly", priority: 0.6 },
  ];

  const workRoutes: MetadataRoute.Sitemap = Object.keys(CASE_FILES).map(
    (slug) => ({
      url: `${SITE_URL}/work/${slug}`,
      changeFrequency: "yearly",
      priority: 0.7,
    }),
  );

  return [...staticRoutes, ...workRoutes];
}
