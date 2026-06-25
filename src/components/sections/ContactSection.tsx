"use client";

import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  Instagram,
  Facebook,
  Linkedin,
} from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import type { SiteConfig } from "@/types";
import { getWhatsAppLink, getPhoneLink } from "@/lib/utils";

export function ContactSection({ config }: { config: SiteConfig }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", phone: "", service: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <Section id="contacto">
      <SectionHeader
        title="Contacto"
        subtitle="Estamos listos para atenderte. Escríbenos, llámanos o visita nuestras instalaciones."
      />

      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm text-brand-muted">Nombre completo *</label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-lg border border-brand-border bg-brand-surface px-4 py-3 text-brand-cream focus:border-brand-gold focus:outline-none"
                placeholder="Tu nombre"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm text-brand-muted">Email *</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-lg border border-brand-border bg-brand-surface px-4 py-3 text-brand-cream focus:border-brand-gold focus:outline-none"
                  placeholder="tu@email.com"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm text-brand-muted">Teléfono</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full rounded-lg border border-brand-border bg-brand-surface px-4 py-3 text-brand-cream focus:border-brand-gold focus:outline-none"
                  placeholder="+52 55 1234 5678"
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm text-brand-muted">Servicio de interés</label>
              <select
                value={form.service}
                onChange={(e) => setForm({ ...form, service: e.target.value })}
                className="w-full rounded-lg border border-brand-border bg-brand-surface px-4 py-3 text-brand-cream focus:border-brand-gold focus:outline-none"
              >
                <option value="">Seleccionar servicio</option>
                <option value="consultoria">Consultoría Premium</option>
                <option value="wellness">Experiencia Wellness</option>
                <option value="elite">Programa Elite</option>
                <option value="transformacion">Transformación Integral</option>
                <option value="corporativo">Eventos Corporativos</option>
                <option value="vip">Asesoría VIP</option>
                <option value="otro">Otro</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm text-brand-muted">Mensaje *</label>
              <textarea
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full rounded-lg border border-brand-border bg-brand-surface px-4 py-3 text-brand-cream focus:border-brand-gold focus:outline-none resize-none"
                placeholder="Cuéntanos cómo podemos ayudarte..."
              />
            </div>

            <Button type="submit" disabled={status === "loading"} className="w-full">
              <Send className="h-4 w-4" />
              {status === "loading" ? "Enviando..." : "Enviar formulario"}
            </Button>

            {status === "success" && (
              <p className="text-center text-sm text-green-400">
                ¡Mensaje enviado! Te contactaremos pronto.
              </p>
            )}
            {status === "error" && (
              <p className="text-center text-sm text-red-400">
                Error al enviar. Intenta de nuevo o contáctanos por WhatsApp.
              </p>
            )}
          </form>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button
              href={getWhatsAppLink(config.contact.whatsapp)}
              variant="secondary"
              size="sm"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </Button>
            <Button href={getPhoneLink(config.contact.phone)} variant="outline" size="sm">
              <Phone className="h-4 w-4" /> Llamar
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          {[
            { icon: MapPin, label: "Dirección", value: `${config.contact.address}, ${config.contact.city}, ${config.contact.country}` },
            { icon: Phone, label: "Teléfono", value: config.contact.phone, href: getPhoneLink(config.contact.phone) },
            { icon: Mail, label: "Email", value: config.contact.email, href: `mailto:${config.contact.email}` },
          ].map((item) => (
            <div key={item.label} className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-brand-gold/10 text-brand-gold">
                <item.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-brand-muted">{item.label}</p>
                {item.href ? (
                  <a href={item.href} className="text-brand-cream hover:text-brand-gold transition-colors">
                    {item.value}
                  </a>
                ) : (
                  <p className="text-brand-cream">{item.value}</p>
                )}
              </div>
            </div>
          ))}

          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-brand-gold/10 text-brand-gold">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-brand-muted">Horario</p>
              {config.contact.schedule.map((s) => (
                <p key={s.day} className="text-brand-cream text-sm">
                  <span className="text-brand-muted">{s.day}:</span> {s.hours}
                </p>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-3 text-sm text-brand-muted">Síguenos</p>
            <div className="flex gap-4">
              <a href={config.social.instagram} target="_blank" rel="noopener noreferrer" className="text-brand-muted hover:text-brand-gold">
                <Instagram className="h-5 w-5" />
              </a>
              <a href={config.social.facebook} target="_blank" rel="noopener noreferrer" className="text-brand-muted hover:text-brand-gold">
                <Facebook className="h-5 w-5" />
              </a>
              <a href={config.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-brand-muted hover:text-brand-gold">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
