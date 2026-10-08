"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Product } from "@/lib/queries";
import { formatPrice, whatsappLink, whatsappMessages } from "@/lib/site";
import { useStore } from "@/components/StoreProvider";
import { IconHeart, IconWhatsApp, IconClose } from "@/components/icons";

const sizeGuide = [
  { size: "XS", chest: "86–90", waist: "70–74", hip: "88–92" },
  { size: "S", chest: "91–96", waist: "75–80", hip: "93–98" },
  { size: "M", chest: "97–102", waist: "81–86", hip: "99–104" },
  { size: "L", chest: "103–109", waist: "87–93", hip: "105–111" },
  { size: "XL", chest: "110–117", waist: "94–101", hip: "112–119" },
];

export default function BuyBox({ product }: { product: Product }) {
  const router = useRouter();
  const { addItem, toggleWishlist, isWishlisted, pushRecent } = useStore();
  const [size, setSize] = useState(product.sizes[0]);
  const [color, setColor] = useState(product.colors[0].name);
  const [qty, setQty] = useState(1);
  const [guideOpen, setGuideOpen] = useState(false);
  const wished = isWishlisted(product.slug);
  const onSale = Boolean(product.compareAtPrice && product.compareAtPrice > product.price);

  useEffect(() => {
    pushRecent(product.slug);
  }, [product.slug, pushRecent]);

  const payload = {
    slug: product.slug,
    name: product.name,
    price: product.price,
    image: product.images[0].url,
    size,
    color,
    quantity: qty,
  };

  return (
    <div>
      <div className="flex items-baseline gap-3">
        <p className="text-[15px]">
          {onSale && (
            <span className="mr-3 text-[var(--color-muted)] line-through">
              {formatPrice(product.compareAtPrice!)}
            </span>
          )}
          {formatPrice(product.price)}
        </p>
        {onSale && (
          <span className="bg-[var(--color-ink)] px-2 py-1 text-[10px] uppercase tracking-luxe text-[var(--color-ivory)]">
            Archive price
          </span>
        )}
      </div>
      <p className="mt-2 text-[12px] text-[var(--color-muted)]">
        {product.inventory > 0 ? `In stock — ${product.inventory} available` : "Currently unavailable"} · Tax included
      </p>

      <fieldset className="mt-9">
        <legend className="eyebrow mb-3">Colour — {color}</legend>
        <div className="flex gap-3">
          {product.colors.map((c) => (
            <button
              key={c.name}
              type="button"
              onClick={() => setColor(c.name)}
              aria-label={c.name}
              aria-pressed={color === c.name}
              className={`h-7 w-7 rounded-full border transition ${
                color === c.name
                  ? "border-[var(--color-ink)] ring-1 ring-[var(--color-ink)] ring-offset-2"
                  : "border-black/15 hover:border-black/40"
              }`}
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-8">
        <div className="mb-3 flex items-center justify-between">
          <legend className="eyebrow">Size</legend>
          <button
            type="button"
            onClick={() => setGuideOpen(true)}
            className="text-[11px] uppercase tracking-luxe underline underline-offset-4 text-[var(--color-muted)] hover:text-[var(--color-ink)]"
          >
            Size guide
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSize(s)}
              aria-pressed={size === s}
              className={`min-w-14 border px-4 py-3 text-[12px] tracking-wide transition ${
                size === s
                  ? "border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--color-ivory)]"
                  : "border-black/15 hover:border-[var(--color-ink)]"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="mt-8 flex items-center gap-4">
        <span className="eyebrow">Quantity</span>
        <div className="flex items-center border border-black/15">
          <button type="button" aria-label="Decrease quantity" className="px-4 py-2.5" onClick={() => setQty((q) => Math.max(1, q - 1))}>
            −
          </button>
          <span className="min-w-8 text-center text-[13px]">{qty}</span>
          <button type="button" aria-label="Increase quantity" className="px-4 py-2.5" onClick={() => setQty((q) => Math.min(10, q + 1))}>
            +
          </button>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3">
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => addItem(payload)}
            className="flex-1 bg-[var(--color-ink)] py-4 text-[11px] uppercase tracking-luxe text-[var(--color-ivory)] transition hover:bg-[var(--color-charcoal)]"
          >
            Add to cart
          </button>
          <button
            type="button"
            onClick={() => toggleWishlist(product.slug)}
            aria-pressed={wished}
            aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
            className="grid w-14 place-items-center border border-black/20 transition hover:border-[var(--color-ink)]"
          >
            <IconHeart filled={wished} className="h-5 w-5" />
          </button>
        </div>
        <button
          type="button"
          onClick={() => {
            addItem(payload, { open: false });
            router.push("/checkout");
          }}
          className="border border-[var(--color-ink)] py-4 text-[11px] uppercase tracking-luxe transition hover:bg-[var(--color-ink)] hover:text-[var(--color-ivory)]"
        >
          Buy now
        </button>
        <a
          href={whatsappLink(whatsappMessages.productVariant(product.name, size, color))}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-3 border border-[#1f7a4d] py-4 text-[11px] uppercase tracking-luxe text-[#1f7a4d] transition hover:bg-[#1f7a4d] hover:text-white"
        >
          <IconWhatsApp className="h-4 w-4" />
          Ask about this product on WhatsApp
        </a>
      </div>

      {/* Sticky mobile add to cart */}
      <div className="fixed inset-x-0 bottom-0 z-[55] flex items-center gap-3 border-t border-black/10 bg-[var(--color-ivory)]/95 px-4 py-3 backdrop-blur md:hidden">
        <div className="min-w-0 flex-1">
          <p className="truncate text-[12px]">{product.name}</p>
          <p className="text-[12px] text-[var(--color-muted)]">
            {formatPrice(product.price)} · {size}
          </p>
        </div>
        <button
          type="button"
          onClick={() => addItem(payload)}
          className="shrink-0 bg-[var(--color-ink)] px-6 py-3.5 text-[11px] uppercase tracking-luxe text-[var(--color-ivory)]"
        >
          Add to cart
        </button>
      </div>

      {guideOpen && (
        <div className="fixed inset-0 z-[97] grid place-items-center p-4" role="dialog" aria-modal="true" aria-label="Size guide">
          <div className="absolute inset-0 bg-black/45" onClick={() => setGuideOpen(false)} />
          <div className="relative z-10 w-full max-w-lg bg-[var(--color-ivory)] p-6 md:p-8">
            <div className="flex items-start justify-between">
              <h2 className="font-display text-2xl">Size guide</h2>
              <button type="button" onClick={() => setGuideOpen(false)} aria-label="Close size guide">
                <IconClose className="h-5 w-5" />
              </button>
            </div>
            <p className="mt-2 text-[12.5px] text-[var(--color-muted)]">
              Measurements in centimetres, taken on the body. For between-sizes, we recommend sizing up.
            </p>
            <table className="mt-6 w-full border-collapse text-[13px]">
              <thead>
                <tr className="border-b border-black/15 text-left">
                  <th scope="col" className="py-2 font-normal">Size</th>
                  <th scope="col" className="py-2 font-normal">Chest</th>
                  <th scope="col" className="py-2 font-normal">Waist</th>
                  <th scope="col" className="py-2 font-normal">Hip</th>
                </tr>
              </thead>
              <tbody>
                {sizeGuide.map((row) => (
                  <tr key={row.size} className="border-b border-black/8">
                    <th scope="row" className="py-2.5 text-left font-normal">{row.size}</th>
                    <td className="py-2.5">{row.chest}</td>
                    <td className="py-2.5">{row.waist}</td>
                    <td className="py-2.5">{row.hip}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <a
              href={whatsappLink(whatsappMessages.product(product.name))}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-luxe underline underline-offset-4"
            >
              <IconWhatsApp className="h-4 w-4" /> Ask an advisor about fit
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
