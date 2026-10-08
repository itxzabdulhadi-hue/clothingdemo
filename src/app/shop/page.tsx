import type { Metadata } from "next";
import CollectionView, { type SearchParams } from "@/components/shop/CollectionView";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Shop All — The Full Collection",
  description:
    "Browse the complete Maison Noir collection: outerwear, shirting, knitwear, trousers and accessories in natural European materials. Filter by size, colour and price.",
  alternates: { canonical: "/shop" },
  openGraph: {
    title: `Shop All — ${site.name}`,
    description: "The complete Maison Noir collection, filterable by size, colour and price.",
    url: "/shop",
  },
};

export const revalidate = 600;

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  return (
    <CollectionView
      eyebrow="Collection"
      title="Shop all"
      description="Every piece currently in production, from canvassed overcoats to two-ply cashmere. Made in limited runs across Italy, Portugal, Spain and Scotland."
      basePath="/shop"
      searchParams={sp}
      breadcrumbs={[
        { name: "Home", url: "/" },
        { name: "Shop", url: "/shop" },
      ]}
    />
  );
}
