"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useStore } from "@/components/StoreProvider";
import { formatPrice } from "@/lib/site";
import { IconClose, IconSearch } from "@/components/icons";

type Suggestion = {
  slug: string;
  name: string;
  price: number;
  image: string;
  category: string;
};

const RECENT_KEY = "mn.searches.v1";

const quickLinks = [
  { label: "New Arrivals", href: "/collections/new-arrivals" },
  { label: "Outerwear", href: "/collections/outerwear" },
  { label: "Shirts", href: "/collections/shirts" },
  { label: "Trousers", href: "/collections/trousers" },
  { label: "Accessories", href: "/collections/accessories" },
];

export default function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useStore();
  const [q, setQ] = useState("");
  const [results, setResults] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [recent, setRecent] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(RECENT_KEY);
      if (raw) setRecent(JSON.parse(raw) as string[]);
    } catch {
      /* noop */
    }
  }, []);

  useEffect(() => {
    if (searchOpen) setTimeout(() => inputRef.current?.focus(), 80);
  }, [searchOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSearchOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setSearchOpen]);

  useEffect(() => {
    if (q.trim().length < 2) {
      setResults([]);
      return;
    }
    const controller = new AbortController();
    const t = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`, { signal: controller.signal });
        const data = (await res.json()) as { results: Suggestion[] };
        setResults(data.results);
      } catch {
        /* aborted */
      } finally {
        setLoading(false);
      }
    }, 220);
    return () => {
      controller.abort();
      clearTimeout(t);
    };
  }, [q]);

  const commit = useCallback(
    (term: string) => {
      const next = [term, ...recent.filter((r) => r !== term)].slice(0, 5);
      setRecent(next);
      window.localStorage.setItem(RECENT_KEY, JSON.stringify(next));
    },
    [recent],
  );

  if (!searchOpen) return null;

  return (
    <div className="fixed inset-0 z-[96] animate-fade-in" role="dialog" aria-modal="true" aria-label="Search">
      <div className="absolute inset-0 bg-black/45" onClick={() => setSearchOpen(false)} />
      <div className="relative mx-auto max-h-[88vh] w-full overflow-y-auto bg-[var(--color-ivory)] px-5 pb-10 pt-6 md:px-10">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center justify-between">
            <p className="eyebrow">Search</p>
            <button type="button" onClick={() => setSearchOpen(false)} aria-label="Close search">
              <IconClose className="h-5 w-5" />
            </button>
          </div>
          <form
            className="mt-4 flex items-center gap-3 border-b border-black/20 pb-3"
            onSubmit={(e) => {
              e.preventDefault();
              if (q.trim()) commit(q.trim());
            }}
            role="search"
          >
            <IconSearch className="h-5 w-5 text-[var(--color-muted)]" />
            <label htmlFor="site-search" className="sr-only">
              Search products
            </label>
            <input
              id="site-search"
              ref={inputRef}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search for coats, silk shirts, trousers…"
              className="w-full bg-transparent font-display text-2xl outline-none placeholder:text-[var(--color-muted)] md:text-3xl"
              autoComplete="off"
            />
          </form>

          {q.trim().length < 2 ? (
            <div className="mt-8 grid gap-10 sm:grid-cols-2">
              {recent.length > 0 && (
                <div>
                  <p className="eyebrow">Recent searches</p>
                  <ul className="mt-4 space-y-2 text-sm">
                    {recent.map((r) => (
                      <li key={r}>
                        <button type="button" className="link-underline" onClick={() => setQ(r)}>
                          {r}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div>
                <p className="eyebrow">Explore</p>
                <ul className="mt-4 space-y-2 text-sm">
                  {quickLinks.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="link-underline" onClick={() => setSearchOpen(false)}>
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : loading && results.length === 0 ? (
            <p className="mt-10 text-sm text-[var(--color-muted)]">Searching…</p>
          ) : results.length === 0 ? (
            <div className="mt-10">
              <p className="font-display text-xl">No pieces match “{q}”.</p>
              <p className="mt-2 text-sm text-[var(--color-muted)]">
                Try a different term, or browse the{" "}
                <Link href="/shop" className="link-underline" onClick={() => setSearchOpen(false)}>
                  full collection
                </Link>
                .
              </p>
            </div>
          ) : (
            <ul className="mt-8 divide-y divide-black/10">
              {results.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/products/${r.slug}`}
                    onClick={() => {
                      commit(q.trim());
                      setSearchOpen(false);
                    }}
                    className="flex items-center gap-4 py-3 transition hover:opacity-70"
                  >
                    <span className="relative h-20 w-16 shrink-0 bg-[var(--color-bone)]">
                      <Image src={r.image} alt={r.name} fill sizes="64px" className="object-cover" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[13px]">{r.name}</span>
                      <span className="block text-[11px] uppercase tracking-wide text-[var(--color-muted)]">
                        {r.category}
                      </span>
                    </span>
                    <span className="text-[13px]">{formatPrice(r.price)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
