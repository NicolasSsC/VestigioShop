"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Lock, Loader2 } from 'lucide-react';
import { useHydratedCart } from '@/hooks/useHydratedCart';
import { toast } from 'sonner';

export default function OrderSummary() {
  const [mounted, setMounted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const router = useRouter();
  const { hydratedItems: cart, cartTotal: totalPrice } = useHydratedCart();

  useEffect(() => {
    setMounted(true);
  }, []);

  
  const costoEnvio: number = 0; 

  // FUNCIÓN CORREGIDA (Sin duplicados)
  const handleCheckout = () => {
    setIsProcessing(true);
    
    setTimeout(() => {
      toast.success('Pago procesado correctamente');
      router.push('/checkout/success');
    }, 2000);
  };

  if (!mounted) {
    return <div className="animate-pulse h-64 bg-gray-800/20 rounded-2xl w-full"></div>;
  }

  return (
    <div className="flex flex-col h-full w-full">
      
      {/* LISTA DE PRODUCTOS */}
      <div className="flex-1 overflow-y-auto max-h-[350px] pr-2 space-y-4 mb-6 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
        {cart.map((item) => (
          <div key={item.id} className="flex gap-4 items-center bg-[#0f1113] p-3 rounded-xl border border-gray-800/50">
            <div className="w-16 h-16 bg-white rounded-lg p-1 relative flex-shrink-0">
              <Image 
                src={item.imageSrc} 
                alt={item.title} 
                fill 
                className="object-contain" 
                sizes="64px"
              />
              <span className="absolute -top-2 -right-2 bg-[#42938a] text-black text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#0f1113]">
                {item.quantity}
              </span>
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold text-gray-200 line-clamp-1 uppercase tracking-wider">
                {item.title}
              </h4>
              <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-widest">{item.category}</p>
            </div>
            
            <div className="text-right flex-shrink-0">
              <span className="text-sm font-bold text-white">
                ${(item.price * item.quantity).toLocaleString('es-CO')}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* DESGLOSE DE COSTOS */}
      <div className="border-t border-gray-800 pt-6 space-y-4">
        <div className="flex justify-between text-gray-400 text-sm font-medium">
          <span>Subtotal</span>
          <span>${totalPrice.toLocaleString('es-CO')}</span>
        </div>
        <div className="flex justify-between text-gray-400 text-sm font-medium">
          <span>Costo de envío</span>
          {costoEnvio === 0 ? (
            <span className="text-[#42938a] font-bold uppercase tracking-widest text-xs">¡Gratis!</span>
          ) : (
            <span>${costoEnvio.toLocaleString('es-CO')}</span>
          )}
        </div>
        
        {/* TOTAL FINAL */}
        <div className="flex justify-between items-end text-white border-t border-gray-800 mt-4 pt-6">
          <span className="text-base font-bold text-gray-400 uppercase tracking-widest">Total</span>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black leading-none">
              ${(totalPrice + costoEnvio).toLocaleString('es-CO')}
            </span>
            <span className="text-xs text-[#42938a] font-bold">COP</span>
          </div>
        </div>
      </div>

      {/* BOTÓN DE ACCIÓN (CTA) ACTUALIZADO */}
      <button 
        onClick={handleCheckout}
        disabled={isProcessing}
        className={`w-full font-black tracking-widest py-4 rounded-xl mt-8 transition-all flex items-center justify-center gap-2 ${
          isProcessing 
            ? 'bg-[#357a72] text-black/70 cursor-not-allowed' 
            : 'bg-[#42938a] text-black hover:bg-[#357a72] shadow-[0_0_20px_rgba(66,147,138,0.15)] cursor-pointer'
        }`}
      >
        {isProcessing ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            PROCESANDO...
          </>
        ) : (
          <>
            <ShieldCheck className="w-5 h-5" />
            PAGAR AHORA
          </>
        )}
      </button>

      <p className="text-[11px] text-gray-500 text-center mt-4 flex items-center justify-center gap-1.5 font-medium">
        <Lock className="w-3 h-3" /> Transacción encriptada de extremo a extremo
      </p>

    </div>
  );
}