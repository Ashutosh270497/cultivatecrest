import type { MetadataRoute } from "next";
import { products } from "@/lib/catalog";

const baseUrl = "https://cultivatecrest.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/products", "/about", "/journal", "/bulk-orders", "/contact", "/shipping-returns", "/privacy", "/terms"];
  const lastModified = new Date("2026-08-29");

  return [
    ...staticRoutes.map((route, index) => ({
      url: `${baseUrl}${route}`,
      lastModified,
      changeFrequency: (index === 0 || route === "/products" ? "weekly" : "monthly") as "weekly" | "monthly",
      priority: index === 0 ? 1 : route === "/products" ? 0.9 : 0.7,
    })),
    ...products.map((product) => ({
      url: `${baseUrl}/products/${product.slug}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.8,
      images: product.images.map((image) => `${baseUrl}${encodeURI(image)}`),
    })),
  ];
}
