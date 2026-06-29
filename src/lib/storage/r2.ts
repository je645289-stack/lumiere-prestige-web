/**
 * Image storage abstraction.
 *
 * - Local development -> writes to /public/uploads and returns `/uploads/<file>`
 * - Cloudflare -> stores the object in the `CMS_R2` bucket and returns
 *   `/api/media/<key>` (served by the media route).
 */
import type { R2Bucket } from "@cloudflare/workers-types";
import { shouldUseCloudflareBindings } from "./cloudflare-dev";

function buildKey(file: File): string {
  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}.${ext}`;
}

async function getCloudflareR2(): Promise<R2Bucket | null> {
  try {
    const { getCloudflareContext } = await import("@opennextjs/cloudflare");
    const { env } = await getCloudflareContext({ async: true });
    return (env as unknown as { CMS_R2?: R2Bucket }).CMS_R2 ?? null;
  } catch {
    // No Cloudflare worker context (e.g. `npm start` on Node) — caller falls
    // back to the local filesystem.
    return null;
  }
}

export async function uploadImage(file: File): Promise<string> {
  if (shouldUseCloudflareBindings()) {
    const bucket = await getCloudflareR2();
    if (bucket) {
      const key = buildKey(file);
      await bucket.put(key, await file.arrayBuffer(), {
        httpMetadata: { contentType: file.type || "application/octet-stream" },
      });
      return `/api/media/${key}`;
    }
    // Fall through to filesystem if the binding is unavailable.
  }

  const fs = await import("fs/promises");
  const path = await import("path");
  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(uploadsDir, { recursive: true });

  const filename = buildKey(file);
  const filePath = path.join(uploadsDir, filename);
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(filePath, buffer);

  return `/uploads/${filename}`;
}

export async function getImage(
  key: string
): Promise<{ body: unknown; contentType: string } | null> {
  const bucket = await getCloudflareR2();
  if (!bucket) return null;

  const object = await bucket.get(key);
  if (!object) return null;

  return {
    body: object.body,
    contentType:
      object.httpMetadata?.contentType || "application/octet-stream",
  };
}
