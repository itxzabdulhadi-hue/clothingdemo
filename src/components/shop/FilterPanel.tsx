"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState, useTransition } from "react";
import { formatPrice } from "@/lib/site";
import { IconClose, IconSearch } from "@/components/icons";

type Facets = {
  sizes: string[];
  colors: { name: string; hex: string }[];
  maxPrice: number;
};

type CategoryOption = { slug: string; name: string };

const sorts = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "bestselling", label: "Best selling" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
];

export default function FilterPanel({
  facets,
  categories,
  lockedCategory,
  total,
}: {
  facets: Facets;
  categories: CategoryOption[];
  lockedCategory?: string;
  total: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState(params.get("q") ?? "");

  const selectedSizes = params.getAll("size");
  const selectedColors = params.getAll("color");
  const maxPrice = Number(params.get("maxPrice") ?? facets.maxPrice);
  const activeCategory = params.get("category") ?? "all";
  const sort = params.get("sort") ?? "featured";

  const push = useCallback(
    (next: URLSearchParams) => {
      next.delete("page");
      startTransition(() => {
        router.push(`${pathname}?${next.toString()}`, { scroll: false });
      });
    },
    [pathname, router],
  );

  const toggleMulti = (key: string, value: string) => {
    const next = new URLSearchParams(params.toString());
    const current = next.getAll(key);
    next.delete(key);
    const updated = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
    updated.forEach((v) => next.append(key, v));
    push(next);
  };

  const setSingle = (key: string, value: string | null) => {
    const next = new URLSearchParams(params.toString());
    if (!value || value === "all") next.delete(key);
    else next.set(key, value);
    push(next);
  };

  useEffect(() => {
    const t = setTimeout(() => {
      const current = params.get("q") ?? "";
      if (q === current) return;
      const next = new URLSearchParams(params.toString());
      if (q) next.set("q", q);
      else next.delete("q");
      push(next);
    }, 350);
    return () => clearTimeout(t);
  }, [q, params, push]);

  const activeCount =
    selectedSizes.length + selectedColors.length + (params.get("maxPrice") ? 1 : 0) + (activeCategory !== "all" ? 1 : 0);

  const filters = (
    <div className="space-y-9">
      {!lockedCategory && (
        <fieldset>
          <legend className="eyebrow mb-3">Category</legend>
          <ul className="flex flex-wrap gap-2 md:block md:space-y-2">
            {[{ slug: "all", name: "All pieces" }, ...categories].map((c) => (
              <li key={c.slug}>
                <button
                  type="button"
                  onClick={() => setSingle("category", c.slug)}
                  aria-pressed={activeCategory === c.slug}
                  className={`text-[13px] transition md:block ${
                    activeCategory === c.slug
                      ? "text-[var(--color-ink)] underline underline-offset-4"
                      : "text-[var(--color-muted)] hover:text-[var(--color-ink)]"
                  } max-md:border max-md:border-[var(--color-ink)]/15 max-md:px-3 max-md:py-1.5 max-md:no-underline`}
                >
                  {c.name}
                </button>
              </li>
            ))}
          </ul>
        </fieldset>
      )}

      <fieldset>
        <legend className="eyebrow mb-3">Size</legend>
        <div className="flex flex-wrap gap-2">
          {facets.sizes.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => toggleMulti("size", s)}
              aria-pressed={selectedSizes.includes(s)}
              className={`min-w-11 border px-3 py-2 text-[12px] transition ${
                selectedSizes.includes(s)
                  ? "border-[var(--color-green)] bg-[var(--color-green)] text-[var(--color-paper)]"
                  : "border-[var(--color-ink)]/15 hover:border-[var(--color-green)]"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="eyebrow mb-3">Colour</legend>
        <ul className="space-y-2">
          {facets.colors.map((c) => (
            <li key={c.name}>
              <button
                type="button"
                onClick={() => toggleMulti("color", c.name)}
                aria-pressed={selectedColors.includes(c.name)}
                className="flex items-center gap-3 text-[13px]"
              >
                <span
                  className={`h-3.5 w-3.5 rounded-full border ${
                    selectedColors.includes(c.name)
                      ? "border-[var(--color-green)] ring-1 ring-[var(--color-green)] ring-offset-2"
                      : "border-[var(--color-ink)]/20"
                  }`}
                  style={{ backgroundColor: c.hex }}
                />
                <span className={selectedColors.includes(c.name) ? "" : "text-[var(--color-muted)]"}>{c.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </fieldset>

      <fieldset>
        <legend className="eyebrow mb-3">Price — up to {formatPrice(maxPrice)}</legend>
        <input
          type="range"
          min={100}
          max={facets.maxPrice}
          step={50}
          value={maxPrice}
          onChange={(e) => setSingle("maxPrice", e.target.value)}
          aria-label="Maximum price"
          className="w-full accent-[var(--color-green)]"
        />
      </fieldset>

      {activeCount > 0 && (
        <button
          type="button"
          onClick={() => {
            const next = new URLSearchParams();
            const sortValue = params.get("sort");
            if (sortValue) next.set("sort", sortValue);
            push(next);
          }}
          className="text-[11px] uppercase tracking-luxe underline underline-offset-4"
        >
          Clear filters ({activeCount})
        </button>
      )}
    </div>
  );

  return (
    <>
      {/* Toolbar */}
      <div className="mb-2 flex w-full flex-wrap items-center gap-3 border-y border-[var(--color-ink)]/10 py-4 lg:col-span-2">
        <div className="flex flex-1 items-center gap-2 border border-[var(--color-ink)]/15 px-3 py-2">
          <IconSearch className="h-4 w-4 text-[var(--color-muted)]" />
          <label htmlFor="shop-search" className="sr-only">
            Search within collection
          </label>
          <input
            id="shop-search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search this collection"
            className="w-full bg-transparent text-[13px] outline-none placeholder:text-[var(--color-muted)]"
          />
        </div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="border border-[var(--color-ink)]/15 px-4 py-2.5 text-[11px] uppercase tracking-luxe lg:hidden"
        >
          Filters{activeCount > 0 ? ` (${activeCount})` : ""}
        </button>
        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="eyebrow hidden sm:block">
            Sort
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSingle("sort", e.target.value)}
            className="border border-[var(--color-ink)]/15 bg-transparent px-3 py-2.5 text-[12px] outline-none"
          >
            {sorts.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
        <p className="hidden text-[12px] text-[var(--color-muted)] md:block">{total} pieces</p>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden lg:block" aria-label="Product filters">
        {filters}
      </aside>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-[94] lg:hidden" role="dialog" aria-modal="true" aria-label="Filters">
          <div className="absolute inset-0 bg-[var(--color-ink)]/40" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-[88%] max-w-sm overflow-y-auto bg-[var(--color-paper)] p-6">
            <div className="mb-8 flex items-center justify-between">
              <p className="eyebrow">Filters</p>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close filters">
                <IconClose className="h-5 w-5" />
              </button>
            </div>
            {filters}
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="mt-10 w-full bg-[var(--color-green)] py-4 text-[11px] uppercase tracking-luxe text-[var(--color-paper)]"
            >
              Show {total} pieces
            </button>
          </div>
        </div>
      )}
    </>
  );
}
