import type { Metadata } from "next";
import { Inter, Montserrat, Bebas_Neue } from "next/font/google";
import "./globals.css";
import { getSiteData } from "@/lib/site-data";
import { buildMetadata, buildLocalBusinessSchema } from "@/lib/seo";
import { AnalyticsScripts } from "@/components/integrations/AnalyticsScripts";
import { LanguageProvider } from "@/lib/i18n";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const bebas = Bebas_Neue({
  subsets: ["latin"],
  variable: "--font-bebas",
  weight: "400",
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
    <html
      lang="en"
      className={`${inter.variable} ${montserrat.variable} ${bebas.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body className="font-sans">
        <AnalyticsScripts config={config} />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
