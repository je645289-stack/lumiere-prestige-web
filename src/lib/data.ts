import type { ContentType } from "@/types";
import { readFromKV, writeToKV } from "./storage/kv";
import { uploadToR2 } from "./storage/r2";

export { FILE_MAP, getDefault, kvKey } from "./storage/defaults";

export async function readData<T>(type: ContentType): Promise<T> {
  return readFromKV<T>(type);
}

export async function writeData<T>(type: ContentType, data: T): Promise<void> {
  await writeToKV(type, data);
}

export async function resetData(type: ContentType): Promise<void> {
  const { getDefault } = await import("./storage/defaults");
  await writeToKV(type, getDefault(type));
}

export async function uploadImage(file: File): Promise<string> {
  return uploadToR2(file);
}
