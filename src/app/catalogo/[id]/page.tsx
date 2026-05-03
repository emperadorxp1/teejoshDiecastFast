import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductById } from "@/lib/products";
import { formatPrice } from "@/lib/format";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const statusStyles = {
  Disponible: "bg-emerald-100 text-emerald-800",
  Reservado: "bg-amber-100 text-amber-900",
  Vendido: "bg-zinc-200 text-zinc-700",
  Oculto: "bg-neutral-200 text-neutral-700",
} as const;

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) notFound();

  return (
    <main className="min-h-screen bg-stone-100">
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center gap-4 px-4 py-4">
          <Link
            href="/catalogo"
            className="rounded-md border border-zinc-300 px-3 py-2 text-sm font-semibold text-zinc-800"
          >
            &larr; Volver
          </Link>
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-red-600">
              Catalogo
            </p>
            <h1 className="text-xl font-black text-zinc-950">
              TeeJosh Hot Wheels
            </h1>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-3xl px-4 py-6">
        <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm">
          <div className="relative aspect-square bg-zinc-100">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              sizes="(min-width: 768px) 700px, 100vw"
              className="object-contain"
              priority
            />
          </div>

          <div className="space-y-4 p-5">
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-xl font-black leading-tight text-zinc-950 sm:text-2xl">
                {product.name}
              </h2>
              <span
                className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[product.status]}`}
              >
                {product.status}
              </span>
            </div>

            <p className="text-sm text-zinc-500">
              {product.category} · Stock: {product.quantity}
            </p>

            <p className="text-3xl font-black text-red-600">
              {formatPrice(product.price)}
            </p>

            {product.price === 7 && (
              <span className="inline-block rounded-md bg-amber-400 px-3 py-1.5 text-sm font-bold text-amber-950">
                Lleva 3 x S/15
              </span>
            )}

            {product.status !== "Vendido" && product.quantity > 0 && (
              <div className="pt-2">
                <WhatsAppButton productName={product.name} />
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
