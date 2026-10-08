"use client";

import { usePathname } from "next/navigation";
import { whatsappLink, whatsappMessages } from "@/lib/site";
import { IconWhatsApp } from "@/components/icons";

function messageFor(pathname: string) {
  if (pathname.startsWith("/products/")) {
    const name = pathname
      .replace("/products/", "")
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
    return whatsappMessages.product(name);
  }
  if (pathname.startsWith("/cart")) return whatsappMessages.cart;
  if (pathname.startsWith("/checkout")) return whatsappMessages.checkout;
  if (pathname.startsWith("/contact")) return whatsappMessages.contact;
  if (pathname.startsWith("/about")) return whatsappMessages.about;
  if (pathname.startsWith("/shop") || pathname.startsWith("/collections")) return whatsappMessages.shop;
  return whatsappMessages.home;
}

export default function WhatsAppFloat() {
  const pathname = usePathname();

  return (
    <a
      href={whatsappLink(messageFor(pathname))}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className={`group fixed ${
        pathname.startsWith("/products/") ? "bottom-24" : "bottom-5"
      } right-5 z-[60] flex items-center gap-0 overflow-hidden rounded-full bg-[var(--color-ink)] text-[var(--color-ivory)] shadow-[0_18px_40px_-18px_rgba(0,0,0,.65)] transition-all duration-500 hover:bg-[#1f7a4d] md:bottom-8 md:right-8`}
    >
      <span className="grid h-12 w-12 shrink-0 place-items-center md:h-12 md:w-12">
        <IconWhatsApp className="h-5 w-5" />
      </span>
      <span className="max-w-0 whitespace-nowrap text-[11px] uppercase tracking-luxe opacity-0 transition-all duration-500 group-hover:max-w-[160px] group-hover:pr-5 group-hover:opacity-100 group-focus-visible:max-w-[160px] group-focus-visible:pr-5 group-focus-visible:opacity-100">
        Chat with us
      </span>
    </a>
  );
}
