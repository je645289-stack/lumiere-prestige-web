"use client";

import { useState } from "react";
import { Save, Check, AlertCircle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { ContentType } from "@/types";
import { resetContent, saveContent, readFromClientCache, type SaveContentResult } from "@/lib/content-store";

export { saveContent, loadAdminContent } from "@/lib/content-store";

export function createAdminSaveHandler<T>(
  type: ContentType,
  getData: () => T,
  setData?: (value: T) => void
) {
  return async (): Promise<SaveContentResult> => {
    const result = await saveContent(type, getData());
    if (!result.localSaved) {
      throw new Error("No se pudo guardar el contenido");
    }
    const saved = readFromClientCache<T>(type);
    if (saved && setData) setData(saved);
    return result;
  };
}

interface SaveBarProps {
  onSave: () => Promise<void | SaveContentResult>;
  label?: string;
  contentType?: ContentType;
  showReset?: boolean;
}

export function SaveBar({
  onSave,
  label = "Guardar cambios",
  contentType,
  showReset = !!contentType,
}: SaveBarProps) {
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [syncNote, setSyncNote] = useState<string | null>(null);
  const [resetStatus, setResetStatus] = useState<"idle" | "resetting">("idle");

  const handleSave = async () => {
    setStatus("saving");
    setSyncNote(null);
    try {
      const result = await onSave();
      if (
        result &&
        typeof result === "object" &&
        "localSaved" in result &&
        !result.localSaved
      ) {
        throw new Error("Local save failed");
      }
      setStatus("saved");
      if (result && typeof result === "object" && "serverSynced" in result) {
        setSyncNote(
          result.serverSynced
            ? "Cambios guardados y visibles en la web"
            : "Guardado en este navegador (inicia sesión para sincronizar)"
        );
      } else {
        setSyncNote("Cambios guardados y visibles en la web");
      }
      setTimeout(() => {
        setStatus("idle");
        setSyncNote(null);
      }, 4000);
    } catch {
      setStatus("error");
      setSyncNote(null);
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const handleReset = async () => {
    if (!contentType) return;
    if (!confirm("¿Restaurar valores por defecto? Se perderán los cambios guardados.")) return;

    setResetStatus("resetting");
    try {
      await resetContent(contentType);
      window.location.reload();
    } catch {
      alert("Error al restaurar valores por defecto");
      setResetStatus("idle");
    }
  };

  return (
    <div className="sticky top-0 z-20 -mx-8 mb-6 flex items-center justify-between border-b border-brand-border bg-brand-dark/95 px-8 py-4 backdrop-blur-sm">
      <div>
        {status === "saved" && (
          <span className="flex items-center gap-2 text-sm text-green-400">
            <Check className="h-4 w-4" /> {syncNote ?? "Changes saved successfully"}
          </span>
        )}
        {status === "error" && (
          <span className="flex items-center gap-2 text-sm text-red-400">
            <AlertCircle className="h-4 w-4" /> Error al guardar
          </span>
        )}
      </div>
      <div className="flex items-center gap-2">
        {showReset && contentType && (
          <Button
            onClick={handleReset}
            disabled={resetStatus === "resetting" || status === "saving"}
            variant="outline"
            size="sm"
          >
            <RotateCcw className="h-4 w-4" />
            {resetStatus === "resetting" ? "Restaurando..." : "Restaurar valores por defecto"}
          </Button>
        )}
        <Button onClick={handleSave} disabled={status === "saving"} size="sm">
          <Save className="h-4 w-4" />
          {status === "saving" ? "Guardando..." : label}
        </Button>
      </div>
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

export async function uploadImageFile(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch("/api/content/site-config", {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error("Upload failed");
  const data = (await res.json()) as { url: string };
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
