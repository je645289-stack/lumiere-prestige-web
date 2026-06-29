import type { ContentType } from "@/types";

import { getDefault, kvKey } from "./defaults";

import { memoryKV } from "./memory";

import { shouldUseCloudflareBindings } from "./cloudflare-dev";



interface KVLike {

  get(key: string): Promise<string | null>;

  put(key: string, value: string): Promise<void>;

  delete?(key: string): Promise<void>;

}



async function resolveKV(): Promise<KVLike> {

  if (!shouldUseCloudflareBindings()) {

    return memoryKV;

  }



  try {

    const { getCloudflareContext } = await import("@opennextjs/cloudflare");

    const { env } = await getCloudflareContext({ async: true });

    const kv = (env as CloudflareEnv).CMS_KV;

    if (kv) {

      return {

        get: (key) => kv.get(key, "text"),

        put: (key, value) => kv.put(key, value),

        delete: (key) => kv.delete(key),

      };

    }

  } catch {

    // Local dev without OpenNext init — use memory store

  }

  return memoryKV;

}



export async function readFromKV<T>(type: ContentType): Promise<T> {

  const kv = await resolveKV();

  const key = kvKey(type);

  const raw = await kv.get(key);



  if (raw !== null) {

    return JSON.parse(raw) as T;

  }



  const defaults = getDefault<T>(type);



  try {

    await kv.put(key, JSON.stringify(defaults));

  } catch {

    // Memory store always works; remote KV may fail in edge cases

  }



  return defaults;

}



export async function writeToKV<T>(type: ContentType, data: T): Promise<void> {

  const kv = await resolveKV();

  await kv.put(kvKey(type), JSON.stringify(data));

}



export async function deleteFromKV(type: ContentType): Promise<void> {

  const kv = await resolveKV();

  if (kv.delete) {

    await kv.delete(kvKey(type));

  }

}



export async function seedAllContent(): Promise<void> {

  const kv = await resolveKV();

  const contentTypes: ContentType[] = [

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



  for (const type of contentTypes) {

    const existing = await kv.get(kvKey(type));

    if (existing === null) {

      await kv.put(kvKey(type), JSON.stringify(getDefault(type)));

    }

  }

}

