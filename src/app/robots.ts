import { getSiteUrl } from "@/lib/utils";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/"],
    },
    sitemap: `${getSiteUrl()}/sitemap.xml`,
  };
}
