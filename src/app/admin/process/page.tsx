import { GenericListAdmin } from "@/components/admin/GenericListAdmin";

export default function ProcessAdmin() {
  return (
    <GenericListAdmin
      contentType="process-steps"
      title="Process / Proceso"
      description="Edit your workflow steps (EN/ES)"
      addLabel="Add step"
      defaultItem={{
        step: 1,
        title: { en: "New step", es: "Nuevo paso" },
        description: { en: "", es: "" },
        icon: "Sparkles",
        order: 1,
        enabled: true,
      }}
      fields={[
        { key: "step", label: "Step number", type: "number" },
        { key: "icon", label: "Icon (Lucide)" },
        { key: "title", label: "Title / Título", type: "localized", colSpan: true },
        { key: "description", label: "Description / Descripción", type: "localized-textarea", colSpan: true },
      ]}
    />
  );
}
