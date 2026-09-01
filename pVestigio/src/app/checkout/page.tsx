"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Lock, ChevronLeft } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import CheckoutForm from '@/components/CheckoutForm';
import OrderSummary from '@/components/OrderSummary'; // Las importaciones van aquí arriba 🚀

export default function CheckoutPage() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  
  const cart = useCartStore((state) => state.cart);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-[#0f1113] flex items-center justify-center text-[#42938a] animate-pulse">Cargando pasarela segura...</div>;
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#0f1113] flex flex-col items-center justify-center text-center px-6">
        <ShieldCheck className="w-16 h-16 text-gray-700 mb-6" />
        <h1 className="text-2xl font-black text-white mb-2 uppercase tracking-wide">Tu carrito está vacío</h1>
        <p className="text-gray-400 mb-8 max-w-md">No puedes procesar un pago sin productos. Regresa a la tienda y equipa tu setup.</p>
        <Link 
          href="/productos"
          className="px-8 py-3 bg-[#42938a] text-black font-extrabold rounded-xl hover:bg-[#357a72] transition-colors"
        >
          VOLVER AL CATÁLOGO
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f1113] text-white">
      {/* HEADER MINIMALISTA */}
      <header className="w-full border-b border-gray-800 bg-[#16191c]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="text-[#42938a] font-black text-2xl tracking-wider flex items-center">
            <span className="text-3xl mr-1">V</span> VESTIGIO
          </Link>
          <div className="flex items-center gap-2 text-gray-500">
            <Lock className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest hidden sm:inline">Pago Seguro 256-bit</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10 w-full">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-500 hover:text-[#42938a] transition-colors mb-8 text-sm font-bold uppercase tracking-widest"
        >
          <ChevronLeft className="w-4 h-4" /> Volver
        </button>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          {/* COLUMNA IZQUIERDA: Formulario */}
          <div className="flex-1 lg:w-2/3">
            <div className="bg-[#16191c] border border-gray-800 rounded-3xl p-6 md:p-10">
              <CheckoutForm />
            </div>
          </div>

          {/* COLUMNA DERECHA: Resumen de la Orden */}
          <div className="w-full lg:w-[400px] xl:w-[450px]">
            <div className="sticky top-10">
              <h2 className="text-2xl font-black uppercase tracking-tight text-white mb-6 border-b border-gray-800 pb-4">
                Resumen
              </h2>
              {/* Le quitamos el border-dashed y el flex-center para que el componente se expanda bien */}
              <div className="bg-[#16191c] border border-gray-800 rounded-3xl p-6 md:p-8">
                <OrderSummary /> {/* Renderizamos el componente aquí dentro */}
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}