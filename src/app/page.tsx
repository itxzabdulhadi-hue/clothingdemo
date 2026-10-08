import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { editorialImages } from "@/data/catalog";
import { getBestSellers, getFeatured, getNewArrivals } from "@/lib/queries";
import { site } from "@/lib/site";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/sections/SectionHeading";
import ProductGrid from "@/components/sections/ProductGrid";
import TrustBar from "@/components/sections/TrustBar";
import NewsletterSection from "@/components/sections/NewsletterSection";
import SocialGallery from "@/components/sections/SocialGallery";
import { IconArrow } from "@/components/icons";

export const metadata: Metadata = {
  title: `${site.name} — Modern Luxury Clothing | ${site.tagline}`,
  description:
    "Discover Maison Noir: modern silhouettes in double-faced wool, silk and cashmere. Limited runs, made in Europe, shipped worldwide.",
  alternates: { canonical: "/" },
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: "/",
    images: [{ url: editorialImages.hero, width: 1200, height: 630, alt: `${site.name} seasonal campaign` }],
  },
};

export const revalidate = 600;

export default async function HomePage() {
  const [featured, newArrivals, bestSellers] = await Promise.all([
    getFeatured(8),
    getNewArrivals(3),
    getBestSellers(4),
  ]);

  return (
    <>
      {/* HERO */}
      <section className="relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-[var(--color-ink)]">
        <Image
          src={editorialImages.hero}
          alt="Maison Noir campaign — models in tailored black and ivory looks"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          className="object-cover object-center opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/15 to-black/65" />
        <div className="relative mx-auto flex h-full max-w-[1500px] flex-col justify-end px-5 pb-16 text-[var(--color-ivory)] md:px-10 md:pb-24">
          <p className="animate-fade-up eyebrow text-white/70">Autumn — Winter Collection</p>
          <h1 className="animate-fade-up mt-5 max-w-3xl font-display text-[3.25rem] leading-[0.95] md:text-[6.5rem]">
            {site.tagline}
          </h1>
          <p
            className="animate-fade-up mt-5 max-w-md text-[14px] leading-relaxed text-white/75 md:text-[15px]"
            style={{ animationDelay: "140ms" }}
          >
            {site.subTagline} Crafted in limited runs from double-faced wool, sand-washed silk and grade-A cashmere.
          </p>
          <div className="animate-fade-up mt-9 flex flex-wrap gap-3" style={{ animationDelay: "260ms" }}>
            <Link
              href="/shop"
              className="bg-[var(--color-ivory)] px-9 py-4 text-[11px] uppercase tracking-luxe text-[var(--color-ink)] transition hover:bg-[var(--color-beige)]"
            >
              Shop collection
            </Link>
            <Link
              href="#featured"
              className="border border-white/50 px-9 py-4 text-[11px] uppercase tracking-luxe text-white transition hover:border-white hover:bg-white/10"
            >
              Explore
            </Link>
          </div>
        </div>
      </section>

      <TrustBar />

      {/* FEATURED */}
      <section id="featured" className="mx-auto max-w-[1500px] scroll-mt-24 px-5 py-20 md:px-10 md:py-28">
        <SectionHeading
          eyebrow="Featured"
          title="The edited selection"
          description="Eight pieces that define the season — considered proportion, natural fibres, nothing superfluous."
          href="/shop"
          hrefLabel="Shop all"
        />
        <ProductGrid products={featured} priorityCount={2} />
      </section>

      {/* BRAND STATEMENT */}
      <section aria-labelledby="statement-heading" className="relative isolate overflow-hidden bg-[var(--color-ink)] text-[var(--color-ivory)]">
        <Image
          src={editorialImages.statement}
          alt="Three models in refined black tailoring"
          fill
          sizes="100vw"
          loading="lazy"
          className="object-cover opacity-35"
        />
        <div className="relative mx-auto max-w-[1100px] px-5 py-28 text-center md:px-10 md:py-40">
          <Reveal>
            <p className="eyebrow text-white/50">The house philosophy</p>
            <h2 id="statement-heading" className="mx-auto mt-6 max-w-3xl font-display text-[2.25rem] leading-[1.12] md:text-[3.75rem]">
              Created for those who appreciate the details others overlook.
            </h2>
            <p className="mx-auto mt-7 max-w-xl text-[14px] leading-relaxed text-white/65">
              Every garment begins with the cloth. We work with a small group of European mills and finish in
              family-run workshops, producing in limited quantity so nothing is wasted and nothing is rushed.
            </p>
            <Link
              href="/about"
              className="group mt-10 inline-flex items-center gap-3 border-b border-white/40 pb-2 text-[11px] uppercase tracking-luxe"
            >
              Our story
              <IconArrow className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section className="mx-auto max-w-[1500px] px-5 py-20 md:px-10 md:py-28">
        <SectionHeading
          eyebrow="Just arrived"
          title="New arrivals"
          description="Released in small drops throughout the season. Once a run is finished, it is not repeated."
          href="/collections/new-arrivals"
        />
        <ProductGrid products={newArrivals} columns={3} />
      </section>

      {/* LOOKBOOK */}
      <section aria-labelledby="lookbook-heading" className="bg-[var(--color-bone)]/60">
        <div className="mx-auto grid max-w-[1500px] gap-6 px-5 py-20 md:grid-cols-12 md:px-10 md:py-28">
          <Reveal className="md:col-span-7">
            <div className="relative aspect-[4/5] w-full overflow-hidden md:aspect-[4/3]">
              <Image
                src={editorialImages.lookbookWide}
                alt="Lookbook image — models wearing the winter collection in black"
                fill
                sizes="(max-width: 768px) 100vw, 58vw"
                loading="lazy"
                className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.22,1,.36,1)] hover:scale-[1.03]"
              />
            </div>
          </Reveal>
          <div className="md:col-span-5 md:pl-8">
            <Reveal delay={100} className="flex h-full flex-col justify-center">
              <p className="eyebrow">Lookbook — Chapter IV</p>
              <h2 id="lookbook-heading" className="mt-5 font-display text-4xl leading-[1.05] md:text-[3.5rem]">
                Quiet structure,
                <br />
                softly worn.
              </h2>
              <p className="mt-6 max-w-sm text-[14px] leading-relaxed text-[var(--color-muted)]">
                Photographed in a stripped Parisian apartment: layered tailoring, collapsed collars and the
                weight of real cloth.
              </p>
              <Link
                href="/collections/new-arrivals"
                className="group mt-9 inline-flex w-fit items-center gap-3 border border-[var(--color-ink)] px-8 py-4 text-[11px] uppercase tracking-luxe transition hover:bg-[var(--color-ink)] hover:text-[var(--color-ivory)]"
              >
                View the lookbook
                <IconArrow className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
              </Link>
            </Reveal>
            <Reveal delay={180} className="mt-6 hidden md:block">
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <Image
                  src={editorialImages.lookbookTall}
                  alt="Lookbook detail — beige coat worn over an ivory dress"
                  fill
                  sizes="40vw"
                  loading="lazy"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="mx-auto max-w-[1500px] px-5 py-20 md:px-10 md:py-28">
        <SectionHeading
          eyebrow="Most requested"
          title="Best sellers"
          description="The pieces our clients return for, season after season."
          href="/shop?sort=bestselling"
        />
        <ProductGrid products={bestSellers} />
      </section>

      <NewsletterSection />
      <SocialGallery />
    </>
  );
}
