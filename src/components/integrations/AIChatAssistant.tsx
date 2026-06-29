"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Send, X, MessageCircle } from "lucide-react";
import { cn, externalLinkProps } from "@/lib/utils";
import { QUICK_ACTION_KEYS, type QuickActionKey } from "@/data/chatKnowledge";
import {
  type ChatContext,
  type ChatLanguage,
  getChatGreeting,
  getFallbackChatContext,
  getWhatsAppLabel,
  getWhatsAppUrl,
  processChatMessage,
  processQuickAction,
} from "@/lib/chat-engine";
import { useLanguage } from "@/i18n/LanguageProvider";
import type { TranslationKey } from "@/i18n/translations";
import { ChatGPTLogo } from "@/components/integrations/ChatGPTLogo";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  showWhatsApp?: boolean;
  whatsappMessage?: string;
  lang?: ChatLanguage;
}

interface AIChatAssistantProps {
  context: ChatContext | null;
  loading: boolean;
  onEnsureContext: () => Promise<ChatContext | null>;
}

const QUICK_ACTION_LABELS: Record<QuickActionKey, TranslationKey> = {
  services: "chat.quick.services",
  prices: "chat.quick.prices",
  book: "chat.quick.book",
  whatsapp: "chat.quick.whatsapp",
  paint: "chat.quick.paint",
};

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export function AIChatAssistant({
  context,
  loading: contextLoading,
  onEnsureContext,
}: AIChatAssistantProps) {
  const pathname = usePathname();
  const { locale, t, tf } = useLanguage();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const ctx = context ?? getFallbackChatContext();
  const businessName = ctx.config.businessName;
  const isAdmin = pathname.startsWith("/admin");

  useEffect(() => {
    setMessages([{ id: uid(), role: "assistant", content: getChatGreeting(locale) }]);
  }, [locale]);

  const handleOpen = async () => {
    setOpen(true);
    await onEnsureContext();
  };

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing, open]);

  const appendAssistant = useCallback(
    (response: ReturnType<typeof processChatMessage>, lang: ChatLanguage) => {
      setMessages((prev) => [
        ...prev,
        {
          id: uid(),
          role: "assistant",
          content: response.content,
          showWhatsApp: response.showWhatsApp,
          whatsappMessage: response.whatsappMessage,
          lang,
        },
      ]);
    },
    []
  );

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;

      const activeCtx = (await onEnsureContext()) ?? context ?? getFallbackChatContext();

      setMessages((prev) => [...prev, { id: uid(), role: "user", content: trimmed }]);
      setInput("");
      setTyping(true);

      if (activeCtx.config.integrations.aiAssistantEnabled) {
        try {
          const res = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: trimmed, locale }),
          });
          const data = (await res.json()) as { reply?: string };
          appendAssistant(
            {
              content: data.reply || processChatMessage(trimmed, activeCtx, locale).content,
              showWhatsApp: true,
            },
            locale
          );
        } catch {
          appendAssistant(processChatMessage(trimmed, activeCtx, locale), locale);
        }
      } else {
        await new Promise((r) => setTimeout(r, 400));
        appendAssistant(processChatMessage(trimmed, activeCtx, locale), locale);
      }

      setTyping(false);
    },
    [appendAssistant, context, locale, onEnsureContext]
  );

  const handleQuickAction = async (action: QuickActionKey) => {
    setOpen(true);
    const activeCtx = (await onEnsureContext()) ?? context ?? getFallbackChatContext();
    setMessages((prev) => [
      ...prev,
      { id: uid(), role: "user", content: t(QUICK_ACTION_LABELS[action]) },
    ]);
    setTyping(true);
    setTimeout(() => {
      appendAssistant(processQuickAction(action, activeCtx, locale), locale);
      setTyping(false);
    }, 350);
  };

  if (isAdmin) return null;

  return (
    <>
      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
        <button
          type="button"
          onClick={() => {
            if (open) setOpen(false);
            else void handleOpen();
          }}
          aria-label={open ? t("chat.close") : t("chat.open")}
          aria-expanded={open}
          className={cn(
            "group flex h-14 w-14 items-center justify-center rounded-full shadow-xl transition-all duration-300",
            "bg-gradient-to-br from-[#10a37f] to-[#0d8a6a] text-white",
            "hover:scale-105 hover:shadow-2xl hover:shadow-[#10a37f]/30",
            "focus:outline-none focus:ring-2 focus:ring-[#10a37f]/50 focus:ring-offset-2 focus:ring-offset-brand-dark",
            open && "rotate-0 scale-95"
          )}
        >
          {open ? (
            <X className="h-6 w-6 transition-transform duration-300" />
          ) : (
            <ChatGPTLogo className="h-7 w-7 text-white transition-transform duration-300 group-hover:scale-110" />
          )}
        </button>
      </div>

      <div
        role="dialog"
        aria-label={t("chat.title")}
        aria-hidden={!open}
        className={cn(
          "fixed z-50 flex flex-col overflow-hidden rounded-2xl border border-brand-border/80 bg-brand-dark shadow-2xl shadow-black/50 backdrop-blur-xl transition-all duration-300 ease-out",
          "bottom-24 right-4 w-[calc(100vw-2rem)] max-w-[380px] sm:right-6",
          open
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-4 scale-95 opacity-0"
        )}
        style={{ height: open ? "min(520px, calc(100vh - 7rem))" : 0 }}
      >
        <div className="flex items-center gap-3 border-b border-brand-border/60 bg-gradient-to-r from-brand-navy to-brand-dark px-4 py-3.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#10a37f] to-[#0d8a6a] text-white shadow-lg">
            <ChatGPTLogo className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-brand-cream">{t("chat.title")}</p>
            <p className="flex items-center gap-1.5 text-xs text-brand-muted">
              <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              {tf("chat.online", { name: businessName })}
              {contextLoading && t("chat.syncing")}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-lg p-1.5 text-brand-muted transition-colors hover:bg-brand-navy hover:text-brand-cream"
            aria-label={t("chat.closePanel")}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn("flex flex-col gap-2", msg.role === "user" ? "items-end" : "items-start")}
            >
              <div
                className={cn(
                  "max-w-[88%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-line",
                  msg.role === "user"
                    ? "rounded-br-md bg-brand-red text-white"
                    : "rounded-bl-md border border-brand-border/50 bg-brand-navy/80 text-brand-cream"
                )}
              >
                {msg.content}
              </div>
              {msg.role === "assistant" && msg.showWhatsApp && (
                <a
                  href={getWhatsAppUrl(ctx.config.contact)}
                  {...externalLinkProps(getWhatsAppUrl(ctx.config.contact))}
                  className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-xs font-semibold text-white shadow-md transition-transform hover:scale-[1.02] hover:bg-[#20bd5a]"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  {getWhatsAppLabel(msg.lang ?? locale)}
                </a>
              )}
            </div>
          ))}

          {typing && (
            <div className="flex items-start">
              <div className="rounded-2xl rounded-bl-md border border-brand-border/50 bg-brand-navy/80 px-4 py-3">
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="h-2 w-2 animate-bounce rounded-full bg-brand-accent"
                      style={{ animationDelay: `${i * 150}ms` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {messages.length <= 2 && !typing && (
            <div className="flex flex-wrap gap-2 pt-1">
              {QUICK_ACTION_KEYS.map((action) => (
                <button
                  key={action}
                  type="button"
                  onClick={() => handleQuickAction(action)}
                  className="rounded-full border border-brand-accent/40 bg-brand-navy/50 px-3 py-1.5 text-xs font-medium text-brand-cream transition-colors hover:border-brand-accent hover:bg-brand-accent/10"
                >
                  {t(QUICK_ACTION_LABELS[action])}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="border-t border-brand-border/60 bg-brand-darker/80 p-3">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(input);
            }}
            className="flex gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t("chat.placeholder")}
              className="flex-1 rounded-xl border border-brand-border bg-brand-navy px-3.5 py-2.5 text-sm text-brand-cream placeholder:text-brand-muted focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent/40"
              autoComplete="off"
            />
            <button
              type="submit"
              disabled={!input.trim() || typing}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#10a37f] to-[#0d8a6a] text-white transition-opacity hover:opacity-90 disabled:opacity-40"
              aria-label={t("chat.send")}
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
