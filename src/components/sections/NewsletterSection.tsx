import { site } from "@/lib/site";
import NewsletterForm from "@/components/NewsletterForm";
import Reveal from "@/components/Reveal";

export default function NewsletterSection() {
  return (
    <section aria-labelledby="newsletter-heading" className="bg-[var(--color-ink)] text-[var(--color-ivory)]">
      <div className="mx-auto grid max-w-[1500px] gap-10 px-5 py-20 md:grid-cols-2 md:items-end md:px-10 md:py-28">
        <Reveal>
          <p className="eyebrow text-white/50">The house list</p>
          <h2 id="newsletter-heading" className="mt-4 font-display text-4xl leading-[1.05] md:text-6xl">
            Enter the world of {site.name}.
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="max-w-sm text-[14px] leading-relaxed text-white/60">
            Early access to limited releases, seasonal lookbooks and invitations to private atelier appointments.
          </p>
          <div className="mt-8 max-w-md">
            <NewsletterForm source="homepage" variant="dark" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
