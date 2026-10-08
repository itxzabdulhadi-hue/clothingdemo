"use client";

import { useState } from "react";

const fields = [
  { name: "name", label: "Name", type: "text", required: true, autoComplete: "name" },
  { name: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
  { name: "phone", label: "Phone", type: "tel", required: false, autoComplete: "tel" },
  { name: "subject", label: "Subject", type: "text", required: false, autoComplete: "off" },
] as const;

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json()) as { ok: boolean; message: string };
      setStatus(json.ok ? "done" : "error");
      setMessage(json.message);
      if (json.ok) form.reset();
    } catch {
      setStatus("error");
      setMessage("Your message could not be sent. Please email us directly.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-6 sm:grid-cols-2">
      {fields.map((f) => (
        <div key={f.name} className={f.name === "subject" ? "sm:col-span-2" : ""}>
          <label htmlFor={f.name} className="eyebrow">
            {f.label}
            {f.required && <span aria-hidden="true"> *</span>}
          </label>
          <input
            id={f.name}
            name={f.name}
            type={f.type}
            required={f.required}
            autoComplete={f.autoComplete}
            className="mt-2 w-full border-b border-[var(--color-ink)]/20 bg-transparent py-3 text-[14px] outline-none transition focus:border-[var(--color-green)]"
          />
        </div>
      ))}
      <div className="sm:col-span-2">
        <label htmlFor="message" className="eyebrow">
          Message <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="mt-2 w-full resize-none border-b border-[var(--color-ink)]/20 bg-transparent py-3 text-[14px] outline-none transition focus:border-[var(--color-green)]"
        />
      </div>
      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full bg-[var(--color-green)] px-10 py-4 text-[11px] uppercase tracking-luxe text-[var(--color-paper)] transition hover:bg-[var(--color-forest)] disabled:opacity-60 sm:w-auto"
        >
          {status === "loading" ? "Sending…" : "Send message"}
        </button>
        <p aria-live="polite" className="mt-4 min-h-5 text-[13px] text-[var(--color-muted)]">
          {message}
        </p>
      </div>
    </form>
  );
}
