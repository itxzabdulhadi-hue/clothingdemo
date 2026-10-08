import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getInfoPage, infoPages } from "@/data/infoPages";
import { breadcrumbSchema } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";
import { site, whatsappLink, whatsappMessages } from "@/lib/site";
import { IconWhatsApp } from "@/components/icons";

export function generateStaticParams() {
  return infoPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = getInfoPage(slug);
  if (!page) return { title: "Page not found" };
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: `/info/${page.slug}` },
    openGraph: { title: `${page.title} | ${site.name}`, description: page.description, url: `/info/${page.slug}` },
  };
}

export default async function InfoPageRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getInfoPage(slug);
  if (!page) notFound();

  const faqSchema =
    page.slug === "faq"
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: page.sections.map((s) => ({
            "@type": "Question",
            name: s.heading,
            acceptedAnswer: { "@type": "Answer", text: s.body.join(" ") },
          })),
        }
      : null;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: page.title, url: `/info/${page.slug}` },
          ]),
          ...(faqSchema ? [faqSchema] : []),
        ]}
      />
      <div className="mx-auto max-w-[840px] px-5 pb-24 pt-28 md:px-10 md:pt-36">
        <nav aria-label="Breadcrumb" className="mb-8 text-[11px] uppercase tracking-wide text-[var(--color-muted)]">
          <Link href="/" className="hover:text-[var(--color-ink)]">
            Home
          </Link>
          <span aria-hidden="true"> / </span>
          <span className="text-[var(--color-ink)]">{page.title}</span>
        </nav>

        <h1 className="font-display text-4xl leading-[1.05] md:text-[3.5rem]">{page.title}</h1>
        <p className="mt-5 text-[14.5px] leading-relaxed text-[var(--color-muted)]">{page.intro}</p>

        <div className="mt-14 space-y-12">
          {page.sections.map((s) => (
            <section key={s.heading}>
              <h2 className="font-display text-2xl md:text-[1.9rem]">{s.heading}</h2>
              {s.body.map((p, i) => (
                <p key={i} className="mt-4 text-[14px] leading-[1.85] text-[var(--color-muted)]">
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>

        <div className="mt-16 border-t border-black/10 pt-8">
          <p className="text-[14px]">Still need help?</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href={whatsappLink(whatsappMessages.contact)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-[var(--color-ink)] px-7 py-3.5 text-[11px] uppercase tracking-luxe transition hover:bg-[var(--color-ink)] hover:text-[var(--color-ivory)]"
            >
              <IconWhatsApp className="h-4 w-4" /> WhatsApp us
            </a>
            <Link
              href="/contact"
              className="border border-black/15 px-7 py-3.5 text-[11px] uppercase tracking-luxe transition hover:border-[var(--color-ink)]"
            >
              Contact page
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
