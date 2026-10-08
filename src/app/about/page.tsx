import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { editorialImages } from "@/data/catalog";
import { site } from "@/lib/site";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { IconArrow } from "@/components/icons";

export const metadata: Metadata = {
  title: "About the House — Craft, Materials & Vision",
  description:
    "The Maison Noir story: a modern luxury label working with European mills and family-run workshops to produce considered garments in limited runs.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: `About ${site.name}`,
    description: "Craft, materials and the design philosophy behind Maison Noir.",
    url: "/about",
    images: [{ url: editorialImages.about, alt: "Maison Noir editorial image" }],
  },
};

const pillars = [
  {
    title: "Material first",
    body: "We begin with cloth, not sketches. Double-faced wool from Biella, sand-washed silk from Como, grade-A cashmere spun in Scotland.",
  },
  {
    title: "Made in small runs",
    body: "Production is limited by intent. When a run is complete it is rarely repeated, which keeps our workshops honest and our waste low.",
  },
  {
    title: "Finished by hand",
    body: "Edges, buttonholes and linings are completed by hand in family-run ateliers across Portugal, Italy and Spain.",
  },
  {
    title: "Designed to repeat",
    body: "Each silhouette is tested against the wardrobe we already own. If it does not earn its place, it is not produced.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "About", url: "/about" },
        ])}
      />

      <section className="relative h-[80svh] min-h-[480px] w-full overflow-hidden bg-[var(--color-ink)]">
        <Image
          src={editorialImages.about}
          alt="Two models in belted gabardine coats photographed against open sky"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60" />
        <div className="relative mx-auto flex h-full max-w-[1500px] flex-col justify-end px-5 pb-16 text-[var(--color-ivory)] md:px-10 md:pb-24">
          <p className="animate-fade-up eyebrow text-white/70">The house</p>
          <h1 className="animate-fade-up mt-5 max-w-3xl font-display text-[3rem] leading-[0.98] md:text-[5.5rem]">
            A quieter kind of luxury.
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-[900px] px-5 py-20 md:px-10 md:py-28">
        <Reveal>
          <p className="font-display text-[1.65rem] leading-[1.45] md:text-[2.1rem]">
            {site.name} was founded on a simple frustration: too much clothing is designed to be seen once.
            We make the opposite — garments built on structure, cloth and proportion, intended to be worn until
            they carry the shape of the person wearing them.
          </p>
        </Reveal>
        <Reveal delay={120}>
          <p className="mt-8 text-[14.5px] leading-[1.9] text-[var(--color-muted)]">
            The house works in two collections a year, supported by small seasonal releases. Everything is drawn
            in our Paris studio, prototyped three times, and produced only when the third sample is right.
            This is slow by modern standards. It is the only way we know to make something worth keeping.
          </p>
        </Reveal>
      </section>

      <section aria-labelledby="craft-heading" className="bg-[var(--color-bone)]/60">
        <div className="mx-auto grid max-w-[1500px] items-center gap-10 px-5 py-20 md:grid-cols-2 md:px-10 md:py-28">
          <Reveal>
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <Image
                src={editorialImages.atelier}
                alt="Close study of natural beige cloth, folded"
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                loading="lazy"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="eyebrow">Craftsmanship</p>
            <h2 id="craft-heading" className="mt-4 font-display text-4xl leading-[1.08] md:text-[3.25rem]">
              Three samples before a single stitch is sold.
            </h2>
            <p className="mt-6 max-w-md text-[14px] leading-relaxed text-[var(--color-muted)]">
              Our patterns are graded by hand across five sizes, then fitted on real bodies rather than
              mannequins. Seam allowances are generous so pieces can be altered and kept. Buttons are horn or
              mother-of-pearl. Nothing is glued that should be sewn.
            </p>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="pillars-heading" className="mx-auto max-w-[1500px] px-5 py-20 md:px-10 md:py-28">
        <Reveal className="max-w-xl">
          <p className="eyebrow">Design philosophy</p>
          <h2 id="pillars-heading" className="mt-4 font-display text-4xl leading-[1.08] md:text-[3.25rem]">
            Four principles, applied without exception.
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 80}>
              <p className="font-display text-3xl text-[var(--color-gold)]">0{i + 1}</p>
              <h3 className="mt-4 font-sans text-[11px] uppercase tracking-luxe">{p.title}</h3>
              <p className="mt-3 text-[13.5px] leading-relaxed text-[var(--color-muted)]">{p.body}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-[var(--color-ink)] text-[var(--color-ivory)]">
        <Image
          src={editorialImages.studio}
          alt="Studio photography session for the Maison Noir collection"
          fill
          sizes="100vw"
          loading="lazy"
          className="object-cover opacity-30"
        />
        <div className="relative mx-auto max-w-[900px] px-5 py-28 text-center md:px-10 md:py-36">
          <Reveal>
            <p className="eyebrow text-white/50">Vision</p>
            <h2 className="mt-6 font-display text-[2.1rem] leading-[1.15] md:text-[3.4rem]">
              To build a wardrobe that outlives the season that produced it.
            </h2>
            <Link
              href="/shop"
              className="group mt-10 inline-flex items-center gap-3 bg-[var(--color-ivory)] px-9 py-4 text-[11px] uppercase tracking-luxe text-[var(--color-ink)] transition hover:bg-[var(--color-beige)]"
            >
              Shop the collection
              <IconArrow className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
