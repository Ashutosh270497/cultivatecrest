import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy information for visitors to the CultivateCrest website.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <main id="main-content">
      <section className="legal-hero"><div className="shell legal-hero-inner"><p className="eyebrow">Website information</p><h1>Privacy policy</h1><p>How information is handled when you browse or contact CultivateCrest.</p></div></section>
      <article className="shell legal-page">
        <p className="legal-updated">Last updated: 30 August 2026</p>
        <section><h2>Information you choose to share</h2><p>This website does not currently offer customer accounts or a native checkout. If you email us, we receive the information you include—such as your name, contact details, organisation and enquiry—and use it to respond and maintain relevant business records.</p></section>
        <section><h2>Retail purchases</h2><p>Retail purchases are completed on Amazon India or Flipkart. The marketplace you select processes checkout, payment, delivery and account information under its own policies. CultivateCrest does not receive your payment-card details through this website.</p></section>
        <section><h2>Technical information</h2><p>Our hosting provider may process standard technical logs needed to operate, secure and troubleshoot the website, such as request time, device or browser information and IP address. If analytics or additional tools are introduced later, this policy and any required consent experience should be updated before activation.</p></section>
        <section><h2>How we use and protect information</h2><p>Enquiry information is used for support, bulk-order discussions, documentation requests and legitimate business follow-up. Access should be limited to people who need it for those purposes, and information should not be retained longer than necessary.</p></section>
        <section><h2>Your questions</h2><p>To ask about information you shared directly with CultivateCrest, email <a href={`mailto:${siteConfig.contact.general}`}>{siteConfig.contact.general}</a>.</p></section>
      </article>
    </main>
  );
}
