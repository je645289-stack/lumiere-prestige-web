import { Section, SectionHeader } from "@/components/ui/Section";
import { GalleryGrid } from "@/components/ui/GalleryGrid";
import type { GalleryItem } from "@/types";

export function GallerySection({ gallery }: { gallery: GalleryItem[] }) {
  return (
    <Section id="galeria">
      <SectionHeader
        title="Galería"
        subtitle="Un vistazo a nuestras instalaciones, servicios y experiencias exclusivas"
      />
      <GalleryGrid items={gallery} />
    </Section>
  );
}
