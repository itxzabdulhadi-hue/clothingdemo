import type { Metadata } from "next";
import CartView from "./CartView";

export const metadata: Metadata = {
  title: "Shopping Bag",
  description: "Review the pieces in your Maison Noir shopping bag before checkout.",
  alternates: { canonical: "/cart" },
  robots: { index: false, follow: true },
};

export default function CartPage() {
  return (
    <div className="mx-auto max-w-[1500px] px-5 pb-24 pt-28 md:px-10 md:pt-36">
      <header className="mb-12">
        <p className="eyebrow mb-3">Step 1 of 2</p>
        <h1 className="font-display text-4xl leading-[1.05] md:text-6xl">Shopping bag</h1>
      </header>
      <CartView />
    </div>
  );
}
