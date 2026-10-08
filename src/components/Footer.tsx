import Link from "next/link";
import { site, whatsappLink, whatsappMessages } from "@/lib/site";
import NewsletterForm from "@/components/NewsletterForm";
import { IconFacebook, IconInstagram, IconTikTok, IconWhatsApp } from "@/components/icons";

const shopLinks = [
  { label: "All Products", href: "/shop" },
  { label: "New Arrivals", href: "/collections/new-arrivals" },
  { label: "Men", href: "/collections/men" },
  { label: "Women", href: "/collections/women" },
  { label: "Outerwear", href: "/collections/outerwear" },
  { label: "Accessories", href: "/collections/accessories" },
  { label: "Archive Sale", href: "/collections/sale" },
];

const infoLinks = [
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/info/faq" },
  { label: "Shipping & Returns", href: "/info/shipping-returns" },
  { label: "Privacy Policy", href: "/info/privacy-policy" },
  { label: "Terms & Conditions", href: "/info/terms-conditions" },
];

export default function Footer() {
  return (
    <footer className="bg-[var(--color-ink)] text-[var(--color-ivory)]">
      <div className="mx-auto max-w-[1500px] px-5 py-16 md:px-10 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Link href="/" className="font-display text-xl tracking-[0.42em]">
              {site.name}
            </Link>
            <p className="mt-5 max-w-xs text-[13px] leading-relaxed text-white/60">{site.description}</p>
            <div className="mt-6 flex items-center gap-5 text-white/70">
              <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-white">
                <IconInstagram className="h-[18px] w-[18px]" />
              </a>
              <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-white">
                <IconFacebook className="h-[18px] w-[18px]" />
              </a>
              <a href={site.social.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="hover:text-white">
                <IconTikTok className="h-[18px] w-[18px]" />
              </a>
              <a
                href={whatsappLink(whatsappMessages.home)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="hover:text-white"
              >
                <IconWhatsApp className="h-[18px] w-[18px]" />
              </a>
            </div>
          </div>

          <nav className="md:col-span-2" aria-label="Shop">
            <h2 className="eyebrow text-white/50">Shop</h2>
            <ul className="mt-5 space-y-3 text-[13px] text-white/75">
              {shopLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="link-underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="md:col-span-2" aria-label="Information">
            <h2 className="eyebrow text-white/50">Information</h2>
            <ul className="mt-5 space-y-3 text-[13px] text-white/75">
              {infoLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="link-underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <h2 className="eyebrow text-white/50">Newsletter</h2>
            <p className="mt-5 font-display text-2xl leading-snug">Enter the world of {site.name}.</p>
            <p className="mt-2 text-[13px] text-white/60">
              Private previews, new releases and atelier notes. No noise.
            </p>
            <div className="mt-5">
              <NewsletterForm source="footer" variant="dark" />
            </div>
            <address className="mt-6 not-italic text-[12px] leading-relaxed text-white/55">
              {site.address.street}, {site.address.postalCode} {site.address.city}, {site.address.country}
              <br />
              <a href={`mailto:${site.email}`} className="link-underline">
                {site.email}
              </a>
            </address>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/15 pt-6 text-[11px] uppercase tracking-luxe text-white/45 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <p>Designed in Europe · Shipped worldwide</p>
        </div>
      </div>
    </footer>
  );
}
