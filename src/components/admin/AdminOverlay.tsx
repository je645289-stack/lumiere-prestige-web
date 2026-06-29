"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { X } from "lucide-react";
import { subscribeToContentStore } from "@/lib/content-store";

export function AdminOverlay() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const close = useCallback(() => {
    setOpen(false);
    router.refresh();
  }, [router]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.altKey && e.shiftKey && e.key.toLowerCase() === "n") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape" && open) {
        e.preventDefault();
        close();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, close]);

  useEffect(() => {
    subscribeToContentStore(() => {});
  }, []);

  if (pathname.startsWith("/admin")) return null;

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-[9999] flex flex-col bg-brand-dark">
          <div className="flex items-center justify-between border-b border-brand-border bg-brand-darker px-4 py-2">
            <p className="text-sm font-medium text-brand-cream">Panel de administración</p>
            <button
              type="button"
              onClick={close}
              className="inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm text-brand-muted transition-colors hover:bg-brand-navy hover:text-brand-cream"
              aria-label="Cerrar panel de administración"
            >
              <X className="h-4 w-4" />
              Cerrar
            </button>
          </div>
          <iframe
            title="Admin panel"
            src="/admin"
            className="h-full w-full flex-1 border-0 bg-brand-dark"
          />
        </div>
      )}
    </>
  );
}
