import Link from "next/link";
import { Suspense } from "react";
import { applyFilters, facetsFrom, getCategories, getProducts, type ShopFilters } from "@/lib/queries";
import ProductGrid from "@/components/sections/ProductGrid";
import FilterPanel from "@/components/shop/FilterPanel";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, itemListSchema } from "@/lib/schema";

export type SearchParams = Record<string, string | string[] | undefined>;

function asArray(value: string | string[] | undefined) {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

const PER_PAGE = 12;

export default async function CollectionView({
  title,
  description,
  eyebrow,
  basePath,
  lockedCategory,
  searchParams,
  breadcrumbs,
}: {
  title: string;
  description: string;
  eyebrow: string;
  basePath: string;
  lockedCategory?: string;
  searchParams: SearchParams;
  breadcrumbs: { name: string; url: string }[];
}) {
  const [all, categories] = await Promise.all([getProducts(), getCategories()]);

  const scoped = lockedCategory
    ? all.filter((p) => p.categorySlugs.includes(lockedCategory))
    : all;

  const filters: ShopFilters = {
    category: lockedCategory ? undefined : (searchParams.category as string | undefined),
    sizes: asArray(searchParams.size),
    colors: asArray(searchParams.color),
    maxPrice: searchParams.maxPrice ? Number(searchParams.maxPrice) : undefined,
    sort: (searchParams.sort as string | undefined) ?? "featured",
    q: (searchParams.q as string | undefined) ?? undefined,
  };

  const filtered = applyFilters(scoped, filters);
  const page = Math.max(1, Number(searchParams.page ?? 1));
  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const current = Math.min(page, totalPages);
  const visible = filtered.slice((current - 1) * PER_PAGE, current * PER_PAGE);

  const pageHref = (n: number) => {
    const sp = new URLSearchParams();
    Object.entries(searchParams).forEach(([k, v]) => {
      if (k === "page" || v === undefined) return;
      asArray(v).forEach((val) => sp.append(k, val));
    });
    sp.set("page", String(n));
    return `${basePath}?${sp.toString()}`;
  };

  return (
    <>
      <JsonLd data={[breadcrumbSchema(breadcrumbs), itemListSchema(visible, title)]} />

      <div className="mx-auto max-w-[1500px] px-5 pb-24 pt-28 md:px-10 md:pt-36">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-wide text-[var(--color-muted)]">
            {breadcrumbs.map((b, i) => (
              <li key={b.url} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden="true">/</span>}
                {i === breadcrumbs.length - 1 ? (
                  <span className="text-[var(--color-ink)]">{b.name}</span>
                ) : (
                  <Link href={b.url} className="hover:text-[var(--color-ink)]">
                    {b.name}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <header className="max-w-2xl">
          <p className="eyebrow mb-3">{eyebrow}</p>
          <h1 className="font-display text-4xl leading-[1.05] md:text-6xl">{title}</h1>
          <p className="mt-5 text-[14px] leading-relaxed text-[var(--color-muted)]">{description}</p>
        </header>

        <div className="mt-12 grid gap-10 lg:grid-cols-[220px_1fr] lg:gap-14">
          <Suspense fallback={<div className="lg:col-span-2" />}>
            <FilterPanel
              facets={facetsFrom(scoped)}
              categories={categories.map((c) => ({ slug: c.slug, name: c.name }))}
              lockedCategory={lockedCategory}
              total={filtered.length}
            />
          </Suspense>

          <section aria-label="Products" className="lg:col-span-1">
            {visible.length === 0 ? (
              <div className="py-20 text-center">
                <h2 className="font-display text-2xl">No pieces match these filters.</h2>
                <p className="mt-3 text-[13px] text-[var(--color-muted)]">
                  Adjust your selection, or{" "}
                  <Link href={basePath} className="link-underline">
                    view the full collection
                  </Link>
                  .
                </p>
              </div>
            ) : (
              <ProductGrid products={visible} columns={3} priorityCount={3} />
            )}

            {totalPages > 1 && (
              <nav aria-label="Pagination" className="mt-16 flex items-center justify-center gap-2">
                {current > 1 && (
                  <Link
                    href={pageHref(current - 1)}
                    className="border border-[var(--color-ink)]/15 px-4 py-2.5 text-[11px] uppercase tracking-luxe hover:border-[var(--color-green)]"
                  >
                    Previous
                  </Link>
                )}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                  <Link
                    key={n}
                    href={pageHref(n)}
                    aria-current={n === current ? "page" : undefined}
                    className={`border px-4 py-2.5 text-[11px] tracking-luxe ${
                      n === current
                        ? "border-[var(--color-green)] bg-[var(--color-green)] text-[var(--color-paper)]"
                        : "border-[var(--color-ink)]/15 hover:border-[var(--color-green)]"
                    }`}
                  >
                    {n}
                  </Link>
                ))}
                {current < totalPages && (
                  <Link
                    href={pageHref(current + 1)}
                    className="border border-[var(--color-ink)]/15 px-4 py-2.5 text-[11px] uppercase tracking-luxe hover:border-[var(--color-green)]"
                  >
                    Next
                  </Link>
                )}
              </nav>
            )}
          </section>
        </div>
      </div>
    </>
  );
}
