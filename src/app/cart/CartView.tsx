"use client";

import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/components/StoreProvider";
import { formatPrice, site, whatsappLink, whatsappMessages } from "@/lib/site";
import { IconWhatsApp } from "@/components/icons";

export default function CartView() {
  const { items, setQuantity, removeItem, subtotal } = useStore();
  const shipping = subtotal === 0 || subtotal >= site.shipping.freeThreshold ? 0 : site.shipping.standard;

  if (items.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="font-display text-3xl">Your bag is empty.</p>
        <p className="mt-3 text-[14px] text-[var(--color-muted)]">
          Each piece is produced in limited quantity — explore what is currently available.
        </p>
        <Link
          href="/shop"
          className="mt-8 inline-block bg-[var(--color-ink)] px-10 py-4 text-[11px] uppercase tracking-luxe text-[var(--color-ivory)]"
        >
          Shop collection
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
      <section aria-label="Bag items">
        <ul className="divide-y divide-black/10 border-y border-black/10">
          {items.map((item) => (
            <li key={item.key} className="flex gap-5 py-6">
              <Link href={`/products/${item.slug}`} className="relative h-40 w-28 shrink-0 bg-[var(--color-bone)]">
                <Image src={item.image} alt={item.name} fill sizes="112px" className="object-cover" />
              </Link>
              <div className="flex flex-1 flex-col">
                <div className="flex justify-between gap-4">
                  <div>
                    <h2 className="text-[14px]">
                      <Link href={`/products/${item.slug}`} className="link-underline">
                        {item.name}
                      </Link>
                    </h2>
                    <p className="mt-1.5 text-[12px] uppercase tracking-wide text-[var(--color-muted)]">
                      {item.color} · Size {item.size}
                    </p>
                  </div>
                  <p className="text-[14px]">{formatPrice(item.price * item.quantity)}</p>
                </div>
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center border border-black/15">
                    <button type="button" aria-label="Decrease quantity" className="px-3.5 py-2" onClick={() => setQuantity(item.key, item.quantity - 1)}>
                      −
                    </button>
                    <span className="min-w-7 text-center text-[13px]">{item.quantity}</span>
                    <button type="button" aria-label="Increase quantity" className="px-3.5 py-2" onClick={() => setQuantity(item.key, item.quantity + 1)}>
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeItem(item.key)}
                    className="text-[11px] uppercase tracking-luxe text-[var(--color-muted)] underline-offset-4 hover:text-[var(--color-ink)] hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <aside aria-label="Order summary" className="lg:sticky lg:top-28 lg:self-start">
        <h2 className="eyebrow mb-6">Summary</h2>
        <dl className="space-y-3 border-y border-black/10 py-6 text-[14px]">
          <div className="flex justify-between">
            <dt className="text-[var(--color-muted)]">Subtotal</dt>
            <dd>{formatPrice(subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-[var(--color-muted)]">Estimated shipping</dt>
            <dd>{shipping === 0 ? "Complimentary" : formatPrice(shipping)}</dd>
          </div>
          <div className="flex justify-between pt-3 text-[16px]">
            <dt>Total</dt>
            <dd>{formatPrice(subtotal + shipping)}</dd>
          </div>
        </dl>
        <p className="mt-4 text-[12px] text-[var(--color-muted)]">
          Complimentary shipping on orders above {formatPrice(site.shipping.freeThreshold)}. Duties calculated at
          checkout for non-EU destinations.
        </p>
        <Link
          href="/checkout"
          className="mt-7 block bg-[var(--color-ink)] py-4 text-center text-[11px] uppercase tracking-luxe text-[var(--color-ivory)] transition hover:bg-[var(--color-charcoal)]"
        >
          Proceed to checkout
        </Link>
        <a
          href={whatsappLink(whatsappMessages.cart)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 flex items-center justify-center gap-2 border border-black/15 py-4 text-[11px] uppercase tracking-luxe transition hover:border-[var(--color-ink)]"
        >
          <IconWhatsApp className="h-4 w-4" /> Help with my order
        </a>
      </aside>
    </div>
  );
}
