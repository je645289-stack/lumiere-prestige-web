import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getSiteData } from "@/lib/site-data";
import { buildMetadata } from "@/lib/seo";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingButtons } from "@/components/integrations/FloatingButtons";
import { ServicesSection } from "@/components/sections/ServicesSection";

export async function generateMetadata(): Promise<Metadata> {
  const { config } = await getSiteData();
  return buildMetadata(config, {
    title: "Services",
    description: "Explore all professional auto detailing services at " + config.businessName,
    path: "/servicios",
  });
}

export default async function ServiciosPage() {
  const data = await getSiteData();

  return (
    <>
      <Header config={data.config} sections={data.sections} />
      <main className="pt-24">
        <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-brand-muted transition-colors hover:text-brand-red"
          >
            <ArrowLeft className="h-4 w-4" /> Home
          </Link>
        </div>
        <ServicesSection services={data.services} config={data.config} />
      </main>
      <Footer config={data.config} />
      <FloatingButtons config={data.config} />
    </>
  );
}
