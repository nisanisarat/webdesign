"use client";

// USING GLOBAL CSS: [src/app/globals.css]
import Image, { getImageProps } from "next/image";
import { useState } from "react";

type MediaPlaceholderProps = {
  src: string;
  alt: string;
  label: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  mobileSrc?: string;
};

export function MediaPlaceholder({
  src,
  alt,
  label,
  className = "",
  priority = false,
  sizes = "100vw",
  mobileSrc,
}: MediaPlaceholderProps) {
  const [isMissing, setIsMissing] = useState(false);
  const responsiveImage = mobileSrc
    ? {
        desktop: getImageProps({ src, alt, fill: true, priority, sizes }).props,
        mobile: getImageProps({ src: mobileSrc, alt, fill: true, sizes: "100vw" }).props,
      }
    : null;

  return (
    <div className={`media ${className}`} data-missing={isMissing || undefined}>
      {!isMissing && responsiveImage && (
        <picture>
          <source media="(max-width: 860px)" srcSet={responsiveImage.mobile.srcSet} sizes={responsiveImage.mobile.sizes} />
          <img {...responsiveImage.desktop} alt={alt} onError={() => setIsMissing(true)} />
        </picture>
      )}
      {!isMissing && !responsiveImage && (
        <Image src={src} alt={alt} fill priority={priority} sizes={sizes} onError={() => setIsMissing(true)} />
      )}
      {isMissing && (
        <div className="media__placeholder" role={alt ? "img" : undefined} aria-label={alt ? `${alt}. Production asset missing.` : undefined} aria-hidden={alt ? undefined : true}>
          <span>Production asset required</span>
          <strong>{label}</strong>
          <code>{src}</code>
        </div>
      )}
    </div>
  );
}
