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
import { Button } from "@/components/ui/Button";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { config, blogPosts } = await getSiteData();
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return buildMetadata(config, {
    title: post.title,
    description: post.summary,
    path: `/blog/${post.slug}`,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const data = await getSiteData();
  const post = data.blogPosts.find((p) => p.slug === slug);

  if (!post) notFound();

  return (
    <>
      <Header config={data.config} sections={data.sections} />
      <main>
        <Section className="pt-32">
          <Link href="/blog" className="mb-8 inline-flex items-center gap-2 text-brand-muted hover:text-brand-gold">
            <ArrowLeft className="h-4 w-4" /> Volver al blog
          </Link>

          <div className="mx-auto max-w-4xl">
            <span className="rounded bg-brand-gold/10 px-3 py-1 text-sm text-brand-gold">
              {post.category}
            </span>
            <h1 className="mt-4 font-display text-4xl font-bold text-brand-cream md:text-5xl">
              {post.title}
            </h1>
            <div className="mt-4 flex items-center gap-2 text-brand-muted">
              <Calendar className="h-4 w-4" />
              {formatDate(post.date)}
            </div>

            <div className="relative mt-8 aspect-video overflow-hidden rounded-lg">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 896px) 100vw, 896px"
                priority
              />
            </div>

            <div
              className="prose prose-invert mt-10 max-w-none prose-headings:font-display prose-headings:text-brand-cream prose-p:text-brand-muted prose-h2:text-brand-gold"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <div className="mt-12 text-center">
              <Button href="/#contacto">
                ¿Te interesa? Contáctanos
              </Button>
            </div>
          </div>
        </Section>
      </main>
      <Footer config={data.config} />
      <FloatingButtons config={data.config} />
    </>
  );
}

export async function generateStaticParams() {
  const { blogPosts } = await getSiteData();
  return blogPosts.map((post) => ({ slug: post.slug }));
}
