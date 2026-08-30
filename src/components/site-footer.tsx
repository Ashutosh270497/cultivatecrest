import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Camera, Mail } from "lucide-react";
import { siteConfig } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <Link href="/" aria-label="CultivateCrest home">
            <Image src="/images/logo.png" alt="CultivateCrest" width={1504} height={755} />
          </Link>
          <p>Premium seed essentials for thoughtful everyday nourishment.</p>
          <span>Packed in India · Serving India &amp; Middle East bulk partners</span>
        </div>

        <div className="footer-column">
          <h2>Explore</h2>
          <Link href="/products">Shop all seeds</Link>
          <Link href="/about">Our story</Link>
          <Link href="/journal">Journal</Link>
          <Link href="/bulk-orders">Bulk orders</Link>
        </div>

        <div className="footer-column">
          <h2>Support</h2>
          <Link href="/contact">Contact us</Link>
          <Link href="/shipping-returns">Shipping &amp; returns</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </div>

        <div className="footer-column footer-contact">
          <h2>Keep in touch</h2>
          <a href={`mailto:${siteConfig.contact.general}`}>
            <Mail size={17} aria-hidden="true" /> {siteConfig.contact.general}
          </a>
          <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer">
            <Camera size={17} aria-hidden="true" /> Instagram <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </div>
      </div>
      <div className="shell footer-bottom">
        <p>© {new Date().getFullYear()} CultivateCrest. All rights reserved.</p>
        <p>Retail purchases are completed on Amazon India or Flipkart.</p>
      </div>
    </footer>
  );
}
