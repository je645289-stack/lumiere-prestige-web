import fs from "fs/promises";
import path from "path";
import type { ContentType } from "@/types";

const DATA_DIR = path.join(process.cwd(), "data");

const FILE_MAP: Record<ContentType, string> = {
  "site-config": "site-config.json",
  sections: "sections.json",
  services: "services.json",
  products: "products.json",
  testimonials: "testimonials.json",
  faqs: "faqs.json",
  "blog-posts": "blog-posts.json",
  gallery: "gallery.json",
  benefits: "benefits.json",
  "process-steps": "process-steps.json",
  categories: "categories.json",
};

function getFilePath(type: ContentType): string {
  return path.join(DATA_DIR, FILE_MAP[type]);
}

export async function readData<T>(type: ContentType): Promise<T> {
  const filePath = getFilePath(type);
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    throw new Error(`Failed to read ${type}`);
  }
}

export async function writeData<T>(type: ContentType, data: T): Promise<void> {
  const filePath = getFilePath(type);
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}

export async function uploadImage(file: File): Promise<string> {
  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(uploadsDir, { recursive: true });

  const ext = file.name.split(".").pop() || "jpg";
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}.${ext}`;
  const filePath = path.join(uploadsDir, filename);

  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(filePath, buffer);

  return `/uploads/${filename}`;
}

export { DATA_DIR, FILE_MAP };
