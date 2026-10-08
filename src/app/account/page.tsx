import type { Metadata } from "next";
import { getProducts } from "@/lib/queries";
import AccountView from "./AccountView";

export const metadata: Metadata = {
  title: "Your Account",
  description: "Your Maison Noir wishlist and recently viewed pieces.",
  alternates: { canonical: "/account" },
  robots: { index: false, follow: true },
};

export const revalidate = 600;

export default async function AccountPage() {
  const products = await getProducts();
  const mini = products.map((p) => ({
    slug: p.slug,
    name: p.name,
    price: p.price,
    image: p.images[0].url,
    alt: p.images[0].alt,
  }));

  return (
    <div className="mx-auto max-w-[1500px] px-5 pb-24 pt-28 md:px-10 md:pt-36">
      <header className="mb-14 max-w-2xl">
        <p className="eyebrow mb-3">Client area</p>
        <h1 className="font-display text-4xl leading-[1.05] md:text-6xl">Your account</h1>
        <p className="mt-5 text-[14px] leading-relaxed text-[var(--color-muted)]">
          Saved pieces and browsing history are stored privately on this device. For order history or
          appointments, contact client care.
        </p>
      </header>
      <AccountView products={mini} />
    </div>
  );
}
