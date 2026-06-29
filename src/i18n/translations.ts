import type { Locale } from "@/i18n/types";

const en = {
  "nav.home": "Home",
  "nav.about": "About",
  "nav.services": "Services",
  "nav.gallery": "Gallery",
  "nav.faq": "FAQ",
  "nav.contact": "Contact",
  "nav.getQuote": "Get Quote",
  "nav.menu": "Menu",

  "hero.scroll": "Scroll",
  "hero.whatsappQuote": "Hi, I'd like to get a free quote for auto detailing.",

  "services.label": "Our Services",
  "services.title": "Expert Auto Care",

  "catalog.label": "Available Packages",
  "catalog.title": "Our Services & Packages",
  "catalog.subtitle": "Choose the right service for your vehicle. Contact us for a personalized quote.",
  "catalog.bookNow": "Book Now",
  "catalog.requestQuote": "Request Quote",
  "catalog.whatsapp": "WhatsApp",
  "catalog.priceNote": "* Prices may vary based on vehicle size and condition. Contact us for an exact quote.",
  "catalog.bookMessage": "Hi, I'd like to book: {name}",
  "catalog.questionMessage": "Hi, I have a question about: {name}",

  "benefits.label": "Why Choose Us",
  "benefits.title": "Driven by Quality",
  "benefits.subtitle":
    "We don't just wash cars; we restore and protect them. Our rigorous standards ensure every vehicle leaving our care looks better than the day it left the showroom.",

  "process.label": "The Process",
  "process.title": "How It Works",
  "process.subtitle": "From request to result — a simple, clear, and transparent process.",
  "process.prev": "Previous step",
  "process.next": "Next step",
  "process.getEstimate": "Get an estimate",

  "gallery.label": "Our Work",
  "gallery.title": "Before & After",
  "gallery.subtitle":
    "Our results speak for themselves. Browse through some of our recent premium auto detailing projects.",
  "gallery.dragHint": "Drag the handle to compare before & after",

  "testimonials.label": "Client Reviews",
  "testimonials.title": "What Our Customers Say",
  "testimonials.empty": "Be the first to leave a review.",
  "testimonials.writeReview": "Write a Review",

  "faq.label": "FAQ",
  "faq.title": "Got Questions?",
  "faq.moreQuestions": "More questions? Reach out to us directly.",
  "faq.requestQuote": "Request a Quote",
  "faq.whatsappMessage": "Hi, I have a question.",

  "location.label": "Find Us",
  "location.title": "Our Location",
  "location.address": "Address",
  "location.hours": "Hours",
  "location.serviceArea": "Service Area",
  "location.openMaps": "Open in Google Maps →",
  "location.mapTitle": "Map of {name}",

  "contact.quoteLabel": "Request a Quote",
  "contact.touchLabel": "Get In Touch",
  "contact.bookTitle": "Book Your Appointment",
  "contact.bookSubtitle":
    "Ready to give your vehicle the premium treatment it deserves? Contact us today to schedule your detailing service.",
  "contact.fullName": "Full Name",
  "contact.phone": "Phone Number",
  "contact.email": "Email Address",
  "contact.vehicleInfo": "Vehicle Information",
  "contact.make": "Vehicle Make",
  "contact.model": "Model",
  "contact.year": "Year",
  "contact.service": "Service Needed",
  "contact.selectService": "Select a service",
  "contact.preferredDate": "Preferred Date",
  "contact.message": "Additional Message",
  "contact.messagePlaceholder": "Any additional details about your vehicle or service...",
  "contact.submitNote": "Submitting opens WhatsApp with your request pre-filled. No obligation.",
  "contact.sendWhatsApp": "Send Request via WhatsApp",
  "contact.whatsappCard": "WhatsApp",
  "contact.whatsappAction": "Message Us →",
  "contact.callCard": "Call Us",
  "contact.callAction": "Call Now →",
  "contact.emailCard": "Email",
  "contact.emailAction": "Send Email →",
  "contact.instagramCard": "Instagram",
  "contact.instagramAction": "Follow Us →",
  "contact.otherService": "Other / Not sure",
  "contact.formIntro": "Hi, I'd like to request a quote.",

  "footer.tagline": "Premium Detailing. Pristine Results.",
  "footer.serving": "Serving {city}, CT and surrounding areas.",
  "footer.contact": "Contact",
  "footer.services": "Services",
  "footer.hours": "Hours",
  "footer.rights": "All rights reserved.",
  "footer.privacy": "Privacy Policy",
  "footer.terms": "Terms & Conditions",
  "footer.admin": "Admin",

  "chat.greeting": "Hello! 👋 I'm your virtual assistant. How can I help you today?",
  "chat.title": "AI Assistant",
  "chat.online": "Online · {name}",
  "chat.syncing": " · syncing...",
  "chat.open": "Open AI assistant",
  "chat.close": "Close assistant",
  "chat.closePanel": "Close chat",
  "chat.send": "Send message",
  "chat.placeholder": "Type your message...",
  "chat.quick.services": "Services",
  "chat.quick.prices": "Prices",
  "chat.quick.book": "Book Appointment",
  "chat.quick.whatsapp": "Contact via WhatsApp",
  "chat.quick.paint": "Vehicle Painting",
} as const;

const es: Record<keyof typeof en, string> = {
  "nav.home": "Inicio",
  "nav.about": "Nosotros",
  "nav.services": "Servicios",
  "nav.gallery": "Galería",
  "nav.faq": "Preguntas",
  "nav.contact": "Contacto",
  "nav.getQuote": "Cotizar",
  "nav.menu": "Menú",

  "hero.scroll": "Desplazar",
  "hero.whatsappQuote": "Hola, me gustaría recibir una cotización gratuita para auto detailing.",

  "services.label": "Nuestros Servicios",
  "services.title": "Cuidado Automotriz Experto",

  "catalog.label": "Paquetes Disponibles",
  "catalog.title": "Servicios y Paquetes",
  "catalog.subtitle":
    "Elige el servicio ideal para tu vehículo. Contáctanos para una cotización personalizada.",
  "catalog.bookNow": "Reservar",
  "catalog.requestQuote": "Solicitar Cotización",
  "catalog.whatsapp": "WhatsApp",
  "catalog.priceNote":
    "* Los precios pueden variar según el tamaño y condición del vehículo. Contáctanos para una cotización exacta.",
  "catalog.bookMessage": "Hola, me gustaría reservar: {name}",
  "catalog.questionMessage": "Hola, tengo una pregunta sobre: {name}",

  "benefits.label": "Por Qué Elegirnos",
  "benefits.title": "Impulsados por la Calidad",
  "benefits.subtitle":
    "No solo lavamos autos; los restauramos y protegemos. Nuestros estándares rigurosos garantizan que cada vehículo salga luciendo mejor que el día que salió del concesionario.",

  "process.label": "El Proceso",
  "process.title": "Cómo Funciona",
  "process.subtitle": "De la solicitud al resultado — un proceso simple, claro y transparente.",
  "process.prev": "Paso anterior",
  "process.next": "Siguiente paso",
  "process.getEstimate": "Obtener estimado",

  "gallery.label": "Nuestro Trabajo",
  "gallery.title": "Antes y Después",
  "gallery.subtitle":
    "Nuestros resultados hablan por sí solos. Explora algunos de nuestros proyectos recientes de auto detailing premium.",
  "gallery.dragHint": "Arrastra el control para comparar antes y después",

  "testimonials.label": "Reseñas de Clientes",
  "testimonials.title": "Lo Que Dicen Nuestros Clientes",
  "testimonials.empty": "Sé el primero en dejar una reseña.",
  "testimonials.writeReview": "Escribir una Reseña",

  "faq.label": "Preguntas Frecuentes",
  "faq.title": "¿Tienes Preguntas?",
  "faq.moreQuestions": "¿Más preguntas? Contáctanos directamente.",
  "faq.requestQuote": "Solicitar Cotización",
  "faq.whatsappMessage": "Hola, tengo una pregunta.",

  "location.label": "Encuéntranos",
  "location.title": "Nuestra Ubicación",
  "location.address": "Dirección",
  "location.hours": "Horario",
  "location.serviceArea": "Zona de Servicio",
  "location.openMaps": "Abrir en Google Maps →",
  "location.mapTitle": "Mapa de {name}",

  "contact.quoteLabel": "Solicitar Cotización",
  "contact.touchLabel": "Contáctanos",
  "contact.bookTitle": "Reserva tu Cita",
  "contact.bookSubtitle":
    "¿Listo para darle a tu vehículo el tratamiento premium que merece? Contáctanos hoy para agendar tu servicio de detailing.",
  "contact.fullName": "Nombre Completo",
  "contact.phone": "Teléfono",
  "contact.email": "Correo Electrónico",
  "contact.vehicleInfo": "Información del Vehículo",
  "contact.make": "Marca",
  "contact.model": "Modelo",
  "contact.year": "Año",
  "contact.service": "Servicio Requerido",
  "contact.selectService": "Selecciona un servicio",
  "contact.preferredDate": "Fecha Preferida",
  "contact.message": "Mensaje Adicional",
  "contact.messagePlaceholder": "Detalles adicionales sobre tu vehículo o servicio...",
  "contact.submitNote":
    "Al enviar se abre WhatsApp con tu solicitud prellenada. Sin compromiso.",
  "contact.sendWhatsApp": "Enviar Solicitud por WhatsApp",
  "contact.whatsappCard": "WhatsApp",
  "contact.whatsappAction": "Escríbenos →",
  "contact.callCard": "Llámanos",
  "contact.callAction": "Llamar Ahora →",
  "contact.emailCard": "Email",
  "contact.emailAction": "Enviar Email →",
  "contact.instagramCard": "Instagram",
  "contact.instagramAction": "Síguenos →",
  "contact.otherService": "Otro / No estoy seguro",
  "contact.formIntro": "Hola, me gustaría solicitar una cotización.",

  "footer.tagline": "Detailing Premium. Resultados Impecables.",
  "footer.serving": "Servimos {city}, CT y áreas cercanas.",
  "footer.contact": "Contacto",
  "footer.services": "Servicios",
  "footer.hours": "Horario",
  "footer.rights": "Todos los derechos reservados.",
  "footer.privacy": "Política de Privacidad",
  "footer.terms": "Términos y Condiciones",
  "footer.admin": "Admin",

  "chat.greeting": "¡Hola! 👋 Soy tu asistente virtual. ¿En qué puedo ayudarte hoy?",
  "chat.title": "Asistente IA",
  "chat.online": "En línea · {name}",
  "chat.syncing": " · sincronizando...",
  "chat.open": "Abrir asistente IA",
  "chat.close": "Cerrar asistente",
  "chat.closePanel": "Cerrar chat",
  "chat.send": "Enviar mensaje",
  "chat.placeholder": "Escribe tu mensaje...",
  "chat.quick.services": "Servicios",
  "chat.quick.prices": "Precios",
  "chat.quick.book": "Reservar Cita",
  "chat.quick.whatsapp": "Contactar por WhatsApp",
  "chat.quick.paint": "Pintura de Vehículos",
};

export type TranslationKey = keyof typeof en;

export const translations: Record<Locale, Record<TranslationKey, string>> = { en, es };

export function tf(key: TranslationKey, locale: Locale, vars?: Record<string, string>): string {
  let text = translations[locale][key] ?? translations.en[key] ?? key;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      text = text.replace(`{${k}}`, v);
    }
  }
  return text;
}
