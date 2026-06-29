"use client";

import { useEffect } from "react";
import { subscribeToContentStore } from "@/lib/content-store";

/**
 * Keeps client CMS state in sync across admin iframe, tabs, and the public site.
 * Does not force a full router refresh (that was wiping live edits in dev).
 */
export function ContentSyncListener() {
  useEffect(() => subscribeToContentStore(() => {}), []);
  return null;
}
