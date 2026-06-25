export const runtime = 'edge';
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message?.trim()) {
      return NextResponse.json({ error: "Mensaje vacío" }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      const autoReplies: Record<string, string> = {
        horario: "Nuestro horario es de Lunes a Viernes 9AM-8PM, Sábado 10AM-6PM, Domingo 11AM-4PM.",
        precio: "Los precios varían según el servicio. Visita nuestro catálogo o contáctanos para una cotización.",
        reservar: "Puedes reservar desde la sección de contacto o por WhatsApp.",
        ubicacion: "Estamos en Av. Presidente Masaryk 123, Polanco, Ciudad de México.",
      };

      const lower = message.toLowerCase();
      for (const [key, reply] of Object.entries(autoReplies)) {
        if (lower.includes(key)) {
          return NextResponse.json({ reply });
        }
      }

      return NextResponse.json({
        reply: "Gracias por tu mensaje. Un especialista te contactará pronto. También puedes escribirnos por WhatsApp.",
      });
    }

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "Eres el asistente virtual de Lumière Prestige, un negocio premium de servicios de lujo. Responde de forma profesional, elegante y concisa en español.",
          },
          { role: "user", content: message },
        ],
        max_tokens: 300,
      }),
    });

    const data = await res.json();
    const reply =
      data.choices?.[0]?.message?.content ||
      "Gracias por tu mensaje. Te responderemos a la brevedad.";

    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json({
      reply: "Gracias por tu mensaje. Te contactaremos pronto.",
    });
  }
}
