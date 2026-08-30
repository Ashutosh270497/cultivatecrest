import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Camera, Clock3, Mail, MapPin } from "lucide-react";
import { emailUrl, siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact CultivateCrest for product support, quality documentation, retail and bulk-order enquiries.",
  alternates: { canonical: "/contact" },
};

const faqs = [
  ["Where can I buy CultivateCrest products?", "Current retail purchases are completed through Amazon India or Flipkart. Every product page clearly links to the available marketplace listings."],
  ["Can you help with a marketplace order?", "Amazon or Flipkart manages payment, tracking, delivery and returns for orders placed on its platform. For product-quality questions, contact us with the order details and pack information."],
  ["Do you support bulk orders?", "Yes. We welcome conversations with retailers, hospitality groups, distributors, corporate wellness programmes and gifting partners."],
  ["Do you supply the Middle East?", "We are open to qualified bulk and distribution opportunities across the Middle East. Retail marketplace fulfilment is currently focused on India."],
];

export default function ContactPage() {
  return (
    <main id="main-content">
      <section className="page-hero contact-hero">
        <div className="shell contact-hero-grid">
          <div>
            <p className="eyebrow">Contact CultivateCrest</p>
            <h1>Let&apos;s begin with a useful conversation.</h1>
            <p>Product question, quality-document request, retail opportunity or bulk requirement—we will route your message to the right place.</p>
          </div>
          <div className="contact-quick-card">
            <span>Best first step</span>
            <h2>Email our team</h2>
            <p>Include the product, pack size and order or requirement details so we can respond efficiently.</p>
            <a className="button button-gold button-wide" href={emailUrl(siteConfig.contact.general, "CultivateCrest enquiry")}>
              {siteConfig.contact.general} <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
      </section>

      <section className="section contact-options-section">
        <div className="shell contact-options-grid">
          <article className="contact-option">
            <Mail size={23} />
            <h2>Product &amp; general support</h2>
            <p>Questions about a pack, product information or quality documentation.</p>
            <a href={`mailto:${siteConfig.contact.support}`}>{siteConfig.contact.support}</a>
          </article>
          <article className="contact-option">
            <MapPin size={23} />
            <h2>Bulk &amp; distribution</h2>
            <p>India and Middle East wholesale, hospitality, corporate and distribution requirements.</p>
            <Link href="/bulk-orders">Open the bulk-order brief</Link>
          </article>
          <article className="contact-option">
            <Camera size={23} />
            <h2>Follow the brand</h2>
            <p>Product updates, serving ideas and everyday wellness inspiration.</p>
            <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer">@cultivatecrest</a>
          </article>
          <article className="contact-option">
            <Clock3 size={23} />
            <h2>Response window</h2>
            <p>We aim to review business and support enquiries during Indian business days.</p>
            <span>India Standard Time</span>
          </article>
        </div>
      </section>

      <section className="section faq-section-new">
        <div className="shell faq-grid-new">
          <div><p className="eyebrow">Before you write</p><h2>Frequently asked questions.</h2></div>
          <div className="faq-list">
            {faqs.map(([question, answer]) => (
              <details key={question}>
                <summary>{question}</summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
