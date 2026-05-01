import Image from "next/image";
import type { Product } from "@/types/product";
import { formatPrice } from "@/lib/products";
import { WhatsAppButton } from "./WhatsAppButton";

type ProductCardProps = {
  product: Product;
  showActions?: boolean;
};

const statusStyles: Record<Product["status"], string> = {
  Disponible: "bg-emerald-100 text-emerald-800",
  Reservado: "bg-amber-100 text-amber-900",
  Vendido: "bg-zinc-200 text-zinc-700",
  Oculto: "bg-neutral-200 text-neutral-700",
};

export function ProductCard({ product, showActions = true }: ProductCardProps) {
  return (
    <article className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm">
      <div className="relative aspect-[4/3] bg-zinc-100">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          sizes="(min-width: 768px) 280px, 100vw"
          className="object-contain"
        />
      </div>

      <div className="space-y-3 p-4">
        <div className="space-y-1">
          <div className="flex items-start justify-between gap-3">
            <h2 className="text-base font-bold leading-tight text-zinc-950">
              {product.name}
            </h2>
            <span
              className={`shrink-0 rounded-full px-2 py-1 text-xs font-semibold ${statusStyles[product.status]}`}
            >
              {product.status}
            </span>
          </div>
          <p className="text-sm text-zinc-500">
            {product.category} · Stock: {product.quantity}
          </p>
        </div>

        <p className="text-2xl font-black text-red-600">
          {formatPrice(product.price)}
        </p>

        {showActions && product.status !== "Vendido" && product.quantity > 0 ? (
          <WhatsAppButton productName={product.name} />
        ) : null}
      </div>
    </article>
  );
}
