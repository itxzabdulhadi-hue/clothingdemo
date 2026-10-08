import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { coupons, customers, orders, type OrderItem } from "@/db/schema";
import { getProducts } from "@/lib/queries";
import { getPaymentProvider } from "@/lib/payments";
import { site } from "@/lib/site";

type Payload = {
  name: string;
  email: string;
  phone?: string;
  addressLine?: string;
  city?: string;
  postalCode?: string;
  country?: string;
  note?: string;
  shippingMethod?: "standard" | "express";
  paymentMethod?: string;
  couponCode?: string;
  items: { slug: string; size: string; color: string; quantity: number }[];
};

function reference() {
  return `MN-${Date.now().toString(36).toUpperCase()}${Math.floor(Math.random() * 90 + 10)}`;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Payload;
    if (!body.items?.length) {
      return NextResponse.json({ ok: false, message: "Your bag is empty." }, { status: 400 });
    }
    if (!body.name || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(body.email ?? "")) {
      return NextResponse.json({ ok: false, message: "Name and a valid email are required." }, { status: 400 });
    }

    const catalog = await getProducts();
    const items: OrderItem[] = [];
    for (const line of body.items) {
      const product = catalog.find((p) => p.slug === line.slug);
      if (!product) continue;
      items.push({
        slug: product.slug,
        name: product.name,
        size: line.size,
        color: line.color,
        quantity: Math.max(1, Math.min(line.quantity, 20)),
        price: product.price,
        image: product.images[0].url,
      });
    }
    if (!items.length) {
      return NextResponse.json({ ok: false, message: "No valid items in your bag." }, { status: 400 });
    }

    const subtotal = items.reduce((n, i) => n + i.price * i.quantity, 0);

    let discount = 0;
    let couponCode = "";
    if (body.couponCode) {
      const code = body.couponCode.trim().toUpperCase();
      const [coupon] = await db.select().from(coupons).where(eq(coupons.code, code));
      if (coupon?.active) {
        couponCode = coupon.code;
        discount = coupon.percentOff
          ? Math.round((subtotal * coupon.percentOff) / 100)
          : Math.min(coupon.amountOff, subtotal);
      }
    }

    const method = body.shippingMethod === "express" ? "express" : "standard";
    const shipping =
      method === "express"
        ? site.shipping.express
        : subtotal - discount >= site.shipping.freeThreshold
          ? 0
          : site.shipping.standard;

    const total = Math.max(0, subtotal - discount) + shipping;
    const ref = reference();
    const provider = getPaymentProvider(body.paymentMethod ?? "manual");
    const intent = await provider.createIntent({
      reference: ref,
      amount: total,
      currency: site.currency,
      email: body.email,
    });

    await db
      .insert(customers)
      .values({ email: body.email.toLowerCase(), name: body.name, phone: body.phone ?? "" })
      .onConflictDoNothing();

    await db.insert(orders).values({
      reference: ref,
      email: body.email.toLowerCase(),
      name: body.name,
      phone: body.phone ?? "",
      addressLine: body.addressLine ?? "",
      city: body.city ?? "",
      postalCode: body.postalCode ?? "",
      country: body.country ?? "",
      note: body.note ?? "",
      shippingMethod: method,
      paymentMethod: provider.id,
      couponCode,
      subtotal,
      discount,
      shipping,
      total,
      currency: site.currency,
      status: intent.status === "paid" ? "paid" : "pending",
      items,
    });

    return NextResponse.json({ ok: true, reference: ref, total, intent });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ ok: false, message: "Order could not be placed. Please try again." }, { status: 500 });
  }
}
