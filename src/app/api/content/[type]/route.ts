import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth";
import { readData, writeData, resetData, uploadImage } from "@/lib/data";
import type { ContentType } from "@/types";

export const runtime = "nodejs";

const VALID_TYPES: ContentType[] = [
  "site-config",
  "sections",
  "services",
  "products",
  "testimonials",
  "faqs",
  "blog-posts",
  "gallery",
  "benefits",
  "process-steps",
  "categories",
];

function revalidatePublicPages() {
  revalidatePath("/", "layout");
  revalidatePath("/");
  revalidatePath("/servicios");
  revalidatePath("/catalogo");
  revalidatePath("/blog");
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ type: string }> }
) {
  const { type } = await params;
  if (!VALID_TYPES.includes(type as ContentType)) {
    return NextResponse.json({ error: "Tipo inválido" }, { status: 400 });
  }

  try {
    const data = await readData(type as ContentType);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Error al leer datos" }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ type: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { type } = await params;
  if (!VALID_TYPES.includes(type as ContentType)) {
    return NextResponse.json({ error: "Tipo inválido" }, { status: 400 });
  }

  try {
    const body = await request.json();
    await writeData(type as ContentType, body);
    revalidatePublicPages();
    return NextResponse.json({ success: true, message: "Changes saved successfully" });
  } catch {
    return NextResponse.json({ error: "Error al guardar" }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ type: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { type } = await params;
  if (!VALID_TYPES.includes(type as ContentType)) {
    return NextResponse.json({ error: "Tipo inválido" }, { status: 400 });
  }

  try {
    await resetData(type as ContentType);
    revalidatePublicPages();
    return NextResponse.json({ success: true, message: "Defaults restored" });
  } catch {
    return NextResponse.json({ error: "Error al restaurar" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    if (!file) {
      return NextResponse.json({ error: "No se envió archivo" }, { status: 400 });
    }

    const url = await uploadImage(file);
    return NextResponse.json({ url });
  } catch {
    return NextResponse.json({ error: "Error al subir imagen" }, { status: 500 });
  }
}