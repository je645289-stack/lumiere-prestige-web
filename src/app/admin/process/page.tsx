import { GenericListAdmin } from "@/components/admin/GenericListAdmin";

export default function ProcessAdmin() {
  return (
    <GenericListAdmin
      contentType="process-steps"
      title="Proceso de Trabajo"
      description="Edita los pasos de tu proceso"
      addLabel="Agregar paso"
      defaultItem={{
        step: 1,
        title: "Nuevo paso",
        description: "",
        order: 1,
        enabled: true,
      }}
      fields={[
        { key: "step", label: "Número de paso", type: "number" },
        { key: "title", label: "Título" },
        { key: "description", label: "Descripción", type: "textarea", colSpan: true },
      ]}
    />
  );
}
