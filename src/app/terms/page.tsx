import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms for using the CultivateCrest website and its product information.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <main id="main-content">
      <section className="legal-hero"><div className="shell legal-hero-inner"><p className="eyebrow">Website information</p><h1>Terms of use</h1><p>Important information about this website, its content and external purchase links.</p></div></section>
      <article className="shell legal-page">
        <p className="legal-updated">Last updated: 29 August 2026</p>
        <section><h2>Using this website</h2><p>By using this website, you agree to use it lawfully and not attempt to interfere with its operation, security or availability. Website content may be updated as our products and services evolve.</p></section>
        <section><h2>Product information</h2><p>We aim to keep product descriptions, pack details and imagery useful and accurate. Packaging, availability and displayed information may change. Always review the current pack label and Amazon listing before purchasing or consuming a product.</p></section>
        <section><h2>Food and wellness information</h2><p>Content is provided for general information and is not medical advice. Individual dietary needs and allergies differ. Seek qualified professional guidance when a health condition, medication, pregnancy or allergy may affect what is appropriate for you.</p></section>
        <section><h2>External checkout</h2><p>Amazon India is a third-party service. Purchases, payments, delivery, cancellations and returns are governed by the terms and policies presented by Amazon at the time of your order.</p></section>
        <section><h2>Brand and content</h2><p>CultivateCrest names, logos, packaging artwork, copy and original visual material may not be reproduced or used commercially without permission, except where applicable law permits.</p></section>
        <section><h2>Contact</h2><p>Questions about these terms can be sent to <a href="mailto:info@cultivatecrest.in">info@cultivatecrest.in</a>.</p></section>
      </article>
    </main>
  );
}
