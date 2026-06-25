export const runtime = 'edge';
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createSession, setSessionCookie } from "@/lib/auth";
import { verifyPassword } from "@/lib/auth-server";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = loginSchema.parse(body);

    const adminEmail = process.env.ADMIN_EMAIL || "admin@lumiereprestige.com";
    const adminPassword = process.env.ADMIN_PASSWORD || "Admin123!ChangeMe";

    if (email !== adminEmail) {
      return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 });
    }

    const isPlainMatch = password === adminPassword;
    const isHashMatch = adminPassword.startsWith("$2")
      ? await verifyPassword(password, adminPassword)
      : false;

    if (!isPlainMatch && !isHashMatch) {
      return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 });
    }

    const token = await createSession(email);
    await setSessionCookie(token);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }
}

export async function DELETE() {
  const { clearSessionCookie } = await import("@/lib/auth");
  await clearSessionCookie();
  return NextResponse.json({ success: true });
}
