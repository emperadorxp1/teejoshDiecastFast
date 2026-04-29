import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductForm } from "@/components/ProductForm";
import { getProductById } from "@/lib/products";
import { updateProductAction } from "../../../actions";

type EditProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) notFound();

  const action = updateProductAction.bind(null, product.id);

  return (
    <main className="min-h-screen bg-stone-100">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-2xl px-4 py-5">
          <Link
            href="/admin/products"
            className="text-sm font-semibold text-red-600"
          >
            Volver
          </Link>
          <h1 className="mt-2 text-2xl font-black text-zinc-950">
            Editar carrito
          </h1>
          <p className="mt-1 text-sm text-zinc-500">{product.name}</p>
        </div>
      </header>

      <section className="mx-auto max-w-2xl px-4 py-5">
        <div className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm">
          <ProductForm
            action={action}
            initialProduct={product}
            submitLabel="Guardar cambios"
          />
        </div>
      </section>
    </main>
  );
}
