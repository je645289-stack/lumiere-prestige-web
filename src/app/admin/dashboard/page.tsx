export const runtime = 'edge';
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
    { label: "Servicios", count: services.length, href: "/admin/services", icon: Briefcase },
    { label: "Productos", count: products.length, href: "/admin/products", icon: ShoppingBag },
    { label: "Testimonios", count: testimonials.length, href: "/admin/testimonials", icon: MessageSquare },
    { label: "Artículos", count: blogPosts.length, href: "/admin/blog", icon: Newspaper },
    { label: "Galería", count: gallery.length, href: "/admin/gallery", icon: Image },
  ];

  return (
    <div className="flex min-h-screen bg-brand-dark">
      <AdminSidebar />
      <main className="ml-64 flex-1 p-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold text-brand-cream">
            Bienvenido al Panel
          </h1>
          <p className="mt-2 text-brand-muted">
            Gestiona todo el contenido de {config.businessName} sin tocar código
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
            <h2 className="mb-4 font-display text-xl font-semibold text-brand-cream">
              Acciones rápidas
            </h2>
            <div className="space-y-2">
              {[
                { href: "/admin/site-config", label: "Editar textos del sitio", icon: Settings },
                { href: "/admin/services", label: "Gestionar servicios", icon: Briefcase },
                { href: "/admin/products", label: "Gestionar catálogo", icon: ShoppingBag },
                { href: "/", label: "Ver sitio web", icon: ExternalLink },
              ].map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  target={action.href === "/" ? "_blank" : undefined}
                  className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-brand-muted hover:bg-brand-dark hover:text-brand-gold transition-colors"
                >
                  <action.icon className="h-4 w-4" />
                  {action.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-brand-gold/20 bg-brand-gold/5 p-6">
            <h2 className="mb-4 font-display text-xl font-semibold text-brand-cream">
              Tu paquete Premium incluye
            </h2>
            <ul className="space-y-3 text-sm text-brand-muted">
              <li>✓ {config.support.supportDays} días de soporte post-entrega</li>
              <li>✓ {config.support.changeRounds} rondas de cambios incluidas</li>
              <li>✓ Capacitación personalizada del panel</li>
              <li>✓ Edición completa sin conocimientos técnicos</li>
              <li>✓ SEO Premium y optimización de rendimiento</li>
              <li>✓ Integraciones preparadas (pagos, chat, analytics)</li>
            </ul>
            <p className="mt-4 text-xs text-brand-muted">
              {config.support.trainingDescription}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
