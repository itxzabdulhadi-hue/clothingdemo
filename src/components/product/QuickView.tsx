"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Product } from "@/lib/queries";
import { formatPrice } from "@/lib/site";
import { useStore } from "@/components/StoreProvider";
import { IconClose } from "@/components/icons";

export default function QuickView({ product, onClose }: { product: Product; onClose: () => void }) {
  const { addItem } = useStore();
  const [size, setSize] = useState(product.sizes[0]);
  const [color, setColor] = useState(product.colors[0].name);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Quick view: ${product.name}`}
      className="fixed inset-0 z-[90] flex items-end justify-center bg-[var(--color-ink)]/45 p-0 animate-fade-in sm:items-center sm:p-6"
    >
      <button type="button" aria-label="Close quick view" className="absolute inset-0 cursor-default" onClick={onClose} />
      <div className="relative z-10 grid w-full max-w-3xl grid-cols-1 bg-[var(--color-paper)] sm:grid-cols-2">
        <div className="relative hidden aspect-[3/4] sm:block">
          <Image
            src={product.images[0].url}
            alt={product.images[0].alt}
            fill
            sizes="(max-width: 640px) 100vw, 380px"
            className="object-cover"
          />
        </div>
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <h2 className="font-display text-2xl leading-tight">{product.name}</h2>
            <button type="button" onClick={onClose} aria-label="Close quick view" className="p-1">
              <IconClose className="h-5 w-5" />
            </button>
          </div>
          <p className="mt-2 text-[13px] text-[var(--color-muted)]">{product.shortDescription}</p>
          <p className="mt-4 text-sm">
            {product.compareAtPrice && (
              <span className="mr-2 text-[var(--color-muted)] line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
            {formatPrice(product.price)}
          </p>

          <fieldset className="mt-6">
            <legend className="eyebrow mb-2">Colour — {color}</legend>
            <div className="flex gap-2">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => setColor(c.name)}
                  aria-label={c.name}
                  aria-pressed={color === c.name}
                  className={`h-6 w-6 rounded-full border transition ${
                    color === c.name ? "border-[var(--color-green)] ring-1 ring-[var(--color-green)] ring-offset-2" : "border-[var(--color-ink)]/15"
                  }`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </fieldset>

          <fieldset className="mt-5">
            <legend className="eyebrow mb-2">Size</legend>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  aria-pressed={size === s}
                  className={`min-w-11 border px-3 py-2 text-[12px] tracking-wide transition ${
                    size === s
                      ? "border-[var(--color-green)] bg-[var(--color-green)] text-[var(--color-paper)]"
                      : "border-[var(--color-ink)]/15 hover:border-[var(--color-green)]"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </fieldset>

          <button
            type="button"
            onClick={() => {
              addItem({
                slug: product.slug,
                name: product.name,
                price: product.price,
                image: product.images[0].url,
                size,
                color,
                quantity: 1,
              });
              onClose();
            }}
            className="mt-7 w-full bg-[var(--color-green)] py-4 text-[11px] uppercase tracking-luxe text-[var(--color-paper)] transition hover:bg-[var(--color-forest)]"
          >
            Add to cart
          </button>
          <Link
            href={`/products/${product.slug}`}
            className="mt-3 block text-center text-[11px] uppercase tracking-luxe text-[var(--color-muted)] hover:text-[var(--color-ink)]"
          >
            View full details
          </Link>
        </div>
      </div>
    </div>
  );
}
