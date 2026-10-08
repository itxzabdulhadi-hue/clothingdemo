"use client";

import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/components/StoreProvider";
import { formatPrice } from "@/lib/site";

type MiniProduct = { slug: string; name: string; price: number; image: string; alt: string };

export default function AccountView({ products }: { products: MiniProduct[] }) {
  const { wishlist, recent } = useStore();
  const wished = products.filter((p) => wishlist.includes(p.slug));
  const seen = recent.map((s) => products.find((p) => p.slug === s)).filter((p): p is MiniProduct => Boolean(p));

  return (
    <div className="space-y-20">
      <section aria-labelledby="wishlist-heading">
        <h2 id="wishlist-heading" className="eyebrow mb-6">
          Wishlist
        </h2>
        {wished.length === 0 ? (
          <p className="text-[14px] text-[var(--color-muted)]">
            Nothing saved yet. Use the heart on any product to keep it here.
          </p>
        ) : (
          <Grid products={wished} />
        )}
      </section>

      <section aria-labelledby="recent-heading">
        <h2 id="recent-heading" className="eyebrow mb-6">
          Recently viewed
        </h2>
        {seen.length === 0 ? (
          <p className="text-[14px] text-[var(--color-muted)]">Your browsing history will appear here.</p>
        ) : (
          <Grid products={seen} />
        )}
      </section>
    </div>
  );
}

function Grid({ products }: { products: MiniProduct[] }) {
  return (
    <ul className="grid grid-cols-2 gap-5 md:grid-cols-4 lg:grid-cols-5">
      {products.map((p) => (
        <li key={p.slug}>
          <Link href={`/products/${p.slug}`} className="group block">
            <span className="relative block aspect-[3/4] overflow-hidden bg-[var(--color-bone)]">
              <Image
                src={p.image}
                alt={p.alt}
                fill
                sizes="(max-width: 768px) 50vw, 18vw"
                loading="lazy"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </span>
            <span className="mt-3 block text-[12.5px]">{p.name}</span>
            <span className="block text-[12.5px] text-[var(--color-muted)]">{formatPrice(p.price)}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
