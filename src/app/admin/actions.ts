"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  PRODUCT_CATEGORIES,
  PRODUCT_STATUSES,
  type ProductCategory,
  type ProductStatus,
} from "@/types/product";
import { isSupabaseConfigured } from "@/lib/products";
import { createClient } from "@/lib/supabase/server";

const imageBucket = "product-images";

export async function signInAction(formData: FormData) {
  if (!isSupabaseConfigured()) {
    redirect("/admin/login?error=missing-config");
  }

  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/admin");
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    redirect("/admin/login?error=invalid-credentials");
  }

  redirect(next.startsWith("/admin") ? next : "/admin");
}

export async function signOutAction() {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    await supabase.auth.signOut();
  }

  redirect("/admin/login");
}

export async function createProductAction(formData: FormData) {
  const product = getProductPayload(formData);
  const imageUrl = await uploadProductImage(formData);
  const supabase = await createClient();

  const { error } = await supabase.from("products").insert({
    ...product,
    image_url: imageUrl,
  });

  if (error) throw new Error(error.message);

  revalidatePath("/admin");
  revalidatePath("/admin/products");
  revalidatePath("/catalogo");
  redirect("/admin/products");
}

export async function updateProductAction(id: string, formData: FormData) {
  const product = getProductPayload(formData);
  const imageUrl = await uploadProductImage(formData);
  const supabase = await createClient();

  const { error } = await supabase
    .from("products")
    .update({
      ...product,
      ...(imageUrl ? { image_url: imageUrl } : {}),
    })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/admin");
  revalidatePath("/admin/products");
  revalidatePath("/catalogo");
  redirect("/admin/products");
}

export async function markProductSoldAction(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const supabase = await createClient();

  const { error } = await supabase
    .from("products")
    .update({ status: "Vendido", quantity: 0 })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/admin");
  revalidatePath("/admin/products");
  revalidatePath("/catalogo");
}

function getProductPayload(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const price = Number(formData.get("price"));
  const quantity = Number(formData.get("quantity") ?? 1);
  const category = String(formData.get("category") ?? "Basico");
  const status = String(formData.get("status") ?? "Disponible");

  if (!name) throw new Error("El nombre es obligatorio.");
  if (!Number.isFinite(price) || price <= 0) {
    throw new Error("El precio debe ser mayor a cero.");
  }
  if (!Number.isInteger(quantity) || quantity < 0) {
    throw new Error("La cantidad debe ser un numero entero igual o mayor a cero.");
  }

  return {
    name,
    price,
    quantity,
    category: PRODUCT_CATEGORIES.includes(category as ProductCategory)
      ? category
      : "Basico",
    status: PRODUCT_STATUSES.includes(status as ProductStatus)
      ? status
      : "Disponible",
  };
}

async function uploadProductImage(formData: FormData) {
  const image = formData.get("image");

  if (!(image instanceof File) || image.size === 0) return null;

  const supabase = await createClient();
  const extension = image.name.split(".").pop()?.toLowerCase() ?? "jpg";
  const filename = `${crypto.randomUUID()}.${extension}`;
  const path = `products/${filename}`;

  const { error } = await supabase.storage
    .from(imageBucket)
    .upload(path, image, {
      contentType: image.type,
      upsert: false,
    });

  if (error) throw new Error(error.message);

  const { data } = supabase.storage.from(imageBucket).getPublicUrl(path);
  return data.publicUrl;
}
