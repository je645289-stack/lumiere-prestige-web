import { GenericListAdmin } from "@/components/admin/GenericListAdmin";

export default function TestimonialsAdmin() {
  return (
    <GenericListAdmin
      contentType="testimonials"
      title="Testimonios"
      description="Gestiona reseñas de clientes"
      addLabel="Agregar testimonio"
      defaultItem={{
        name: "Cliente",
        photo: "",
        comment: "",
        rating: 5,
        service: "",
        enabled: true,
        order: 1,
      }}
      fields={[
        { key: "name", label: "Nombre del cliente" },
        { key: "service", label: "Servicio recibido" },
        { key: "rating", label: "Calificación (1-5)", type: "number" },
        { key: "comment", label: "Comentario", type: "textarea", colSpan: true },
        { key: "photo", label: "Foto (opcional)", type: "image", colSpan: true },
      ]}
    />
  );
}
