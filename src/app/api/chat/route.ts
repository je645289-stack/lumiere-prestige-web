import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

const r2Store = new Map<string, { data: ArrayBuffer; contentType: string }>();

function keyToFilename(key: string): string {
  return key.replace(/^cms:/, "") + ".json";
}

export const memoryKV = {
  async get(key: string): Promise<string | null> {
    try {
      const filePath = path.join(DATA_DIR, keyToFilename(key));
      if (!fs.existsSync(filePath)) return null;
      return fs.readFileSync(filePath, "utf-8");
    } catch {
      return null;
    }
  },
  async put(key: string, value: string): Promise<void> {
    try {
      if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
      const filePath = path.join(DATA_DIR, keyToFilename(key));
      fs.writeFileSync(filePath, value, "utf-8");
    } catch {
      // silently fail
    }
  },
  async delete(key: string): Promise<void> {
    try {
      const filePath = path.join(DATA_DIR, keyToFilename(key));
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    } catch {
      // silently fail
    }
  },
};

export const memoryR2 = {
  async put(
    key: string,
    value: ArrayBuffer | ReadableStream,
    options?: { httpMetadata?: { contentType?: string } }
  ): Promise<void> {
    const buffer =
      value instanceof ArrayBuffer
        ? value
        : await new Response(value).arrayBuffer();
    r2Store.set(key, {
      data: buffer,
      contentType: options?.httpMetadata?.contentType ?? "application/octet-stream",
    });
  },
  async get(key: string): Promise<{ body: ArrayBuffer; contentType: string } | null> {
    const entry = r2Store.get(key);
    if (!entry) return null;
    return { body: entry.data, contentType: entry.contentType };
  },
};

export function isMemoryKV(
  kv: KVNamespace | typeof memoryKV
): kv is typeof memoryKV {
  return kv === memoryKV;
}