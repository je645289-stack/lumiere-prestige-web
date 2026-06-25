import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { getSiteData } from "@/lib/site-data";
import { buildMetadata, buildLocalBusinessSchema } from "@/lib/seo";
import { AnalyticsScripts } from "@/components/integrations/AnalyticsScripts";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

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
    <html lang="es" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body className="font-sans">
        <AnalyticsScripts config={config} />
        {children}
      </body>
    </html>
  );
}
