"use client";

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { Producto } from '@/types/product';
import { toast } from 'sonner'; // 1. NUEVO: Importamos toast de sonner

interface ProductCardProps {
  product: Producto;
  buttonText?: string;
  buttonVariant?: 'solid' | 'outline';
}

export default function ProductCard({
  product,
  buttonText = "AÑADIR",
  buttonVariant = "solid"
}: ProductCardProps) {
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Agregamos al estado global
    addToCart(product);
    
    // 2. NUEVO: Disparamos la notificación de éxito
    toast.success('Agregado al carrito', {
      description: product.title,
      style: {
        borderColor: '#42938a',
      }
    });
  };

  const productUrl = `/productos/${product.slug}`;

  return (
    <div className="bg-[#16191c] border border-gray-800 rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-[#42938a] transition-all duration-300 hover:shadow-[0_0_20px_rgba(66,147,138,0.15)] relative h-full">
      
      {/* ÁREA CLICABLE: IMAGEN */}
      <Link href={productUrl} className="w-full aspect-square bg-white relative flex items-center justify-center p-6 border-b border-gray-800 cursor-pointer">
        {product.isNew && (
          <span className="absolute top-3 left-3 bg-[#42938a] text-black text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider z-10 shadow-md">
            Nuevo
          </span>
        )}
        <div className="relative w-full h-full group-hover:scale-110 transition-transform duration-500">
          <Image 
            src={product.imageSrc} 
            alt={product.title} 
            fill
            className="object-contain filter drop-shadow-md"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        </div>
      </Link>

      {/* ÁREA DE CONTENIDO */}
      <div className="p-5 flex flex-col flex-1">
        
        {/* ÁREA CLICABLE: TÍTULO */}
        <Link href={productUrl} className="flex flex-col group/text cursor-pointer">
          <span className="text-[11px] font-bold text-[#42938a] tracking-widest uppercase">
            {product.category}
          </span>
          <h3 className="text-base font-extrabold text-white tracking-wide mt-1 line-clamp-1 group-hover/text:text-[#42938a] transition-colors">
            {product.title}
          </h3>
          <p className="text-gray-400 text-xs mt-2 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </Link>

        {/* ACCIONES Y PRECIO */}
        <div className="mt-6 pt-4 border-t border-gray-800 flex items-center justify-between">
          <div className="flex flex-col">
            
            {/* Lógica de descuento psicológico (CRO) - FORZADO A es-CO */}
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <span className="text-xs text-gray-500 line-through font-bold">
                ${product.compareAtPrice.toLocaleString('es-CO')}
              </span>
            )}
            
            <div className="flex items-baseline gap-1">
              {/* Precio Principal - FORZADO A es-CO */}
              <span className="text-xl font-black text-white leading-none">
                ${product.price.toLocaleString('es-CO')}
              </span>
              <span className="text-[10px] text-[#42938a] font-bold tracking-widest">COP</span>
            </div>
          </div>

          {/* BOTÓN INDEPENDIENTE */}
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
              product.stock === 0 
                ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                : buttonVariant === 'solid'
                  ? 'bg-[#42938a] text-black hover:bg-[#357a72]'
                  : 'bg-transparent border border-[#42938a] text-[#42938a] hover:bg-[#42938a] hover:text-black'
            }`}
            aria-label={`Agregar ${product.title} al carrito`}
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden sm:inline">
              {product.stock === 0 ? 'AGOTADO' : buttonText}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}