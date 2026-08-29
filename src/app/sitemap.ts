import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/config/site";
import { products } from "@/lib/catalog";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/products", "/about", "/journal", "/bulk-orders", "/contact", "/shipping-returns", "/privacy", "/terms"];
  const lastModified = new Date("2026-08-29");

  return [
    ...staticRoutes.map((route, index) => ({
      url: absoluteUrl(route || "/"),
      lastModified,
      changeFrequency: (index === 0 || route === "/products" ? "weekly" : "monthly") as "weekly" | "monthly",
      priority: index === 0 ? 1 : route === "/products" ? 0.9 : 0.7,
    })),
    ...products.map((product) => ({
      url: absoluteUrl(`/products/${product.slug}`),
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.8,
      images: product.images.map((image) => absoluteUrl(encodeURI(image))),
    })),
  ];
}
