import Reveal from "@/components/Reveal";
import { IconReturn, IconShield, IconTruck, IconWhatsApp } from "@/components/icons";

const items = [
  { Icon: IconTruck, title: "Worldwide delivery", copy: "Tracked express shipping from our European atelier." },
  { Icon: IconReturn, title: "14-day returns", copy: "Unworn pieces returned simply, with prepaid labels." },
  { Icon: IconShield, title: "Secure checkout", copy: "Encrypted payment handling and private data." },
  { Icon: IconWhatsApp, title: "Advisor on WhatsApp", copy: "Sizing and styling guidance, answered personally." },
];

export default function TrustBar() {
  return (
    <section aria-label="Service commitments" className="border-y border-black/10 bg-[var(--color-bone)]/50">
      <div className="mx-auto grid max-w-[1500px] grid-cols-2 gap-x-6 gap-y-8 px-5 py-12 md:grid-cols-4 md:px-10">
        {items.map(({ Icon, title, copy }, i) => (
          <Reveal key={title} delay={i * 60} className="flex flex-col gap-3">
            <Icon className="h-5 w-5 text-[var(--color-gold)]" />
            <h3 className="font-sans text-[11px] uppercase tracking-luxe">{title}</h3>
            <p className="text-[12.5px] leading-relaxed text-[var(--color-muted)]">{copy}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
