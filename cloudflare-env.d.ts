export {};

declare global {
  interface CloudflareEnv {
    CMS_KV: KVNamespace;
    CMS_R2: R2Bucket;
  }
}
