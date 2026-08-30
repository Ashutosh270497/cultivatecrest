import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, Star } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { ProductGallery } from "@/components/product-gallery";
import { ProductPurchase } from "@/components/product-purchase";
import { SectionHeading } from "@/components/section-heading";
import { absoluteUrl, siteConfig } from "@/config/site";
import { getProduct, getRelatedProducts, products } from "@/lib/catalog";

type ProductPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};

  return {
    title: product.name,
    description: product.description,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title: `${product.name} | CultivateCrest`,
      description: product.description,
      images: [{ url: product.image, alt: `${product.name} pack` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | CultivateCrest`,
      description: product.description,
      images: [product.image],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product);
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.images.map((image) => absoluteUrl(encodeURI(image))),
    description: product.description,
    brand: { "@type": "Brand", name: siteConfig.name },
    offers: {
      "@type": "Offer",
      url: product.amazonLink,
      priceCurrency: "INR",
      price: product.price,
      seller: { "@type": "Organization", name: "CultivateCrest on Amazon India" },
    },
    ...(product.rating && product.reviews
      ? { aggregateRating: { "@type": "AggregateRating", ratingValue: product.rating, reviewCount: product.reviews } }
      : {}),
  };

  return (
    <main id="main-content">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <section className="product-detail-new">
        <div className="shell">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span>/</span><Link href="/products">Seeds</Link><span>/</span><span>{product.shortName}</span>
          </nav>
          <div className="product-detail-grid-new">
            <ProductGallery images={product.images} name={product.name} />
            <div className="product-info-new">
              <p className="eyebrow">{product.category === "combo" ? "Curated seed combo" : "Premium seed essential"}</p>
              <h1>{product.name}</h1>
              {product.rating && (
                <div className="product-detail-rating">
                  <span><Star size={15} fill="currentColor" aria-hidden="true" /> {product.rating}</span>
                  <span>{product.reviews?.toLocaleString("en-IN")} Amazon ratings</span>
                </div>
              )}
              <p className="product-detail-description">{product.description}</p>
              <div className="detail-highlights">
                <div><span>Known for</span><strong>{product.nutritionFocus}</strong></div>
                <div><span>Best in</span><strong>{product.bestFor}</strong></div>
                <div><span>Taste</span><strong>{product.flavour}</strong></div>
              </div>
              <ProductPurchase product={product} />
            </div>
          </div>
        </div>
      </section>

      <section className="section product-benefits-section-new">
        <div className="shell product-benefits-grid-new">
          <div>
            <p className="eyebrow">Inside every pack</p>
            <h2>Simple, versatile nourishment.</h2>
            <p>Use it your way—at breakfast, between meetings, in family recipes or as a practical pantry staple.</p>
          </div>
          <ul>
            {product.benefits.map((benefit) => <li key={benefit}><Check size={18} aria-hidden="true" /><span>{benefit}</span></li>)}
          </ul>
        </div>
      </section>

      <section className="section related-products">
        <div className="shell">
          <SectionHeading
            eyebrow="Continue exploring"
            title="Complete your seed shelf."
            action={<Link className="text-link" href="/products">View the collection <ArrowRight size={16} /></Link>}
          />
          <div className="related-grid">
            {related.map((item) => <ProductCard product={item} key={item.id} />)}
          </div>
        </div>
      </section>
    </main>
  );
}
