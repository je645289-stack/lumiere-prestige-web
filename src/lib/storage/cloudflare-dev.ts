/**
 * Returns true when Cloudflare KV/R2 bindings should be resolved via Wrangler.
 * In default local dev we use in-memory storage to avoid Wrangler/workerd startup issues.
 */
export function shouldUseCloudflareBindings(): boolean {
  if (process.env.NODE_ENV === "production") return true;
  return process.env.CLOUDFLARE_DEV === "true";
}
