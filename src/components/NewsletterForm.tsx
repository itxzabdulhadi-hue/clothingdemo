"use client";

import { useState } from "react";

export default function NewsletterForm({
  source = "footer",
  variant = "light",
}: {
  source?: string;
  variant?: "light" | "dark";
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  const dark = variant === "dark";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      const data = (await res.json()) as { ok: boolean; message: string };
      setStatus(data.ok ? "done" : "error");
      setMessage(data.message);
      if (data.ok) setEmail("");
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="w-full">
      <div
        className={`flex items-center gap-3 border-b pb-3 ${
          dark ? "border-white/30" : "border-black/25"
        }`}
      >
        <label htmlFor={`newsletter-${source}`} className="sr-only">
          Email address
        </label>
        <input
          id={`newsletter-${source}`}
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          className={`w-full bg-transparent text-sm outline-none ${
            dark ? "text-white placeholder:text-white/50" : "placeholder:text-[var(--color-muted)]"
          }`}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className={`shrink-0 text-[11px] uppercase tracking-luxe transition disabled:opacity-50 ${
            dark ? "text-white hover:text-[var(--color-beige)]" : "hover:text-[var(--color-gold)]"
          }`}
        >
          {status === "loading" ? "…" : "Subscribe"}
        </button>
      </div>
      <p
        aria-live="polite"
        className={`mt-3 min-h-5 text-[12px] ${dark ? "text-white/70" : "text-[var(--color-muted)]"}`}
      >
        {message}
      </p>
    </form>
  );
}
