import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  FlaskConical,
  Globe2,
  Leaf,
  PackageCheck,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { RemarkableWord } from "@/components/remarkable-word";
import { SectionHeading } from "@/components/section-heading";
import { absoluteUrl, siteConfig } from "@/config/site";
import { journalArticles, products } from "@/lib/catalog";

const trustItems = [
  { icon: FlaskConical, title: "Lab-tested quality", text: "Carefully assessed for purity and consistency" },
  { icon: BadgeCheck, title: "FSSAI registered", text: "Packed with food-safety standards in mind" },
  { icon: ShieldCheck, title: "Trusted marketplace checkout", text: "Shop through Amazon India or Flipkart" },
  { icon: Globe2, title: "Bulk-order ready", text: "Supply conversations for India and the Middle East" },
];

const comparison = [
  ["Chia", "Omega-3 & fibre", "Smoothies and puddings", "Mild"],
  ["Flax", "ALA omega-3 & lignans", "Rotis, oats and salads", "Nutty"],
  ["Pumpkin", "Magnesium & zinc", "Snacking and toppings", "Roasted"],
  ["Sunflower", "Vitamin E & healthy fats", "Trail mix and baking", "Light"],
];

const comparisonLabels = ["Seed", "Known for", "Best in", "Taste"];

export default function HomePage() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: absoluteUrl("/images/logo.png"),
    sameAs: [siteConfig.social.instagram, siteConfig.social.facebook],
  };

  return (
    <main id="main-content">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />

      <section className="hero-section">
        <div className="shell hero-grid">
          <div className="hero-copy">
            <p className="eyebrow"><Sparkles size={15} aria-hidden="true" /> Premium seed essentials</p>
            <h1>
              Small seeds.<br />
              <RemarkableWord />{" "}
              everyday nutrition.
            </h1>
            <p className="hero-description">
              Premium chia, flax, pumpkin and sunflower seeds—selected for freshness, thoughtfully packed in India,
              and made for everyday rituals.
            </p>
            <div className="hero-actions">
              <Link className="button button-primary" href="#shop">
                Explore the collection <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link className="button button-secondary" href="/bulk-orders">
                Bulk enquiries
              </Link>
            </div>
            <div className="hero-note">
              <div className="hero-note-icon"><PackageCheck size={19} aria-hidden="true" /></div>
              <p><strong>Singles, twin packs and four-seed combos</strong><span>Choose Amazon India or Flipkart</span></p>
            </div>
          </div>

          <div className="hero-visual">
            <Image
              className="hero-lifestyle-image"
              src="/images/hero/cultivatecrest-seed-collection-v2.webp"
              alt="CultivateCrest flax, chia, pumpkin and sunflower seed packs with their natural seeds"
              fill
              preload
              sizes="(max-width: 680px) calc(100vw - 28px), (max-width: 900px) 620px, 42vw"
            />
            <span className="hero-seal" aria-label="Four seed essentials"><strong>4</strong><small>seed essentials</small></span>
            <div className="hero-caption">
              <Leaf size={18} aria-hidden="true" />
              <span><strong>Four pantry essentials</strong>Chia · flax · pumpkin · sunflower</span>
            </div>
          </div>
        </div>
      </section>

      <section className="trust-strip" aria-label="CultivateCrest quality commitments">
        <div className="shell trust-grid-new">
          {trustItems.map(({ icon: Icon, title, text }) => (
            <div className="trust-card" key={title}>
              <Icon size={23} strokeWidth={1.7} aria-hidden="true" />
              <div><h2>{title}</h2><p>{text}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section className="section products-home" id="shop">
        <div className="shell">
          <SectionHeading
            eyebrow="The everyday seed edit"
            title="Four essentials. Endless possibilities."
            description="Straightforward, nutrient-rich staples for breakfasts, snacks, baking and better everyday meals."
            action={<Link className="text-link" href="/products">View all products <ArrowUpRight size={16} /></Link>}
          />
          <div className="product-grid-new">
            {products.map((product) => <ProductCard product={product} key={product.id} />)}
          </div>
          <p className="price-disclaimer">Displayed prices are indicative. Final price and availability are confirmed by the marketplace you choose.</p>
        </div>
      </section>

      <section className="section ritual-section">
        <div className="shell ritual-grid">
          <div className="ritual-image-frame">
            <Image
              src="/images/Banners/A+_2.png"
              alt="Chia pudding, roasted pumpkin seeds and seed-topped bread"
              fill
              sizes="(max-width: 900px) 92vw, 55vw"
            />
            <span className="image-label">From pantry to plate</span>
          </div>
          <div className="ritual-copy">
            <p className="eyebrow">Make it a ritual</p>
            <h2>Wellness that fits the way you already eat.</h2>
            <p>
              Stir chia into a chilled breakfast, grind flax into everyday dough, or keep roasted pumpkin and
              sunflower seeds close for a satisfying crunch.
            </p>
            <ul className="clean-list">
              <li><span>01</span><div><strong>Morning</strong><p>Add to oats, laban, yogurt or smoothies.</p></div></li>
              <li><span>02</span><div><strong>Midday</strong><p>Finish salads, bowls and homemade breads.</p></div></li>
              <li><span>03</span><div><strong>On the move</strong><p>Build a portable mix for work and travel.</p></div></li>
            </ul>
            <Link className="text-link" href="/journal">Explore serving ideas <ArrowUpRight size={16} /></Link>
          </div>
        </div>
      </section>

      <section className="section comparison-section">
        <div className="shell">
          <SectionHeading
            eyebrow="Find your everyday favourite"
            title="Choose the seed that fits your routine."
            description="A quick, practical guide—not a complicated nutrition lecture."
          />
          <div className="comparison-table" role="table" aria-label="CultivateCrest seed comparison">
            <div className="comparison-row comparison-head" role="row">
              <span role="columnheader">Seed</span><span role="columnheader">Known for</span><span role="columnheader">Best in</span><span role="columnheader">Taste</span>
            </div>
            {comparison.map((row) => (
              <div className="comparison-row" role="row" key={row[0]}>
                {row.map((cell, index) => (
                  <span
                    role="cell"
                    aria-label={`${comparisonLabels[index]}: ${cell}`}
                    data-label={comparisonLabels[index]}
                    key={cell}
                  >
                    {cell}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section quality-section" id="quality">
        <div className="shell quality-grid">
          <div className="quality-copy">
            <p className="eyebrow eyebrow-light">Quality, without the theatre</p>
            <h2>Good food begins with care at every step.</h2>
            <p>
              From sourcing and batch checks to protective packing, we focus on the details that help seeds arrive
              fresh, clean and ready for your kitchen.
            </p>
            <div className="quality-points">
              <div><FlaskConical size={22} /><span><strong>Quality checked</strong>Batch-focused testing and review</span></div>
              <div><Leaf size={22} /><span><strong>Nothing unnecessary</strong>No artificial colours or preservatives</span></div>
              <div><PackageCheck size={22} /><span><strong>Freshness protected</strong>Resealable, pantry-ready packs</span></div>
              <div><BadgeCheck size={22} /><span><strong>Food-safety mindful</strong>FSSAI-registered brand</span></div>
            </div>
            <Link className="button button-light" href="/about">Read our story <ArrowRight size={17} /></Link>
          </div>
          <div className="quality-visual">
            <Image
              src="/images/Banners/A+_11.png"
              alt="CultivateCrest seeds as part of everyday family nutrition"
              fill
              sizes="(max-width: 900px) 92vw, 44vw"
            />
          </div>
        </div>
      </section>

      <section className="section journal-preview">
        <div className="shell">
          <SectionHeading
            eyebrow="The Cultivate Journal"
            title="Useful ideas for a better-stocked pantry."
            action={<Link className="text-link" href="/journal">Visit the journal <ArrowUpRight size={16} /></Link>}
          />
          <div className="journal-grid">
            {journalArticles.map((article) => (
              <Link className="journal-card" href={`/journal#${article.slug}`} key={article.slug}>
                <div className="journal-image"><Image src={article.image} alt="" fill sizes="(max-width: 700px) 92vw, 30vw" /></div>
                <div className="journal-meta"><span>{article.category}</span><span>{article.readTime}</span></div>
                <h3>{article.title}</h3>
                <p>{article.excerpt}</p>
                <span className="read-more">Read the guide <ArrowRight size={15} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section bulk-banner-section">
        <div className="shell">
          <div className="bulk-banner">
            <div>
              <p className="eyebrow eyebrow-light">For retailers, hospitality and corporate wellness</p>
              <h2>Bulk nutrition, thoughtfully supplied.</h2>
              <p>Discuss pack sizes, recurring requirements and distribution opportunities across India and the Middle East.</p>
            </div>
            <Link className="button button-gold" href="/bulk-orders">Start a bulk enquiry <ArrowUpRight size={18} /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
