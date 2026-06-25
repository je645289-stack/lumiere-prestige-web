import { NextRequest, NextResponse } from "next/server";
import { readData } from "@/lib/data";
import type { Product } from "@/types";
import { isPaymentsEnabled, PAYMENT_PROVIDERS } from "@/lib/payments";

export async function POST(request: NextRequest) {
  try {
    const { productId, provider } = await request.json();

    const products = await readData<Product[]>("products");
    const product = products.find((p) => p.id === productId);

    if (!product) {
      return NextResponse.json({ error: "Producto no encontrado" }, { status: 404 });
    }

    if (!isPaymentsEnabled()) {
      return NextResponse.json({
        message: `Pagos no activados. Producto: ${product.name} (${product.price}). Contáctanos por WhatsApp para completar tu compra.`,
        product,
      });
    }

    const paymentProvider = provider as keyof typeof PAYMENT_PROVIDERS;

    if (!PAYMENT_PROVIDERS[paymentProvider]?.enabled()) {
      return NextResponse.json({
        message: `${PAYMENT_PROVIDERS[paymentProvider].name} no está configurado. Agrega las claves en .env`,
        product,
      });
    }

    // Payment checkout URLs — connect real provider SDKs when keys are configured
    const checkoutUrls: Record<string, string | null> = {
      stripe: process.env.STRIPE_SECRET_KEY
        ? `${process.env.NEXT_PUBLIC_SITE_URL}/checkout?success=true&provider=stripe&product=${productId}`
        : null,
      paypal: process.env.PAYPAL_CLIENT_ID
        ? `https://www.paypal.com/checkoutnow?product=${productId}`
        : null,
      square: process.env.SQUARE_APP_ID
        ? `${process.env.NEXT_PUBLIC_SITE_URL}/checkout?success=true&provider=square&product=${productId}`
        : null,
    };

    const url = checkoutUrls[paymentProvider];
    if (url) {
      return NextResponse.json({ url, product });
    }

    return NextResponse.json({
      message: `Checkout preparado para ${product.name} via ${provider}. Instala el SDK del proveedor y configura las API keys para activar pagos reales.`,
      product,
    });
  } catch {
    return NextResponse.json({ error: "Error en checkout" }, { status: 500 });
  }
}
