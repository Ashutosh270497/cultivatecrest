import Image from "next/image";

type MarketplaceLinksProps = {
  amazonLink: string;
  flipkartLink?: string;
  productName: string;
  variant?: string;
  wide?: boolean;
};

function AmazonMark() {
  return (
    <span className="marketplace-logo-frame marketplace-logo-frame-amazon" aria-hidden="true">
      <Image
        className="marketplace-logo"
        src="/images/marketplaces/amazon.png"
        alt=""
        width={48}
        height={48}
        unoptimized
      />
    </span>
  );
}

function FlipkartMark() {
  return (
    <span className="marketplace-logo-frame marketplace-logo-frame-flipkart" aria-hidden="true">
      <Image
        className="marketplace-logo"
        src="/images/marketplaces/flipkart.png"
        alt=""
        width={51}
        height={44}
        unoptimized
      />
    </span>
  );
}

export function MarketplaceLinks({ amazonLink, flipkartLink, productName, variant, wide = false }: MarketplaceLinksProps) {
  const productLabel = variant ? `${productName}, ${variant}` : productName;

  return (
    <div
      className={`marketplace-links${wide ? " marketplace-links-wide" : ""}`}
      role="group"
      aria-label={`Buy ${productLabel}`}
    >
      <a
        className="marketplace-link marketplace-link-amazon"
        href={amazonLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Buy ${productLabel} on Amazon India`}
        title="Buy on Amazon India"
      >
        <span className="marketplace-link-label">Buy on</span>
        <AmazonMark />
      </a>
      {flipkartLink && (
        <a
          className="marketplace-link marketplace-link-flipkart"
          href={flipkartLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Buy ${productLabel} on Flipkart`}
          title="Buy on Flipkart"
        >
          <span className="marketplace-link-label">Buy on</span>
          <FlipkartMark />
        </a>
      )}
    </div>
  );
}
