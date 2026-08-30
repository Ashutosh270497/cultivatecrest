"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";

const links = [
  { href: "/products", label: "Shop" },
  { href: "/#quality", label: "Our quality" },
  { href: "/journal", label: "Journal" },
  { href: "/about", label: "About" },
  { href: "/bulk-orders", label: "Bulk orders" },
];

const announcements = [
  { label: "Premium seed essentials, carefully packed in India" },
  { label: "Bulk supply across India & Middle East", href: "/bulk-orders" },
  { label: "New value combos: four smart ways to stock your seed shelf", href: "/products" },
  { label: "Retail, gifting or distribution? Request a tailored bulk quote", href: "/bulk-orders" },
];

function AnnouncementSet({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <div className="announcement-set" aria-hidden={duplicate || undefined}>
      {announcements.map((announcement) => (
        <div className="announcement-item" key={announcement.label}>
          {announcement.href ? <Link href={announcement.href}>{announcement.label}</Link> : <span>{announcement.label}</span>}
        </div>
      ))}
    </div>
  );
}

function AmazonStoreMark() {
  return (
    <span className="amazon-store-mark" aria-hidden="true">
      <Image src="/images/marketplaces/amazon.png" alt="" width={48} height={48} unoptimized />
    </span>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 901px)");
    const closeOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };

    desktopQuery.addEventListener("change", closeOnDesktop);
    return () => desktopQuery.removeEventListener("change", closeOnDesktop);
  }, []);

  return (
    <div className="site-header-stack">
      <div className="announcement-bar">
        <div className="announcement-marquee" aria-label="CultivateCrest highlights">
          <div className="announcement-track">
            <AnnouncementSet />
            <AnnouncementSet duplicate />
          </div>
        </div>
      </div>
      <header className="site-header">
        <div className="shell header-inner">
          <button
            className="menu-button"
            type="button"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>

          <Link className="brand" href="/" aria-label="CultivateCrest home" onClick={() => setOpen(false)}>
            <Image src="/images/logo.png" alt="CultivateCrest" width={1504} height={755} loading="eager" />
          </Link>

          <nav className="desktop-nav" aria-label="Primary navigation">
            {links.map((link) => (
              <Link href={link.href} key={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>

          <a
            className="header-cta"
            href={siteConfig.amazonStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <AmazonStoreMark />
            <span>Amazon Store</span>
            <ArrowUpRight size={15} aria-hidden="true" />
          </a>
        </div>

        <div id="mobile-navigation" className={`mobile-drawer ${open ? "is-open" : ""}`} aria-hidden={!open}>
          <nav aria-label="Mobile navigation">
            {links.map((link) => (
              <Link href={link.href} key={link.href} onClick={() => setOpen(false)}>
                {link.label}
              </Link>
            ))}
          </nav>
          <a
            className="amazon-store-cta-wide"
            href={siteConfig.amazonStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <AmazonStoreMark />
            <span>Visit our Amazon Store</span>
            <ArrowUpRight size={17} aria-hidden="true" />
          </a>
          <p>Product-specific Amazon and Flipkart checkout links are available for customers in India.</p>
        </div>
        {open && <button className="drawer-scrim" aria-label="Close navigation" onClick={() => setOpen(false)} />}
      </header>
    </div>
  );
}
