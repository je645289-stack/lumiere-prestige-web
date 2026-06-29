"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, GripVertical } from "lucide-react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import {
  SaveBar,
  AdminInput,
  AdminToggle,
  saveContent,
  ImageUpload,
  LocalizedInput,
} from "@/components/admin/AdminForm";
import { Button } from "@/components/ui/Button";
import { generateId } from "@/lib/utils";
import { localize } from "@/lib/i18n";
import type { Service } from "@/types";

export default function ServicesAdmin() {
  const [items, setItems] = useState<Service[]>([]);

  useEffect(() => {
    fetch("/api/content/services")
      .then((r) => r.json())
      .then(setItems);
  }, []);

  const addItem = () => {
    setItems([
      ...items,
      {
        id: generateId(),
        name: { en: "New service", es: "Nuevo servicio" },
        description: { en: "", es: "" },
        image: "",
        icon: "Sparkles",
        enabled: true,
        order: items.length + 1,
        category: "Detailing",
      },
    ]);
  };

  const updateItem = (id: string, field: keyof Service, value: unknown) => {
    setItems(items.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
  };

  const removeItem = (id: string) => {
    if (confirm("Delete this service?")) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="flex min-h-screen bg-brand-dark">
      <AdminSidebar />
      <main className="flex-1 p-4 pt-20 lg:ml-64 lg:p-8 lg:pt-8">
        <SaveBar onSave={() => saveContent("services", items)} />

        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl text-brand-cream">Services</h1>
            <p className="text-sm text-brand-muted">Add, edit or remove services (EN/ES)</p>
          </div>
          <Button onClick={addItem} size="sm">
            <Plus className="h-4 w-4" /> Add service
          </Button>
        </div>

        <div className="space-y-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border border-brand-border bg-brand-surface p-6"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-brand-muted">
                  <GripVertical className="h-4 w-4" />
                  <span className="text-sm">{localize(item.name, "en")}</span>
                </div>
                <div className="flex items-center gap-3">
                  <AdminToggle
                    label=""
                    checked={item.enabled}
                    onChange={(v) => updateItem(item.id, "enabled", v)}
                  />
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <AdminInput
                  label="Category"
                  value={item.category}
                  onChange={(v) => updateItem(item.id, "category", v)}
                />
                <AdminInput
                  label="Icon (Lucide)"
                  value={item.icon}
                  onChange={(v) => updateItem(item.id, "icon", v)}
                />
                <AdminInput
                  label="Order"
                  type="number"
                  value={String(item.order)}
                  onChange={(v) => updateItem(item.id, "order", Number(v))}
                />
                <div className="md:col-span-2">
                  <LocalizedInput
                    label="Name / Nombre"
                    value={item.name}
                    onChange={(v) => updateItem(item.id, "name", v)}
                  />
                </div>
                <div className="md:col-span-2">
                  <LocalizedInput
                    label="Description / Descripción"
                    value={item.description}
                    onChange={(v) => updateItem(item.id, "description", v)}
                    rows={3}
                  />
                </div>
                <div className="md:col-span-2">
                  <ImageUpload
                    label="Image"
                    value={item.image}
                    onChange={(v) => updateItem(item.id, "image", v)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
