import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, FlaskConical, HeartHandshake, Leaf, PackageCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Story",
  description: "Meet CultivateCrest and learn about our thoughtful approach to premium everyday seeds.",
  alternates: { canonical: "/about" },
};

const values = [
  { icon: Leaf, title: "Keep it natural", text: "Start with straightforward ingredients and let their everyday usefulness do the talking." },
  { icon: FlaskConical, title: "Check what matters", text: "Build quality around sourcing, batch discipline and responsible product claims." },
  { icon: PackageCheck, title: "Protect freshness", text: "Use practical resealable formats made for real kitchens, offices and travel." },
  { icon: HeartHandshake, title: "Grow responsibly", text: "Build lasting relationships with customers, retailers and distribution partners." },
];

export default function AboutPage() {
  return (
    <main id="main-content">
      <section className="page-hero about-hero">
        <div className="shell about-hero-grid">
          <div>
            <p className="eyebrow">Our story</p>
            <h1>Rooted in everyday Indian food wisdom.</h1>
            <p>CultivateCrest brings premium seed essentials into modern kitchens without making wellness feel complicated.</p>
          </div>
          <div className="about-hero-image">
            <Image src="/images/Banners/A+_3.png" alt="CultivateCrest seed packs for a mindful lifestyle" fill priority loading="eager" sizes="(max-width: 900px) 92vw, 45vw" />
          </div>
        </div>
      </section>

      <section className="section story-section">
        <div className="shell story-grid">
          <p className="story-lead">We believe the best wellness habits are the ones that fit naturally into life—not the ones that ask life to reorganise around them.</p>
          <div className="story-copy">
            <p>Seeds have been part of traditional food cultures for generations. CultivateCrest was created to make their everyday value easier to discover, understand and enjoy.</p>
            <p>We began with four practical essentials: chia, flax, pumpkin and sunflower seeds. Each offers a different texture, flavour and place in the pantry, while sharing the same need for careful sourcing and freshness-conscious packing.</p>
            <p>Our near-term home is India. Our broader ambition is to work with retailers, hospitality groups and wellness partners across the Middle East—bringing the same clarity and care to every market we serve.</p>
          </div>
        </div>
      </section>

      <section className="section values-section">
        <div className="shell">
          <div className="values-intro">
            <p className="eyebrow">What guides us</p>
            <h2>Quiet standards.<br />Visible care.</h2>
          </div>
          <div className="values-grid-new">
            {values.map(({ icon: Icon, title, text }, index) => (
              <article className="value-card-new" key={title}>
                <span className="value-number">0{index + 1}</span>
                <Icon size={26} strokeWidth={1.6} aria-hidden="true" />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section standards-section">
        <div className="shell standards-grid">
          <div className="standards-visual">
            <Image src="/images/Banners/A+_8.png" alt="CultivateCrest seed collection" fill sizes="(max-width: 900px) 92vw, 50vw" />
          </div>
          <div>
            <p className="eyebrow">Our standard</p>
            <h2>Better information builds better trust.</h2>
            <p>Product pages should explain what is in the pack, how to use it, and where the final transaction happens. Clear information matters as much as polished packaging.</p>
            <ul className="standard-list">
              <li><BadgeCheck size={19} /><span>Transparent Amazon checkout handoff</span></li>
              <li><FlaskConical size={19} /><span>Batch and quality documentation available on request</span></li>
              <li><Leaf size={19} /><span>Practical serving guidance without exaggerated promises</span></li>
            </ul>
            <Link className="button button-primary" href="/contact">Talk to our team <ArrowRight size={17} /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
