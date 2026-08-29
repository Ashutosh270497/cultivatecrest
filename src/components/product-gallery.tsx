"use client";

import Image from "next/image";
import { useState } from "react";

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);
  const visibleImages = images.slice(0, 6);

  return (
    <div className="product-gallery-new">
      <div className="product-main-image">
        <Image
          src={visibleImages[active]}
          alt={`${name} – view ${active + 1}`}
          fill
          loading="eager"
          sizes="(max-width: 900px) 92vw, 52vw"
        />
      </div>
      {visibleImages.length > 1 && (
        <div className="product-thumbnails" aria-label={`${name} image gallery`}>
          {visibleImages.map((image, index) => (
            <button
              className={active === index ? "is-active" : ""}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Show product image ${index + 1}`}
              aria-pressed={active === index}
              key={image}
            >
              <Image
                src={image}
                alt=""
                width={160}
                height={160}
                loading={index === 0 ? "eager" : "lazy"}
                sizes="72px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
