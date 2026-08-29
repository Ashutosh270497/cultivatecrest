import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/config/site";
import "./globals.css";

const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "CultivateCrest | Premium Seeds for Everyday Wellness",
    template: "%s | CultivateCrest",
  },
  description:
    "Premium chia, flax, pumpkin and sunflower seeds, carefully packed in India. Shop on Amazon India or enquire for bulk supply across India and the Middle East.",
  keywords: ["premium seeds", "chia seeds", "flax seeds", "pumpkin seeds", "sunflower seeds", "India"],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "CultivateCrest | Premium Seeds for Everyday Wellness",
    description: "Small seeds. Remarkable everyday nutrition.",
    images: [
      {
        url: "/og.png",
        width: 1730,
        height: 909,
        alt: "CultivateCrest premium seed collection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CultivateCrest | Premium Seeds for Everyday Wellness",
    description: "Small seeds. Remarkable everyday nutrition.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#173d2d",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${bodyFont.variable} ${displayFont.variable}`}>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
