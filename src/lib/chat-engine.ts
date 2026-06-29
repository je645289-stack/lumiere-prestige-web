import {
  CHAT_GREETING,
  CHAT_GREETING_ES,
  CHAT_WHATSAPP_NUMBER,
  CORE_SERVICES,
  FALLBACK_BUSINESS,
  INTENT_KEYWORDS,
  PACKAGES_STARTING,
  type QuickActionKey,
} from "@/data/chatKnowledge";
import { esCoreServices, esPackagesStarting } from "@/i18n/content-es";
import { getDefaultWhatsAppLink } from "@/lib/utils";
import type { FAQ, Product, Service, SiteConfig } from "@/types";

export type ChatLanguage = "en" | "es";

export interface ChatResponse {
  content: string;
  showWhatsApp?: boolean;
  whatsappMessage?: string;
}

export interface ChatContext {
  config: SiteConfig;
  services: Service[];
  products: Product[];
  faqs: FAQ[];
}

/** Minimal context when CMS API is unavailable (offline / loading). */
export function getFallbackChatContext(): ChatContext {
  return {
    config: {
      businessName: FALLBACK_BUSINESS.name,
      tagline: "Est. 2023 · Norwalk, CT",
      logo: "",
      hero: {
        title: "",
        subtitle: "",
        description: "",
        primaryButton: { text: "", href: "#contacto" },
        secondaryButton: { text: "", href: "#contacto" },
        image: "",
        imageAlt: "",
      },
      about: {
        title: "",
        subtitle: "",
        story: "",
        stats: [],
        image: "",
        imageAlt: "",
      },
      contact: {
        email: FALLBACK_BUSINESS.email,
        phone: FALLBACK_BUSINESS.phone,
        whatsapp: CHAT_WHATSAPP_NUMBER,
        address: FALLBACK_BUSINESS.address,
        city: "Norwalk",
        country: "United States",
        schedule: [...FALLBACK_BUSINESS.schedule],
        mapEmbedUrl: "",
        mapLat: 0,
        mapLng: 0,
        serviceArea: FALLBACK_BUSINESS.serviceArea,
      },
      social: { instagram: "", facebook: "", whatsapp: CHAT_WHATSAPP_NUMBER, linkedin: "" },
      seo: {
        title: "",
        description: "",
        keywords: [],
        ogImage: "",
        localBusiness: { name: FALLBACK_BUSINESS.name, type: "AutoRepair", areaServed: "Norwalk, CT" },
      },
      integrations: {
        chatProvider: "prepared",
        chatWidgetId: "",
        aiAssistantEnabled: false,
        paymentsEnabled: false,
        defaultPaymentProvider: "stripe",
        gaId: "",
        fbPixelId: "",
        calendlyUrl: "",
      },
      cta: {
        title: "",
        subtitle: "",
        primaryButton: { text: "", href: "#contacto" },
        secondaryButton: { text: "", href: "whatsapp" },
      },
      support: {
        supportDays: 30,
        changeRounds: 3,
        trainingIncluded: true,
        trainingDescription: "",
      },
      theme: { accentColor: "#ff2a2d" },
    },
    services: [],
    products: [],
    faqs: [],
  };
}

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

export function getChatGreeting(lang: ChatLanguage): string {
  return lang === "es" ? CHAT_GREETING_ES : CHAT_GREETING;
}

export function detectLanguage(text: string): ChatLanguage {
  const n = normalize(text);
  const spanishHints =
    /[áéíóúñ¿¡]|(\b(hola|precio|servicio|servicios|cita|pintar|pintura|donde|ubicacion|cotizacion|gracias|auto|carro|vehiculo|whatsapp|reservar|agendar|luces|motor|interior|exterior|lavado|ceramico)\b)/;
  return spanishHints.test(n) || n.includes("¿") ? "es" : "en";
}

export function getWhatsAppUrl(contact?: { phone?: string; whatsapp?: string }): string {
  return getDefaultWhatsAppLink(contact);
}

export function getWhatsAppLabel(lang: ChatLanguage): string {
  return lang === "es" ? "Escribir por WhatsApp" : "Chat on WhatsApp";
}

function matchesIntent(text: string, keywords: readonly string[]): boolean {
  const n = normalize(text);
  return keywords.some((kw) => n.includes(normalize(kw)));
}

function scheduleText(ctx: ChatContext, lang: ChatLanguage): string {
  const lines = ctx.config.contact.schedule
    .map((s) => `${s.day}: ${s.hours}`)
    .join(", ");
  return lang === "es" ? `Horario: ${lines}` : `Hours: ${lines}`;
}

function servicesList(lang: ChatLanguage): string {
  const items = (lang === "es" ? esCoreServices : CORE_SERVICES).map((s) => `• ${s}`).join("\n");
  return lang === "es"
    ? `Ofrecemos los siguientes servicios:\n\n${items}`
    : `We offer the following services:\n\n${items}`;
}

function packagesList(lang: ChatLanguage): string {
  const packages = lang === "es" ? esPackagesStarting : PACKAGES_STARTING;
  const lines = packages
    .map((p) =>
      lang === "es" ? `• ${p.name}: desde ${p.price}` : `• ${p.name}: starting at ${p.price}`
    )
    .join("\n");
  const note =
    lang === "es"
      ? "\n\nLos precios pueden variar según el tamaño y condición del vehículo."
      : "\n\nPrices may vary based on vehicle size and condition.";
  return (
    (lang === "es" ? "Paquetes desde:\n\n" : "Packages starting at:\n\n") +
    lines +
    note
  );
}

function paintResponse(lang: ChatLanguage): ChatResponse {
  return {
    content:
      lang === "es"
        ? "Sí, ofrecemos servicio de pintura para vehículos. Para más información, disponibilidad y precio exacto, te recomendamos escribirnos directamente por WhatsApp para darte una atención personalizada según tu vehículo."
        : "Yes, we do offer vehicle painting services. For more details, availability, and pricing, we recommend contacting us directly through WhatsApp so we can give you personalized information based on your vehicle.",
    showWhatsApp: true,
    whatsappMessage:
      lang === "es"
        ? "Hola, me interesa el servicio de pintura para mi vehículo."
        : "Hi, I'm interested in vehicle painting services.",
  };
}

function priceResponse(lang: ChatLanguage): ChatResponse {
  return {
    content:
      lang === "es"
        ? `${packagesList(lang)}\n\nPara una cotización exacta según tu vehículo, escríbenos por WhatsApp.`
        : `${packagesList(lang)}\n\nFor an exact quote tailored to your vehicle, contact us on WhatsApp.`,
    showWhatsApp: true,
    whatsappMessage:
      lang === "es"
        ? "Hola, me gustaría recibir una cotización personalizada."
        : "Hi, I'd like to get a personalized quote.",
  };
}

function bookingResponse(ctx: ChatContext, lang: ChatLanguage): ChatResponse {
  return {
    content:
      lang === "es"
        ? `Puedes reservar completando el formulario en nuestra página, llamando al ${ctx.config.contact.phone}, o escribiéndonos por WhatsApp. ${scheduleText(ctx, lang)}`
        : `You can book by filling out the form on our website, calling ${ctx.config.contact.phone}, or messaging us on WhatsApp. ${scheduleText(ctx, lang)}`,
    showWhatsApp: true,
    whatsappMessage:
      lang === "es"
        ? "Hola, me gustaría reservar una cita."
        : "Hi, I'd like to book an appointment.",
  };
}

function locationResponse(ctx: ChatContext, lang: ChatLanguage): ChatResponse {
  const area = ctx.config.contact.serviceArea ?? "";
  return {
    content:
      lang === "es"
        ? `Estamos ubicados en ${ctx.config.contact.address}. ${area} ${scheduleText(ctx, lang)}`
        : `We're located at ${ctx.config.contact.address}. ${area} ${scheduleText(ctx, lang)}`,
    showWhatsApp: false,
  };
}

function fallbackResponse(lang: ChatLanguage): ChatResponse {
  return {
    content:
      lang === "es"
        ? "Puedo ayudarte con nuestros servicios de auto detailing, citas, cotizaciones, pintura de vehículos e información de contacto. ¿Te gustaría escribirnos por WhatsApp?"
        : "I can help you with our auto detailing services, appointments, quotes, vehicle painting, and contact information. Would you like to contact us on WhatsApp?",
    showWhatsApp: true,
  };
}

function faqMatch(ctx: ChatContext, text: string): FAQ | undefined {
  const n = normalize(text);
  return ctx.faqs.find((faq) => {
    const q = normalize(faq.question);
    return n.includes(q.slice(0, 12)) || q.split(" ").some((w) => w.length > 4 && n.includes(w));
  });
}

export function processChatMessage(
  text: string,
  ctx: ChatContext,
  langOverride?: ChatLanguage
): ChatResponse {
  const lang = langOverride ?? detectLanguage(text);
  const n = normalize(text);

  if (!n) {
    return { content: getChatGreeting(lang) };
  }

  const faq = faqMatch(ctx, text);
  if (faq) {
    const needsWa =
      matchesIntent(text, INTENT_KEYWORDS.price) ||
      matchesIntent(text, INTENT_KEYWORDS.booking) ||
      matchesIntent(text, INTENT_KEYWORDS.paint);
    return { content: faq.answer, showWhatsApp: needsWa };
  }

  if (matchesIntent(text, INTENT_KEYWORDS.greeting)) {
    return { content: getChatGreeting(lang) };
  }

  if (matchesIntent(text, INTENT_KEYWORDS.thanks)) {
    return {
      content:
        lang === "es"
          ? "¡Con gusto! Si necesitas algo más, aquí estoy para ayudarte."
          : "You're welcome! If you need anything else, I'm here to help.",
    };
  }

  if (matchesIntent(text, INTENT_KEYWORDS.paint)) {
    return paintResponse(lang);
  }

  if (matchesIntent(text, INTENT_KEYWORDS.price)) {
    return priceResponse(lang);
  }

  if (matchesIntent(text, INTENT_KEYWORDS.services)) {
    return {
      content: servicesList(lang),
      showWhatsApp: true,
      whatsappMessage:
        lang === "es"
          ? "Hola, me gustaría información sobre sus servicios."
          : "Hi, I'd like information about your services.",
    };
  }

  if (matchesIntent(text, INTENT_KEYWORDS.booking)) {
    return bookingResponse(ctx, lang);
  }

  if (matchesIntent(text, INTENT_KEYWORDS.ceramic)) {
    return {
      content:
        lang === "es"
          ? "Sí, ofrecemos recubrimiento cerámico Diamond Plate desde $450. Protege la pintura contra rayones, UV y contaminantes por hasta 3 años. Para cotización exacta según tu vehículo, contáctanos por WhatsApp."
          : "Yes, we offer Diamond Plate Ceramic Coating starting at $450. It protects paint against scratches, UV, and contaminants for up to 3 years. For an exact quote based on your vehicle, contact us on WhatsApp.",
      showWhatsApp: true,
      whatsappMessage:
        lang === "es"
          ? "Hola, me interesa el recubrimiento cerámico."
          : "Hi, I'm interested in ceramic coating.",
    };
  }

  if (matchesIntent(text, INTENT_KEYWORDS.interior)) {
    return {
      content:
        lang === "es"
          ? "Sí, ofrecemos limpieza interior profunda: aspirado, shampoo de tapicería, limpieza de cuero, paneles, ventanas y más. Paquetes desde $120 (VIP Interior Clean). Para detalles personalizados, escríbenos por WhatsApp."
          : "Yes, we offer deep interior cleaning: vacuuming, upholstery shampoo, leather cleaning, panels, windows, and more. Packages start at $120 (VIP Interior Clean). For personalized details, message us on WhatsApp.",
      showWhatsApp: true,
    };
  }

  if (matchesIntent(text, INTENT_KEYWORDS.exterior)) {
    return {
      content:
        lang === "es"
          ? "Sí, realizamos lavado exterior completo, encerado, pulido y preparación de pintura. Express Wax desde $100. Contáctanos por WhatsApp para recomendarte el mejor servicio."
          : "Yes, we provide full exterior wash, waxing, polishing, and paint preparation. Express Wax starts at $100. Contact us on WhatsApp for the best service recommendation.",
      showWhatsApp: true,
    };
  }

  if (matchesIntent(text, INTENT_KEYWORDS.headlights)) {
    return {
      content:
        lang === "es"
          ? "Sí, restauramos faros eliminando opacidad y amarillamiento, con nuevo recubrimiento UV protector. Desde $100, completado en ~45 minutos con garantía de 1 año."
          : "Yes, we restore headlights by removing haze and yellowing, with a new UV protective coating. Starting at $100, completed in about 45 minutes with a 1-year warranty.",
      showWhatsApp: true,
    };
  }

  if (matchesIntent(text, INTENT_KEYWORDS.engine)) {
    return {
      content:
        lang === "es"
          ? "Sí, limpiamos el compartimento del motor con desengrasante profesional, enjuague controlado y acondicionamiento de plásticos. Engine Bay Cleaning desde $200."
          : "Yes, we clean the engine bay with professional degreaser, controlled rinse, and plastic conditioning. Engine Bay Cleaning starts at $200.",
      showWhatsApp: true,
    };
  }

  if (matchesIntent(text, INTENT_KEYWORDS.stain)) {
    return {
      content:
        lang === "es"
          ? "Sí, eliminamos manchas difíciles en tapicería, alfombras y superficies interiores. También ayudamos con olores. Para evaluar tu caso, envíanos fotos por WhatsApp."
          : "Yes, we remove tough stains from upholstery, carpets, and interior surfaces. We also help with odors. Send us photos on WhatsApp for an assessment.",
      showWhatsApp: true,
      whatsappMessage:
        lang === "es"
          ? "Hola, tengo manchas/olores en el interior de mi vehículo."
          : "Hi, I have stains/odors in my vehicle interior.",
    };
  }

  if (matchesIntent(text, INTENT_KEYWORDS.location)) {
    return locationResponse(ctx, lang);
  }

  if (matchesIntent(text, INTENT_KEYWORDS.hours)) {
    return {
      content: scheduleText(ctx, lang),
    };
  }

  if (matchesIntent(text, INTENT_KEYWORDS.contact) || matchesIntent(text, INTENT_KEYWORDS.whatsapp)) {
    return {
      content:
        lang === "es"
          ? `Puedes contactarnos por WhatsApp, teléfono (${ctx.config.contact.phone}) o email (${ctx.config.contact.email}).`
          : `You can reach us via WhatsApp, phone (${ctx.config.contact.phone}), or email (${ctx.config.contact.email}).`,
      showWhatsApp: true,
    };
  }

  if (matchesIntent(text, INTENT_KEYWORDS.photos)) {
    return {
      content:
        lang === "es"
          ? "¡Claro! Puedes enviarnos fotos de tu vehículo por WhatsApp y te daremos una recomendación y cotización personalizada."
          : "Absolutely! You can send us photos of your vehicle on WhatsApp and we'll provide a personalized recommendation and quote.",
      showWhatsApp: true,
      whatsappMessage:
        lang === "es"
          ? "Hola, quiero enviar fotos de mi vehículo para una cotización."
          : "Hi, I'd like to send photos of my vehicle for a quote.",
    };
  }

  if (matchesIntent(text, INTENT_KEYWORDS.duration)) {
    return {
      content:
        lang === "es"
          ? "El tiempo depende del servicio: algunos toman ~45 minutos (restauración de faros), otros varias horas (detailing completo o cerámico). Escríbenos por WhatsApp con los detalles de tu vehículo para estimar el tiempo."
          : "Timing depends on the service: some take ~45 minutes (headlight restoration), others several hours (full detail or ceramic). Message us on WhatsApp with your vehicle details for a time estimate.",
      showWhatsApp: true,
    };
  }

  // Out of scope
  const businessWords = [
    "car",
    "auto",
    "vehicle",
    "detail",
    "wash",
    "paint",
    "vehi",
    "coche",
    "carro",
  ];
  const isBusinessRelated = businessWords.some((w) => n.includes(w));
  if (!isBusinessRelated && n.length > 8) {
    return {
      content:
        lang === "es"
          ? "Con gusto te ayudo con información sobre nuestros servicios de auto detailing. Para otros temas, te recomiendo contactarnos directamente por WhatsApp."
          : "I'm happy to help with information about our auto detailing services. For other topics, please contact us directly on WhatsApp.",
      showWhatsApp: true,
    };
  }

  return fallbackResponse(lang);
}

export function processQuickAction(
  action: QuickActionKey,
  ctx: ChatContext,
  lang: ChatLanguage
): ChatResponse {
  switch (action) {
    case "services":
      return processChatMessage("What services do you offer?", ctx, lang);
    case "prices":
      return processChatMessage("How much does detailing cost?", ctx, lang);
    case "book":
      return processChatMessage("How can I book an appointment?", ctx, lang);
    case "whatsapp":
      return {
        content:
          lang === "es"
            ? "Toca el botón de abajo para iniciar una conversación por WhatsApp con nuestro equipo. ¡Estamos listos para ayudarte!"
            : "Tap the button below to start a WhatsApp conversation with our team. We're ready to help!",
        showWhatsApp: true,
        whatsappMessage:
          lang === "es"
            ? "Hola, me gustaría contactarlos sobre sus servicios."
            : "Hi, I'd like to get in touch about your services.",
      };
    case "paint":
      return paintResponse(lang);
    default:
      return fallbackResponse(lang);
  }
}
