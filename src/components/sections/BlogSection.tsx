import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { Section, SectionHeader } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import type { BlogPost } from "@/types";
import { formatDate } from "@/lib/utils";

export function BlogSection({ posts }: { posts: BlogPost[] }) {
  const recent = posts.slice(0, 3);

  return (
    <Section id="blog" className="bg-brand-surface/50">
      <SectionHeader
        title="Blog & Noticias"
        subtitle="Artículos, tendencias y consejos del mundo premium"
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {recent.map((post) => (
          <Card key={post.id} className="overflow-hidden p-0">
            <div className="relative aspect-video">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <span className="absolute left-3 top-3 rounded bg-brand-gold px-2 py-1 text-xs font-medium text-brand-dark">
                {post.category}
              </span>
            </div>
            <div className="p-6">
              <div className="mb-2 flex items-center gap-2 text-xs text-brand-muted">
                <Calendar className="h-3 w-3" />
                {formatDate(post.date)}
              </div>
              <h3 className="font-display text-lg font-semibold text-brand-cream">
                {post.title}
              </h3>
              <p className="mt-2 text-sm text-brand-muted line-clamp-3">{post.summary}</p>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-gold hover:text-brand-gold-light transition-colors"
              >
                Leer más <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Button href="/blog" variant="secondary">
          Ver todo el blog
        </Button>
      </div>
    </Section>
  );
}
