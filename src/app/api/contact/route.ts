import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional(),
  service: z.string().optional(),
  message: z.string().min(1),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = contactSchema.parse(body);

    const contactEmail = process.env.CONTACT_EMAIL || "contacto@lumiereprestige.com";

    // Log submission (replace with email service like Resend/SendGrid in production)
    console.log("[CONTACT FORM]", {
      to: contactEmail,
      ...data,
      timestamp: new Date().toISOString(),
    });

    // Structure ready for email integration:
    // await resend.emails.send({ from, to: contactEmail, subject, html })

    return NextResponse.json({
      success: true,
      message: "Mensaje recibido correctamente",
    });
  } catch {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }
}
