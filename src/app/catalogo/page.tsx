import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { getCatalogProducts } from "@/lib/products";

export default async function CatalogPage() {
  const publicProducts = await getCatalogProducts();

  return (
    <main className="min-h-screen bg-stone-100">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4">
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-red-600">
              Catalogo
            </p>
            <h1 className="text-xl font-black text-zinc-950">
              TeeJosh Hot Wheels
            </h1>
          </div>
          <Link
            href="/admin"
            className="rounded-md border border-zinc-300 px-3 py-2 text-sm font-semibold text-zinc-800"
          >
            Admin
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-4 py-5">
        <div className="mb-5 rounded-lg bg-zinc-950 p-5 text-white">
          <p className="text-sm font-semibold text-red-300">Nuevos ingresos</p>
          <h2 className="mt-1 text-2xl font-black leading-tight">
            Carritos listos para separar por WhatsApp
          </h2>
        </div>

        {publicProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
            {publicProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-zinc-200 bg-white p-6 text-center">
            <p className="font-bold text-zinc-950">
              No hay carritos disponibles por ahora.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
