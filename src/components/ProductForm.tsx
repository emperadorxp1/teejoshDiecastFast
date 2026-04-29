"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import {
  PRODUCT_CATEGORIES,
  PRODUCT_STATUSES,
  type Product,
  type ProductCategory,
  type ProductStatus,
} from "@/types/product";

type ProductFormProps = {
  action: (formData: FormData) => void | Promise<void>;
  initialProduct?: Product;
  submitLabel?: string;
};

export function ProductForm({
  action,
  initialProduct,
  submitLabel = "Publicar",
}: ProductFormProps) {
  const [imagePreview, setImagePreview] = useState<string>("");
  const [name, setName] = useState(initialProduct?.name ?? "");
  const [price, setPrice] = useState(
    initialProduct ? String(initialProduct.price) : "",
  );
  const [quantity, setQuantity] = useState(
    initialProduct ? String(initialProduct.quantity) : "1",
  );
  const [category, setCategory] = useState<ProductCategory>(
    initialProduct?.category ?? "Basico",
  );
  const [status, setStatus] = useState<ProductStatus>(
    initialProduct?.status ?? "Disponible",
  );

  return (
    <form action={action} className="space-y-5">
      <label className="block">
        <span className="mb-2 block text-sm font-semibold text-zinc-900">
          Foto
        </span>
        <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-lg border border-dashed border-zinc-300 bg-white">
          {imagePreview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imagePreview}
              alt="Vista previa"
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="px-6 text-center text-sm font-medium text-zinc-500">
              Tomar o subir foto del carrito
            </span>
          )}
          <input
            type="file"
            name="image"
            accept="image/*"
            capture="environment"
            className="absolute inset-0 cursor-pointer opacity-0"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) setImagePreview(URL.createObjectURL(file));
            }}
          />
        </div>
      </label>

      <label className="block">
        <span className="mb-2 block text-sm font-semibold text-zinc-900">
          Nombre
        </span>
        <input
          value={name}
          name="name"
          onChange={(event) => setName(event.target.value)}
          className="h-12 w-full rounded-md border border-zinc-300 bg-white px-4 text-base outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
          placeholder="Nissan Skyline"
          required
          type="text"
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-[1fr_140px]">
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-zinc-900">
            Precio
          </span>
          <div className="flex h-12 overflow-hidden rounded-md border border-zinc-300 bg-white focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-100">
            <span className="flex items-center border-r border-zinc-200 px-4 font-bold text-zinc-600">
              S/
            </span>
            <input
              value={price}
              name="price"
              onChange={(event) => setPrice(event.target.value)}
              className="w-full px-4 outline-none"
              inputMode="decimal"
              pattern="[0-9]*[,.]?[0-9]*"
              placeholder="15.00"
              required
              type="text"
            />
          </div>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-zinc-900">
            Cantidad
          </span>
          <input
            value={quantity}
            name="quantity"
            onChange={(event) => setQuantity(event.target.value)}
            className="h-12 w-full rounded-md border border-zinc-300 bg-white px-4 text-base outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
            min="0"
            required
            step="1"
            type="number"
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-zinc-900">
            Categoria
          </span>
          <select
            value={category}
            name="category"
            onChange={(event) =>
              setCategory(event.target.value as ProductCategory)
            }
            className="h-12 w-full rounded-md border border-zinc-300 bg-white px-4 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
          >
            {PRODUCT_CATEGORIES.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-zinc-900">
            Estado
          </span>
          <select
            value={status}
            name="status"
            onChange={(event) => setStatus(event.target.value as ProductStatus)}
            className="h-12 w-full rounded-md border border-zinc-300 bg-white px-4 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
          >
            {PRODUCT_STATUSES.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
      </div>

      <ProductSubmitButton label={submitLabel} />
    </form>
  );
}

function ProductSubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="min-h-12 w-full rounded-md bg-red-600 px-5 py-3 text-base font-black text-white transition hover:bg-red-700 disabled:cursor-wait disabled:bg-red-400"
    >
      {pending ? "Guardando..." : label}
    </button>
  );
}
