"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
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
  Menu,
  X,
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
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await fetch("/api/auth/login", { method: "DELETE" });
    router.push("/admin");
    router.refresh();
  };

  return (
    <>
      {/* Mobile top bar */}
      <div className="fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between border-b border-brand-border bg-brand-darker px-4 lg:hidden">
        <span className="font-display text-lg tracking-wide text-brand-cream">
          Albert <span className="text-brand-red">Admin</span>
        </span>
        <button
          onClick={() => setOpen((v) => !v)}
          className="rounded-lg border border-brand-border p-2 text-brand-cream"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Overlay (mobile) */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setOpen(false)}
          aria-hidden
        />
      )}

      <aside
        className={cn(
          "fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-brand-border bg-brand-darker transition-transform duration-300",
          "pt-14 lg:pt-0",
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="hidden border-b border-brand-border p-6 lg:block">
          <h2 className="font-display text-lg text-brand-cream">
            Albert <span className="text-brand-red">Admin</span>
          </h2>
          <p className="text-xs text-brand-muted">Manage content without code</p>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                  isActive
                    ? "bg-brand-red/10 font-medium text-brand-red"
                    : "text-brand-muted hover:bg-brand-surface hover:text-brand-cream"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="space-y-2 border-t border-brand-border p-4">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-brand-muted transition-colors hover:text-brand-red"
          >
            <ExternalLink className="h-4 w-4" />
            View website
          </Link>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-brand-muted transition-colors hover:text-red-400"
          >
            <LogOut className="h-4 w-4" />
            Sign out
          </button>
        </div>
      </aside>
    </>
  );
}
