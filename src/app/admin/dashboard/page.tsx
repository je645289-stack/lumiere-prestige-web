import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import Link from "next/link";
import {
  Briefcase,
  ShoppingBag,
  MessageSquare,
  Newspaper,
  Image,
  Settings,
  ExternalLink,
} from "lucide-react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { readData } from "@/lib/data";
import type { SiteConfig } from "@/types";

export default async function AdminDashboard() {
  const session = await getSession();
  if (!session) redirect("/admin");

  const config = await readData<SiteConfig>("site-config");

  const services = await readData<unknown[]>("services");
  const products = await readData<unknown[]>("products");
  const testimonials = await readData<unknown[]>("testimonials");
  const blogPosts = await readData<unknown[]>("blog-posts");
  const gallery = await readData<unknown[]>("gallery");

  const stats = [
    { label: "Services", count: services.length, href: "/admin/services", icon: Briefcase },
    { label: "Promotions", count: products.length, href: "/admin/products", icon: ShoppingBag },
    { label: "Testimonials", count: testimonials.length, href: "/admin/testimonials", icon: MessageSquare },
    { label: "Blog posts", count: blogPosts.length, href: "/admin/blog", icon: Newspaper },
    { label: "Gallery", count: gallery.length, href: "/admin/gallery", icon: Image },
  ];

  return (
    <div className="flex min-h-screen bg-brand-dark">
      <AdminSidebar />
      <main className="flex-1 p-4 pt-20 lg:ml-64 lg:p-8 lg:pt-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl text-brand-cream">
            Welcome to the Admin Panel
          </h1>
          <p className="mt-2 text-brand-muted">
            Manage all content for {config.businessName} — no code required.
          </p>
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => (
            <Link
              key={stat.href}
              href={stat.href}
              className="flex items-center gap-4 rounded-xl border border-brand-border bg-brand-surface p-6 transition-colors hover:border-brand-gold/30"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-gold/10">
                <stat.icon className="h-6 w-6 text-brand-gold" />
              </div>
              <div>
                <p className="text-2xl font-bold text-brand-cream">{stat.count}</p>
                <p className="text-sm text-brand-muted">{stat.label}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-brand-border bg-brand-surface p-6">
            <h2 className="mb-4 font-display text-xl text-brand-cream">
              Quick actions
            </h2>
            <div className="space-y-2">
              {[
                { href: "/admin/site-config", label: "Edit site content", icon: Settings },
                { href: "/admin/services", label: "Manage services", icon: Briefcase },
                { href: "/admin/products", label: "Manage promotions", icon: ShoppingBag },
                { href: "/", label: "View website", icon: ExternalLink },
              ].map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  target={action.href === "/" ? "_blank" : undefined}
                  className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-brand-muted hover:bg-brand-dark hover:text-brand-red transition-colors"
                >
                  <action.icon className="h-4 w-4" />
                  {action.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-brand-red/20 bg-brand-red/5 p-6">
            <h2 className="mb-4 font-display text-xl text-brand-cream">
              Everything is editable
            </h2>
            <ul className="space-y-3 text-sm text-brand-muted">
              <li>✓ Bilingual content (English / Spanish)</li>
              <li>✓ Hero, services, gallery, promotions & more</li>
              <li>✓ Testimonials, FAQ and process steps</li>
              <li>✓ SEO, analytics and integrations</li>
              <li>✓ Premium performance and responsive design</li>
              <li>✓ Changes go live instantly — no restart needed</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
