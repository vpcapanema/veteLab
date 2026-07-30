import type { MetadataRoute } from "next";
import { site } from "@/lib/data/site";
import { services } from "@/lib/data/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = [
    "",
    "/sobre",
    "/servicos",
    "/contato",
    "/banco-de-sangue",
    "/banco-de-sangue/como-funciona",
    "/banco-de-sangue/quero-doar",
    "/banco-de-sangue/preciso-receber",
    "/politica-de-privacidade",
    "/termos-de-uso",
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${site.url}${route}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.7,
    })),
    ...services.map((service) => ({
      url: `${site.url}/servicos/${service.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
