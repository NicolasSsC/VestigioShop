"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, Package, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';

export default function CheckoutSuccessPage() {
  const clearCart = useCartStore((state) => state.clearCart);
  const [orderNumber, setOrderNumber] = useState('');

  // Limpiamos el carrito de forma silenciosa solo cuando ya cargó esta página
  useEffect(() => {
    clearCart();
    // Generamos el número de orden solo en el cliente para evitar errores de hidratación
    setOrderNumber(`VST-${Math.floor(100000 + Math.random() * 900000)}`);
  }, [clearCart]);

  return (
    <div className="min-h-screen bg-[#0f1113] flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
      
      {/* Efecto de luz de fondo (glow) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#42938a]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center max-w-lg">
        {/* Ícono de éxito */}
        <div className="w-24 h-24 bg-[#42938a]/10 rounded-full flex items-center justify-center mb-8 border border-[#42938a]/20">
          <CheckCircle2 className="w-12 h-12 text-[#42938a]" />
        </div>

        <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
          ¡Pago <span className="text-[#42938a]">Exitoso</span>!
        </h1>
        
        <p className="text-gray-400 text-lg mb-8 leading-relaxed">
          Tu pedido ha sido confirmado. Estamos preparando tus periféricos para que domines el juego lo antes posible.
        </p>

        {/* Tarjeta de Resumen de Orden */}
        <div className="bg-[#16191c] border border-gray-800 rounded-2xl p-6 w-full mb-8 flex items-center justify-between">
          <div className="text-left">
            <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-1">Número de orden</p>
            {/* Mostramos un loader pequeñito mientras se genera el número */}
            <p className="text-white font-black text-lg tracking-wider">
              {orderNumber || 'Generando...'}
            </p>
          </div>
          <div className="w-12 h-12 bg-[#0f1113] border border-gray-800 rounded-xl flex items-center justify-center">
            <Package className="w-6 h-6 text-[#42938a]" />
          </div>
        </div>

        {/* CTA para regresar al catálogo */}
        <Link 
          href="/productos"
          className="group flex items-center gap-2 bg-white text-black px-8 py-4 rounded-xl font-black uppercase tracking-widest hover:bg-gray-200 transition-all"
        >
          Seguir comprando
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}