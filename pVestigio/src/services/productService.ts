// src/services/productService.ts
import { Producto } from '../types/product';
import { mockInventory } from '../data/mockInventory';

export const productService = {
  // Obtener todos los productos del inventario centralizado
  async getProducts(): Promise<Producto[]> {
    return mockInventory;
  },

  // Obtener un producto específico por su ID
  async getProductById(id: string): Promise<Producto | undefined> {
    return mockInventory.find((product: Producto) => product.id === id);
  },
};