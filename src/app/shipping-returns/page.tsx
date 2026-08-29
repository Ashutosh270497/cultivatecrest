import type { Metadata } from "next";
import Link from "next/link";
import { emailUrl, siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Shipping & Returns",
  description: "How shipping, delivery, cancellation and returns work for CultivateCrest retail orders placed on Amazon India.",
  alternates: { canonical: "/shipping-returns" },
};

export default function ShippingReturnsPage() {
  return (
    <main id="main-content">
      <section className="legal-hero">
        <div className="shell legal-hero-inner">
          <p className="eyebrow">Customer care</p>
          <h1>Shipping &amp; returns</h1>
          <p>Clear guidance for the way CultivateCrest retail orders work today.</p>
        </div>
      </section>
      <article className="shell legal-page">
        <p className="legal-updated">Last updated: 29 August 2026</p>
        <section>
          <h2>Retail orders are completed on Amazon India</h2>
          <p>Product buttons on this website take you to the relevant CultivateCrest listing on Amazon India. Amazon confirms the final price, availability, delivery location, estimated arrival date, payment options and order status before and after checkout.</p>
        </section>
        <section>
          <h2>Shipping and tracking</h2>
          <p>Shipping eligibility, fees and tracking are determined by Amazon for the delivery address entered during checkout. Please use your Amazon order page for the latest delivery information.</p>
        </section>
        <section>
          <h2>Cancellations, returns and refunds</h2>
          <p>Cancellation, replacement, return and refund eligibility follows the policy shown on the applicable Amazon product listing and order page. Start these requests from your Amazon account so the correct order and payment can be identified.</p>
        </section>
        <section>
          <h2>Product-quality concern</h2>
          <p>If a pack arrives damaged or you have a product-quality question, retain the pack, batch details and photographs. Contact our support team and include your Amazon order number so we can review the concern.</p>
          <a className="button button-primary" href={emailUrl(siteConfig.contact.support, "CultivateCrest product support")}>Email product support</a>
        </section>
        <aside className="legal-note"><strong>Planning a business order?</strong><span>Bulk and distribution requirements are discussed directly with our team.</span><Link href="/bulk-orders">Visit bulk orders</Link></aside>
      </article>
    </main>
  );
}
