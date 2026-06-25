import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar } from "lucide-react";
import { getSiteData } from "@/lib/site-data";
import { buildMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingButtons } from "@/components/integrations/FloatingButtons";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { notFound } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const { config } = await getSiteData();
  return buildMetadata(config, {
    title: "Blog",
    description: "Artículos, tendencias y noticias de " + config.businessName,
    path: "/blog",
  });
}

export default async function BlogPage() {
  const data = await getSiteData();

  return (
    <>
      <Header config={data.config} sections={data.sections} />
      <main>
        <Section className="pt-32">
          <Link href="/" className="mb-8 inline-flex items-center gap-2 text-brand-muted hover:text-brand-gold">
            <ArrowLeft className="h-4 w-4" /> Volver al inicio
          </Link>
          <h1 className="font-display text-4xl font-bold text-brand-cream md:text-5xl">
            Blog & Noticias
          </h1>
          <p className="mt-4 max-w-2xl text-brand-muted">
            Descubre artículos, tendencias y consejos del mundo premium.
          </p>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {data.blogPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden p-0">
                <div className="relative aspect-video">
                  <Image src={post.image} alt={post.title} fill className="object-cover" sizes="33vw" />
                  <span className="absolute left-3 top-3 rounded bg-brand-gold px-2 py-1 text-xs font-medium text-brand-dark">
                    {post.category}
                  </span>
                </div>
                <div className="p-6">
                  <div className="mb-2 flex items-center gap-2 text-xs text-brand-muted">
                    <Calendar className="h-3 w-3" />
                    {formatDate(post.date)}
                  </div>
                  <h2 className="font-display text-xl font-semibold text-brand-cream">
                    <Link href={`/blog/${post.slug}`} className="hover:text-brand-gold transition-colors">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="mt-2 text-sm text-brand-muted">{post.summary}</p>
                </div>
              </Card>
            ))}
          </div>
        </Section>
      </main>
      <Footer config={data.config} />
      <FloatingButtons config={data.config} />
    </>
  );
}