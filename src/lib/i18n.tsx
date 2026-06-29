"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { LocalizedString } from "@/types";

export type Language = "en" | "es";

export const DEFAULT_LANGUAGE: Language = "en";

/**
 * Resolve a {@link LocalizedString} for the given language. Accepts either a
 * plain string (returned as-is) or an `{ en, es }` object. Safe to call from
 * server components by passing an explicit language.
 */
export function localize(
  value: LocalizedString | undefined | null,
  lang: Language = DEFAULT_LANGUAGE
): string {
  if (value == null) return "";
  if (typeof value === "string") return value;
  return value[lang] || value.en || value.es || "";
}

// ---------------------------------------------------------------------------
// UI dictionary for static (non-CMS) interface strings.
// ---------------------------------------------------------------------------

type Dict = Record<string, { en: string; es: string }>;

const UI: Dict = {
  "nav.home": { en: "Home", es: "Inicio" },
  "nav.about": { en: "About", es: "Nosotros" },
  "nav.services": { en: "Services", es: "Servicios" },
  "nav.gallery": { en: "Gallery", es: "Galería" },
  "nav.promotions": { en: "Promotions", es: "Promociones" },
  "nav.testimonials": { en: "Reviews", es: "Reseñas" },
  "nav.contact": { en: "Contact", es: "Contacto" },
  "nav.book": { en: "Book Now", es: "Reservar" },

  "cta.getQuote": { en: "Get a Free Quote", es: "Cotización Gratis" },
  "cta.callNow": { en: "Call Now", es: "Llamar Ahora" },
  "cta.requestQuote": { en: "Request Quote", es: "Solicitar Cotización" },
  "cta.claimOffer": { en: "Claim Offer", es: "Reclamar Oferta" },
  "cta.bookNow": { en: "Book Now", es: "Reservar Ahora" },
  "cta.viewAll": { en: "View All Services", es: "Ver Todos los Servicios" },
  "cta.whatsapp": { en: "WhatsApp", es: "WhatsApp" },
  "cta.call": { en: "Call", es: "Llamar" },
  "cta.backHome": { en: "Back to Home", es: "Volver al Inicio" },

  "hero.scroll": { en: "Scroll down", es: "Desliza hacia abajo" },

  "stats.title": { en: "Trusted by Drivers Across Connecticut", es: "La Confianza de Conductores en Connecticut" },
  "stats.subtitle": {
    en: "Numbers that reflect our commitment to excellence.",
    es: "Cifras que reflejan nuestro compromiso con la excelencia.",
  },

  "services.title": { en: "Our Services", es: "Nuestros Servicios" },
  "services.subtitle": {
    en: "Professional detailing services tailored to protect and perfect your vehicle.",
    es: "Servicios de detallado profesional para proteger y perfeccionar tu vehículo.",
  },

  "about.story": { en: "Our Story", es: "Nuestra Historia" },
  "about.experience": { en: "Experience", es: "Experiencia" },
  "about.mission": { en: "Our Mission", es: "Nuestra Misión" },
  "about.why": { en: "Why Choose Us?", es: "¿Por qué Elegirnos?" },

  "benefits.title": { en: "Why Choose Albert Auto Detailing?", es: "¿Por qué Albert Auto Detailing?" },
  "benefits.subtitle": {
    en: "Premium care, certified technicians and a finish you can see and feel.",
    es: "Cuidado premium, técnicos certificados y un acabado que se ve y se siente.",
  },

  "gallery.title": { en: "Before & After", es: "Antes y Después" },
  "gallery.subtitle": {
    en: "Real results from real vehicles we have transformed.",
    es: "Resultados reales de vehículos que hemos transformado.",
  },
  "gallery.all": { en: "All", es: "Todos" },

  "promotions.title": { en: "Current Promotions", es: "Promociones Actuales" },
  "promotions.subtitle": {
    en: "Take advantage of our limited-time offers and save on premium detailing.",
    es: "Aprovecha nuestras ofertas por tiempo limitado y ahorra en detallado premium.",
  },

  "process.title": { en: "How It Works", es: "Cómo Funciona" },
  "process.subtitle": {
    en: "A simple, transparent process from first contact to a shining finish.",
    es: "Un proceso simple y transparente, desde el primer contacto hasta el brillo final.",
  },

  "testimonials.title": { en: "What Our Clients Say", es: "Lo que Dicen Nuestros Clientes" },
  "testimonials.subtitle": {
    en: "Real reviews from satisfied customers across Norwalk and beyond.",
    es: "Reseñas reales de clientes satisfechos en Norwalk y alrededores.",
  },

  "faq.title": { en: "Frequently Asked Questions", es: "Preguntas Frecuentes" },
  "faq.subtitle": {
    en: "Everything you need to know before booking your detail.",
    es: "Todo lo que necesitas saber antes de reservar tu detallado.",
  },

  "instagram.title": { en: "Follow Us on Instagram", es: "Síguenos en Instagram" },
  "instagram.subtitle": {
    en: "See our latest work @albert_auto_detailing.",
    es: "Mira nuestro trabajo más reciente @albert_auto_detailing.",
  },
  "instagram.follow": { en: "Follow Us on Instagram", es: "Síguenos en Instagram" },

  "contact.title": { en: "Get Your Free Quote", es: "Obtén tu Cotización Gratis" },
  "contact.subtitle": {
    en: "Tell us about your vehicle and we'll get back to you fast.",
    es: "Cuéntanos sobre tu vehículo y te responderemos rápido.",
  },
  "contact.name": { en: "Full Name", es: "Nombre Completo" },
  "contact.email": { en: "Email", es: "Correo Electrónico" },
  "contact.phone": { en: "Phone", es: "Teléfono" },
  "contact.vehicle": { en: "Vehicle Type", es: "Tipo de Vehículo" },
  "contact.service": { en: "Service of Interest", es: "Servicio de Interés" },
  "contact.message": { en: "Message / Notes", es: "Mensaje / Notas" },
  "contact.selectService": { en: "Select a service", es: "Selecciona un servicio" },
  "contact.submit": { en: "Get My Free Quote", es: "Obtener mi Cotización" },
  "contact.sending": { en: "Sending...", es: "Enviando..." },
  "contact.success": {
    en: "Thank you! We received your request and will contact you shortly.",
    es: "¡Gracias! Recibimos tu solicitud y te contactaremos pronto.",
  },
  "contact.error": {
    en: "Something went wrong. Please try again or reach us on WhatsApp.",
    es: "Algo salió mal. Inténtalo de nuevo o escríbenos por WhatsApp.",
  },
  "contact.address": { en: "Address", es: "Dirección" },
  "contact.hours": { en: "Hours", es: "Horario" },
  "contact.follow": { en: "Follow us", es: "Síguenos" },
  "contact.vehiclePlaceholder": { en: "e.g. Honda Civic 2021", es: "ej. Honda Civic 2021" },

  "booking.title": { en: "Book an Appointment", es: "Reserva una Cita" },
  "booking.subtitle": {
    en: "Pick a date and time that works for you. We'll confirm by phone or WhatsApp.",
    es: "Elige la fecha y hora que prefieras. Confirmaremos por teléfono o WhatsApp.",
  },
  "booking.datetime": { en: "Preferred Date & Time", es: "Fecha y Hora Deseada" },
  "booking.submit": { en: "Request Appointment", es: "Solicitar Cita" },
  "booking.calendly": { en: "Or schedule instantly", es: "O agenda al instante" },

  "footer.quickLinks": { en: "Quick Links", es: "Enlaces Rápidos" },
  "footer.contact": { en: "Contact", es: "Contacto" },
  "footer.hours": { en: "Hours", es: "Horario" },
  "footer.rights": { en: "All rights reserved.", es: "Todos los derechos reservados." },
  "footer.admin": { en: "Admin Panel", es: "Panel Admin" },
  "footer.top": { en: "Back to top", es: "Volver arriba" },
  "footer.tagline": {
    en: "Professional auto detailing in Norwalk, Connecticut.",
    es: "Detallado automotriz profesional en Norwalk, Connecticut.",
  },

  "chat.greeting": {
    en: "Hi! I'm the Albert Auto Detailing assistant. How can I help you today?",
    es: "¡Hola! Soy el asistente de Albert Auto Detailing. ¿En qué puedo ayudarte hoy?",
  },
  "chat.placeholder": { en: "Type your question...", es: "Escribe tu pregunta..." },
  "chat.send": { en: "Send", es: "Enviar" },
  "chat.online": { en: "Online", es: "En línea" },
  "chat.fallback": {
    en: "Thanks for your message! For personalized help, reach us on WhatsApp or call us.",
    es: "¡Gracias por tu mensaje! Para atención personalizada, escríbenos por WhatsApp o llámanos.",
  },
};

export function t(key: string, lang: Language = DEFAULT_LANGUAGE): string {
  const entry = UI[key];
  if (!entry) return key;
  return entry[lang] || entry.en;
}

// ---------------------------------------------------------------------------
// React context
// ---------------------------------------------------------------------------

interface LanguageContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  toggle: () => void;
  t: (key: string) => string;
  l: (value: LocalizedString | undefined | null) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "aad-lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(DEFAULT_LANGUAGE);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY) as Language | null;
      if (stored === "en" || stored === "es") {
        setLangState(stored);
      } else if (navigator.language?.toLowerCase().startsWith("es")) {
        setLangState("es");
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Language) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const toggle = useCallback(() => {
    setLang(lang === "en" ? "es" : "en");
  }, [lang, setLang]);

  const value: LanguageContextValue = {
    lang,
    setLang,
    toggle,
    t: (key: string) => t(key, lang),
    l: (v) => localize(v, lang),
  };

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    // Fallback when used outside a provider (e.g. isolated rendering).
    return {
      lang: DEFAULT_LANGUAGE,
      setLang: () => {},
      toggle: () => {},
      t: (key: string) => t(key, DEFAULT_LANGUAGE),
      l: (v) => localize(v, DEFAULT_LANGUAGE),
    };
  }
  return ctx;
}
