import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Producto } from '@/types/product'; // Asegúrate de que la ruta sea correcta

export interface CartItem extends Producto {
  quantity: number;
}

interface CartStore {
  // --- ESTADO DE DATOS ---
  cart: CartItem[];
  
  // --- ESTADO DE UI (DRAWER) ---
  isCartOpen: boolean;

  // --- ACCIONES DE UI ---
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;

  // --- ACCIONES DE DATOS ---
  addToCart: (product: Producto, quantityToAdd?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;

  // --- GETTERS (DERIVADOS) ---
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      // Estado Inicial
      cart: [],
      isCartOpen: false,

      // --- IMPLEMENTACIÓN DE UI ---
      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),
      toggleCart: () => set({ isCartOpen: !get().isCartOpen }),

      // --- IMPLEMENTACIÓN DE DATOS ---
      addToCart: (product: Producto, quantityToAdd = 1) => {
        // Aseguramos cantidades válidas
        const safeQuantity = Math.max(1, quantityToAdd);
        const currentCart = get().cart;
        const existingItem = currentCart.find((item) => item.id === product.id);

        if (existingItem) {
          set({
            cart: currentCart.map((item) =>
              item.id === product.id
                ? { ...item, quantity: Math.min(99, item.quantity + safeQuantity) } // Límite máximo de 99
                : item
            ),
            isCartOpen: true, // Abrimos el drawer al añadir
          });
        } else {
          set({ 
            cart: [...currentCart, { ...product, quantity: Math.min(99, safeQuantity) }],
            isCartOpen: true, // Abrimos el drawer al añadir el primer producto
          });
        }
      },

      removeFromCart: (productId: string) => {
        set({ cart: get().cart.filter((item) => item.id !== productId) });
      },

      updateQuantity: (productId: string, quantity: number) => {
        // Si la cantidad es 0 o menor, lo eliminamos directamente
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }

        // Prevenimos valores locos o texto (si alguna vez se usa un input manual)
        if (isNaN(quantity)) return;

        set({
          cart: get().cart.map((item) =>
            item.id === productId 
              ? { ...item, quantity: Math.min(99, quantity) } // Límite de 99
              : item
          ),
        });
      },

      clearCart: () => set({ cart: [] }),

      // --- IMPLEMENTACIÓN DE GETTERS ---
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
      // MEJORA: partialize evita guardar variables de UI en el localStorage.
      // Solo guardamos el 'cart'. Si el usuario recarga, el drawer arranca cerrado.
      partialize: (state) => ({ cart: state.cart }), 
      // Opcional pero recomendado: si a futuro cambias la estructura del carrito, puedes usar la version
      version: 1, 
    }
  )
);