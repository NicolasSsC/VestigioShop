// src/store/useCartStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  productId: string;
  quantity: number;
}

interface CartStore {
  cart: CartItem[];
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],

      // --- DATOS Y NEGOCIO ---
      addToCart: (productId: string) => {
        const currentCart = get().cart;
        const existingItem = currentCart.find((item) => item.productId === productId);

        if (existingItem) {
          set({
            cart: currentCart.map((item) =>
              item.productId === productId
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
          });
        } else {
          set({
            cart: [...currentCart, { productId, quantity: 1 }],
          });
        }
      },

      removeFromCart: (productId: string) => {
        set({ cart: get().cart.filter((item) => item.productId !== productId) });
      },

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }

        set({
          cart: get().cart.map((item) =>
            item.productId === productId
              ? { ...item, quantity }
              : item
          ),
        });
      },

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: 'vestigio-cart-storage',
      version: 2, // Subimos la versión porque cambiamos la estructura de los datos
      migrate: (persistedState: any, version: number) => {
        // Si venimos de la versión 1 (donde guardábamos el producto completo)
        if (version === 0 || version === 1) {
          if (persistedState && Array.isArray(persistedState.cart)) {
            // Convertimos los objetos completos a entidades anémicas
            persistedState.cart = persistedState.cart.map((oldItem: any) => ({
              productId: oldItem.id || oldItem.productId,
              quantity: oldItem.quantity || 1,
            }));
          }
        }
        return persistedState;
      },
    }
  )
);
