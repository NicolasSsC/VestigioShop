import { Producto } from '../types/product';
import { INVENTARIO } from '../data/mockInventory';

export const productService = {
  getProducts: async (): Promise<Producto[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(INVENTARIO);
      }, 500);
    });
  },

  getProductById: async (id: string): Promise<Producto | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(INVENTARIO.find((prod) => prod.id === id));
      }, 500);
    });
  }
};