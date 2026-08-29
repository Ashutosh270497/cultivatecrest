import type { Metadata } from "next";
import { ProductCard } from "@/components/product-card";
import { products } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Premium Seeds",
  description: "Explore CultivateCrest chia, flax, pumpkin and sunflower seeds in 200g and 500g packs.",
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  return (
    <main id="main-content">
      <section className="page-hero products-page-hero">
        <div className="shell page-hero-inner">
          <p className="eyebrow">The CultivateCrest collection</p>
          <h1>Everyday seeds,<br />chosen with care.</h1>
          <p>Four pantry essentials in practical pack sizes. Explore the range here, then complete your purchase securely on Amazon India.</p>
        </div>
      </section>
      <section className="section">
        <div className="shell">
          <div className="collection-intro">
            <p>{products.length} products</p>
            <p>Natural ingredients · Resealable packs · India-wide Amazon fulfilment</p>
          </div>
          <div className="product-grid-new">
            {products.map((product) => <ProductCard product={product} key={product.id} />)}
          </div>
          <p className="price-disclaimer">Displayed prices are indicative. Final price and availability are confirmed on Amazon India.</p>
        </div>
      </section>
    </main>
  );
}
