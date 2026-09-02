// src/types/product.ts

// 1. categoría a un tipo propio para mejor escalabilidad y reutilización
export type ProductCategory = 'Teclados' | 'Ratones' | 'Auriculares' | 'Alfombrillas' | 'Audio' | 'Accesorios';

// 2. terreno para periféricos (ej. Mouse Blanco/Negro, Teclado Switch Rojo/Azul)
export interface ProductVariant {
  id: string;
  name: string; // Ej: "Switch Rojo", "Color Blanco"
  sku: string;
  stock: number;
}

// 3. Interfaz principal robustecida
export interface Producto {
  id: string;
  slug: string; // NUEVO: URL amigable, ej: "logitech-g502-hero" (Vital para SEO)
  sku: string; // NUEVO: Identificador único de inventario
  title: string;
  category: ProductCategory;
  description: string;
  price: number;
  compareAtPrice?: number; // NUEVO: Precio anterior tachado para mostrar descuentos (CRO)
  imageSrc: string;
  gallery?: string[]; // NUEVO: Array para las fotos de la página de detalle
  isNew?: boolean;
  badge?: string; // NUEVO: Etiqueta flotante personalizada (ej. "Más Vendido", "Nuevo", "Pro Choice")
  stock: number; // NUEVO: Para deshabilitar el botón de compra si llega a 0
  variants?: ProductVariant[]; // NUEVO: Opcional, por si el producto tiene opciones
  features?: string[]; // NUEVO: Bullet points de especificaciones técnicas
}