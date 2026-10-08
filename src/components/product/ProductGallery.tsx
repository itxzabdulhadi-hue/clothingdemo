"use client";

import Image from "next/image";
import { useState } from "react";
import type { ProductImage } from "@/db/schema";

export default function ProductGallery({
  images,
  videoUrl,
  name,
}: {
  images: ProductImage[];
  videoUrl?: string | null;
  name: string;
}) {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col gap-3 md:flex-row-reverse md:gap-5">
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[var(--color-bone)] md:flex-1">
        <Image
          key={images[active].url}
          src={images[active].url}
          alt={images[active].alt}
          fill
          priority={active === 0}
          sizes="(max-width: 768px) 100vw, 46vw"
          className="animate-fade-in object-cover"
        />
      </div>

      <div className="flex gap-3 overflow-x-auto hide-scrollbar md:w-20 md:flex-col md:overflow-visible">
        {images.map((img, i) => (
          <button
            key={img.url}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`View image ${i + 1} of ${name}`}
            aria-current={i === active}
            className={`relative h-24 w-[72px] shrink-0 overflow-hidden bg-[var(--color-bone)] transition ${
              i === active ? "opacity-100 ring-1 ring-[var(--color-ink)]" : "opacity-60 hover:opacity-100"
            }`}
          >
            <Image src={img.url} alt="" fill sizes="72px" className="object-cover" />
          </button>
        ))}
        {videoUrl && (
          <a
            href={videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="grid h-24 w-[72px] shrink-0 place-items-center border border-black/15 text-[10px] uppercase tracking-luxe"
          >
            Film
          </a>
        )}
      </div>
    </div>
  );
}
