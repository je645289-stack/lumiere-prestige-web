"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (res.ok) {
        router.push("/admin/dashboard");
        router.refresh();
      } else {
        setError("Email o contraseña incorrectos");
      }
    } catch {
      setError("Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-dark px-4">
      <div className="w-full max-w-md rounded-xl border border-brand-border bg-brand-surface p-8">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-gold/10">
            <Lock className="h-8 w-8 text-brand-gold" />
          </div>
          <h1 className="font-display text-2xl font-bold text-brand-cream">
            Panel de Administración
          </h1>
          <p className="mt-2 text-sm text-brand-muted">
            Ingresa tus credenciales para editar el contenido de tu web
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm text-brand-muted">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-muted" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-brand-border bg-brand-dark py-3 pl-10 pr-4 text-brand-cream focus:border-brand-gold focus:outline-none"
                placeholder="admin@tunegocio.com"
              />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm text-brand-muted">Contraseña</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-muted" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-brand-border bg-brand-dark py-3 pl-10 pr-4 text-brand-cream focus:border-brand-gold focus:outline-none"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && <p className="text-center text-sm text-red-400">{error}</p>}

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Ingresando..." : "Ingresar al panel"}
          </Button>
        </form>

        <p className="mt-6 text-center text-xs text-brand-muted">
          Incluye capacitación personalizada · 30 días de soporte · 3 rondas de cambios
        </p>
      </div>
    </div>
  );
}
