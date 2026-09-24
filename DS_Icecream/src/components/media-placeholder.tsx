"use client";

// USING GLOBAL CSS: [src/app/globals.css]
import Image from "next/image";
import { useState } from "react";

type MediaPlaceholderProps = {
  src: string;
  alt: string;
  label: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

export function MediaPlaceholder({
  src,
  alt,
  label,
  className = "",
  priority = false,
  sizes = "100vw",
}: MediaPlaceholderProps) {
  const [isMissing, setIsMissing] = useState(false);

  return (
    <div className={`media ${className}`} data-missing={isMissing || undefined}>
      {!isMissing && (
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
