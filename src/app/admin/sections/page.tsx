"use client";

import { useEffect, useState } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { SaveBar, AdminToggle, saveContent } from "@/components/admin/AdminForm";
import type { SectionConfig } from "@/types";

export default function SectionsAdmin() {
  const [sections, setSections] = useState<SectionConfig[]>([]);

  useEffect(() => {
    fetch("/api/content/sections")
      .then((r) => r.json())
      .then(setSections);
  }, []);

  const toggle = (id: string) => {
    setSections(
      sections.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s))
    );
  };

  return (
    <div className="flex min-h-screen bg-brand-dark">
      <AdminSidebar />
      <main className="flex-1 p-4 pt-20 lg:ml-64 lg:p-8 lg:pt-8">
        <SaveBar onSave={() => saveContent("sections", sections)} />

        <h1 className="mb-2 font-display text-2xl text-brand-cream">
          Sections
        </h1>
        <p className="mb-6 text-sm text-brand-muted">
          Enable or disable sections of the homepage and control their order.
        </p>

        <div className="space-y-3">
          {sections
            .sort((a, b) => a.order - b.order)
            .map((section) => (
              <div
                key={section.id}
                className="flex items-center justify-between rounded-xl border border-brand-border bg-brand-surface px-6 py-4"
              >
                <div>
                  <p className="font-medium text-brand-cream">{section.name}</p>
                  <p className="text-xs text-brand-muted">ID: {section.id} · Orden: {section.order}</p>
                </div>
                <AdminToggle
                  label={section.enabled ? "Active" : "Inactive"}
                  checked={section.enabled}
                  onChange={() => toggle(section.id)}
                />
              </div>
            ))}
        </div>
      </main>
    </div>
  );
}
