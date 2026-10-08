import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CollectionView, { type SearchParams } from "@/components/shop/CollectionView";
import { getCategories, getCategoryBySlug } from "@/lib/queries";
import { site } from "@/lib/site";

export const revalidate = 600;

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return { title: "Collection not found" };

  const title = `${category.name} — Collection`;
  return {
    title,
    description: category.description,
    alternates: { canonical: `/collections/${category.slug}` },
    openGraph: {
      title: `${category.name} | ${site.name}`,
      description: category.description,
      url: `/collections/${category.slug}`,
      images: category.heroImage ? [{ url: category.heroImage, alt: `${category.name} collection` }] : undefined,
    },
    twitter: { card: "summary_large_image", title: `${category.name} | ${site.name}`, description: category.description },
  };
}

export default async function CollectionPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<SearchParams>;
}) {
  const [{ slug }, sp] = await Promise.all([params, searchParams]);
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  return (
    <CollectionView
      eyebrow={category.group === "department" ? "Department" : "Collection"}
      title={category.name}
      description={category.description}
      basePath={`/collections/${category.slug}`}
      lockedCategory={category.slug}
      searchParams={sp}
      breadcrumbs={[
        { name: "Home", url: "/" },
        { name: "Shop", url: "/shop" },
        { name: category.name, url: `/collections/${category.slug}` },
      ]}
    />
  );
}
