import type { MetadataRoute } from "next";
import { projects } from "./projects";
import { siteUrl } from "./site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, priority: 1 },
    ...projects.map((project) => ({
      url: `${siteUrl}/work/${project.slug}`,
      priority: 0.8,
    })),
  ];
}
