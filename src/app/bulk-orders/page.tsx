import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Apple,
  ArrowDown,
  ArrowUpRight,
  Building2,
  Flame,
  Handshake,
  Hotel,
  Leaf,
  Nut,
  PackageCheck,
  Soup,
  Sprout,
  Store,
  Wheat,
} from "lucide-react";
import { emailUrl, siteConfig } from "@/config/site";
import { bulkProductCategories, bulkProductCount, type BulkProductCategoryId } from "@/data/bulk-products";

export const metadata: Metadata = {
  title: "Bulk Orders",
  description: "Explore the CultivateCrest bulk portfolio across seeds, dry fruits, herbal wellness, staples, pulses, spices, food-service powders and fruit nutrition.",
  alternates: { canonical: "/bulk-orders" },
};

const partnerTypes = [
  { icon: Building2, title: "Distributors & wholesalers", text: "Regional partners building dependable retail and institutional supply networks." },
  { icon: Store, title: "Retail & e-commerce", text: "Modern retail chains, specialist stores, marketplaces and digital commerce partners." },
  { icon: Hotel, title: "Hospitality & institutional", text: "Hotels, restaurants, cloud kitchens, manufacturers and institutional buyers." },
  { icon: Handshake, title: "Export & private label", text: "International buyers and partners exploring market-ready or private-label programmes." },
];

const categoryIcons = {
  "superfood-seeds": Sprout,
  "premium-dry-fruits": Nut,
  "herbal-wellness": Leaf,
  "essential-foods": Wheat,
  "premium-spices": Flame,
  "instant-food-powders": Soup,
  "fruit-nutrition": Apple,
} satisfies Record<BulkProductCategoryId, typeof Sprout>;

export default function BulkOrdersPage() {
  return (
    <main id="main-content">
      <section className="bulk-page-hero">
        <div className="shell bulk-page-grid">
          <div>
            <p className="eyebrow eyebrow-light">India, Middle East &amp; international partnerships</p>
            <h1>A broader food portfolio,<br /><em>ready to scale.</em></h1>
            <p>Explore seeds, dry fruits, herbal wellness, staples, pulses, spices, food-service powders and fruit-based products for qualified commercial requirements.</p>
            <div className="bulk-hero-actions">
              <a
                className="button button-gold"
                href={emailUrl(
                  siteConfig.contact.general,
                  "CultivateCrest bulk order enquiry",
                  "Company:\nMarket or country:\nProduct category and items:\nPreferred format (retail, food service, ingredient or private label):\nApproximate quantity:\nTimeline:\n",
                )}
              >
                Start an email brief <ArrowUpRight size={18} />
              </a>
              <Link className="button button-outline-light" href="#bulk-range">
                View the product range <ArrowDown size={17} />
              </Link>
            </div>
          </div>
          <div className="bulk-hero-panel">
            <Image
              src="/images/bulk/portfolio-ingredients-dark.jpg"
              alt="CultivateCrest seeds, rice, pulses, spices, cashews and makhana"
              fill
              loading="eager"
              sizes="(max-width: 900px) 92vw, 43vw"
            />
            <div className="bulk-facts-card">
              <div><span>Portfolio</span><strong>{bulkProductCategories.length} categories · {bulkProductCount} listed products</strong></div>
              <div><span>Formats</span><strong>Retail, food service, ingredient &amp; private label</strong></div>
              <div><span>Capabilities</span><strong>Processing, packaging, export &amp; partnership supply</strong></div>
              <div><span>Next step</span><strong>Specification and requirement review by our team</strong></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section bulk-range-section" id="bulk-range">
        <div className="shell">
          <div className="bulk-range-intro">
            <div>
              <p className="eyebrow">The wholesale portfolio</p>
              <h2>Naturally diverse.<br />Purposefully curated.</h2>
              <p>From everyday pantry staples to wellness botanicals and food-service ingredients, the portfolio is organised to help buyers find the right commercial conversation quickly.</p>
            </div>
            <div className="bulk-range-stats" aria-label="Bulk portfolio summary">
              <div><strong>{bulkProductCategories.length}</strong><span>product categories</span></div>
              <div><strong>{bulkProductCount}</strong><span>listed products</span></div>
            </div>
          </div>

          <figure className="bulk-range-visual">
            <Image
              src="/images/bulk/portfolio-ingredients-light.jpg"
              alt="CultivateCrest portfolio of seeds, makhana, cashews, rice, pulses, spices, herbs and fruit powders"
              fill
              sizes="(max-width: 680px) 92vw, 88vw"
            />
            <figcaption>
              <span>One supply conversation</span>
              <strong>Seeds · Staples · Botanicals · Food-service ingredients</strong>
            </figcaption>
          </figure>

          <div className="bulk-catalog-grid">
            {bulkProductCategories.map((category, index) => {
              const Icon = categoryIcons[category.id];
              return (
                <article className={`bulk-category-card bulk-category-tone-${(index % 3) + 1}`} key={category.id}>
                  <div className="bulk-category-heading">
                    <span className="bulk-category-icon"><Icon size={24} strokeWidth={1.6} aria-hidden="true" /></span>
                    <div><span>0{index + 1}</span><h3>{category.title}</h3></div>
                  </div>
                  <p>{category.description}</p>
                  <ul className={category.products.length > 5 ? "bulk-product-list is-dense" : "bulk-product-list"}>
                    {category.products.map((product) => <li key={product}>{product}</li>)}
                  </ul>
                </article>
              );
            })}
          </div>

          <div className="bulk-range-note">
            <PackageCheck size={21} aria-hidden="true" />
            <p><strong>Portfolio-led, requirement-specific.</strong> Availability, specifications, formats, minimum quantities, private-label eligibility and destination-market requirements are confirmed during enquiry.</p>
          </div>
        </div>
      </section>

      <section className="section partner-types-section">
        <div className="shell">
          <div className="section-heading">
            <div><p className="eyebrow">Who we work with</p><h2>Built for more than one kind of shelf.</h2><p className="section-description">Partnership models drawn from the CultivateCrest corporate portfolio.</p></div>
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
