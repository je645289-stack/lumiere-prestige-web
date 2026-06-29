import { GenericListAdmin } from "@/components/admin/GenericListAdmin";

export default function TestimonialsAdmin() {
  return (
    <GenericListAdmin
      contentType="testimonials"
      title="Testimonials"
      description="Manage customer reviews (EN/ES)"
      addLabel="Add testimonial"
      defaultItem={{
        name: "Customer",
        photo: "",
        comment: { en: "", es: "" },
        rating: 5,
        service: "",
        enabled: true,
        order: 1,
      }}
      fields={[
        { key: "name", label: "Customer name" },
        { key: "service", label: "Service" },
        { key: "rating", label: "Rating (1-5)", type: "number" },
        { key: "comment", label: "Comment / Comentario", type: "localized-textarea", colSpan: true },
        { key: "photo", label: "Photo (optional)", type: "image", colSpan: true },
      ]}
    />
  );
}
