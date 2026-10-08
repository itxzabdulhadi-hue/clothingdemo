import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, getProducts, getRelated } from "@/lib/queries";
import { formatPrice, site } from "@/lib/site";
import { breadcrumbSchema, productSchema } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";
import ProductGallery from "@/components/product/ProductGallery";
import BuyBox from "@/components/product/BuyBox";
import RecentlyViewed from "@/components/product/RecentlyViewed";
import ProductGrid from "@/components/sections/ProductGrid";
import SectionHeading from "@/components/sections/SectionHeading";

export const revalidate = 600;

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product not found" };

  const description = `${product.shortDescription} ${product.details.material}. ${formatPrice(product.price)}, shipped worldwide from ${site.name}.`;

  return {
    title: product.name,
    description,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      type: "website",
      title: `${product.name} | ${site.name}`,
      description,
      url: `/products/${product.slug}`,
      images: product.images.map((i) => ({ url: i.url, alt: i.alt })),
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | ${site.name}`,
      description,
      images: [product.images[0].url],
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const [related, all] = await Promise.all([getRelated(product, 4), getProducts()]);
  const mini = all.map((p) => ({
    slug: p.slug,
    name: p.name,
    price: p.price,
    image: p.images[0].url,
    alt: p.images[0].alt,
  }));

  const crumbs = [
    { name: "Home", url: "/" },
    { name: "Shop", url: "/shop" },
    { name: product.name, url: `/products/${product.slug}` },
  ];

  const info = [
    { title: "Material", body: product.details.material },
    { title: "Fit", body: product.details.fit },
    { title: "Care", body: product.details.care },
    {
      title: "Shipping",
      body: `Dispatched within 48 hours from our European atelier. Complimentary tracked shipping on orders above ${formatPrice(site.shipping.freeThreshold)}; otherwise ${formatPrice(site.shipping.standard)} standard or ${formatPrice(site.shipping.express)} express. Duties are calculated at checkout for non-EU destinations.`,
    },
    {
      title: "Returns",
      body: "Unworn pieces may be returned within 14 days of delivery with original packaging and tags. Return labels are issued by our client care team — contact us by email or WhatsApp to begin.",
    },
    { title: "Origin", body: product.details.origin },
  ];

  return (
    <>
      <JsonLd data={[productSchema(product), breadcrumbSchema(crumbs)]} />

      <article className="mx-auto max-w-[1500px] px-5 pb-20 pt-24 md:px-10 md:pt-36">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-wide text-[var(--color-muted)]">
            {crumbs.map((c, i) => (
              <li key={c.url} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden="true">/</span>}
                {i === crumbs.length - 1 ? (
                  <span className="text-[var(--color-ink)]">{c.name}</span>
                ) : (
                  <Link href={c.url} className="hover:text-[var(--color-ink)]">
                    {c.name}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <ProductGallery images={product.images} videoUrl={product.videoUrl} name={product.name} />

          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow mb-3">{product.sku}</p>
            <h1 className="font-display text-[2.25rem] leading-[1.05] md:text-[3rem]">{product.name}</h1>
            <p className="mt-4 max-w-md text-[14px] leading-relaxed text-[var(--color-muted)]">
              {product.shortDescription}
            </p>

            <BuyBox product={product} />

            <div className="mt-12">
              <h2 className="sr-only">Product information</h2>
              <div className="border-t border-black/10">
                {info.map((row) => (
                  <details key={row.title} className="group border-b border-black/10">
                    <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-[11px] uppercase tracking-luxe">
                      {row.title}
                      <span className="text-base transition-transform duration-300 group-open:rotate-45" aria-hidden="true">
                        +
                      </span>
                    </summary>
                    <p className="pb-5 text-[13.5px] leading-relaxed text-[var(--color-muted)]">{row.body}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>

        <section className="mt-16 max-w-3xl">
          <h2 className="eyebrow mb-4">The piece</h2>
          <p className="font-display text-xl leading-relaxed md:text-[1.6rem]">{product.description}</p>
        </section>
      </article>

      {related.length > 0 && (
        <section className="mx-auto max-w-[1500px] px-5 pb-20 md:px-10">
          <SectionHeading eyebrow="Complete the look" title="You may also like" href="/shop" level={2} />
          <ProductGrid products={related} />
        </section>
      )}

      <RecentlyViewed products={mini} currentSlug={product.slug} />
    </>
  );
}
