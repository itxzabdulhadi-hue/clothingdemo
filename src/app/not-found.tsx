import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70svh] max-w-xl flex-col items-center justify-center px-5 text-center">
      <p className="eyebrow">Error 404</p>
      <h1 className="mt-4 font-display text-5xl md:text-7xl">Nothing here.</h1>
      <p className="mt-5 text-[14px] text-[var(--color-muted)]">
        The page you are looking for has moved, or the piece has sold through.
      </p>
      <div className="mt-9 flex flex-wrap justify-center gap-3">
        <Link
          href="/shop"
          className="bg-[var(--color-green)] px-9 py-4 text-[11px] uppercase tracking-luxe text-[var(--color-paper)]"
        >
          Shop collection
        </Link>
        <Link href="/" className="border border-[var(--color-ink)] px-9 py-4 text-[11px] uppercase tracking-luxe">
          Return home
        </Link>
      </div>
    </div>
  );
}
