"use client";

import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/components/StoreProvider";
import { formatPrice, site, whatsappLink, whatsappMessages } from "@/lib/site";
import { IconClose, IconWhatsApp } from "@/components/icons";

export default function CartDrawer() {
  const { items, cartOpen, setCartOpen, setQuantity, removeItem, subtotal } = useStore();
  const shipping = subtotal === 0 || subtotal >= site.shipping.freeThreshold ? 0 : site.shipping.standard;

  return (
    <div
      className={`fixed inset-0 z-[95] ${cartOpen ? "" : "pointer-events-none"}`}
      aria-hidden={!cartOpen}
    >
      <div
        className={`absolute inset-0 bg-[var(--color-ink)]/40 transition-opacity duration-500 ${cartOpen ? "opacity-100" : "opacity-0"}`}
        onClick={() => setCartOpen(false)}
      />
      <aside
        role="dialog"
        aria-modal={cartOpen}
        aria-label="Shopping cart"
        className={`absolute right-0 top-0 flex h-full w-full max-w-[440px] flex-col bg-[var(--color-paper)] shadow-[0_0_80px_-20px_rgba(0,0,0,.5)] transition-transform duration-[650ms] ease-[cubic-bezier(.22,1,.36,1)] ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between border-b border-[var(--color-ink)]/10 px-6 py-5">
          <h2 className="text-[11px] uppercase tracking-luxe">Shopping bag</h2>
          <button type="button" onClick={() => setCartOpen(false)} aria-label="Close cart">
            <IconClose className="h-5 w-5" />
          </button>
        </header>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-5 px-8 text-center">
            <p className="font-display text-2xl">Your bag is empty.</p>
            <p className="text-[13px] text-[var(--color-muted)]">
              Discover the current collection — each piece made in limited quantity.
            </p>
            <Link
              href="/shop"
              onClick={() => setCartOpen(false)}
              className="border border-[var(--color-ink)] px-8 py-3.5 text-[11px] uppercase tracking-luxe transition hover:bg-[var(--color-green)] hover:text-[var(--color-paper)]"
            >
              Shop collection
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-[var(--color-ink)]/10 overflow-y-auto px-6">
              {items.map((item) => (
                <li key={item.key} className="flex gap-4 py-5">
                  <Link href={`/products/${item.slug}`} onClick={() => setCartOpen(false)} className="relative h-28 w-20 shrink-0 bg-[var(--color-mist)]">
                    <Image src={item.image} alt={item.name} fill sizes="80px" className="object-cover" />
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex justify-between gap-3">
                      <p className="text-[13px] leading-snug">{item.name}</p>
                      <p className="shrink-0 text-[13px]">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                    <p className="mt-1 text-[11px] uppercase tracking-wide text-[var(--color-muted)]">
                      {item.color} · Size {item.size}
                    </p>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center border border-[var(--color-ink)]/15">
                        <button
                          type="button"
                          className="px-3 py-1.5 text-sm"
                          aria-label={`Decrease quantity of ${item.name}`}
                          onClick={() => setQuantity(item.key, item.quantity - 1)}
                        >
                          −
                        </button>
                        <span className="min-w-6 text-center text-[12px]">{item.quantity}</span>
                        <button
                          type="button"
                          className="px-3 py-1.5 text-sm"
                          aria-label={`Increase quantity of ${item.name}`}
                          onClick={() => setQuantity(item.key, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.key)}
                        className="text-[11px] uppercase tracking-wide text-[var(--color-muted)] underline-offset-4 hover:text-[var(--color-ink)] hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <footer className="border-t border-[var(--color-ink)]/10 px-6 py-5">
              <dl className="space-y-2 text-[13px]">
                <div className="flex justify-between">
                  <dt className="text-[var(--color-muted)]">Subtotal</dt>
                  <dd>{formatPrice(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[var(--color-muted)]">Estimated shipping</dt>
                  <dd>{shipping === 0 ? "Complimentary" : formatPrice(shipping)}</dd>
                </div>
                <div className="flex justify-between border-t border-[var(--color-ink)]/10 pt-3 text-[15px]">
                  <dt>Total</dt>
                  <dd>{formatPrice(subtotal + shipping)}</dd>
                </div>
              </dl>
              <Link
                href="/checkout"
                onClick={() => setCartOpen(false)}
                className="mt-5 block bg-[var(--color-green)] py-4 text-center text-[11px] uppercase tracking-luxe text-[var(--color-paper)] transition hover:bg-[var(--color-forest)]"
              >
                Proceed to checkout
              </Link>
              <div className="mt-3 flex items-center justify-between">
                <Link
                  href="/cart"
                  onClick={() => setCartOpen(false)}
                  className="text-[11px] uppercase tracking-luxe text-[var(--color-muted)] hover:text-[var(--color-ink)]"
                >
                  View full bag
                </Link>
                <a
                  href={whatsappLink(whatsappMessages.cart)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[11px] uppercase tracking-luxe text-[var(--color-muted)] hover:text-[var(--color-ink)]"
                >
                  <IconWhatsApp className="h-4 w-4" /> Need help?
                </a>
              </div>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
