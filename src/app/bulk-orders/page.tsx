import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Building2, Gift, Handshake, Hotel, PackageCheck, Store } from "lucide-react";
import { emailUrl, siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Bulk Orders",
  description: "Discuss CultivateCrest bulk seed supply for retail, hospitality, corporate wellness and distribution across India and the Middle East.",
  alternates: { canonical: "/bulk-orders" },
};

const partnerTypes = [
  { icon: Store, title: "Retail & marketplaces", text: "Curated wellness stores, supermarkets and specialist e-commerce partners." },
  { icon: Hotel, title: "Hospitality & food service", text: "Hotels, cafés, kitchens and wellness-led food programmes." },
  { icon: Gift, title: "Corporate & gifting", text: "Thoughtful packs for employee wellness, events and seasonal gifting." },
  { icon: Building2, title: "Distribution", text: "Regional partners with established India or Middle East market reach." },
];

export default function BulkOrdersPage() {
  return (
    <main id="main-content">
      <section className="bulk-page-hero">
        <div className="shell bulk-page-grid">
          <div>
            <p className="eyebrow eyebrow-light">India &amp; Middle East partnerships</p>
            <h1>Premium seeds,<br /><em>ready to scale.</em></h1>
            <p>Tell us what you need, where it needs to go, and how you plan to serve your customers. We will begin with fit, availability and next steps.</p>
            <a
              className="button button-gold"
              href={emailUrl(
                siteConfig.contact.general,
                "CultivateCrest bulk order enquiry",
                "Company:\nMarket or country:\nProducts of interest:\nApproximate quantity:\nTimeline:\n",
              )}
            >
              Start an email brief <ArrowUpRight size={18} />
            </a>
          </div>
          <div className="bulk-facts-card">
            <div><span>Markets</span><strong>India &amp; Middle East</strong></div>
            <div><span>Core range</span><strong>Chia, flax, pumpkin &amp; sunflower</strong></div>
            <div><span>Pack discussions</span><strong>Retail, gifting &amp; food-service needs</strong></div>
            <div><span>First response</span><strong>Requirement review by our team</strong></div>
          </div>
        </div>
      </section>

      <section className="section partner-types-section">
        <div className="shell">
          <div className="section-heading">
            <div><p className="eyebrow">Who we work with</p><h2>Built for more than one kind of shelf.</h2></div>
          </div>
          <div className="partner-grid">
            {partnerTypes.map(({ icon: Icon, title, text }) => (
              <article className="partner-card" key={title}><Icon size={25} /><h3>{title}</h3><p>{text}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className="section process-section">
        <div className="shell process-grid">
          <div><p className="eyebrow">A clear first conversation</p><h2>What to include in your enquiry.</h2><p>The more context you share, the more useful our first reply can be.</p></div>
          <ol className="process-list">
            <li><span>01</span><div><h3>Your organisation and market</h3><p>Company, channel, city and target country.</p></div></li>
            <li><span>02</span><div><h3>Products and approximate volume</h3><p>Seed varieties, preferred pack format and expected quantity.</p></div></li>
            <li><span>03</span><div><h3>Timeline and use case</h3><p>Retail launch, recurring food service, gifting programme or distribution plan.</p></div></li>
          </ol>
        </div>
      </section>

      <section className="section bulk-contact-section">
        <div className="shell bulk-contact-card">
          <div className="bulk-contact-icon"><Handshake size={34} /></div>
          <div><p className="eyebrow">Ready when you are</p><h2>Share the opportunity.</h2><p>No generic form and no pretend confirmation—email your brief directly to the CultivateCrest team.</p></div>
          <a className="button button-primary" href={emailUrl(siteConfig.contact.general, "CultivateCrest bulk order enquiry")}>Email the team <ArrowUpRight size={18} /></a>
        </div>
        <div className="shell bulk-retail-note"><PackageCheck size={18} /><p>Looking for a personal retail order? <Link href="/products">Shop the consumer range</Link> through Amazon India.</p></div>
      </section>
    </main>
  );
}
