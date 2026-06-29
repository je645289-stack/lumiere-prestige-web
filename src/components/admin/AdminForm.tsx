"use client";

import { useState } from "react";
import { Save, Check, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { LocalizedString } from "@/types";

/** Normalize a LocalizedString into an { en, es } pair for editing. */
export function toLocalizedPair(value: unknown): { en: string; es: string } {
  if (value && typeof value === "object" && "en" in value) {
    const v = value as { en?: string; es?: string };
    return { en: v.en || "", es: v.es || "" };
  }
  const str = typeof value === "string" ? value : "";
  return { en: str, es: str };
}

export function LocalizedInput({
  label,
  value,
  onChange,
  rows,
}: {
  label: string;
  value: LocalizedString | undefined;
  onChange: (v: { en: string; es: string }) => void;
  rows?: number;
}) {
  const pair = toLocalizedPair(value);
  const base =
    "w-full rounded-lg border border-brand-border bg-brand-dark px-4 py-2.5 text-brand-cream focus:border-brand-gold focus:outline-none text-sm";

  const Field = ({
    badge,
    val,
    lang,
  }: {
    badge: string;
    val: string;
    lang: "en" | "es";
  }) => (
    <div>
      <span className="mb-1 inline-block rounded bg-brand-gold/15 px-2 py-0.5 text-[10px] font-bold uppercase text-brand-gold">
        {badge}
      </span>
      {rows ? (
        <textarea
          rows={rows}
          value={val}
          onChange={(e) => onChange({ ...pair, [lang]: e.target.value })}
          className={`${base} resize-none`}
        />
      ) : (
        <input
          value={val}
          onChange={(e) => onChange({ ...pair, [lang]: e.target.value })}
          className={base}
        />
      )}
    </div>
  );

  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-brand-muted">{label}</label>
      <div className="grid gap-2 sm:grid-cols-2">
        <Field badge="EN" val={pair.en} lang="en" />
        <Field badge="ES" val={pair.es} lang="es" />
      </div>
    </div>
  );
}

interface SaveBarProps {
  onSave: () => Promise<void>;
  label?: string;
}

export function SaveBar({ onSave, label = "Guardar cambios" }: SaveBarProps) {
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  const handleSave = async () => {
    setStatus("saving");
    try {
      await onSave();
      setStatus("saved");
      setTimeout(() => setStatus("idle"), 3000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <div className="sticky top-0 z-20 -mx-8 mb-6 flex items-center justify-between border-b border-brand-border bg-brand-dark/95 px-8 py-4 backdrop-blur-sm">
      <div>
        {status === "saved" && (
          <span className="flex items-center gap-2 text-sm text-green-400">
            <Check className="h-4 w-4" /> Cambios guardados
          </span>
        )}
        {status === "error" && (
          <span className="flex items-center gap-2 text-sm text-red-400">
            <AlertCircle className="h-4 w-4" /> Error al guardar
          </span>
        )}
      </div>
      <Button onClick={handleSave} disabled={status === "saving"} size="sm">
        <Save className="h-4 w-4" />
        {status === "saving" ? "Guardando..." : label}
      </Button>
    </div>
  );
}

export function AdminInput({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  rows,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  rows?: number;
}) {
  const className =
    "w-full rounded-lg border border-brand-border bg-brand-dark px-4 py-2.5 text-brand-cream focus:border-brand-gold focus:outline-none text-sm";

  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-brand-muted">{label}</label>
      {rows ? (
        <textarea
          rows={rows}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`${className} resize-none`}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={className}
        />
      )}
    </div>
  );
}

export function AdminToggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between rounded-lg border border-brand-border bg-brand-dark px-4 py-3 cursor-pointer">
      <span className="text-sm text-brand-cream">{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 rounded-full transition-colors ${
          checked ? "bg-brand-gold" : "bg-brand-border"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
            checked ? "translate-x-5" : ""
          }`}
        />
      </button>
    </label>
  );
}

export async function saveContent(type: string, data: unknown) {
  const res = await fetch(`/api/content/${type}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Save failed");
}

export async function uploadImageFile(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch("/api/content/site-config", {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error("Upload failed");
  const data = await res.json();
  return data.url;
}

export function ImageUpload({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (url: string) => void;
}) {
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const url = await uploadImageFile(file);
      onChange(url);
    } catch {
      alert("Error al subir imagen");
    }
  };

  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-brand-muted">{label}</label>
      <div className="flex gap-3">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="URL de imagen o sube un archivo"
          className="flex-1 rounded-lg border border-brand-border bg-brand-dark px-4 py-2.5 text-brand-cream focus:border-brand-gold focus:outline-none text-sm"
        />
        <label className="cursor-pointer rounded-lg border border-brand-gold bg-brand-gold/10 px-4 py-2.5 text-sm text-brand-gold hover:bg-brand-gold/20 transition-colors">
          Subir
          <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
        </label>
      </div>
      {value && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={value} alt="Preview" className="mt-2 h-20 w-20 rounded object-cover" />
      )}
    </div>
  );
}
