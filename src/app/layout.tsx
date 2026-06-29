import type { Metadata } from "next";
import { Montserrat, Cormorant_Garamond, Cinzel } from "next/font/google";
import "./globals.css";
import { getSiteData } from "@/lib/site-data";
import { buildMetadata, buildLocalBusinessSchema } from "@/lib/seo";
import { AnalyticsScripts } from "@/components/integrations/AnalyticsScripts";
import { ChatAssistantRoot } from "@/components/integrations/ChatAssistantRoot";
import { AdminOverlay } from "@/components/admin/AdminOverlay";
import { ContentSyncListener } from "@/components/admin/ContentSyncListener";
import { LanguageProvider } from "@/i18n/LanguageProvider";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["400", "600"],
  style: ["normal", "italic"],
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
  weight: ["500", "600", "700"],
});

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const { config } = await getSiteData();
  return buildMetadata(config);
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { config } = await getSiteData();
  const schema = buildLocalBusinessSchema(config);

  return (
    <html lang="en" className={`${montserrat.variable} ${cormorant.variable} ${cinzel.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body className="font-sans">
        <LanguageProvider>
          <ContentSyncListener />
          <AnalyticsScripts config={config} />
          {children}
          <ChatAssistantRoot />
          <AdminOverlay />
        </LanguageProvider>
      </body>
    </html>
  );
}
