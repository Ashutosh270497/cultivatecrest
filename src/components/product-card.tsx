import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Star } from "lucide-react";
import { discountPercentage, type Product } from "@/lib/catalog";

export function ProductCard({ product, eager = false }: { product: Product; eager?: boolean }) {
  const discount = discountPercentage(product);

  return (
    <article className="product-card-new">
      <Link className="product-visual" href={`/products/${product.slug}`} aria-label={`View ${product.name}`}>
        {discount > 0 && <span className="product-badge">{discount}% off</span>}
        <Image
          src={product.image}
          alt={`${product.name} pack`}
          width={1000}
          height={1000}
          loading={eager ? "eager" : "lazy"}
          sizes="(max-width: 640px) 88vw, (max-width: 1024px) 44vw, 25vw"
        />
      </Link>
      <div className="product-card-body">
        <div className="product-meta-row">
          <span>{product.variants.join(" · ")}</span>
          {product.rating && (
            <span className="rating-chip" aria-label={`${product.rating} out of 5 stars`}>
              <Star size={13} fill="currentColor" aria-hidden="true" /> {product.rating}
            </span>
          )}
        </div>
        <Link href={`/products/${product.slug}`} className="product-title-link">
          <h3>{product.name}</h3>
        </Link>
        <p className="product-focus">{product.nutritionFocus}</p>
        <div className="product-card-footer">
          <div className="price-stack">
            <span>From</span>
            <strong>₹{product.price}</strong>
            <del>₹{product.originalPrice}</del>
          </div>
          <a
            className="amazon-button"
            href={product.amazonLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Buy ${product.name} on Amazon India`}
          >
            Buy on Amazon <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  );
}
