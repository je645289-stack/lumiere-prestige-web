import { contactInfo } from "@/data/contact";

/** @deprecated Use contactInfo from @/data/contact */
export const CHAT_WHATSAPP_NUMBER = contactInfo.whatsapp;

export const CHAT_GREETING =
  "Hello! 👋 I'm your virtual assistant. How can I help you today?";

export const CHAT_GREETING_ES =
  "¡Hola! 👋 Soy tu asistente virtual. ¿En qué puedo ayudarte hoy?";

export type QuickActionKey = "services" | "prices" | "book" | "whatsapp" | "paint";

export const QUICK_ACTION_KEYS: QuickActionKey[] = [
  "services",
  "prices",
  "book",
  "whatsapp",
  "paint",
];

/** @deprecated Use QUICK_ACTION_KEYS with locale labels */
export const QUICK_ACTIONS = [
  "Services",
  "Prices",
  "Book Appointment",
  "Contact via WhatsApp",
  "Vehicle Painting",
] as const;

export type QuickAction = (typeof QUICK_ACTIONS)[number];

export const CORE_SERVICES = [
  "Auto detailing",
  "Interior & exterior wash",
  "Interior detailing & deep cleaning",
  "Paint correction",
  "Ceramic coating",
  "Headlight restoration",
  "Engine bay cleaning",
  "Vehicle painting",
  "Car wash, polishing & waxing",
  "Interior shampoo & leather cleaning",
  "Stain & odor removal",
  "Full detailing packages",
  "Dash cam sales & installation",
  "Mobile detailing service",
] as const;

export const INTENT_KEYWORDS = {
  paint: [
    "paint",
    "painting",
    "vehicle painting",
    "car painting",
    "pintar",
    "pintura",
    "pintura de vehiculo",
    "pintura de vehículo",
    "pintura de carro",
    "pintura de auto",
  ],
  price: [
    "price",
    "prices",
    "cost",
    "how much",
    "pricing",
    "precio",
    "precios",
    "cuanto cuesta",
    "cuánto cuesta",
    "cotizacion",
    "cotización",
    "quote",
    "estimate",
  ],
  services: [
    "service",
    "services",
    "what do you offer",
    "what services",
    "servicio",
    "servicios",
    "que ofrecen",
    "qué ofrecen",
  ],
  booking: [
    "book",
    "booking",
    "appointment",
    "schedule",
    "reserve",
    "reservar",
    "cita",
    "agendar",
    "appointment",
  ],
  ceramic: ["ceramic", "coating", "ceramico", "cerámico", "recubrimiento"],
  interior: [
    "interior",
    "inside",
    "upholstery",
    "leather",
    "shampoo",
    "interior detail",
    "limpieza interior",
  ],
  exterior: ["exterior", "outside", "wash", "lavado", "exterior wash"],
  headlights: ["headlight", "headlights", "luces", "faros"],
  engine: ["engine", "engine bay", "motor", "compartimento del motor"],
  stain: ["stain", "stains", "mancha", "manchas", "odor", "olores", "olor", "smell"],
  location: [
    "location",
    "where",
    "address",
    "ubicacion",
    "ubicación",
    "donde estan",
    "dónde están",
    "direccion",
    "dirección",
  ],
  hours: ["hours", "open", "schedule", "horario", "horarios", "abierto"],
  contact: ["contact", "phone", "email", "call", "contacto", "telefono", "teléfono"],
  whatsapp: ["whatsapp", "whats app", "wa.me"],
  photos: ["photo", "photos", "picture", "pictures", "foto", "fotos", "imagen", "imagenes"],
  duration: [
    "how long",
    "duration",
    "take",
    "cuanto tarda",
    "cuánto tarda",
    "tiempo",
  ],
  greeting: ["hello", "hi", "hey", "good morning", "good afternoon", "hola", "buenas"],
  thanks: ["thank", "thanks", "gracias", "muchas gracias"],
} as const;

export const FALLBACK_BUSINESS = {
  name: "Albert Auto Detailing",
  phone: contactInfo.phoneDisplay,
  email: "info@albertautodetailing.com",
  address: "Norwalk, Connecticut 06851",
  serviceArea:
    "Mobile service throughout Norwalk, Stamford, Bridgeport, and surrounding CT areas.",
  schedule: [{ day: "Mon–Sat", hours: "8am–6pm" }],
} as const;

export const PACKAGES_STARTING = [
  { name: "Express Wax", price: "$100" },
  { name: "Headlight Restoration", price: "$100" },
  { name: "VIP Interior Clean", price: "$120" },
  { name: "Engine Bay Cleaning", price: "$200" },
  { name: "Luxury Interior Detail", price: "$250" },
  { name: "Bumper to Bumper", price: "$350" },
  { name: "Diamond Plate Ceramic Coating", price: "$450" },
  { name: "Dash Cam Sales & Installation", price: "Contact for pricing" },
] as const;