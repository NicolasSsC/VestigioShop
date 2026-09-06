"use client";

import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { Producto } from '@/types/product';
import { toast } from 'sonner'; // 1. NUEVO: Importamos toast

interface AddToCartButtonProps {
  product: Producto;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const addToCart = useCartStore((state) => state.addToCart);

  // 2. NUEVO: Función manejadora para el carrito y el feedback visual
  const handleAddToCart = () => {
    addToCart(product.id);
    
    toast.success('Agregado al carrito', {
      description: product.title,
      style: {
        borderColor: '#42938a',
      }
    });
  };

  return (
    <button
      onClick={handleAddToCart}
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