// src/store/useCartStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Producto } from '@/types/product';

export interface CartItem extends Producto {
  quantity: number;
}

interface CartStore {
  cart: CartItem[];
  addToCart: (product: Producto, quantityToAdd?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],

      // --- DATOS Y NEGOCIO ---
      addToCart: (product: Producto, quantityToAdd = 1) => {
        const safeQuantity = Math.max(1, quantityToAdd);
        const currentCart = get().cart;
        const existingItem = currentCart.find((item) => item.id === product.id);

        if (existingItem) {
          set({
            cart: currentCart.map((item) =>
              item.id === product.id
                ? { ...item, quantity: Math.min(99, item.quantity + safeQuantity) }
                : item
            ),
          });
        } else {
          set({ 
            cart: [...currentCart, { ...product, quantity: Math.min(99, safeQuantity) }],
          });
        }
        
        // ❌ Eliminamos la llamada a useUIStore.getState().openCart() 
        // para permitir que el Toast haga el trabajo de feedback visual silencioso.
      },

      removeFromCart: (productId: string) => {
        set({ cart: get().cart.filter((item) => item.id !== productId) });
      },

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }
        if (isNaN(quantity)) return;

        set({
          cart: get().cart.map((item) =>
            item.id === productId 
              ? { ...item, quantity: Math.min(99, quantity) }
              : item
          ),
        });
      },

      clearCart: () => set({ cart: [] }),

      getTotalItems: () => {
        return get().cart.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().cart.reduce(
          (total, item) => total + (item.price * item.quantity),
          0
        );
      },
    }),
    {
      name: 'vestigio-cart-storage',
      // Mantenemos partialize por seguridad para solo guardar los productos en localStorage
      partialize: (state) => ({ cart: state.cart }), 
      version: 1, 
    }
  )
);