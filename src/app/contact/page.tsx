import type { Metadata } from "next";
import Image from "next/image";
import { editorialImages } from "@/data/catalog";
import { site, whatsappLink, whatsappMessages } from "@/lib/site";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { IconInstagram, IconWhatsApp } from "@/components/icons";

export const metadata: Metadata = {
  title: "Contact & Client Care",
  description:
    "Speak with the Maison Noir team about sizing, orders, alterations or private appointments — by WhatsApp, email or in our Paris showroom.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `Contact ${site.name}`,
    description: "Client care by WhatsApp, email or appointment in Paris.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: "/" },
          { name: "Contact", url: "/contact" },
        ])}
      />

      <div className="mx-auto max-w-[1500px] px-5 pb-24 pt-28 md:px-10 md:pt-36">
        <Reveal className="max-w-3xl">
          <p className="eyebrow mb-3">Client care</p>
          <h1 className="font-display text-[3.5rem] leading-[0.95] md:text-[6rem]">Let&apos;s talk.</h1>
          <p className="mt-6 max-w-lg text-[14.5px] leading-relaxed text-[var(--color-muted)]">
            Sizing, alterations, order status or a private appointment — our advisors answer personally,
            usually within one business day.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
          <Reveal>
            <h2 className="eyebrow mb-8">Send a message</h2>
            <ContactForm />
          </Reveal>

          <Reveal delay={120} className="space-y-10">
            <a
              href={whatsappLink(whatsappMessages.contact)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-4 border border-[var(--color-ink)] px-6 py-5 transition hover:bg-[var(--color-green)] hover:text-[var(--color-paper)]"
            >
              <span>
                <span className="block text-[11px] uppercase tracking-luxe">WhatsApp</span>
                <span className="mt-1 block text-[13px] opacity-70">Fastest response — 7 days a week</span>
              </span>
              <IconWhatsApp className="h-6 w-6" />
            </a>

            <dl className="space-y-6 text-[14px]">
              <div>
                <dt className="eyebrow">Email</dt>
                <dd className="mt-2">
                  <a href={`mailto:${site.email}`} className="link-underline">
                    {site.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="eyebrow">Telephone</dt>
                <dd className="mt-2">
                  <a href={`tel:${site.phone.replace(/[^+0-9]/g, "")}`} className="link-underline">
                    {site.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="eyebrow">Showroom</dt>
                <dd className="mt-2 not-italic leading-relaxed">
                  <address className="not-italic">
                    {site.address.street}
                    <br />
                    {site.address.postalCode} {site.address.city}, {site.address.country}
                  </address>
                  <span className="mt-1 block text-[12px] text-[var(--color-muted)]">
                    Placeholder address — replace with your trading location.
                  </span>
                </dd>
              </div>
              <div>
                <dt className="eyebrow">Business hours</dt>
                <dd className="mt-2 space-y-1">
                  {site.hours.map((h) => (
                    <p key={h.days} className="flex justify-between gap-6 text-[13.5px]">
                      <span>{h.days}</span>
                      <span className="text-[var(--color-muted)]">{h.time}</span>
                    </p>
                  ))}
                </dd>
              </div>
              <div>
                <dt className="eyebrow">Social</dt>
                <dd className="mt-2">
                  <a
                    href={site.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 link-underline"
                  >
                    <IconInstagram className="h-4 w-4" /> @maisonnoir
                  </a>
                </dd>
              </div>
            </dl>

            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src={editorialImages.contact}
                alt="Maison Noir showroom interior with coats on rails"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                loading="lazy"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </>
  );
}
