import { GenericListAdmin } from "@/components/admin/GenericListAdmin";

export default function GalleryAdmin() {
  return (
    <GenericListAdmin
      contentType="gallery"
      title="Gallery (Before & After)"
      description="Upload, remove and organize images"
      addLabel="Add image"
      defaultItem={{
        image: "",
        alt: { en: "", es: "" },
        category: "Paint Correction",
        order: 1,
        enabled: true,
      }}
      fields={[
        { key: "alt", label: "Description (ALT) / Descripción", type: "localized", colSpan: true },
        { key: "category", label: "Category (e.g. Paint Correction, Interior, Ceramic, Headlights)" },
        { key: "order", label: "Order", type: "number" },
        { key: "image", label: "Image / Imagen", type: "image", colSpan: true },
      ]}
    />
  );
}
