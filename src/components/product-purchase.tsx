"use client";

import { ShieldCheck } from "lucide-react";
import { useState } from "react";
import { MarketplaceLinks } from "@/components/marketplace-links";
import type { Product } from "@/lib/catalog";

export function ProductPurchase({ product }: { product: Product }) {
  const [variant, setVariant] = useState(product.variants[0]);
  const pricing = product.variantPricing[variant] ?? {
    price: product.price,
    originalPrice: product.originalPrice,
  };
  const discount = Math.round(((pricing.originalPrice - pricing.price) / pricing.originalPrice) * 100);

  return (
    <div className="purchase-panel">
      <div className="variant-heading">
        <span>Choose a pack</span>
        <span>{variant}</span>
      </div>
      <div className="variant-options-new" role="group" aria-label="Choose pack size">
        {product.variants.map((option) => (
          <button
            className={variant === option ? "is-active" : ""}
            type="button"
            aria-pressed={variant === option}
            onClick={() => setVariant(option)}
            key={option}
          >
            <span>{option}</span>
            <small>₹{product.variantPricing[option]?.price ?? product.price}</small>
          </button>
        ))}
      </div>
      <div className="detail-price-row">
        <strong>₹{pricing.price}</strong>
        <del>₹{pricing.originalPrice}</del>
        {discount > 0 && <span>Save {discount}%</span>}
      </div>
      <MarketplaceLinks
        amazonLink={product.amazonLink}
        flipkartLink={product.flipkartLink}
        productName={product.name}
        variant={variant}
        wide
      />
      <div className="secure-note">
        <ShieldCheck size={19} aria-hidden="true" />
        <p><strong>Trusted marketplace checkout</strong><span>Final price, delivery and returns are confirmed by the marketplace you choose.</span></p>
      </div>
    </div>
  );
}
