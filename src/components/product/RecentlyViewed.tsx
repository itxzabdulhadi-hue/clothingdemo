"use client";

import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/components/StoreProvider";
import { formatPrice } from "@/lib/site";

type MiniProduct = { slug: string; name: string; price: number; image: string; alt: string };

export default function RecentlyViewed({
  products,
  currentSlug,
}: {
  products: MiniProduct[];
  currentSlug?: string;
}) {
  const { recent } = useStore();
  const items = recent
    .filter((slug) => slug !== currentSlug)
    .map((slug) => products.find((p) => p.slug === slug))
    .filter((p): p is MiniProduct => Boolean(p))
    .slice(0, 5);

  if (items.length === 0) return null;

  return (
    <section aria-labelledby="recently-viewed" className="mx-auto max-w-[1500px] px-5 pb-24 md:px-10">
      <h2 id="recently-viewed" className="eyebrow mb-6">
        Recently viewed
      </h2>
      <ul className="grid grid-cols-2 gap-4 md:grid-cols-5 md:gap-6">
        {items.map((p) => (
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
    </section>
  );
}
