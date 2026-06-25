export const PAYMENT_PROVIDERS = {
  stripe: {
    name: "Stripe",
    enabled: () => !!process.env.STRIPE_PUBLIC_KEY,
    publicKey: process.env.STRIPE_PUBLIC_KEY || "",
  },
  paypal: {
    name: "PayPal",
    enabled: () => !!process.env.PAYPAL_CLIENT_ID,
    clientId: process.env.PAYPAL_CLIENT_ID || "",
  },
  square: {
    name: "Square",
    enabled: () => !!process.env.SQUARE_APP_ID,
    appId: process.env.SQUARE_APP_ID || "",
  },
} as const;

export type PaymentProvider = keyof typeof PAYMENT_PROVIDERS;

export function isPaymentsEnabled(): boolean {
  return process.env.NEXT_PUBLIC_PAYMENTS_ENABLED === "true";
}

export function getActiveProviders(): PaymentProvider[] {
  return (Object.keys(PAYMENT_PROVIDERS) as PaymentProvider[]).filter(
    (key) => PAYMENT_PROVIDERS[key].enabled()
  );
}
