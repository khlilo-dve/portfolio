import { getAllSlugs } from "@/lib/mdx";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://khlilo.xyz";

  const staticRoutes = ["", "/signal", "/node", "/pow", "/beacon"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.8,
  }));

  const signalSlugs = getAllSlugs("signal").map((slug) => ({
    url: `${baseUrl}/signal/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const nodeSlugs = getAllSlugs("node").map((slug) => ({
    url: `${baseUrl}/node/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const powSlugs = getAllSlugs("pow").map((slug) => ({
    url: `${baseUrl}/pow/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...signalSlugs, ...nodeSlugs, ...powSlugs];
}
