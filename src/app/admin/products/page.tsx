import Link from "next/link";
import { AdminActionButton } from "@/components/AdminActionButton";
import { ProductCard } from "@/components/ProductCard";
import { getProducts } from "@/lib/products";
import { markProductSoldAction, publishProductAction } from "../actions";

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-stone-100">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-5">
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-red-600">
              Admin
            </p>
            <h1 className="text-2xl font-black text-zinc-950">Productos</h1>
          </div>
          <Link
            href="/admin/products/new"
            className="rounded-md bg-red-600 px-4 py-2.5 text-sm font-black text-white"
          >
            Nuevo
          </Link>
        </div>
      </header>

      <section className="mx-auto grid max-w-5xl gap-4 px-4 py-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div key={product.id} className="space-y-2">
            <ProductCard product={product} showActions={false} />
            <div className="grid gap-2 sm:grid-cols-3">
              <Link
                href={`/admin/products/${product.id}/edit`}
                className="rounded-md border border-zinc-300 bg-white px-3 py-2.5 text-center text-sm font-semibold text-zinc-800"
              >
                Editar
              </Link>
              <form action={publishProductAction}>
                <input name="id" type="hidden" value={product.id} />
                <input
                  name="quantity"
                  type="hidden"
                  value={product.quantity}
                />
                <AdminActionButton
                  pendingLabel="Publicando..."
                  variant="primary"
                >
                  Publicar
                </AdminActionButton>
              </form>
              <form action={markProductSoldAction}>
                <input name="id" type="hidden" value={product.id} />
                <AdminActionButton pendingLabel="Marcando...">
                  Marcar vendido
                </AdminActionButton>
              </form>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
