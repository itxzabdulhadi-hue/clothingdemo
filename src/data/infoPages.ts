import { site } from "@/lib/site";

export type InfoPage = {
  slug: string;
  title: string;
  description: string;
  intro: string;
  sections: { heading: string; body: string[] }[];
};

export const infoPages: InfoPage[] = [
  {
    slug: "faq",
    title: "Frequently Asked Questions",
    description:
      "Answers on sizing, delivery times, alterations, payment and returns for Maison Noir orders worldwide.",
    intro:
      "If your question is not answered here, our advisors reply personally by WhatsApp or email, usually within one business day.",
    sections: [
      {
        heading: "How do I choose my size?",
        body: [
          "Every product page includes a size guide with body measurements in centimetres, along with the model's height and the size worn. If you fall between sizes we generally recommend sizing up, particularly in outerwear.",
          "For a personal recommendation, message us with your usual size in two brands you wear often.",
        ],
      },
      {
        heading: "When will my order ship?",
        body: [
          "Orders are dispatched from our European atelier within 48 hours of confirmation, Monday to Friday. You will receive tracking by email as soon as the parcel is collected.",
        ],
      },
      {
        heading: "Do you offer alterations?",
        body: [
          "Trousers are supplied with an unfinished hem where indicated so they can be tailored to length. We can recommend an atelier locally or arrange alterations for clients in Paris.",
        ],
      },
      {
        heading: "Which payment methods do you accept?",
        body: [
          "At present orders are confirmed by our team and settled by secure bank transfer, or cash on delivery in selected regions. Card payment is being integrated and will appear at checkout once live.",
        ],
      },
      {
        heading: "Can I order by WhatsApp?",
        body: [
          "Yes. Send us the product name and your size and an advisor will prepare the order, confirm availability and arrange delivery.",
        ],
      },
    ],
  },
  {
    slug: "shipping-returns",
    title: "Shipping & Returns",
    description:
      "Delivery times, shipping rates, duties and the 14-day return policy for Maison Noir orders.",
    intro: "Tracked, insured delivery worldwide from our European atelier.",
    sections: [
      {
        heading: "Shipping rates",
        body: [
          `Tracked standard delivery is ${site.currencySymbol}${site.shipping.standard} and arrives in 3–5 business days. Express courier is ${site.currencySymbol}${site.shipping.express} and arrives in 1–2 business days.`,
          `Standard shipping is complimentary on orders above ${site.currencySymbol}${site.shipping.freeThreshold}.`,
        ],
      },
      {
        heading: "Duties and taxes",
        body: [
          "EU orders are shipped with all taxes included. For destinations outside the EU, import duties are calculated at checkout where possible; otherwise they are payable to the courier on delivery.",
        ],
      },
      {
        heading: "Returns",
        body: [
          "Unworn pieces may be returned within 14 days of delivery, with original tags and packaging intact. Contact client care to receive a prepaid return label.",
          "Refunds are issued to the original payment method within five business days of the parcel arriving at our atelier. Final-sale archive pieces are exchange-only.",
        ],
      },
      {
        heading: "Faulty items",
        body: [
          "Every garment is checked before dispatch. In the unlikely event of a fault, contact us within 30 days with photographs and we will repair, replace or refund the piece.",
        ],
      },
    ],
  },
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    description: "How Maison Noir collects, stores and protects your personal information.",
    intro:
      "This is a placeholder policy provided as a structure. Review it with qualified counsel before trading.",
    sections: [
      {
        heading: "Information we collect",
        body: [
          "We collect the details you provide when placing an order or contacting us: name, email address, telephone number and delivery address. We also store newsletter subscriptions where you have opted in.",
        ],
      },
      {
        heading: "How we use it",
        body: [
          "Your information is used to fulfil orders, provide client care and — only with consent — to send occasional collection news. We do not sell personal data.",
        ],
      },
      {
        heading: "Storage and retention",
        body: [
          "Order records are retained for the period required by accounting law. Wishlists and browsing history are stored locally in your browser and never leave your device.",
        ],
      },
      {
        heading: "Your rights",
        body: [
          `You may request access to, correction of, or deletion of your data at any time by writing to ${site.email}.`,
        ],
      },
    ],
  },
  {
    slug: "terms-conditions",
    title: "Terms & Conditions",
    description: "The terms governing purchases made from Maison Noir.",
    intro:
      "This is a placeholder document provided as a structure. Review it with qualified counsel before trading.",
    sections: [
      {
        heading: "Orders",
        body: [
          "An order constitutes an offer to purchase. A contract is formed once we confirm dispatch. We reserve the right to decline an order where stock is unavailable or where pricing has been listed in error.",
        ],
      },
      {
        heading: "Pricing",
        body: [
          "Prices are shown in euro and include EU VAT where applicable. Shipping is calculated at checkout.",
        ],
      },
      {
        heading: "Intellectual property",
        body: [
          "All imagery, text, patterns and designs remain the property of the house and may not be reproduced without written permission.",
        ],
      },
      {
        heading: "Governing law",
        body: ["These terms are governed by the laws of the jurisdiction in which the house is registered."],
      },
    ],
  },
];

export function getInfoPage(slug: string) {
  return infoPages.find((p) => p.slug === slug) ?? null;
}
