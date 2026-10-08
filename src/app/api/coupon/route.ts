import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { coupons } from "@/db/schema";

export async function POST(request: Request) {
  try {
    const { code } = (await request.json()) as { code?: string };
    const value = (code ?? "").trim().toUpperCase();
    if (!value) return NextResponse.json({ ok: false, message: "Enter a code." }, { status: 400 });

    const [coupon] = await db.select().from(coupons).where(eq(coupons.code, value));
    if (!coupon || !coupon.active) {
      return NextResponse.json({ ok: false, message: "That code is not valid." }, { status: 404 });
    }
    return NextResponse.json({
      ok: true,
      code: coupon.code,
      percentOff: coupon.percentOff,
      amountOff: coupon.amountOff,
      message: coupon.description,
    });
  } catch {
    return NextResponse.json({ ok: false, message: "Could not validate the code." }, { status: 500 });
  }
}
