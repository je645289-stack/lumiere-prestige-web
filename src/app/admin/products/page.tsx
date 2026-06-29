import { GenericListAdmin } from "@/components/admin/GenericListAdmin";

export default function PromotionsAdmin() {
  return (
    <GenericListAdmin
      contentType="products"
      title="Promociones"
      description="Add, edit and remove promotions (EN/ES)"
      addLabel="Add promotion"
      defaultItem={{
        name: { en: "New promotion", es: "Nueva promoción" },
        description: { en: "", es: "" },
        image: "",
        badge: "OFFER",
        category: "General",
        enabled: true,
        order: 1,
      }}
      fields={[
        { key: "name", label: "Title / Título", type: "localized", colSpan: true },
        { key: "badge", label: "Badge (e.g. 20% OFF)" },
        { key: "category", label: "Category / Categoría" },
        { key: "description", label: "Description / Descripción", type: "localized-textarea", colSpan: true },
        { key: "image", label: "Image / Imagen", type: "image", colSpan: true },
      ]}
    />
  );
}
