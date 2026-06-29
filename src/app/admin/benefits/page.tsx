import { GenericListAdmin } from "@/components/admin/GenericListAdmin";

export default function BenefitsAdmin() {
  return (
    <GenericListAdmin
      contentType="benefits"
      title="Why Choose Us / Beneficios"
      description="Edit your business highlights (EN/ES)"
      addLabel="Add benefit"
      defaultItem={{
        title: { en: "New benefit", es: "Nuevo beneficio" },
        description: { en: "", es: "" },
        icon: "Star",
        order: 1,
        enabled: true,
      }}
      fields={[
        { key: "title", label: "Title / Título", type: "localized", colSpan: true },
        { key: "icon", label: "Icon (Lucide)" },
        { key: "description", label: "Description / Descripción", type: "localized-textarea", colSpan: true },
      ]}
    />
  );
}
