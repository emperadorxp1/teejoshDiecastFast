import Link from "next/link";
import { ProductForm } from "@/components/ProductForm";
import { createProductAction } from "../../actions";

export default function NewProductPage() {
  return (
    <main className="min-h-screen bg-stone-100">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-2xl px-4 py-5">
          <Link href="/admin" className="text-sm font-semibold text-red-600">
            Volver
          </Link>
          <h1 className="mt-2 text-2xl font-black text-zinc-950">
            Nuevo carrito
          </h1>
        </div>
      </header>

      <section className="mx-auto max-w-2xl px-4 py-5">
        <div className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm">
          <ProductForm action={createProductAction} />
        </div>
      </section>
    </main>
  );
}
