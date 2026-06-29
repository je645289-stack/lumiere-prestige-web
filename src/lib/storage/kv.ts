/**
 * Key/value abstraction for the CMS content.
 *
 * - When `shouldUseCloudflareBindings()` is false -> filesystem JSON fallback
 *   (`memoryKV`), used by `npm run dev`.
 * - When true -> the real Cloudflare KV namespace bound as `CMS_KV`, resolved
 *   through the OpenNext Cloudflare context.
 */
import type { KVNamespace } from "@cloudflare/workers-types";
import { shouldUseCloudflareBindings } from "./cloudflare-dev";
import { memoryKV } from "./memory";

export interface KVStore {
  get(key: string): Promise<string | null>;
  put(key: string, value: string): Promise<void>;
  delete(key: string): Promise<void>;
}

async function getCloudflareKV(): Promise<KVStore> {
  const { getCloudflareContext } = await import("@opennextjs/cloudflare");
  const { env } = await getCloudflareContext({ async: true });
  const kv = (env as unknown as { CMS_KV?: KVNamespace }).CMS_KV;

  if (!kv) {
    // Binding missing — degrade gracefully to the filesystem fallback.
    return memoryKV;
  }

  return {
    get: (key) => kv.get(key),
    put: (key, value) => kv.put(key, value),
    delete: (key) => kv.delete(key),
  };
}

export async function getKV(): Promise<KVStore> {
  if (shouldUseCloudflareBindings()) {
    return getCloudflareKV();
  }
  return memoryKV;
}
