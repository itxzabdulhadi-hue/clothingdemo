import Image from "next/image";
import { editorialImages } from "@/data/catalog";
import { site } from "@/lib/site";
import Reveal from "@/components/Reveal";

export default function SocialGallery() {
  return (
    <section aria-labelledby="social-heading" className="mx-auto max-w-[1500px] px-5 py-20 md:px-10 md:py-28">
      <Reveal className="mb-10 text-center">
        <p className="eyebrow mb-3">@maisonnoir</p>
        <h2 id="social-heading" className="font-display text-3xl md:text-[2.75rem]">
          Worn in the world
        </h2>
        <p className="mx-auto mt-4 max-w-md text-[14px] text-[var(--color-muted)]">
          Tag <span className="text-[var(--color-ink)]">#MaisonNoir</span> for the chance to be featured in our journal.
        </p>
      </Reveal>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-6 md:gap-3">
        {editorialImages.social.map((src, i) => (
          <Reveal key={src} delay={i * 50}>
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block aspect-square overflow-hidden bg-[var(--color-bone)]"
              aria-label="View our Instagram profile"
            >
              <Image
                src={src}
                alt={`Maison Noir community style image ${i + 1}`}
                fill
                sizes="(max-width: 768px) 50vw, 16vw"
                loading="lazy"
                className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-[var(--color-ink)]/0 transition-colors duration-500 group-hover:bg-[var(--color-ink)]/20" />
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
