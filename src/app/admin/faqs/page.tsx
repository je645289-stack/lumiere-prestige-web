import { GenericListAdmin } from "@/components/admin/GenericListAdmin";

export default function FAQsAdmin() {
  return (
    <GenericListAdmin
      contentType="faqs"
      title="Preguntas Frecuentes"
      description="Edita preguntas y respuestas comunes"
      addLabel="Agregar pregunta"
      defaultItem={{
        question: "Nueva pregunta",
        answer: "",
        enabled: true,
        order: 1,
      }}
      fields={[
        { key: "question", label: "Pregunta", colSpan: true },
        { key: "answer", label: "Respuesta", type: "textarea", colSpan: true },
      ]}
    />
  );
}
