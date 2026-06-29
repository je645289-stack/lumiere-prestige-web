import { memoryR2 } from "./memory";
import { shouldUseCloudflareBindings } from "./cloudflare-dev";

interface R2PutOptions {
  httpMetadata?: { contentType?: string };
}

interface R2Like {
  put(
    key: string,
    value: ArrayBuffer | ReadableStream,
    options?: R2PutOptions
  ): Promise<void>;
}

async function resolveR2(): Promise<R2Like> {
  if (!shouldUseCloudflareBindings()) {
    return memoryR2;
  }

  try {
    const { getCloudflareContext } = await import("@opennextjs/cloudflare");
    const { env } = await getCloudflareContext({ async: true });
    const bucket = (env as CloudflareEnv).CMS_R2;
    if (bucket) {
      return {
        put: async (key, value, options) => {
          await bucket.put(key, value, {
            httpMetadata: options?.httpMetadata,
          });
        },
      };
    }
  } catch {
    // Local dev fallback
  }
  return memoryR2;
}

function buildPublicUrl(key: string): string {
  const base = process.env.NEXT_PUBLIC_R2_PUBLIC_URL?.replace(/\/$/, "");
  if (base) {
    return `${base}/${key}`;
  }
  return `/api/media/${encodeURIComponent(key)}`;
}

export async function uploadToR2(file: File): Promise<string> {
  const bucket = await resolveR2();

  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const safeExt = ext.replace(/[^a-z0-9]/gi, "") || "jpg";
  const key = `uploads/${Date.now()}-${Math.random().toString(36).slice(2, 9)}.${safeExt}`;

  await bucket.put(key, await file.arrayBuffer(), {
    httpMetadata: {
      contentType: file.type || `image/${safeExt === "jpg" ? "jpeg" : safeExt}`,
    },
  });

  return buildPublicUrl(key);
}

export async function getFromR2(
  key: string
): Promise<{ body: ArrayBuffer; contentType: string } | null> {
  if (!shouldUseCloudflareBindings()) {
    return memoryR2.get(key);
  }

  try {
    const { getCloudflareContext } = await import("@opennextjs/cloudflare");
    const { env } = await getCloudflareContext({ async: true });
    const bucket = (env as CloudflareEnv).CMS_R2;
    if (bucket) {
      const object = await bucket.get(key);
      if (!object) return null;
      return {
        body: await object.arrayBuffer(),
        contentType: object.httpMetadata?.contentType ?? "application/octet-stream",
      };
    }
  } catch {
    // fall through to memory
  }
  return memoryR2.get(key);
}
