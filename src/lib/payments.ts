/**
 * Payment provider abstraction.
 *
 * No live payment provider is configured yet. `manualProvider` records the order
 * and returns a pending state so the team can confirm payment over WhatsApp or
 * bank transfer. To add Stripe/Adyen/etc., implement `PaymentProvider` and
 * register it in `getPaymentProvider()`.
 */
export type PaymentIntent = {
  status: "pending" | "requires_action" | "paid";
  provider: string;
  reference: string;
  redirectUrl?: string;
  instructions: string;
};

export type PaymentProvider = {
  id: string;
  label: string;
  createIntent: (input: { reference: string; amount: number; currency: string; email: string }) => Promise<PaymentIntent>;
};

export const manualProvider: PaymentProvider = {
  id: "manual",
  label: "Pay on confirmation (bank transfer / WhatsApp)",
  async createIntent({ reference }) {
    return {
      status: "pending",
      provider: "manual",
      reference,
      instructions:
        "Your order is reserved. A client advisor will contact you with secure payment instructions within one business day.",
    };
  },
};

export const codProvider: PaymentProvider = {
  id: "cod",
  label: "Cash on delivery (selected regions)",
  async createIntent({ reference }) {
    return {
      status: "pending",
      provider: "cod",
      reference,
      instructions: "Payment will be collected by the courier on delivery.",
    };
  },
};

export const paymentProviders: PaymentProvider[] = [manualProvider, codProvider];

export function getPaymentProvider(id: string): PaymentProvider {
  return paymentProviders.find((p) => p.id === id) ?? manualProvider;
}
