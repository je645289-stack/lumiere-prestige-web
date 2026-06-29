"use client";

import { useEffect, useState } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { SaveBar, AdminInput, saveContent, ImageUpload, loadAdminContent, createAdminSaveHandler } from "@/components/admin/AdminForm";
import type { SiteConfig } from "@/types";

export default function SiteConfigAdmin() {
  const [config, setConfig] = useState<SiteConfig | null>(null);

  useEffect(() => {
    loadAdminContent<SiteConfig>("site-config").then(setConfig);
  }, []);

  if (!config) {
    return (
      <div className="flex min-h-screen bg-brand-dark">
        <AdminSidebar />
        <main className="ml-64 flex-1 p-8">
          <p className="text-brand-muted">Cargando...</p>
        </main>
      </div>
    );
  }

  const update = (path: string, value: string) => {
    setConfig((prev) => {
      if (!prev) return prev;
      const keys = path.split(".");
      const newConfig = JSON.parse(JSON.stringify(prev));
      let obj = newConfig;
      for (let i = 0; i < keys.length - 1; i++) {
        obj = obj[keys[i]];
      }
      obj[keys[keys.length - 1]] = value;
      return newConfig;
    });
  };

  return (
    <div className="flex min-h-screen bg-brand-dark">
      <AdminSidebar />
      <main className="ml-64 flex-1 p-8">
        <SaveBar
          onSave={createAdminSaveHandler("site-config", () => config, setConfig)}
          contentType="site-config"
        />

        <h1 className="mb-6 font-display text-2xl font-bold text-brand-cream">
          Configuración General
        </h1>

        <div className="space-y-8">
          <section className="rounded-xl border border-brand-border bg-brand-surface p-6">
            <h2 className="mb-4 font-semibold text-brand-gold">Información del negocio</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <AdminInput label="Nombre del negocio" value={config.businessName} onChange={(v) => update("businessName", v)} />
              <AdminInput label="Tagline" value={config.tagline} onChange={(v) => update("tagline", v)} />
            </div>
          </section>

          <section className="rounded-xl border border-brand-border bg-brand-surface p-6">
            <h2 className="mb-4 font-semibold text-brand-gold">Hero / Inicio</h2>
            <div className="grid gap-4">
              <AdminInput label="Título" value={config.hero.title} onChange={(v) => update("hero.title", v)} />
              <AdminInput label="Subtítulo" value={config.hero.subtitle} onChange={(v) => update("hero.subtitle", v)} />
              <AdminInput label="Descripción" value={config.hero.description} onChange={(v) => update("hero.description", v)} rows={3} />
              <div className="grid gap-4 md:grid-cols-2">
                <AdminInput label="Botón principal - Texto" value={config.hero.primaryButton.text} onChange={(v) => update("hero.primaryButton.text", v)} />
                <AdminInput label="Botón principal - Enlace" value={config.hero.primaryButton.href} onChange={(v) => update("hero.primaryButton.href", v)} />
                <AdminInput label="Botón secundario - Texto" value={config.hero.secondaryButton.text} onChange={(v) => update("hero.secondaryButton.text", v)} />
                <AdminInput label="Botón secundario - Enlace" value={config.hero.secondaryButton.href} onChange={(v) => update("hero.secondaryButton.href", v)} />
              </div>
              <ImageUpload label="Imagen Hero" value={config.hero.image} onChange={(v) => update("hero.image", v)} />
              <AdminInput label="Video Hero (ruta en /public)" value={config.hero.video ?? ""} onChange={(v) => update("hero.video", v)} placeholder="/videos/hero-video.mp4" />
            </div>
          </section>

          <section className="rounded-xl border border-brand-border bg-brand-surface p-6">
            <h2 className="mb-4 font-semibold text-brand-gold">Sobre nosotros</h2>
            <div className="grid gap-4">
              <AdminInput label="Título" value={config.about.title} onChange={(v) => update("about.title", v)} />
              <AdminInput label="Subtítulo" value={config.about.subtitle} onChange={(v) => update("about.subtitle", v)} />
              <AdminInput label="Historia" value={config.about.story} onChange={(v) => update("about.story", v)} rows={4} />
              <AdminInput label="Experiencia" value={config.about.experience ?? ""} onChange={(v) => update("about.experience", v)} rows={3} />
              <AdminInput label="Misión" value={config.about.mission ?? ""} onChange={(v) => update("about.mission", v)} rows={3} />
              <ImageUpload label="Imagen" value={config.about.image} onChange={(v) => update("about.image", v)} />
            </div>
          </section>

          <section className="rounded-xl border border-brand-border bg-brand-surface p-6">
            <h2 className="mb-4 font-semibold text-brand-gold">Contacto</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <AdminInput label="Email" value={config.contact.email} onChange={(v) => update("contact.email", v)} />
              <AdminInput label="Teléfono" value={config.contact.phone} onChange={(v) => update("contact.phone", v)} />
              <AdminInput label="WhatsApp (sin +)" value={config.contact.whatsapp} onChange={(v) => update("contact.whatsapp", v)} />
              <AdminInput label="Dirección" value={config.contact.address} onChange={(v) => update("contact.address", v)} />
              <AdminInput label="Ciudad" value={config.contact.city} onChange={(v) => update("contact.city", v)} />
              <AdminInput label="País" value={config.contact.country} onChange={(v) => update("contact.country", v)} />
            </div>
          </section>

          <section className="rounded-xl border border-brand-border bg-brand-surface p-6">
            <h2 className="mb-4 font-semibold text-brand-gold">Redes sociales</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <AdminInput label="Instagram" value={config.social.instagram} onChange={(v) => update("social.instagram", v)} />
              <AdminInput label="Facebook" value={config.social.facebook} onChange={(v) => update("social.facebook", v)} />
              <AdminInput label="LinkedIn" value={config.social.linkedin} onChange={(v) => update("social.linkedin", v)} />
            </div>
          </section>

          <section className="rounded-xl border border-brand-border bg-brand-surface p-6">
            <h2 className="mb-4 font-semibold text-brand-gold">SEO</h2>
            <div className="grid gap-4">
              <AdminInput label="Título SEO" value={config.seo.title} onChange={(v) => update("seo.title", v)} />
              <AdminInput label="Meta descripción" value={config.seo.description} onChange={(v) => update("seo.description", v)} rows={3} />
              <AdminInput
                label="Palabras clave (separadas por coma)"
                value={config.seo.keywords.join(", ")}
                onChange={(v) =>
                  setConfig({
                    ...config,
                    seo: {
                      ...config.seo,
                      keywords: v.split(",").map((k) => k.trim()).filter(Boolean),
                    },
                  })
                }
              />
            </div>
          </section>

          <section className="rounded-xl border border-brand-border bg-brand-surface p-6">
            <h2 className="mb-4 font-semibold text-brand-gold">CTA Final</h2>
            <div className="grid gap-4">
              <AdminInput label="Título" value={config.cta.title} onChange={(v) => update("cta.title", v)} />
              <AdminInput label="Subtítulo" value={config.cta.subtitle} onChange={(v) => update("cta.subtitle", v)} rows={2} />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
