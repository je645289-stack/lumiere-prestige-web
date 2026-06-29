"use client";

import { useEffect, useState } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import {
  SaveBar,
  AdminInput,
  saveContent,
  ImageUpload,
  LocalizedInput,
} from "@/components/admin/AdminForm";
import type { SiteConfig, LocalizedString } from "@/types";

export default function SiteConfigAdmin() {
  const [config, setConfig] = useState<SiteConfig | null>(null);

  useEffect(() => {
    fetch("/api/content/site-config")
      .then((r) => r.json())
      .then(setConfig);
  }, []);

  if (!config) {
    return (
      <div className="flex min-h-screen bg-brand-dark">
        <AdminSidebar />
        <main className="flex-1 p-4 pt-20 lg:ml-64 lg:p-8 lg:pt-8">
          <p className="text-brand-muted">Loading...</p>
        </main>
      </div>
    );
  }

  const setPath = (path: string, value: unknown) => {
    setConfig((prev) => {
      if (!prev) return prev;
      const keys = path.split(".");
      const next = JSON.parse(JSON.stringify(prev));
      let obj = next;
      for (let i = 0; i < keys.length - 1; i++) obj = obj[keys[i]];
      obj[keys[keys.length - 1]] = value;
      return next;
    });
  };

  const card = "rounded-xl border border-brand-border bg-brand-surface p-6";
  const heading = "mb-4 font-heading font-semibold text-brand-red";

  return (
    <div className="flex min-h-screen bg-brand-dark">
      <AdminSidebar />
      <main className="flex-1 p-4 pt-20 lg:ml-64 lg:p-8 lg:pt-8">
        <SaveBar onSave={() => saveContent("site-config", config)} />

        <h1 className="mb-6 font-display text-2xl text-brand-cream">General Settings</h1>

        <div className="space-y-8">
          <section className={card}>
            <h2 className={heading}>Business Information</h2>
            <div className="grid gap-4">
              <AdminInput
                label="Business name"
                value={config.businessName}
                onChange={(v) => setPath("businessName", v)}
              />
              <LocalizedInput
                label="Tagline"
                value={config.tagline}
                onChange={(v) => setPath("tagline", v)}
              />
            </div>
          </section>

          <section className={card}>
            <h2 className={heading}>Hero</h2>
            <div className="grid gap-4">
              <LocalizedInput label="Badge" value={config.hero.badge} onChange={(v) => setPath("hero.badge", v)} />
              <LocalizedInput label="Title" value={config.hero.title} onChange={(v) => setPath("hero.title", v)} />
              <LocalizedInput label="Subtitle" value={config.hero.subtitle} onChange={(v) => setPath("hero.subtitle", v)} />
              <LocalizedInput label="Description" value={config.hero.description} onChange={(v) => setPath("hero.description", v)} rows={3} />
              <div className="grid gap-4 md:grid-cols-2">
                <LocalizedInput label="Primary button text" value={config.hero.primaryButton.text} onChange={(v) => setPath("hero.primaryButton.text", v)} />
                <AdminInput label="Primary button link (whatsapp / call / url)" value={config.hero.primaryButton.href} onChange={(v) => setPath("hero.primaryButton.href", v)} />
                <LocalizedInput label="Secondary button text" value={config.hero.secondaryButton.text} onChange={(v) => setPath("hero.secondaryButton.text", v)} />
                <AdminInput label="Secondary button link (whatsapp / call / url)" value={config.hero.secondaryButton.href} onChange={(v) => setPath("hero.secondaryButton.href", v)} />
              </div>
              <ImageUpload label="Hero image (poster / fallback)" value={config.hero.image} onChange={(v) => setPath("hero.image", v)} />
              <AdminInput
                label="Hero background video URL (optional, e.g. /videos/hero.mp4 — leave empty to use the image)"
                value={config.hero.video || ""}
                onChange={(v) => setPath("hero.video", v)}
              />
            </div>
          </section>

          <section className={card}>
            <h2 className={heading}>About</h2>
            <div className="grid gap-4">
              <LocalizedInput label="Title" value={config.about.title} onChange={(v) => setPath("about.title", v)} />
              <LocalizedInput label="Subtitle" value={config.about.subtitle} onChange={(v) => setPath("about.subtitle", v)} />
              <LocalizedInput label="Story" value={config.about.story} onChange={(v) => setPath("about.story", v)} rows={3} />
              <LocalizedInput label="Mission" value={config.about.mission} onChange={(v) => setPath("about.mission", v)} rows={3} />
              <ImageUpload label="About image" value={config.about.image} onChange={(v) => setPath("about.image", v)} />

              <div>
                <p className="mb-2 text-sm font-medium text-brand-muted">Why choose us (checkmarks)</p>
                <div className="space-y-3">
                  {config.about.trustReasons.map((reason, i) => (
                    <LocalizedInput
                      key={i}
                      label={`Reason ${i + 1}`}
                      value={reason}
                      onChange={(v) => {
                        const reasons = [...config.about.trustReasons];
                        reasons[i] = v as LocalizedString;
                        setPath("about.trustReasons", reasons);
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className={card}>
            <h2 className={heading}>Stats / Numbers</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {config.about.stats.map((stat, i) => (
                <div key={i} className="rounded-lg border border-brand-border p-4">
                  <AdminInput
                    label={`Value ${i + 1}`}
                    value={stat.value}
                    onChange={(v) => {
                      const stats = [...config.about.stats];
                      stats[i] = { ...stats[i], value: v };
                      setPath("about.stats", stats);
                    }}
                  />
                  <div className="mt-3">
                    <LocalizedInput
                      label="Label"
                      value={stat.label}
                      onChange={(v) => {
                        const stats = [...config.about.stats];
                        stats[i] = { ...stats[i], label: v as LocalizedString };
                        setPath("about.stats", stats);
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className={card}>
            <h2 className={heading}>Contact</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <AdminInput label="Email" value={config.contact.email} onChange={(v) => setPath("contact.email", v)} />
              <AdminInput label="Phone" value={config.contact.phone} onChange={(v) => setPath("contact.phone", v)} />
              <AdminInput label="WhatsApp (digits only)" value={config.contact.whatsapp} onChange={(v) => setPath("contact.whatsapp", v)} />
              <AdminInput label="Address" value={config.contact.address} onChange={(v) => setPath("contact.address", v)} />
              <AdminInput label="City / State" value={config.contact.city} onChange={(v) => setPath("contact.city", v)} />
              <AdminInput label="Country" value={config.contact.country} onChange={(v) => setPath("contact.country", v)} />
              <AdminInput label="Google Maps embed URL" value={config.contact.mapEmbedUrl} onChange={(v) => setPath("contact.mapEmbedUrl", v)} />
            </div>
          </section>

          <section className={card}>
            <h2 className={heading}>Social Media</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <AdminInput label="Instagram" value={config.social.instagram} onChange={(v) => setPath("social.instagram", v)} />
              <AdminInput label="Facebook" value={config.social.facebook} onChange={(v) => setPath("social.facebook", v)} />
            </div>
          </section>

          <section className={card}>
            <h2 className={heading}>SEO</h2>
            <div className="grid gap-4">
              <AdminInput label="SEO title" value={config.seo.title} onChange={(v) => setPath("seo.title", v)} />
              <AdminInput label="Meta description" value={config.seo.description} onChange={(v) => setPath("seo.description", v)} rows={3} />
              <AdminInput
                label="Keywords (comma separated)"
                value={config.seo.keywords.join(", ")}
                onChange={(v) =>
                  setPath(
                    "seo.keywords",
                    v.split(",").map((k) => k.trim()).filter(Boolean)
                  )
                }
              />
            </div>
          </section>

          <section className={card}>
            <h2 className={heading}>Final CTA</h2>
            <div className="grid gap-4">
              <LocalizedInput label="Title" value={config.cta.title} onChange={(v) => setPath("cta.title", v)} />
              <LocalizedInput label="Subtitle" value={config.cta.subtitle} onChange={(v) => setPath("cta.subtitle", v)} rows={2} />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
