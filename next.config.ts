import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;

// Cloudflare bindings (KV/R2) via Wrangler are opt-in during local dev.
// Default `npm run dev` uses in-memory storage — see src/lib/storage/memory.ts.
// For Wrangler-backed dev: npm run dev:cloudflare  (or npm run pages:preview after build)
if (
  process.env.NODE_ENV === "development" &&
  process.env.CLOUDFLARE_DEV === "true"
) {
  void import("@opennextjs/cloudflare").then(({ initOpenNextCloudflareForDev }) =>
    initOpenNextCloudflareForDev()
  );
}
