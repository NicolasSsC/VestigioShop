"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useHydratedCart } from '@/hooks/useHydratedCart';
import { useUIStore } from '@/store/useUIStore';

export default function CartDrawer() {
  const { hydratedItems: cart, cartTotal: totalPrice, totalItems } = useHydratedCart();
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  
  const isCartOpen = useUIStore((state) => state.isCartOpen);
  const closeCart = useUIStore((state) => state.closeCart);
  
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { 
      document.body.style.overflow = 'unset'; 
    };
  }, [isCartOpen]);

  // SOLUCIÓN ARQUITECTURA: Derivamos el total y la cantidad desde el estado reactivo 'cart'
  
  

  if (!mounted) return null;

  return (
    <>
      {isCartOpen && (
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 transition-opacity animate-fadeIn cursor-pointer"
          onClick={closeCart}
          aria-hidden="true"
        />
      )}

      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-[#0f1113] border-l border-gray-800 z-50 transform transition-transform duration-300 ease-in-out flex flex-col shadow-2xl ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-drawer-title"
      >
        <div className="px-6 py-5 border-b border-gray-800 flex items-center justify-between bg-[#16191c]">
          <h2 id="cart-drawer-title" className="text-lg font-extrabold text-white flex items-center tracking-wider">
            <ShoppingBag className="w-5 h-5 mr-3 text-[#42938a]" />
            TU CARRITO ({totalItems})
          </h2>
          <button 
            onClick={closeCart}
            className="p-2 rounded-full text-gray-400 hover:text-[#42938a] hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-[#42938a]"
            aria-label="Cerrar carrito"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-20 h-20 bg-[#16191c] rounded-full flex items-center justify-center border border-gray-800 text-gray-600">
                <ShoppingBag className="w-10 h-10" />
              </div>
              <p className="text-gray-300 font-bold text-lg">Tu carrito está vacío</p>
              <p className="text-gray-500 text-sm max-w-xs">
                Explora el catálogo y equipa tu setup con periféricos de alto rendimiento.
              </p>
              <button 
                onClick={closeCart}
                className="mt-2 px-6 py-3 border border-[#42938a] text-[#42938a] rounded-full text-xs font-bold tracking-wider hover:bg-[#42938a] hover:text-black transition-colors"
              >
                EXPLORAR CATÁLOGO
              </button>
            </div>
          ) : (
            <ul className="space-y-4">
              {cart.map((item) => (
                <li key={item.id} className="flex gap-4 p-4 bg-[#16191c] border border-gray-800/80 rounded-2xl relative group">
                  <div className="w-20 h-20 bg-[#0f1113] rounded-xl border border-gray-800 p-2 flex-shrink-0 relative flex items-center justify-center overflow-hidden">
                    <Image 
                      src={item.imageSrc} 
                      alt={item.title} 
                      fill
                      className="object-contain p-1 filter drop-shadow-md"
                      sizes="80px"
                    />
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="text-xs font-bold text-gray-200 line-clamp-2 uppercase tracking-wide">
                        {item.title}
                      </h3>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-500 hover:text-red-400 transition-colors p-1"
                        aria-label={`Eliminar ${item.title}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center bg-[#0f1113] border border-gray-700 rounded-lg">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1.5 text-gray-400 hover:text-[#42938a] transition-colors"
                          aria-label="Disminuir cantidad"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold w-7 text-center text-white">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 text-gray-400 hover:text-[#42938a] transition-colors"
                          aria-label="Aumentar cantidad"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* CRO: Forzamos la localización a es-CO */}
                      <span className="font-extrabold text-[#42938a] text-sm">
                        ${(item.price * item.quantity).toLocaleString('es-CO')}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t border-gray-800 bg-[#16191c] p-6 space-y-4">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-400 font-medium">Subtotal estimado</span>
              {/* CRO: Forzamos la localización a es-CO */}
              <span className="text-xl font-extrabold text-white">
                ${totalPrice.toLocaleString('es-CO')} COP
              </span>
            </div>
            
            <Link 
              href="/checkout"
              onClick={closeCart}
              className="w-full flex items-center justify-center bg-[#42938a] text-black py-4 rounded-xl font-extrabold text-sm tracking-wider hover:bg-[#33746d] transition-all shadow-[0_0_20px_rgba(66,147,138,0.2)]"
            >
              FINALIZAR COMPRA
            </Link>
            
            <p className="text-[11px] text-center text-gray-500">
              Impuestos y costos de envío calculados en el proceso de pago.
            </p>
          </div>
        )}
      </div>
    </>
  );
}