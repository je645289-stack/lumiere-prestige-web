import { NextRequest, NextResponse } from "next/server";
import { getFromR2 } from "@/lib/storage/r2";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  const { key: encodedKey } = await params;
  const key = decodeURIComponent(encodedKey);

  if (!key.startsWith("uploads/")) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const object = await getFromR2(key);
  if (!object) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return new NextResponse(object.body, {
    headers: {
      "Content-Type": object.contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
