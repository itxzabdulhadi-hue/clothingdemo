import { NextResponse } from "next/server";
import { db } from "@/db";
import { contactMessages } from "@/db/schema";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, string | undefined>;
    const name = (body.name ?? "").trim();
    const email = (body.email ?? "").trim();
    const message = (body.message ?? "").trim();

    if (!name || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || message.length < 5) {
      return NextResponse.json({ ok: false, message: "Please complete all required fields." }, { status: 400 });
    }

    await db.insert(contactMessages).values({
      name,
      email,
      phone: (body.phone ?? "").trim(),
      subject: (body.subject ?? "General enquiry").trim(),
      message,
    });

    return NextResponse.json({ ok: true, message: "Thank you — our team will reply within one business day." });
  } catch {
    return NextResponse.json({ ok: false, message: "Message could not be sent. Please try again." }, { status: 500 });
  }
}
