import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { journalArticles, products } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "The Cultivate Journal",
  description: "Practical guides for using chia, flax, pumpkin and sunflower seeds in everyday meals.",
  alternates: { canonical: "/journal" },
};

export default function JournalPage() {
  return (
    <main id="main-content">
      <section className="page-hero journal-hero">
        <div className="shell page-hero-inner">
          <p className="eyebrow">The Cultivate Journal</p>
          <h1>Better pantry habits,<br />one useful idea at a time.</h1>
          <p>No complicated protocols—just practical ways to store, prepare and enjoy everyday seeds.</p>
        </div>
      </section>

      <section className="section journal-page-section">
        <div className="shell journal-feature">
          <div className="journal-feature-image">
            <Image src="/images/Banners/A+_2.png" alt="Everyday seed recipe ideas" fill priority sizes="(max-width: 900px) 92vw, 55vw" />
          </div>
          <div>
            <p className="eyebrow">Start here</p>
            <h2>A seed shelf that earns its space.</h2>
            <p>Chia, flax, pumpkin and sunflower seeds each bring something different to the table. The best shelf is not the biggest one—it is the one you actually use.</p>
            <a className="text-link" href={`#${journalArticles[0].slug}`}>Read the breakfast guide <ArrowUpRight size={16} /></a>
          </div>
        </div>
      </section>

      <section className="section article-list-section">
        <div className="shell article-list">
          {journalArticles.map((article, index) => (
            <article className="journal-article" id={article.slug} key={article.slug}>
              <div className="article-number">0{index + 1}</div>
              <div className="article-body">
                <div className="journal-meta"><span>{article.category}</span><span>{article.readTime}</span></div>
                <h2>{article.title}</h2>
                <p>{article.excerpt}</p>
                {index === 0 && <p>Soak chia in milk, plant milk, laban or yogurt until it becomes softly gelled. For a quicker morning, prepare it overnight and finish with fruit, dates, nuts or a little cardamom.</p>}
                {index === 1 && <p>Flax is often easier to use after grinding. Prepare a small batch, store it in an airtight container, and add a spoonful to dough, porridge, chutneys or salad dressings.</p>}
                {index === 2 && <p>Combine roasted pumpkin and sunflower seeds with a smaller quantity of flax and chia. Add dried fruit or gentle spices, then portion the mix for desks, flights and commutes.</p>}
                <Link className="text-link" href={`/products/${products[index + 1]?.slug ?? products[0].slug}`}>Explore the matching seed <ArrowUpRight size={16} /></Link>
              </div>
              <div className="article-image"><Image src={article.image} alt="" fill sizes="(max-width: 800px) 92vw, 32vw" /></div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
