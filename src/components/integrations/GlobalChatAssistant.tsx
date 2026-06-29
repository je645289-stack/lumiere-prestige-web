"use client";

import { useCallback, useEffect, useState } from "react";
import { AIChatAssistant } from "@/components/integrations/AIChatAssistant";
import { loadAdminContent, subscribeToContentStore } from "@/lib/content-store";
import type { ChatContext } from "@/lib/chat-engine";
import type { FAQ, Product, Service, SiteConfig } from "@/types";

export function GlobalChatAssistant() {
  const [ctx, setCtx] = useState<ChatContext | null>(null);
  const [loading, setLoading] = useState(false);

  const loadContext = useCallback(async (): Promise<ChatContext | null> => {
    if (ctx) return ctx;
    if (loading) return null;

    setLoading(true);
    try {
      const [config, services, products, faqs] = await Promise.all([
        loadAdminContent<SiteConfig>("site-config"),
        loadAdminContent<Service[]>("services"),
        loadAdminContent<Product[]>("products"),
        loadAdminContent<FAQ[]>("faqs"),
      ]);
      const loaded: ChatContext = {
        config,
        services: services.filter((s) => s.enabled),
        products: products.filter((p) => p.enabled),
        faqs: faqs.filter((f) => f.enabled),
      };
      setCtx(loaded);
      return loaded;
    } catch {
      return null;
    } finally {
      setLoading(false);
    }
  }, [ctx, loading]);

  useEffect(() => subscribeToContentStore(() => setCtx(null)), []);

  return (
    <AIChatAssistant
      context={ctx}
      loading={loading}
      onEnsureContext={loadContext}
    />
  );
}
