"use client";

import { useState } from "react";
import { MessageCircle, Phone, X, Bot, HelpCircle } from "lucide-react";
import type { SiteConfig } from "@/types";
import { getWhatsAppLink, getPhoneLink } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n";

export function FloatingButtons({ config }: { config: SiteConfig }) {
  const { t } = useLanguage();
  const [showHelp, setShowHelp] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([]);

  const history =
    chatHistory.length === 0
      ? [{ role: "assistant" as const, content: t("chat.greeting") }]
      : chatHistory;

  const handleSendChat = () => {
    if (!chatMessage.trim()) return;
    const userMsg = chatMessage.trim();
    const base = chatHistory.length === 0 ? history : chatHistory;
    setChatHistory([...base, { role: "user", content: userMsg }]);
    setChatMessage("");
    setTimeout(() => {
      setChatHistory((prev) => [
        ...prev,
        { role: "assistant", content: t("chat.fallback") },
      ]);
    }, 500);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        <a
          href={getWhatsAppLink(
            config.contact.whatsapp,
            `Hi ${config.businessName}, I'd like more information.`
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
          className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-red text-white shadow-lg transition-transform hover:scale-110"
          aria-label="Call"
        >
          <Phone className="h-6 w-6" />
        </a>
        <button
          onClick={() => setShowHelp(!showHelp)}
          className="flex h-14 w-14 items-center justify-center rounded-full border border-brand-border bg-brand-surface text-brand-cream shadow-lg transition-transform hover:scale-110"
          aria-label="Help"
        >
          {showHelp ? <X className="h-6 w-6" /> : <HelpCircle className="h-6 w-6" />}
        </button>
      </div>

      {showHelp && (
        <div className="fixed bottom-24 right-6 z-50 flex h-[420px] w-[340px] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-xl border border-brand-border bg-brand-surface shadow-2xl">
          <div className="flex items-center gap-2 border-b border-brand-border bg-brand-dark px-4 py-3">
            <Bot className="h-5 w-5 text-brand-red" />
            <div>
              <p className="text-sm font-medium text-brand-cream">{config.businessName}</p>
              <p className="text-xs text-brand-muted">{t("chat.online")}</p>
            </div>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {history.map((msg, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                  msg.role === "user"
                    ? "ml-auto bg-brand-red text-white"
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
                placeholder={t("chat.placeholder")}
                className="flex-1 rounded-lg border border-brand-border bg-brand-dark px-3 py-2 text-sm text-brand-cream placeholder:text-brand-muted focus:border-brand-red focus:outline-none"
              />
              <button
                onClick={handleSendChat}
                className="rounded-lg bg-brand-red px-3 py-2 text-sm font-medium text-white hover:bg-brand-red-bright"
              >
                {t("chat.send")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
