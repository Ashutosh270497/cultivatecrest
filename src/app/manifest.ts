import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CultivateCrest",
    short_name: "CultivateCrest",
    description: "Premium seeds for everyday wellness.",
    start_url: "/",
    display: "standalone",
    background_color: "#fffdf8",
    theme_color: "#173d2d",
    icons: [{ src: "/images/logo.png", sizes: "any", type: "image/png" }],
  };
}
