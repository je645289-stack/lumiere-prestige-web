import { GenericListAdmin } from "@/components/admin/GenericListAdmin";

export default function ProductsAdmin() {
  return (
    <GenericListAdmin
      contentType="products"
      title="Catálogo de Productos"
      description="Agrega, edita, elimina productos y precios"
      addLabel="Agregar producto"
      defaultItem={{
        name: "Nuevo producto",
        description: "",
        image: "",
        price: "$0 MXN",
        category: "General",
        enabled: true,
        order: 1,
      }}
      fields={[
        { key: "name", label: "Nombre" },
        { key: "category", label: "Categoría" },
        { key: "price", label: "Precio" },
        { key: "description", label: "Descripción", type: "textarea", colSpan: true },
        { key: "image", label: "Imagen", type: "image", colSpan: true },
      ]}
    />
  );
}
