"use client";

import dynamic from "next/dynamic";

const GlobalChatAssistant = dynamic(
  () =>
    import("@/components/integrations/GlobalChatAssistant").then(
      (m) => m.GlobalChatAssistant
    ),
  { ssr: false }
);

export function ChatAssistantRoot() {
  return <GlobalChatAssistant />;
}
