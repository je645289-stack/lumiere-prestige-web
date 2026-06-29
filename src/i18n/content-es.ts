import type { SiteConfig } from "@/types";

type SiteConfigEsPatch = {
  tagline?: string;
  hero?: Partial<SiteConfig["hero"]>;
  promotions?: Partial<NonNullable<SiteConfig["promotions"]>>;
  mobileService?: Partial<NonNullable<SiteConfig["mobileService"]>>;
  about?: Partial<SiteConfig["about"]>;
  contact?: Partial<SiteConfig["contact"]>;
  cta?: Partial<SiteConfig["cta"]>;
};

/** Spanish overrides for CMS content (English is the default in data/*.json). */
export const esSiteConfig: SiteConfigEsPatch = {
  tagline: "Est. 2023 · Norwalk, CT",
  hero: {
    badge: "Est. 2023 · Norwalk, CT",
    title: "Detailing de Precisión.",
    titleAccent: "Perfeccionado.",
    subtitle:
      "Detailing profesional que restaura tu vehículo con brillo y protección como nuevo.",
    description: "",
    primaryButton: { text: "Cotización Gratis", href: "#contacto" },
    secondaryButton: { text: "Reservar Cita", href: "#contacto" },
    tertiaryButton: { text: "Llamar Ahora", href: "tel:4856898301" },
    imageAlt: "Auto detailing profesional en Norwalk CT",
  },
  promotions: {
    label: "Ofertas por Tiempo Limitado",
    title: "Promociones Especiales",
    offers: [
      "20% de descuento en tu primer servicio",
      "$15 de descuento en cualquier paquete de detailing completo",
      "Lavado interior gratis en tu primera visita",
      "Consulta gratis — sin compromiso",
    ],
    buttonText: "Reclamar Oferta",
    buttonHref: "#contacto",
  },
  mobileService: {
    title: "Servicio Móvil Disponible",
    description:
      "¡Vamos a ti! Disfruta de auto detailing profesional en tu hogar, trabajo o ubicación preferida. Traemos nuestros propios productos y equipos premium.",
    buttonText: "Agendar Servicio Móvil",
    buttonHref: "#contacto",
  },
  about: {
    label: "Sobre Nosotros",
    title: "Obsesionados con la Perfección",
    subtitle: "",
    story:
      "En Albert Auto Detailing nos especializamos en servicios premium de auto detailing diseñados para mantener tu vehículo limpio, fresco y protegido — sirviendo Norwalk, CT y áreas cercanas.",
    experience:
      "Desde 2023 nos hemos enfocado en calidad, atención al detalle y satisfacción del cliente. Cada vehículo recibe el máximo cuidado porque entendemos que tu auto es una inversión. Nos enorgullece cada detalle, entregando resultados que hablan por sí solos.",
    stats: [
      { label: "Satisfacción", value: "100%" },
      { label: "Servicio Calificado", value: "5★" },
    ],
    imageAlt: "Detallista profesional trabajando en un vehículo",
  },
  contact: {
    email: "info@albertautodetailing.com",
    phone: "(485) 689-8301",
    whatsapp: "14856898301",
    address: "Norwalk, Connecticut 06851",
    city: "Norwalk",
    country: "Estados Unidos",
    schedule: [{ day: "Lun–Sáb", hours: "8am–6pm" }],
    serviceArea:
      "También ofrecemos servicio móvil en Norwalk, Stamford, Bridgeport y áreas cercanas de CT.",
  },
  cta: {
    title: "Obtén tu Estimado Gratis",
    subtitle:
      "Completa el formulario y te responderemos con una cotización personalizada. Sin compromiso, completamente gratis.",
    primaryButton: { text: "Enviar Solicitud por WhatsApp", href: "whatsapp" },
    secondaryButton: { text: "Chat por WhatsApp", href: "whatsapp" },
  },
};

export const esServices: Record<string, { name: string; description: string }> = {
  "svc-1": {
    name: "Lavado Interior y Exterior",
    description:
      "Limpieza completa interior y exterior para eliminar suciedad, grasa y residuos, dejando un acabado impecable por dentro y por fuera.",
  },
  "svc-2": {
    name: "Corrección de Pintura",
    description:
      "Elimina marcas circulares, rayones y oxidación para restaurar la pintura a un acabado espejo de calidad showroom.",
  },
  "svc-3": {
    name: "Recubrimiento Cerámico",
    description:
      "Protección nano-cerámica duradera que repele agua, rayos UV y contaminantes por años de brillo impecable.",
  },
  "svc-4": {
    name: "Restauración de Faros",
    description:
      "Restaura la claridad y mejora la visibilidad nocturna, eliminando amarillamiento y oxidación de los lentes.",
  },
  "svc-5": {
    name: "Limpieza de Motor",
    description:
      "Desengrase y limpieza profunda del compartimento del motor para un motor impecable que rinde y luce al máximo.",
  },
  "svc-6": {
    name: "Protección de Cuero",
    description:
      "Tratamiento profundo de acondicionamiento y protección que restaura suavidad, color y durabilidad en superficies de cuero.",
  },
  "svc-7": {
    name: "Eliminación de Manchas",
    description:
      "Tratamiento avanzado para eliminar manchas difíciles en tapicería, alfombras y superficies — resultados garantizados.",
  },
  "svc-8": {
    name: "Paquete de Detailing Completo",
    description:
      "El tratamiento completo — limpieza interior profunda, lavado exterior, corrección de pintura y protección — todo en un paquete premium.",
  },
  "svc-9": {
    name: "Instalación de Dash Cam",
    description:
      "Instalación profesional de cámaras dash con grabación continua, detección de impactos y visión nocturna. Opciones Wi-Fi y nube disponibles.",
  },
};

export const esProducts: Record<
  string,
  { name: string; priceLabel?: string; price?: string; features?: string[] }
> = {
  "pkg-1": {
    name: "Express Wax",
    priceLabel: "Desde",
    features: [
      "Cera aplicada a mano",
      "Pulido orbital",
      "Aspirado interior",
      "Ventanas limpias por dentro y fuera",
      "Limpieza de rines a presión + brillo en llantas",
    ],
  },
  "pkg-2": {
    name: "Restauración de Faros",
    priceLabel: "Desde",
    features: [
      "Lavado ultimate",
      "Restauración de faros",
      "Nuevo recubrimiento UV protector",
      "Completado en ~45 minutos",
      "Garantía escrita de 1 año",
    ],
  },
  "pkg-3": {
    name: "Limpieza Interior VIP",
    priceLabel: "Desde",
    features: [
      "Aspirado detallado de alfombras y tapicería",
      "Ventanas limpias por dentro y fuera",
      "Tablero, paneles, rejillas y ranuras limpios",
      "Retiro de basura",
      "Marco de puertas limpio",
      "Brillo en llantas",
    ],
  },
  "pkg-4": {
    name: "Limpieza de Compartimento del Motor",
    priceLabel: "Desde",
    features: [
      "Protección de componentes",
      "Aplicación de desengrasante profesional",
      "Enjuague a presión controlada",
      "Acondicionamiento de plásticos y goma",
      "Acabado de limpieza profunda con brillo mejorado",
    ],
  },
  "pkg-5": {
    name: "Detalle Interior de Lujo",
    priceLabel: "Desde",
    features: [
      "Aspirado y shampoo de alfombras y tapicería",
      "Limpieza y acondicionamiento de cuero",
      "Paneles de puertas limpios",
      "Ventanas limpias por dentro y fuera",
      "Marco de puertas limpio",
      "Tablero y consola central limpios",
      "Brillo en llantas",
    ],
  },
  "pkg-6": {
    name: "Bumper to Bumper",
    priceLabel: "Desde",
    features: [
      "Preparación de pintura exterior",
      "Cera avanzada de 2 pasos",
      "Aspirado y shampoo de alfombras y tapicería",
      "Limpieza y acondicionamiento de cuero",
      "Ventanas limpias por dentro y fuera",
      "Marco de puertas limpio",
      "Tablero y consola central limpios",
      "Limpieza de rines a presión + brillo en llantas",
      "Restauración de plásticos negros",
    ],
  },
  "pkg-7": {
    name: "Recubrimiento Cerámico Diamond Plate",
    priceLabel: "Desde",
    features: [
      "Resistencia superior a rayones",
      "Hasta 3 años de durabilidad",
      "Protección UV",
      "Resistencia a contaminantes ambientales",
      "Protección hidrofóbica extrema",
    ],
  },
  "pkg-8": {
    name: "Venta e Instalación de Dash Cam",
    price: "Consultar precio",
    priceLabel: "",
    features: [
      "Grabación continua",
      "Tecnología de sensor de impacto",
      "Visión nocturna",
      "Instalación profesional",
      "Opciones Wi-Fi y nube disponibles",
    ],
  },
};

export const esFaqs: Record<string, { question: string; answer: string }> = {
  "faq-1": {
    question: "¿Ofrecen cotizaciones personalizadas?",
    answer:
      "¡Sí! Ofrecemos cotizaciones gratis y personalizadas según la marca, modelo, año y condición de tu vehículo. Contáctanos por WhatsApp, teléfono o nuestro formulario — sin compromiso.",
  },
  "faq-2": {
    question: "¿Cómo puedo reservar una cita?",
    answer:
      "Puedes reservar completando nuestro formulario de cotización, escribiéndonos por WhatsApp, llamando directamente o usando el botón Reservar Cita. Confirmaremos tu fecha y hora pronto.",
  },
  "faq-3": {
    question: "¿Muestran precios en línea?",
    answer:
      "Mostramos precios iniciales para nuestros paquetes. El precio final puede variar según el tamaño y condición del vehículo. Contáctanos para una cotización exacta adaptada a tu vehículo.",
  },
  "faq-4": {
    question: "¿Qué servicios ofrecen?",
    answer:
      "Ofrecemos lavado interior y exterior, corrección de pintura, recubrimiento cerámico, restauración de faros, limpieza de motor, protección de cuero, eliminación de manchas, paquetes de detailing completo e instalación de dash cam.",
  },
  "faq-5": {
    question: "¿Dónde están ubicados?",
    answer:
      "Estamos en Norwalk, Connecticut 06851. También ofrecemos detailing móvil en Norwalk, Stamford, Bridgeport y áreas cercanas de CT.",
  },
  "faq-6": {
    question: "¿Puedo contactarlos por WhatsApp?",
    answer:
      "¡Por supuesto! WhatsApp es uno de nuestros métodos de contacto preferidos. Haz clic en cualquier botón de WhatsApp del sitio para iniciar una conversación con tu solicitud prellenada.",
  },
};

export const esBenefits: Record<string, { title: string }> = {
  "ben-1": { title: "Servicios de detailing premium" },
  "ben-2": { title: "Atención a cada detalle" },
  "ben-3": { title: "Servicio móvil disponible" },
  "ben-4": { title: "Resultados profesionales" },
  "ben-5": { title: "Cuidado interior y exterior" },
  "ben-6": { title: "Productos de calidad" },
  "ben-7": { title: "Enfocados en la satisfacción del cliente" },
};

export const esProcessSteps: Record<string, { title: string; description: string }> = {
  "step-1": {
    title: "Solicitar Información",
    description: "Contáctanos por WhatsApp, teléfono o el formulario de cotización.",
  },
  "step-2": {
    title: "Detalles del Vehículo",
    description: "Comparte la marca, modelo, año y condición actual de tu vehículo.",
  },
  "step-3": {
    title: "Elegir un Servicio",
    description: "Selecciona el paquete o servicio de detailing que mejor se adapte a tus necesidades.",
  },
  "step-4": {
    title: "Obtener tu Cotización",
    description: "Te enviaremos una cotización personalizada — sin cargos ocultos.",
  },
  "step-5": {
    title: "Confirmar tu Cita",
    description: "Elige la fecha y hora que te convenga.",
  },
  "step-6": {
    title: "Realizamos el Trabajo",
    description:
      "Nuestro equipo realiza el servicio con productos premium y atención a cada detalle.",
  },
  "step-7": {
    title: "Recoge tu Vehículo",
    description:
      "Disfruta de un vehículo impecable y profesionalmente detallado, listo para impresionar.",
  },
};

export const esGallery: Record<
  string,
  { category: string; description: string; alt: string }
> = {
  "gal-1": {
    category: "Corrección de Pintura",
    description:
      "Corrección de pintura profesional que restaura el vehículo a condición de showroom.",
    alt: "Corrección de pintura — antes y después",
  },
  "gal-2": {
    category: "Detalle Interior",
    description:
      "Limpieza interior profunda — cada superficie, ranura y tela restaurada a condición impecable.",
    alt: "Detalle interior — antes y después",
  },
};

export const esCoreServices = [
  "Auto detailing",
  "Lavado interior y exterior",
  "Detailing interior y limpieza profunda",
  "Corrección de pintura",
  "Recubrimiento cerámico",
  "Restauración de faros",
  "Limpieza de compartimento del motor",
  "Pintura de vehículos",
  "Lavado, pulido y encerado",
  "Shampoo interior y limpieza de cuero",
  "Eliminación de manchas y olores",
  "Paquetes de detailing completo",
  "Venta e instalación de dash cam",
  "Servicio móvil de detailing",
] as const;

export const esPackagesStarting = [
  { name: "Express Wax", price: "$100" },
  { name: "Restauración de Faros", price: "$100" },
  { name: "Limpieza Interior VIP", price: "$120" },
  { name: "Limpieza de Compartimento del Motor", price: "$200" },
  { name: "Detalle Interior de Lujo", price: "$250" },
  { name: "Bumper to Bumper", price: "$350" },
  { name: "Recubrimiento Cerámico Diamond Plate", price: "$450" },
  { name: "Venta e Instalación de Dash Cam", price: "Consultar precio" },
] as const;

export const esFooterServices = [
  "Lavado Interior y Exterior",
  "Corrección de Pintura",
  "Recubrimiento Cerámico",
  "Restauración de Faros",
  "Limpieza de Motor",
  "Protección de Cuero",
  "Eliminación de Manchas",
] as const;

export const esContactServiceOptions = [
  "Lavado Interior y Exterior",
  "Corrección de Pintura",
  "Recubrimiento Cerámico",
  "Restauración de Faros",
  "Limpieza de Motor",
  "Protección de Cuero",
  "Eliminación de Manchas",
  "Paquete de Detailing Completo",
  "Otro / No estoy seguro",
] as const;
