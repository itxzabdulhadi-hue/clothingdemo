/**
 * Single source of truth for brand configuration.
 * Replace the placeholder values below with real brand details.
 */
export const site = {
  name: "MAISON NOIR",
  legalName: "Maison Noir Atelier",
  shortName: "Maison Noir",
  tagline: "Defined by Detail.",
  subTagline: "Modern silhouettes. Timeless character.",
  description:
    "Maison Noir is a modern luxury clothing label crafting considered silhouettes in rare, natural materials — designed in Europe, made in limited runs.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://maisonnoir.example.com",
  locale: "en_US",
  currency: "EUR",
  currencySymbol: "€",
  // Placeholder contact details — update before launch.
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "15551234567",
  email: "studio@maisonnoir.example.com",
  phone: "+1 (555) 123-4567",
  address: {
    street: "14 Rue des Archives",
    city: "Paris",
    postalCode: "75004",
    country: "France",
  },
  hours: [
    { days: "Monday – Friday", time: "10:00 – 19:00" },
    { days: "Saturday", time: "11:00 – 18:00" },
    { days: "Sunday", time: "By appointment" },
  ],
  social: {
    instagram: "https://instagram.com/",
    facebook: "https://facebook.com/",
    tiktok: "https://tiktok.com/",
  },
  shipping: {
    freeThreshold: 250,
    standard: 12,
    express: 29,
  },
} as const;

/** Build an official WhatsApp click-to-chat link with a pre-filled message. */
export function whatsappLink(message: string, number: string = site.whatsappNumber) {
  const digits = number.replace(/[^0-9]/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export const whatsappMessages = {
  home: `Hi ${site.name}, I'd like to know more about your collection.`,
  shop: `Hi ${site.name}, I'd like some help choosing a piece from your collection.`,
  cart: `Hi ${site.name}, I'd like some help with my order.`,
  checkout: `Hi ${site.name}, I need assistance completing my order.`,
  contact: `Hi ${site.name}, I'd like to contact your team.`,
  about: `Hi ${site.name}, I'd like to know more about the house.`,
  product: (name: string) =>
    `Hi, I'm interested in ${name}. Could you please provide more details about availability and sizing?`,
  productVariant: (name: string, size: string, color: string) =>
    `Hi, I'm interested in ${name}. Is it available in size ${size}, colour ${color}?`,
};

export function formatPrice(value: number, currency: string = site.currency) {
  return new Intl.NumberFormat("en-IE", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}
