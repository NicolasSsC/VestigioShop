// src/hooks/useHydratedCart.ts
import { useMemo } from 'react';
import { useCartStore } from '@/store/useCartStore';
import { mockInventory } from '@/data/mockInventory';
import { Producto } from '@/types/product';

export interface HydratedCartItem extends Producto {
  quantity: number;
}

export function useHydratedCart() {
  const cart = useCartStore((state) => state.cart);

  const { hydratedItems, totalItems, cartTotal } = useMemo(() => {
    let totalItems = 0;
    let cartTotal = 0;
    const hydratedItems: HydratedCartItem[] = [];

    cart.forEach((cartItem) => {
      const productFound = mockInventory.find((p) => p.id === cartItem.productId);
      
      if (productFound) {
        hydratedItems.push({
          ...productFound,
          quantity: cartItem.quantity,
        });
        
        totalItems += cartItem.quantity;
        cartTotal += productFound.price * cartItem.quantity;
      }
    });

    return { hydratedItems, totalItems, cartTotal };
  }, [cart]);

  return { hydratedItems, totalItems, cartTotal };
}
