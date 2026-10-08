"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/lib/queries";
import { formatPrice } from "@/lib/site";
import { useStore } from "@/components/StoreProvider";
import { IconHeart } from "@/components/icons";
import QuickView from "@/components/product/QuickView";

export default function ProductCard({
  product,
  priority = false,
  sizes = "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw",
}: {
  product: Product;
  priority?: boolean;
  sizes?: string;
}) {
  const { toggleWishlist, isWishlisted } = useStore();
  const [quickOpen, setQuickOpen] = useState(false);
  const wished = isWishlisted(product.slug);
  const onSale = Boolean(product.compareAtPrice && product.compareAtPrice > product.price);
  const secondary = product.images[1] ?? product.images[0];

  return (
    <article className="group relative">
      <div className="relative overflow-hidden bg-[var(--color-bone)]">
        <Link href={`/products/${product.slug}`} aria-label={`View ${product.name}`} className="block">
          <div className="relative aspect-[3/4] w-full">
            <Image
              src={product.images[0].url}
              alt={product.images[0].alt}
              fill
              sizes={sizes}
              priority={priority}
              loading={priority ? undefined : "lazy"}
              className="object-cover transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.03] group-hover:opacity-0"
            />
            <Image
              src={secondary.url}
              alt={secondary.alt}
              fill
              sizes={sizes}
              loading="lazy"
              className="object-cover opacity-0 transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.03] group-hover:opacity-100"
            />
          </div>
        </Link>

        <div className="pointer-events-none absolute left-3 top-3 flex flex-col gap-1">
          {product.isNew && (
            <span className="bg-[var(--color-ink)]/90 px-2 py-1 text-[10px] uppercase tracking-luxe text-[var(--color-ivory)]">
              New
            </span>
          )}
          {onSale && (
            <span className="bg-[var(--color-ivory)]/95 px-2 py-1 text-[10px] uppercase tracking-luxe text-[var(--color-ink)]">
              Sale
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() => toggleWishlist(product.slug)}
          aria-pressed={wished}
          aria-label={wished ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center bg-[var(--color-ivory)]/80 text-[var(--color-ink)] backdrop-blur transition hover:bg-[var(--color-ivory)]"
        >
          <IconHeart filled={wished} className="h-4 w-4" />
        </button>

        <div className="absolute inset-x-0 bottom-0 flex translate-y-2 gap-px opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 max-md:translate-y-0 max-md:opacity-100">
          <button
            type="button"
            onClick={() => setQuickOpen(true)}
            className="flex-1 bg-[var(--color-ivory)]/95 py-3 text-[11px] uppercase tracking-luxe transition hover:bg-[var(--color-ink)] hover:text-[var(--color-ivory)]"
          >
            Quick view
          </button>
        </div>
      </div>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="font-sans text-[13px] font-normal tracking-wide">
            <Link href={`/products/${product.slug}`} className="link-underline">
              {product.name}
            </Link>
          </h3>
          <div className="mt-2 flex items-center gap-2" aria-label="Available colours">
            {product.colors.map((c) => (
              <span
                key={c.name}
                title={c.name}
                className="h-2.5 w-2.5 rounded-full border border-black/15"
                style={{ backgroundColor: c.hex }}
              >
                <span className="sr-only">{c.name}</span>
              </span>
            ))}
          </div>
        </div>
        <p className="shrink-0 text-right text-[13px]">
          {onSale && (
            <span className="mr-2 text-[var(--color-muted)] line-through">
              {formatPrice(product.compareAtPrice!)}
            </span>
          )}
          <span className={onSale ? "text-[var(--color-ink)]" : ""}>{formatPrice(product.price)}</span>
        </p>
      </div>

      {quickOpen && <QuickView product={product} onClose={() => setQuickOpen(false)} />}
    </article>
  );
}
