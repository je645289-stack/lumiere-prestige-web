import { GenericListAdmin } from "@/components/admin/GenericListAdmin";

export default function BlogAdmin() {
  return (
    <GenericListAdmin
      contentType="blog-posts"
      title="Blog & Noticias"
      description="Publica y edita artículos"
      addLabel="Agregar artículo"
      defaultItem={{
        slug: "nuevo-articulo",
        title: "Nuevo artículo",
        image: "",
        date: new Date().toISOString().split("T")[0],
        summary: "",
        content: "<p>Contenido del artículo...</p>",
        category: "General",
        enabled: true,
      }}
      fields={[
        { key: "title", label: "Título" },
        { key: "slug", label: "URL (slug)" },
        { key: "category", label: "Categoría" },
        { key: "date", label: "Fecha" },
        { key: "summary", label: "Resumen", type: "textarea", colSpan: true },
        { key: "content", label: "Contenido (HTML)", type: "textarea", colSpan: true },
        { key: "image", label: "Imagen", type: "image", colSpan: true },
      ]}
    />
  );
}
