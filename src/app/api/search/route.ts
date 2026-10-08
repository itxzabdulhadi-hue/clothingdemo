import { NextResponse } from "next/server";
import { applyFilters, getProducts } from "@/lib/queries";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") ?? "").trim();
  if (q.length < 2) return NextResponse.json({ results: [] });

  const all = await getProducts();
  const results = applyFilters(all, { q }).slice(0, 8).map((p) => ({
    slug: p.slug,
    name: p.name,
    price: p.price,
    image: p.images[0].url,
    category: p.categorySlugs[0]?.replace("-", " ") ?? "collection",
  }));

  return NextResponse.json({ results });
}
