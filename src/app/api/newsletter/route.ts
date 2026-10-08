import { NextResponse } from "next/server";
import { db } from "@/db";
import { subscribers } from "@/db/schema";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string; source?: string };
    const email = (body.email ?? "").trim().toLowerCase();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return NextResponse.json({ ok: false, message: "Please enter a valid email address." }, { status: 400 });
    }
    await db
      .insert(subscribers)
      .values({ email, source: body.source ?? "footer" })
      .onConflictDoNothing();
    return NextResponse.json({ ok: true, message: "Welcome. Please check your inbox to confirm." });
  } catch {
    return NextResponse.json(
      { ok: false, message: "We could not subscribe you right now. Please try again." },
      { status: 500 },
    );
  }
}
