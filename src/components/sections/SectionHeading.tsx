import Link from "next/link";
import Reveal from "@/components/Reveal";
import { IconArrow } from "@/components/icons";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  href,
  hrefLabel = "View all",
  level = 2,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  href?: string;
  hrefLabel?: string;
  level?: 2 | 3;
}) {
  const Tag = level === 2 ? "h2" : "h3";
  return (
    <Reveal className="mb-10 flex flex-col gap-5 md:mb-14 md:flex-row md:items-end md:justify-between">
      <div className="max-w-xl">
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <Tag className="font-display text-3xl leading-[1.1] md:text-[2.75rem]">{title}</Tag>
        {description && (
          <p className="mt-4 max-w-md text-[14px] leading-relaxed text-[var(--color-muted)]">{description}</p>
        )}
      </div>
      {href && (
        <Link
          href={href}
          className="group inline-flex items-center gap-3 text-[11px] uppercase tracking-luxe"
        >
          <span className="link-underline">{hrefLabel}</span>
          <IconArrow className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
        </Link>
      )}
    </Reveal>
  );
}
