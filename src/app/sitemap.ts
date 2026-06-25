import { getSiteUrl } from "@/lib/utils";
import { getSiteData } from "@/lib/site-data";

export default async function sitemap() {
  const { blogPosts } = await getSiteData();
  const baseUrl = getSiteUrl();

  const staticPages = ["", "/servicios", "/catalogo", "/blog", "/checkout"].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const blogPages = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...blogPages];
}
