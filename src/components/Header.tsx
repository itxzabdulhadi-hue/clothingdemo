"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { useStore } from "@/components/StoreProvider";
import { IconBag, IconClose, IconMenu, IconSearch, IconUser } from "@/components/icons";

const primaryNav = [
  { label: "New Arrivals", href: "/collections/new-arrivals" },
  { label: "Men", href: "/collections/men" },
  { label: "Women", href: "/collections/women" },
  { label: "Collections", href: "/shop" },
  { label: "About", href: "/about" },
];

const collectionLinks = [
  { label: "Shirts", href: "/collections/shirts" },
  { label: "T-Shirts", href: "/collections/t-shirts" },
  { label: "Trousers", href: "/collections/trousers" },
  { label: "Outerwear", href: "/collections/outerwear" },
  { label: "Accessories", href: "/collections/accessories" },
  { label: "Archive Sale", href: "/collections/sale" },
];

export default function Header() {
  const pathname = usePathname();
  const { count, setCartOpen, setSearchOpen } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const overHero = pathname === "/" || pathname === "/about";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const solid = scrolled || !overHero || menuOpen;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[70] transition-[background-color,color,border-color,backdrop-filter] duration-500 ${
        solid
          ? "border-b border-black/10 bg-[var(--color-ivory)]/92 text-[var(--color-ink)] backdrop-blur-md"
          : "border-b border-white/15 bg-transparent text-white"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1500px] items-center justify-between px-5 md:h-20 md:px-10">
        <div className="flex items-center gap-6">
          <button
            type="button"
            className="lg:hidden"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <IconClose className="h-5 w-5" /> : <IconMenu className="h-5 w-5" />}
          </button>
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-8 text-[11px] uppercase tracking-luxe">
              {primaryNav.map((item) => (
                <li key={item.href} className="group relative">
                  <Link href={item.href} className="link-underline py-2">
                    {item.label}
                  </Link>
                  {item.label === "Collections" && (
                    <div className="invisible absolute left-1/2 top-full w-56 -translate-x-1/2 border border-black/10 bg-[var(--color-ivory)] p-5 text-[var(--color-ink)] opacity-0 shadow-[0_24px_60px_-30px_rgba(0,0,0,.4)] transition-all duration-300 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                      <ul className="space-y-3">
                        {collectionLinks.map((c) => (
                          <li key={c.href}>
                            <Link href={c.href} className="link-underline">
                              {c.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <Link
          href="/"
          className="absolute left-1/2 -translate-x-1/2 font-display text-[17px] tracking-[0.42em] md:text-xl"
          aria-label={`${site.name} — home`}
        >
          {site.name}
        </Link>

        <div className="flex items-center gap-5">
          <button type="button" onClick={() => setSearchOpen(true)} aria-label="Search products">
            <IconSearch className="h-[18px] w-[18px]" />
          </button>
          <Link href="/account" aria-label="Account" className="hidden sm:block">
            <IconUser className="h-[18px] w-[18px]" />
          </Link>
          <button
            type="button"
            onClick={() => setCartOpen(true)}
            aria-label={`Open cart, ${count} item${count === 1 ? "" : "s"}`}
            className="relative"
          >
            <IconBag className="h-[18px] w-[18px]" />
            {count > 0 && (
              <span className="absolute -right-2 -top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-[var(--color-gold)] px-1 text-[9px] font-medium text-white">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden border-t border-black/10 bg-[var(--color-ivory)] text-[var(--color-ink)] transition-[max-height] duration-500 lg:hidden ${
          menuOpen ? "max-h-[75vh]" : "max-h-0"
        }`}
      >
        <nav aria-label="Mobile" className="max-h-[75vh] overflow-y-auto px-5 py-6">
          <ul className="space-y-4 text-sm uppercase tracking-luxe">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="block py-1">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="eyebrow mt-8">Categories</p>
          <ul className="mt-4 grid grid-cols-2 gap-3 text-[12px]">
            {collectionLinks.map((c) => (
              <li key={c.href}>
                <Link href={c.href} className="block py-1">
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex items-center gap-6 text-[11px] uppercase tracking-luxe">
            <Link href="/account">Account</Link>
            <Link href="/contact">Contact</Link>
            <button type="button" onClick={() => setMenuOpen(false)} className="ml-auto inline-flex items-center gap-2">
              Close <IconClose className="h-4 w-4" />
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
