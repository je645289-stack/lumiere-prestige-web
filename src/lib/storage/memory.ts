const kvStore = new Map<string, string>();
const r2Store = new Map<string, { data: ArrayBuffer; contentType: string }>();

const persistedKeys = new Set<string>();

export const memoryKV = {
  async get(key: string): Promise<string | null> {
    return kvStore.get(key) ?? null;
  },
  async put(key: string, value: string): Promise<void> {
    kvStore.set(key, value);
    persistedKeys.add(key);
  },
  async delete(key: string): Promise<void> {
    kvStore.delete(key);
    persistedKeys.delete(key);
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