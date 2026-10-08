"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useStore } from "@/components/StoreProvider";
import { formatPrice, site, whatsappLink, whatsappMessages } from "@/lib/site";
import { IconShield, IconWhatsApp } from "@/components/icons";

type Coupon = { code: string; percentOff: number; amountOff: number } | null;

const paymentOptions = [
  {
    id: "manual",
    label: "Pay on confirmation",
    hint: "A client advisor sends secure payment instructions within one business day.",
  },
  { id: "cod", label: "Cash on delivery", hint: "Available in selected regions. Collected by the courier." },
];

export default function CheckoutView() {
  const { items, subtotal, clearCart } = useStore();
  const [shippingMethod, setShippingMethod] = useState<"standard" | "express">("standard");
  const [paymentMethod, setPaymentMethod] = useState("manual");
  const [couponInput, setCouponInput] = useState("");
  const [coupon, setCoupon] = useState<Coupon>(null);
  const [couponMsg, setCouponMsg] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState("");
  const [confirmation, setConfirmation] = useState<{ reference: string; total: number; instructions: string } | null>(
    null,
  );

  const discount = coupon
    ? coupon.percentOff
      ? Math.round((subtotal * coupon.percentOff) / 100)
      : Math.min(coupon.amountOff, subtotal)
    : 0;
  const shipping =
    items.length === 0
      ? 0
      : shippingMethod === "express"
        ? site.shipping.express
        : subtotal - discount >= site.shipping.freeThreshold
          ? 0
          : site.shipping.standard;
  const total = Math.max(0, subtotal - discount) + shipping;

  async function applyCoupon() {
    setCouponMsg("Checking…");
    try {
      const res = await fetch("/api/coupon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: couponInput }),
      });
      const data = await res.json();
      if (data.ok) {
        setCoupon({ code: data.code, percentOff: data.percentOff, amountOff: data.amountOff });
        setCouponMsg(`${data.code} applied — ${data.message}`);
      } else {
        setCoupon(null);
        setCouponMsg(data.message ?? "That code is not valid.");
      }
    } catch {
      setCouponMsg("Could not validate the code.");
    }
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          shippingMethod,
          paymentMethod,
          couponCode: coupon?.code ?? "",
          items: items.map((i) => ({ slug: i.slug, size: i.size, color: i.color, quantity: i.quantity })),
        }),
      });
      const json = await res.json();
      if (!json.ok) {
        setStatus("error");
        setError(json.message ?? "Your order could not be placed.");
        return;
      }
      setConfirmation({ reference: json.reference, total: json.total, instructions: json.intent.instructions });
      clearCart();
      setStatus("idle");
    } catch {
      setStatus("error");
      setError("Your order could not be placed. Please try again or contact us on WhatsApp.");
    }
  }

  if (confirmation) {
    return (
      <div className="mx-auto max-w-xl py-16 text-center">
        <p className="eyebrow">Order received</p>
        <h2 className="mt-4 font-display text-4xl">Thank you.</h2>
        <p className="mt-4 text-[14px] text-[var(--color-muted)]">
          Your reference is <span className="text-[var(--color-ink)]">{confirmation.reference}</span> for a total of{" "}
          {formatPrice(confirmation.total)}.
        </p>
        <p className="mt-3 text-[13.5px] leading-relaxed text-[var(--color-muted)]">{confirmation.instructions}</p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/shop"
            className="bg-[var(--color-ink)] px-9 py-4 text-[11px] uppercase tracking-luxe text-[var(--color-ivory)]"
          >
            Continue shopping
          </Link>
          <a
            href={whatsappLink(`Hi, I've just placed order ${confirmation.reference}. Could you confirm the details?`)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 border border-[var(--color-ink)] px-9 py-4 text-[11px] uppercase tracking-luxe"
          >
            <IconWhatsApp className="h-4 w-4" /> Confirm on WhatsApp
          </a>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="font-display text-3xl">There is nothing to check out.</p>
        <Link
          href="/shop"
          className="mt-8 inline-block bg-[var(--color-ink)] px-10 py-4 text-[11px] uppercase tracking-luxe text-[var(--color-ivory)]"
        >
          Shop collection
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-14 lg:grid-cols-[1.25fr_1fr] lg:gap-20">
      <div className="space-y-12">
        <fieldset>
          <legend className="eyebrow mb-6">Customer information</legend>
          <div className="grid gap-6 sm:grid-cols-2">
            <Field name="name" label="Full name" autoComplete="name" required />
            <Field name="email" label="Email" type="email" autoComplete="email" required />
            <Field name="phone" label="Phone (for delivery)" type="tel" autoComplete="tel" required />
          </div>
        </fieldset>

        <fieldset>
          <legend className="eyebrow mb-6">Shipping address</legend>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Field name="addressLine" label="Address" autoComplete="street-address" required />
            </div>
            <Field name="city" label="City" autoComplete="address-level2" required />
            <Field name="postalCode" label="Postal code" autoComplete="postal-code" required />
            <Field name="country" label="Country" autoComplete="country-name" required />
            <Field name="note" label="Delivery note (optional)" />
          </div>
        </fieldset>

        <fieldset>
          <legend className="eyebrow mb-6">Shipping method</legend>
          <div className="space-y-3">
            {(
              [
                { id: "standard", label: "Tracked standard — 3–5 business days", price: site.shipping.standard },
                { id: "express", label: "Express courier — 1–2 business days", price: site.shipping.express },
              ] as const
            ).map((opt) => (
              <label
                key={opt.id}
                className={`flex cursor-pointer items-center justify-between gap-4 border px-5 py-4 text-[13.5px] transition ${
                  shippingMethod === opt.id ? "border-[var(--color-ink)]" : "border-black/15"
                }`}
              >
                <span className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="shippingMethodChoice"
                    value={opt.id}
                    checked={shippingMethod === opt.id}
                    onChange={() => setShippingMethod(opt.id)}
                    className="accent-[var(--color-ink)]"
                  />
                  {opt.label}
                </span>
                <span>
                  {opt.id === "standard" && subtotal - discount >= site.shipping.freeThreshold
                    ? "Complimentary"
                    : formatPrice(opt.price)}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="eyebrow mb-6">Payment method</legend>
          <div className="space-y-3">
            {paymentOptions.map((opt) => (
              <label
                key={opt.id}
                className={`flex cursor-pointer flex-col gap-1 border px-5 py-4 text-[13.5px] transition ${
                  paymentMethod === opt.id ? "border-[var(--color-ink)]" : "border-black/15"
                }`}
              >
                <span className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="paymentMethodChoice"
                    value={opt.id}
                    checked={paymentMethod === opt.id}
                    onChange={() => setPaymentMethod(opt.id)}
                    className="accent-[var(--color-ink)]"
                  />
                  {opt.label}
                </span>
                <span className="pl-7 text-[12px] text-[var(--color-muted)]">{opt.hint}</span>
              </label>
            ))}
            <p className="flex items-start gap-2 text-[12px] text-[var(--color-muted)]">
              <IconShield className="mt-0.5 h-4 w-4 shrink-0" />
              Card payment providers can be connected without changing this checkout — the payment layer is
              abstracted server-side.
            </p>
          </div>
        </fieldset>
      </div>

      <aside className="lg:sticky lg:top-28 lg:self-start">
        <h2 className="eyebrow mb-6">Order summary</h2>
        <ul className="space-y-4 border-y border-black/10 py-6">
          {items.map((item) => (
            <li key={item.key} className="flex gap-4">
              <span className="relative h-20 w-16 shrink-0 bg-[var(--color-bone)]">
                <Image src={item.image} alt={item.name} fill sizes="64px" className="object-cover" />
              </span>
              <span className="flex-1 text-[13px]">
                <span className="block">{item.name}</span>
                <span className="block text-[11.5px] uppercase tracking-wide text-[var(--color-muted)]">
                  {item.color} · {item.size} · ×{item.quantity}
                </span>
              </span>
              <span className="text-[13px]">{formatPrice(item.price * item.quantity)}</span>
            </li>
          ))}
        </ul>

        <div className="border-b border-black/10 py-5">
          <label htmlFor="coupon" className="eyebrow">
            Discount code
          </label>
          <div className="mt-2 flex gap-2">
            <input
              id="coupon"
              value={couponInput}
              onChange={(e) => setCouponInput(e.target.value)}
              placeholder="MAISON10"
              className="w-full border border-black/15 px-3 py-3 text-[13px] outline-none focus:border-[var(--color-ink)]"
            />
            <button
              type="button"
              onClick={applyCoupon}
              className="shrink-0 border border-[var(--color-ink)] px-5 text-[11px] uppercase tracking-luxe transition hover:bg-[var(--color-ink)] hover:text-[var(--color-ivory)]"
            >
              Apply
            </button>
          </div>
          <p aria-live="polite" className="mt-2 min-h-4 text-[12px] text-[var(--color-muted)]">
            {couponMsg}
          </p>
        </div>

        <dl className="space-y-3 py-6 text-[14px]">
          <div className="flex justify-between">
            <dt className="text-[var(--color-muted)]">Subtotal</dt>
            <dd>{formatPrice(subtotal)}</dd>
          </div>
          {discount > 0 && (
            <div className="flex justify-between">
              <dt className="text-[var(--color-muted)]">Discount</dt>
              <dd>−{formatPrice(discount)}</dd>
            </div>
          )}
          <div className="flex justify-between">
            <dt className="text-[var(--color-muted)]">Shipping</dt>
            <dd>{shipping === 0 ? "Complimentary" : formatPrice(shipping)}</dd>
          </div>
          <div className="flex justify-between border-t border-black/10 pt-3 text-[16px]">
            <dt>Total</dt>
            <dd>{formatPrice(total)}</dd>
          </div>
        </dl>

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full bg-[var(--color-ink)] py-4 text-[11px] uppercase tracking-luxe text-[var(--color-ivory)] transition hover:bg-[var(--color-charcoal)] disabled:opacity-60"
        >
          {status === "loading" ? "Placing order…" : "Place order"}
        </button>
        <p aria-live="polite" className="mt-3 min-h-5 text-[12.5px] text-[#8a2f2f]">
          {error}
        </p>
        <a
          href={whatsappLink(whatsappMessages.checkout)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 flex items-center justify-center gap-2 text-[11px] uppercase tracking-luxe text-[var(--color-muted)] hover:text-[var(--color-ink)]"
        >
          <IconWhatsApp className="h-4 w-4" /> Checkout assistance
        </a>
      </aside>
    </form>
  );
}

function Field({
  name,
  label,
  type = "text",
  required = false,
  autoComplete,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="eyebrow">
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="mt-2 w-full border-b border-black/20 bg-transparent py-3 text-[14px] outline-none transition focus:border-[var(--color-ink)]"
      />
    </div>
  );
}
