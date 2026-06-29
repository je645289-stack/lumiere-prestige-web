export const contactInfo = {
  phone: "4856898301",
  whatsapp: "14856898301",
  whatsappMessage: "Hello, I would like more information about your services.",
  /** Shown in UI where a formatted number is needed */
  phoneDisplay: "(485) 689-8301",
} as const;

export type ContactFields = {
  phone?: string;
  whatsapp?: string;
};

/** Resolve dial/WhatsApp numbers from CMS config with static defaults as fallback. */
export function resolveContact(fields?: ContactFields) {
  const phoneDisplay = fields?.phone?.trim() || contactInfo.phoneDisplay;
  const phone = phoneDisplay.replace(/\D/g, "") || contactInfo.phone;
  const whatsapp = (fields?.whatsapp || contactInfo.whatsapp).replace(/\D/g, "");
  return {
    phone,
    whatsapp,
    whatsappMessage: contactInfo.whatsappMessage,
    phoneDisplay,
  };
}

export const defaultWhatsAppUrl = `https://wa.me/${contactInfo.whatsapp}?text=${encodeURIComponent(contactInfo.whatsappMessage)}`;

export const defaultPhoneUrl = `tel:${contactInfo.phone}`;
