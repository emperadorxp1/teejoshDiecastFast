import Link from "next/link";
import { getProducts } from "@/lib/products";
import { formatPrice } from "@/lib/format";
import { signOutAction } from "./actions";

export default async function AdminPage() {
  const products = await getProducts();
  const recentProducts = products.slice(0, 3);

  return (
    <main className="min-h-screen bg-stone-100">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-4 px-4 py-5">
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-red-600">
              Panel privado
            </p>
            <h1 className="text-2xl font-black text-zinc-950">
              Catalogo TeeJosh
            </h1>
          </div>
          <form action={signOutAction}>
            <button className="rounded-md border border-zinc-300 px-3 py-2 text-sm font-semibold text-zinc-800">
              Salir
            </button>
          </form>
        </div>
      </header>

      <section className="mx-auto max-w-4xl space-y-5 px-4 py-5">
        <Link
          href="/admin/products/new"
          className="flex min-h-14 w-full items-center justify-center rounded-md bg-red-600 px-5 py-4 text-lg font-black text-white shadow-sm transition hover:bg-red-700"
        >
          + Subir carrito
        </Link>

        <div className="rounded-lg border border-zinc-200 bg-white">
          <div className="flex items-center justify-between gap-4 border-b border-zinc-200 p-4">
            <h2 className="font-black text-zinc-950">Ultimos productos</h2>
            <Link
              href="/admin/products"
              className="text-sm font-semibold text-red-600"
            >
              Ver todos
            </Link>
          </div>
          <div className="divide-y divide-zinc-100">
            {recentProducts.length > 0 ? (
              recentProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between gap-3 p-4"
              >
                <div>
                  <p className="font-bold text-zinc-950">{product.name}</p>
                  <p className="text-sm text-zinc-500">
                    {formatPrice(product.price)} - {product.status}
                  </p>
                </div>
                <Link
                  href={`/admin/products/${product.id}/edit`}
                  className="rounded-md border border-zinc-300 px-3 py-2 text-sm font-semibold text-zinc-800"
                >
                  Editar
                </Link>
              </div>
              ))
            ) : (
              <p className="p-4 text-sm font-semibold text-zinc-500">
                Todavia no hay productos.
              </p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
