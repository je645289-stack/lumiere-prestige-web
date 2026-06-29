import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().optional(),
  vehicle: z.string().optional(),
  service: z.string().optional(),
  datetime: z.string().optional(),
  type: z.string().optional(),
  message: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = contactSchema.parse(body);

    const contactEmail =
      process.env.CONTACT_EMAIL || "albertautodetailing2024@gmail.com";

    // Log submission (replace with an email service like Resend/SendGrid in production)
    console.log("[ALBERT AUTO DETAILING — LEAD]", {
      to: contactEmail,
      ...data,
      timestamp: new Date().toISOString(),
    });

    // Structure ready for email integration:
    // await resend.emails.send({ from, to: contactEmail, subject, html })

    return NextResponse.json({
      success: true,
      message: "Request received successfully",
    });
  } catch {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }
}
