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
          <p>Four pantry essentials in practical pack sizes. Explore the range here, then choose Amazon India or Flipkart to complete your purchase.</p>
        </div>
      </section>
      <section className="section">
        <div className="shell">
          <div className="collection-intro">
            <p>{products.length} products</p>
            <p>Natural ingredients · Resealable packs · Trusted marketplace checkout</p>
          </div>
          <div className="product-grid-new">
            {products.map((product, index) => (
              <ProductCard product={product} eager={index === 0} key={product.id} />
            ))}
          </div>
          <p className="price-disclaimer">Displayed prices are indicative. Final price and availability are confirmed by the marketplace you choose.</p>
        </div>
      </section>
    </main>
  );
}
