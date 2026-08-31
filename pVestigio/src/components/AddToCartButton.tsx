// src/components/AddToCartButton.tsx
"use client";

import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { Producto } from '@/types/product';

interface AddToCartButtonProps {
  product: Producto;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <button
      onClick={() => addToCart(product)}
      disabled={product.stock === 0}
      className={`w-full py-4 rounded-xl font-black tracking-widest flex items-center justify-center gap-3 transition-all transform hover:-translate-y-1 ${
        product.stock === 0
          ? 'bg-gray-800 text-gray-500 cursor-not-allowed hover:translate-y-0'
          : 'bg-[#42938a] text-black hover:bg-[#357a72] shadow-[0_0_20px_rgba(66,147,138,0.2)]'
      }`}
    >
      <ShoppingCart className="w-5 h-5" />
      {product.stock === 0 ? 'FUERA DE STOCK' : 'AÑADIR AL CARRITO'}
    </button>
  );
}