"use client";

import { useEffect, useState } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { SaveBar, AdminInput, AdminToggle, saveContent } from "@/components/admin/AdminForm";
import type { SiteConfig } from "@/types";

export default function IntegrationsAdmin() {
  const [config, setConfig] = useState<SiteConfig | null>(null);

  useEffect(() => {
    fetch("/api/content/site-config")
      .then((r) => r.json() as Promise<SiteConfig>)
      .then((data) => setConfig(data));
  }, []);

  if (!config) return null;

  const updateIntegration = (key: string, value: unknown) => {
    setConfig({
      ...config,
      integrations: { ...config.integrations, [key]: value },
    });
  };

  return (
    <div className="flex min-h-screen bg-brand-dark">
      <AdminSidebar />
      <main className="ml-64 flex-1 p-8">
        <SaveBar onSave={() => saveContent("site-config", config)} />

        <h1 className="mb-6 font-display text-2xl font-bold text-brand-cream">
          Integraciones
        </h1>

        <div className="space-y-6">
          <section className="rounded-xl border border-brand-border bg-brand-surface p-6">
            <h2 className="mb-4 font-semibold text-brand-gold">Chat en vivo / IA</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <AdminInput
                label="Proveedor (tawk, crisp, prepared)"
                value={config.integrations.chatProvider}
                onChange={(v) => updateIntegration("chatProvider", v)}
              />
              <AdminInput
                label="Widget ID"
                value={config.integrations.chatWidgetId}
                onChange={(v) => updateIntegration("chatWidgetId", v)}
              />
              <AdminToggle
                label="Asistente IA activado"
                checked={config.integrations.aiAssistantEnabled}
                onChange={(v) => updateIntegration("aiAssistantEnabled", v)}
              />
            </div>
            <p className="mt-3 text-xs text-brand-muted">
              Configura OPENAI_API_KEY en .env para IA. Para Tawk.to, agrega el Widget ID.
            </p>
          </section>

          <section className="rounded-xl border border-brand-border bg-brand-surface p-6">
            <h2 className="mb-4 font-semibold text-brand-gold">Pagos</h2>
            <AdminToggle
              label="Pagos activados"
              checked={config.integrations.paymentsEnabled}
              onChange={(v) => updateIntegration("paymentsEnabled", v)}
            />
            <p className="mt-3 text-xs text-brand-muted">
              Configura STRIPE_PUBLIC_KEY, STRIPE_SECRET_KEY, PAYPAL_CLIENT_ID o SQUARE_APP_ID en .env
            </p>
          </section>

          <section className="rounded-xl border border-brand-border bg-brand-surface p-6">
            <h2 className="mb-4 font-semibold text-brand-gold">Analytics & Tracking</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <AdminInput
                label="Google Analytics ID (GA4)"
                value={config.integrations.gaId}
                onChange={(v) => updateIntegration("gaId", v)}
              />
              <AdminInput
                label="Facebook Pixel ID"
                value={config.integrations.fbPixelId}
                onChange={(v) => updateIntegration("fbPixelId", v)}
              />
            </div>
          </section>

          <section className="rounded-xl border border-brand-border bg-brand-surface p-6">
            <h2 className="mb-4 font-semibold text-brand-gold">WhatsApp, Instagram & Booking</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <AdminInput
                label="WhatsApp number (digits only)"
                value={config.contact.whatsapp}
                onChange={(v) =>
                  setConfig({ ...config, contact: { ...config.contact, whatsapp: v } })
                }
              />
              <AdminInput
                label="Calendly URL"
                value={config.integrations.calendlyUrl}
                onChange={(v) => updateIntegration("calendlyUrl", v)}
              />
              <AdminInput
                label="Instagram access token"
                value={config.integrations.instagramToken}
                onChange={(v) => updateIntegration("instagramToken", v)}
              />
              <AdminInput
                label="Google Maps embed URL"
                value={config.contact.mapEmbedUrl}
                onChange={(v) =>
                  setConfig({ ...config, contact: { ...config.contact, mapEmbedUrl: v } })
                }
              />
            </div>
          </section>

          <section className="rounded-xl border border-brand-gold/20 bg-brand-gold/5 p-6">
            <h2 className="mb-2 font-semibold text-brand-cream">Integraciones preparadas</h2>
            <ul className="space-y-1 text-sm text-brand-muted">
              <li>✓ WhatsApp — Configurado via contacto.whatsapp</li>
              <li>✓ Instagram / Facebook / LinkedIn — Redes sociales</li>
              <li>✓ Google Maps — Embed en sección ubicación</li>
              <li>✓ Stripe / PayPal / Square — Checkout preparado</li>
              <li>✓ Google Analytics / Facebook Pixel — Scripts listos</li>
              <li>✓ Formularios de contacto — API funcional</li>
              <li>✓ Calendly — URL configurable</li>
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
}
