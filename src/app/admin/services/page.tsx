"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, GripVertical } from "lucide-react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import {
  SaveBar,
  AdminInput,
  AdminToggle,
  ImageUpload,
  loadAdminContent,
  createAdminSaveHandler,
} from "@/components/admin/AdminForm";
import { Button } from "@/components/ui/Button";
import { generateId } from "@/lib/utils";
import type { Service } from "@/types";

export default function ServicesAdmin() {
  const [items, setItems] = useState<Service[]>([]);

  useEffect(() => {
    loadAdminContent<Service[]>("services").then(setItems);
  }, []);

  const addItem = () => {
    setItems([
      ...items,
      {
        id: generateId(),
        name: "Nuevo servicio",
        description: "",
        image: "",
        icon: "Star",
        price: "",
        enabled: true,
        order: items.length + 1,
        category: "General",
      },
    ]);
  };

  const updateItem = (id: string, field: keyof Service, value: unknown) => {
    setItems(items.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
  };

  const removeItem = (id: string) => {
    if (confirm("¿Eliminar este servicio?")) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="flex min-h-screen bg-brand-dark">
      <AdminSidebar />
      <main className="ml-64 flex-1 p-8">
        <SaveBar
          onSave={createAdminSaveHandler("services", () => items, setItems)}
          contentType="services"
        />

        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-brand-cream">Servicios</h1>
            <p className="text-sm text-brand-muted">Agrega, edita o elimina servicios</p>
          </div>
          <Button onClick={addItem} size="sm">
            <Plus className="h-4 w-4" /> Agregar servicio
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
                  <span className="text-sm">Orden: {item.order}</span>
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
                  label="Nombre"
                  value={item.name}
                  onChange={(v) => updateItem(item.id, "name", v)}
                />
                <AdminInput
                  label="Categoría"
                  value={item.category}
                  onChange={(v) => updateItem(item.id, "category", v)}
                />
                <AdminInput
                  label="Precio (opcional)"
                  value={item.price || ""}
                  onChange={(v) => updateItem(item.id, "price", v)}
                />
                <AdminInput
                  label="Ícono (Lucide)"
                  value={item.icon}
                  onChange={(v) => updateItem(item.id, "icon", v)}
                />
                <div className="md:col-span-2">
                  <AdminInput
                    label="Descripción"
                    value={item.description}
                    onChange={(v) => updateItem(item.id, "description", v)}
                    rows={3}
                  />
                </div>
                <div className="md:col-span-2">
                  <ImageUpload
                    label="Imagen"
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
