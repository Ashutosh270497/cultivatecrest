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

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div className="announcement-bar">
        <div className="shell announcement-inner">
          <span>Premium seed essentials, carefully packed in India</span>
          <Link href="/bulk-orders">Bulk supply across India &amp; Middle East</Link>
        </div>
      </div>
      <header className="site-header">
        <div className="shell header-inner">
          <button
            className="menu-button"
            type="button"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>

          <Link className="brand" href="/" aria-label="CultivateCrest home" onClick={() => setOpen(false)}>
            <Image src="/images/logo.png" alt="CultivateCrest" width={1504} height={755} priority loading="eager" />
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
            Amazon store <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>

        <div className={`mobile-drawer ${open ? "is-open" : ""}`} aria-hidden={!open}>
          <nav aria-label="Mobile navigation">
            {links.map((link) => (
              <Link href={link.href} key={link.href} onClick={() => setOpen(false)}>
                {link.label}
              </Link>
            ))}
          </nav>
          <a
            className="button button-primary button-wide"
            href={siteConfig.amazonStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Shop on Amazon <ArrowUpRight size={17} aria-hidden="true" />
          </a>
          <p>Amazon checkout is currently available for customers in India.</p>
        </div>
        {open && <button className="drawer-scrim" aria-label="Close navigation" onClick={() => setOpen(false)} />}
      </header>
    </>
  );
}
