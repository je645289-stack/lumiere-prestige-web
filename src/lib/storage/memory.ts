/**
 * Filesystem-backed key/value store used as the fallback for local
 * development (`npm run dev`).
 *
 * IMPORTANT: this persists to JSON files under /data so that changes made in
 * the admin panel survive a server reload. Do NOT replace this with an
 * in-memory Map() — that would lose data on every recompile.
 */
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");

function keyToFilename(key: string): string {
  // "cms:site-config" -> "site-config.json"
  return key.replace(/^cms:/, "") + ".json";
}

export const memoryKV = {
  async get(key: string): Promise<string | null> {
    try {
      const filePath = path.join(DATA_DIR, keyToFilename(key));
      if (!fs.existsSync(filePath)) return null;
      return fs.readFileSync(filePath, "utf-8");
    } catch {
      return null;
    }
  },
  async put(key: string, value: string): Promise<void> {
    try {
      if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
      const filePath = path.join(DATA_DIR, keyToFilename(key));
      fs.writeFileSync(filePath, value, "utf-8");
    } catch {
      // best-effort in read-only environments
    }
  },
  async delete(key: string): Promise<void> {
    try {
      const filePath = path.join(DATA_DIR, keyToFilename(key));
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    } catch {
      // ignore
    }
  },
};
