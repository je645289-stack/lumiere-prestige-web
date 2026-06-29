import type { SectionConfig } from "@/types";

export function isSectionEnabled(sections: SectionConfig[], id: string): boolean {
  return sections.some((s) => s.id === id && s.enabled);
}
