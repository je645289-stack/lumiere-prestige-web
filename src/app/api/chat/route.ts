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
        hour: "We're open Monday-Friday 8AM-6PM, Saturday 9AM-5PM, Sunday by appointment.",
        horario: "Atendemos de Lunes a Viernes 8AM-6PM, Sábado 9AM-5PM, Domingo con cita.",
        price: "Prices vary by service and vehicle. Contact us for a free, personalized quote.",
        precio: "Los precios varían según el servicio y el vehículo. Contáctanos para una cotización gratis.",
        book: "You can book through the contact form, by WhatsApp or by calling us.",
        location: "We're located at 12 Jenny Jenks St, Norwalk, CT 06851.",
        ubicacion: "Estamos en 12 Jenny Jenks St, Norwalk, CT 06851.",
      };

      const lower = message.toLowerCase();
      for (const [key, reply] of Object.entries(autoReplies)) {
        if (lower.includes(key)) {
          return NextResponse.json({ reply });
        }
      }

      return NextResponse.json({
        reply:
          "Thanks for your message! For personalized help, reach us on WhatsApp or call us. / ¡Gracias! Para atención personalizada, escríbenos por WhatsApp o llámanos.",
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
              "You are the virtual assistant for Albert Auto Detailing, a premium auto detailing business in Norwalk, Connecticut. Answer professionally and concisely. Reply in the same language the user writes in (English or Spanish). Never quote prices; invite the user to request a free quote.",
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
