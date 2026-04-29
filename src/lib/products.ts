import type { Product, ProductRow } from "@/types/product";
import { createClient } from "./supabase/server";

export const products: Product[] = [
  {
    id: "skyline-r34",
    name: "Nissan Skyline GT-R R34",
    price: 18,
    quantity: 2,
    category: "Premium",
    status: "Disponible",
    imageUrl: "/car-placeholder.svg",
    createdAt: "2026-04-28T20:00:00.000Z",
  },
  {
    id: "batmobile",
    name: "Batmobile Classic TV Series",
    price: 15,
    quantity: 1,
    category: "Basico",
    status: "Disponible",
    imageUrl: "/car-placeholder.svg",
    createdAt: "2026-04-28T19:00:00.000Z",
  },
  {
    id: "toyota-supra",
    name: "Toyota Supra GR",
    price: 20,
    quantity: 3,
    category: "Premium",
    status: "Reservado",
    imageUrl: "/car-placeholder.svg",
    createdAt: "2026-04-28T18:00:00.000Z",
  },
  {
    id: "monster-truck",
    name: "Bone Shaker Monster Truck",
    price: 28,
    quantity: 0,
    category: "Monster Trucks",
    status: "Vendido",
    imageUrl: "/car-placeholder.svg",
    createdAt: "2026-04-28T17:00:00.000Z",
  },
];

export function getPublicProducts() {
  return products.filter(
    (product) => product.status === "Disponible" && product.quantity > 0,
  );
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat("es-PE", {
    style: "currency",
    currency: "PEN",
  }).format(price);
}

export function mapProductRow(row: ProductRow): Product {
  return {
    id: row.id,
    name: row.name,
    price: Number(row.price),
    quantity: row.quantity ?? 1,
    category: row.category ?? "Basico",
    status: row.status,
    imageUrl: row.image_url ?? "/car-placeholder.svg",
    createdAt: row.created_at,
  };
}

export async function getProducts() {
  if (!isSupabaseConfigured()) return products;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("id,name,price,quantity,category,status,image_url,created_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error loading products", error.message);
    return [];
  }

  return (data as ProductRow[]).map(mapProductRow);
}

export async function getProductById(id: string) {
  if (!isSupabaseConfigured()) {
    return products.find((product) => product.id === id) ?? null;
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("id,name,price,quantity,category,status,image_url,created_at")
    .eq("id", id)
    .single();

  if (error || !data) return null;
  return mapProductRow(data as ProductRow);
}

export async function getCatalogProducts() {
  const allProducts = await getProducts();
  return allProducts.filter(
    (product) => product.status === "Disponible" && product.quantity > 0,
  );
}

export function isSupabaseConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}
