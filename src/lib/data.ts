import type { ContentType } from "@/types";
import { getKV } from "@/lib/storage/kv";
import { getDefaultContent } from "@/lib/storage/defaults";
import { uploadImage as uploadImageToStore } from "@/lib/storage/r2";

function contentKey(type: ContentType): string {
  return `cms:${type}`;
}

export async function readData<T>(type: ContentType): Promise<T> {
  const kv = await getKV();
  const raw = await kv.get(contentKey(type));
  if (raw) {
    try {
      return JSON.parse(raw) as T;
    } catch {
      // Corrupted value — fall back to bundled defaults.
    }
  }
  return getDefaultContent<T>(type);
}

export async function writeData<T>(type: ContentType, data: T): Promise<void> {
  const kv = await getKV();
  await kv.put(contentKey(type), JSON.stringify(data, null, 2));
}

export async function uploadImage(file: File): Promise<string> {
  return uploadImageToStore(file);
}
