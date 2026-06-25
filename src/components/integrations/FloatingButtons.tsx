"use client";

import { useState } from "react";
import { MessageCircle, Phone, X, Bot, HelpCircle } from "lucide-react";
import type { SiteConfig } from "@/types";
import { getWhatsAppLink, getPhoneLink } from "@/lib/utils";

export function FloatingButtons({ config }: { config: SiteConfig }) {
  const [showHelp, setShowHelp] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([
    {
      role: "assistant",
      content: `¡Hola! Soy el asistente de ${config.businessName}. ¿En qué puedo ayudarte hoy?`,
    },
  ]);

  const handleSendChat = async () => {
    if (!chatMessage.trim()) return;
    const userMsg = chatMessage.trim();
    setChatHistory((prev) => [...prev, { role: "user", content: userMsg }]);
    setChatMessage("");

    if (config.integrations.aiAssistantEnabled) {
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: userMsg }),
        });
        const data = await res.json();
        setChatHistory((prev) => [
          ...prev,
          { role: "assistant", content: data.reply || "Gracias por tu mensaje. Un agente te contactará pronto." },
        ]);
      } catch {
        setChatHistory((prev) => [
          ...prev,
          { role: "assistant", content: "Gracias por tu mensaje. Te responderemos a la brevedad." },
        ]);
      }
    } else {
      const autoReplies: Record<string, string> = {
        horario: `Nuestro horario es: ${config.contact.schedule.map((s) => `${s.day}: ${s.hours}`).join(", ")}`,
        precio: "Los precios varían según el servicio. Te invitamos a ver nuestro catálogo o contactarnos para una cotización personalizada.",
        reservar: "Puedes reservar desde la sección de contacto, por WhatsApp o llamando directamente.",
        ubicacion: `Estamos en ${config.contact.address}, ${config.contact.city}, ${config.contact.country}.`,
      };

      const lower = userMsg.toLowerCase();
      let reply = "Gracias por tu mensaje. Para atención personalizada, contáctanos por WhatsApp o llámanos directamente.";
      for (const [key, value] of Object.entries(autoReplies)) {
        if (lower.includes(key)) {
          reply = value;
          break;
        }
      }

      setTimeout(() => {
        setChatHistory((prev) => [...prev, { role: "assistant", content: reply }]);
      }, 500);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        <a
          href={getWhatsAppLink(
            config.contact.whatsapp,
            `Hola ${config.businessName}, me gustaría recibir más información.`
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-green-600 text-white shadow-lg transition-transform hover:scale-110"
          aria-label="WhatsApp"
        >
          <MessageCircle className="h-6 w-6" />
        </a>
        <a
          href={getPhoneLink(config.contact.phone)}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-gold text-brand-dark shadow-lg transition-transform hover:scale-110"
          aria-label="Llamar"
        >
          <Phone className="h-6 w-6" />
        </a>
        <button
          onClick={() => setShowHelp(!showHelp)}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-surface border border-brand-border text-brand-cream shadow-lg transition-transform hover:scale-110"
          aria-label="Ayuda"
        >
          {showHelp ? <X className="h-6 w-6" /> : <HelpCircle className="h-6 w-6" />}
        </button>
      </div>

      {showHelp && (
        <div className="fixed bottom-24 right-6 z-50 flex h-[420px] w-[340px] flex-col overflow-hidden rounded-xl border border-brand-border bg-brand-surface shadow-2xl">
          <div className="flex items-center gap-2 border-b border-brand-border bg-brand-dark px-4 py-3">
            <Bot className="h-5 w-5 text-brand-gold" />
            <div>
              <p className="text-sm font-medium text-brand-cream">Asistente {config.businessName}</p>
              <p className="text-xs text-brand-muted">
                {config.integrations.chatProvider === "prepared"
                  ? "Listo para conectar chat en vivo"
                  : "En línea"}
              </p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {chatHistory.map((msg, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                  msg.role === "user"
                    ? "ml-auto bg-brand-gold text-brand-dark"
                    : "bg-brand-dark text-brand-cream"
                }`}
              >
                {msg.content}
              </div>
            ))}
          </div>

          <div className="border-t border-brand-border p-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendChat()}
                placeholder="Escribe tu pregunta..."
                className="flex-1 rounded-lg border border-brand-border bg-brand-dark px-3 py-2 text-sm text-brand-cream placeholder:text-brand-muted focus:border-brand-gold focus:outline-none"
              />
              <button
                onClick={handleSendChat}
                className="rounded-lg bg-brand-gold px-3 py-2 text-sm font-medium text-brand-dark hover:bg-brand-gold-light"
              >
                Enviar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
