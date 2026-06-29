import { GenericListAdmin } from "@/components/admin/GenericListAdmin";

export default function BenefitsAdmin() {
  return (
    <GenericListAdmin
      contentType="benefits"
      title="Beneficios"
      description="Edita los beneficios de tu negocio"
      addLabel="Agregar beneficio"
      defaultItem={{
        title: "Nuevo beneficio",
        description: "",
        icon: "Star",
        order: 1,
        enabled: true,
      }}
      fields={[
        { key: "title", label: "Título" },
        { key: "icon", label: "Ícono (Lucide)" },
        { key: "description", label: "Descripción", type: "textarea", colSpan: true },
      ]}
    />
  );
}
