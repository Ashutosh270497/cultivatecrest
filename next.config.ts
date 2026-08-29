import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  poweredByHeader: false,
  compress: true,
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/about.html", destination: "/about", permanent: true },
      { source: "/blog.html", destination: "/journal", permanent: true },
      { source: "/contact.html", destination: "/contact", permanent: true },
      { source: "/product-detail.html", destination: "/products", permanent: true },
    ];
  },
};

export default nextConfig;
