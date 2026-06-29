/**
 * Decide whether to use real Cloudflare bindings (KV / R2) or the local
 * filesystem fallback.
 *
 * - Production (Cloudflare worker)         -> bindings
 * - `npm run dev:cloudflare` (CLOUDFLARE_DEV=true) -> bindings (local miniflare)
 * - `npm run dev` (default)                -> filesystem JSON fallback
 */
export function shouldUseCloudflareBindings(): boolean {
  // During `next build` (static generation) there is no worker runtime, so
  // reaching for miniflare/KV would fail. Use the bundled JSON defaults instead.
  if (process.env.NEXT_PHASE === "phase-production-build") return false;

  if (process.env.NODE_ENV === "production") return true;
  return process.env.CLOUDFLARE_DEV === "true";
}
