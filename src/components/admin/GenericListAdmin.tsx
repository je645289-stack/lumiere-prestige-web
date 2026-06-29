"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus, Trash2 } from "lucide-react";
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
import type { LocalizedString } from "@/types";

type FieldDef = {
  key: string;
  label: string;
  type?: "text" | "textarea" | "number" | "image" | "localized" | "localized-textarea";
  colSpan?: boolean;
};

interface GenericAdminProps {
  contentType: string;
  title: string;
  description: string;
  fields: FieldDef[];
  defaultItem: Record<string, unknown>;
  addLabel?: string;
}

export function GenericListAdmin({
  contentType,
  title,
  description,
  fields,
  defaultItem,
  addLabel = "Agregar",
}: GenericAdminProps) {
  const [items, setItems] = useState<Record<string, unknown>[]>([]);

  useEffect(() => {
    fetch(`/api/content/${contentType}`)
      .then((r) => r.json())
      .then(setItems);
  }, [contentType]);

  const addItem = () => {
    setItems([...items, { ...defaultItem, id: generateId(), order: items.length + 1 }]);
  };

  const updateItem = useCallback(
    (id: string, key: string, value: unknown) => {
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, [key]: value } : item))
      );
    },
    []
  );

  const removeItem = (id: string) => {
    if (confirm("¿Eliminar este elemento?")) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="flex min-h-screen bg-brand-dark">
      <AdminSidebar />
      <main className="ml-64 flex-1 p-8">
        <SaveBar onSave={() => saveContent(contentType, items)} />

        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-bold text-brand-cream">{title}</h1>
            <p className="text-sm text-brand-muted">{description}</p>
          </div>
          <Button onClick={addItem} size="sm">
            <Plus className="h-4 w-4" /> {addLabel}
          </Button>
        </div>

        <div className="space-y-6">
          {items.map((item) => (
            <div
              key={item.id as string}
              className="rounded-xl border border-brand-border bg-brand-surface p-6"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm text-brand-muted">
                  {fields[0]?.label}:{" "}
                  {localize(item[fields[0]?.key] as LocalizedString, "en") || ""}
                </span>
                <div className="flex items-center gap-3">
                  {"enabled" in item && (
                    <AdminToggle
                      label=""
                      checked={Boolean(item.enabled)}
                      onChange={(v) => updateItem(item.id as string, "enabled", v)}
                    />
                  )}
                  <button
                    onClick={() => removeItem(item.id as string)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {fields.map((field) => (
                  <div
                    key={field.key}
                    className={field.colSpan ? "md:col-span-2" : ""}
                  >
                    {field.type === "image" ? (
                      <ImageUpload
                        label={field.label}
                        value={String(item[field.key] || "")}
                        onChange={(v) => updateItem(item.id as string, field.key, v)}
                      />
                    ) : field.type === "localized" ||
                      field.type === "localized-textarea" ? (
                      <LocalizedInput
                        label={field.label}
                        value={item[field.key] as LocalizedString}
                        onChange={(v) => updateItem(item.id as string, field.key, v)}
                        rows={field.type === "localized-textarea" ? 3 : undefined}
                      />
                    ) : (
                      <AdminInput
                        label={field.label}
                        type={field.type === "number" ? "number" : "text"}
                        value={String(item[field.key] ?? "")}
                        onChange={(v) =>
                          updateItem(
                            item.id as string,
                            field.key,
                            field.type === "number" ? Number(v) : v
                          )
                        }
                        rows={field.type === "textarea" ? 4 : undefined}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
