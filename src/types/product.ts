export const PRODUCT_CATEGORIES = [
  "Basico",
  "Premium",
  "Team Transport",
  "Monster Trucks",
  "Matchbox",
  "Ofertas",
] as const;

export const PRODUCT_STATUSES = [
  "Disponible",
  "Reservado",
  "Vendido",
  "Oculto",
] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];
export type ProductStatus = (typeof PRODUCT_STATUSES)[number];

export type Product = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category: ProductCategory;
  status: ProductStatus;
  imageUrl: string;
  createdAt: string;
};

export type ProductRow = {
  id: string;
  name: string;
  price: number;
  quantity: number | null;
  category: ProductCategory | null;
  status: ProductStatus;
  image_url: string | null;
  created_at: string;
};
