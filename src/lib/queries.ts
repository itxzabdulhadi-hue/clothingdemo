import { asc } from "drizzle-orm";
import { db } from "@/db";
import { categories, products } from "@/db/schema";
import { categorySeed, productSeed } from "@/data/catalog";
import { site } from "@/lib/site";

export type Product = typeof products.$inferSelect;
export type Category = typeof categories.$inferSelect;

const fallbackProducts: Product[] = productSeed.map((p, i) => ({
  id: i + 1,
  slug: p.slug,
  name: p.name,
  sku: p.sku,
  price: p.price,
  compareAtPrice: p.compareAtPrice ?? null,
  currency: site.currency,
  shortDescription: p.shortDescription,
  description: p.description,
  details: p.details,
  images: p.images,
  videoUrl: null,
  colors: p.colors,
  sizes: p.sizes,
  categorySlugs: p.categorySlugs,
  tags: p.tags,
  inventory: p.inventory,
  isFeatured: Boolean(p.isFeatured),
  isNew: Boolean(p.isNew),
  isBestSeller: Boolean(p.isBestSeller),
  position: p.position,
  createdAt: new Date(),
}));

const fallbackCategories: Category[] = categorySeed.map((c, i) => ({
  id: i + 1,
  slug: c.slug,
  name: c.name,
  description: c.description,
  heroImage: c.heroImage,
  position: c.position,
  group: c.group,
}));

export async function getProducts(): Promise<Product[]> {
  try {
    const rows = await db.select().from(products).orderBy(asc(products.position));
    if (rows.length > 0) return rows;
  } catch {
    // Database not reachable yet — fall back to the structured catalog.
  }
  return fallbackProducts;
}

export async function getCategories(): Promise<Category[]> {
  try {
    const rows = await db.select().from(categories).orderBy(asc(categories.position));
    if (rows.length > 0) return rows;
  } catch {
    // ignore
  }
  return fallbackCategories;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const all = await getProducts();
  return all.find((p) => p.slug === slug) ?? null;
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const all = await getCategories();
  return all.find((c) => c.slug === slug) ?? null;
}

export async function getFeatured(limit = 8) {
  return (await getProducts()).filter((p) => p.isFeatured).slice(0, limit);
}

export async function getNewArrivals(limit = 6) {
  return (await getProducts()).filter((p) => p.isNew).slice(0, limit);
}

export async function getBestSellers(limit = 4) {
  return (await getProducts()).filter((p) => p.isBestSeller).slice(0, limit);
}

export async function getRelated(product: Product, limit = 4) {
  const all = await getProducts();
  const scored = all
    .filter((p) => p.slug !== product.slug)
    .map((p) => {
      const sharedCat = p.categorySlugs.filter((c) => product.categorySlugs.includes(c)).length;
      const sharedTag = p.tags.filter((t) => product.tags.includes(t)).length;
      return { p, score: sharedCat * 2 + sharedTag };
    })
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.p);
}

export type ShopFilters = {
  category?: string;
  sizes?: string[];
  colors?: string[];
  maxPrice?: number;
  minPrice?: number;
  sort?: string;
  q?: string;
  page?: number;
  perPage?: number;
};

export function applyFilters(all: Product[], f: ShopFilters) {
  let list = [...all];
  if (f.category && f.category !== "all") {
    list = list.filter((p) => p.categorySlugs.includes(f.category as string));
  }
  if (f.sizes?.length) {
    list = list.filter((p) => p.sizes.some((s) => f.sizes!.includes(s)));
  }
  if (f.colors?.length) {
    list = list.filter((p) => p.colors.some((c) => f.colors!.includes(c.name)));
  }
  if (typeof f.minPrice === "number") list = list.filter((p) => p.price >= f.minPrice!);
  if (typeof f.maxPrice === "number") list = list.filter((p) => p.price <= f.maxPrice!);
  if (f.q) {
    const q = f.q.toLowerCase();
    list = list.filter((p) =>
      [p.name, p.description, p.shortDescription, p.sku, ...p.tags, ...p.categorySlugs]
        .join(" ")
        .toLowerCase()
        .includes(q),
    );
  }
  switch (f.sort) {
    case "price-asc":
      list.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      list.sort((a, b) => b.price - a.price);
      break;
    case "newest":
      list.sort((a, b) => Number(b.isNew) - Number(a.isNew) || a.position - b.position);
      break;
    case "bestselling":
      list.sort((a, b) => Number(b.isBestSeller) - Number(a.isBestSeller) || a.position - b.position);
      break;
    default:
      list.sort((a, b) => a.position - b.position);
  }
  return list;
}

export function facetsFrom(all: Product[]) {
  const sizes = new Set<string>();
  const colors = new Map<string, string>();
  let max = 0;
  for (const p of all) {
    p.sizes.forEach((s) => sizes.add(s));
    p.colors.forEach((c) => colors.set(c.name, c.hex));
    max = Math.max(max, p.price);
  }
  return {
    sizes: [...sizes],
    colors: [...colors.entries()].map(([name, hex]) => ({ name, hex })),
    maxPrice: Math.ceil(max / 100) * 100,
  };
}
