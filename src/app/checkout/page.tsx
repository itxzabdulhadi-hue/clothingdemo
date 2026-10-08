import type { Metadata } from "next";
import CheckoutView from "./CheckoutView";

export const metadata: Metadata = {
  title: "Secure Checkout",
  description: "Complete your Maison Noir order with secure, distraction-free checkout.",
  alternates: { canonical: "/checkout" },
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-[1500px] px-5 pb-24 pt-28 md:px-10 md:pt-36">
      <header className="mb-12">
        <p className="eyebrow mb-3">Step 2 of 2</p>
        <h1 className="font-display text-4xl leading-[1.05] md:text-6xl">Checkout</h1>
      </header>
      <CheckoutView />
    </div>
  );
}
