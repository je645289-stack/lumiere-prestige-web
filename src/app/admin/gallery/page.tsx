import { GenericListAdmin } from "@/components/admin/GenericListAdmin";

export default function GalleryAdmin() {
  return (
    <GenericListAdmin
      contentType="gallery"
      title="Galería"
      description="Sube, elimina y organiza imágenes"
      addLabel="Agregar imagen"
      defaultItem={{
        image: "",
        alt: "",
        category: "General",
        order: 1,
        enabled: true,
      }}
      fields={[
        { key: "alt", label: "Descripción (ALT)" },
        { key: "category", label: "Categoría" },
        { key: "order", label: "Orden", type: "number" },
        { key: "image", label: "Imagen", type: "image", colSpan: true },
      ]}
    />
  );
}
