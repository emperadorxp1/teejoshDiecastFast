"use client";

import { useState } from "react";
import type { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";

type CatalogGridProps = {
  products: Product[];
};

export function CatalogGrid({ products }: CatalogGridProps) {
  const [filter, setFilter] = useState<"all" | "3x15">("all");

  const filtered =
    filter === "3x15" ? products.filter((p) => p.price === 7) : products;

  return (
    <>
      <div className="mb-4 flex gap-2">
        <button
          onClick={() => setFilter("all")}
          className={`rounded-full px-4 py-1.5 text-sm font-bold transition ${
            filter === "all"
              ? "bg-zinc-950 text-white"
              : "bg-white text-zinc-700 border border-zinc-300"
          }`}
        >
          Todos
        </button>
        <button
          onClick={() => setFilter("3x15")}
          className={`rounded-full px-4 py-1.5 text-sm font-bold transition ${
            filter === "3x15"
              ? "bg-amber-400 text-amber-950"
              : "bg-white text-zinc-700 border border-zinc-300"
          }`}
        >
          3 x S/15
        </button>
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-zinc-200 bg-white p-6 text-center">
          <p className="font-bold text-zinc-950">
            No hay carritos con esta promo por ahora.
          </p>
        </div>
      )}
    </>
  );
}
