"use client";

import { useCallback, useEffect, useState } from "react";
import {
  mergeSiteDataFromStorage,
  readContentOrDefault,
  readFromClientCache,
  subscribeToContentStore,
} from "@/lib/content-store";
import type { SiteData } from "@/lib/localize-data";
import type { SectionConfig, SiteConfig } from "@/types";

function mergeSectionsFromStorage(serverSections: SectionConfig[]): SectionConfig[] {
  const raw = readFromClientCache<SectionConfig[]>("sections");
  if (!raw) return serverSections;
  return raw.filter((s) => s.enabled).sort((a, b) => a.order - b.order);
}

/**
 * Merge CMS overrides after mount to avoid hydration mismatch
 * (server HTML must match the first client render).
 */
export function useMergedSiteData(serverData: SiteData): SiteData {
  const [data, setData] = useState(serverData);

  const refresh = useCallback(() => {
    setData(mergeSiteDataFromStorage(serverData));
  }, [serverData]);

  useEffect(() => {
    refresh();
    return subscribeToContentStore(refresh);
  }, [refresh]);

  return data;
}

export function useMergedConfig(serverConfig: SiteConfig): SiteConfig {
  const [config, setConfig] = useState(serverConfig);

  const refresh = useCallback(() => {
    setConfig(readContentOrDefault("site-config", serverConfig));
  }, [serverConfig]);

  useEffect(() => {
    refresh();
    return subscribeToContentStore(refresh);
  }, [refresh]);

  return config;
}

export function useMergedSections(serverSections: SectionConfig[]): SectionConfig[] {
  const [sections, setSections] = useState(serverSections);

  const refresh = useCallback(() => {
    setSections(mergeSectionsFromStorage(serverSections));
  }, [serverSections]);

  useEffect(() => {
    refresh();
    return subscribeToContentStore(refresh);
  }, [refresh]);

  return sections;
}
