"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  ShoppingBag,
  MessageSquare,
  HelpCircle,
  Newspaper,
  Image,
  Star,
  ListOrdered,
  Settings,
  Layers,
  LogOut,
  ExternalLink,
  Award,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/site-config", label: "General Settings", icon: Settings },
  { href: "/admin/sections", label: "Sections", icon: Layers },
  { href: "/admin/services", label: "Services", icon: Briefcase },
  { href: "/admin/products", label: "Promotions", icon: ShoppingBag },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquare },
  { href: "/admin/faqs", label: "FAQ", icon: HelpCircle },
  { href: "/admin/blog", label: "Blog", icon: Newspaper },
  { href: "/admin/gallery", label: "Gallery", icon: Image },
  { href: "/admin/benefits", label: "Why Choose Us", icon: Award },
  { href: "/admin/process", label: "Process", icon: ListOrdered },
  { href: "/admin/integrations", label: "Integrations", icon: Star },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/login", { method: "DELETE" });
    router.push("/admin");
    router.refresh();
  };

  return (
    <aside className="fixed left-0 top-0 z-30 flex h-screen w-64 flex-col border-r border-brand-border bg-brand-darker">
      <div className="border-b border-brand-border p-6">
        <h2 className="font-display text-lg font-bold text-brand-cream">
          Panel <span className="text-brand-gold">Admin</span>
        </h2>
        <p className="text-xs text-brand-muted">Edición sin código</p>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                isActive
                  ? "bg-brand-gold/10 text-brand-gold font-medium"
                  : "text-brand-muted hover:bg-brand-surface hover:text-brand-cream"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-brand-border p-4 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-brand-muted hover:text-brand-gold transition-colors"
        >
          <ExternalLink className="h-4 w-4" />
          Ver sitio web
        </Link>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-brand-muted hover:text-red-400 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}
