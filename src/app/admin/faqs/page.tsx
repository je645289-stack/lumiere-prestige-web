import { GenericListAdmin } from "@/components/admin/GenericListAdmin";

export default function FAQsAdmin() {
  return (
    <GenericListAdmin
      contentType="faqs"
      title="FAQ"
      description="Edit frequently asked questions (EN/ES)"
      addLabel="Add question"
      defaultItem={{
        question: { en: "New question", es: "Nueva pregunta" },
        answer: { en: "", es: "" },
        enabled: true,
        order: 1,
      }}
      fields={[
        { key: "question", label: "Question / Pregunta", type: "localized", colSpan: true },
        { key: "answer", label: "Answer / Respuesta", type: "localized-textarea", colSpan: true },
      ]}
    />
  );
}
