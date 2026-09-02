"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { 
  ShieldCheck, 
  Lock, 
  ChevronLeft, 
  Truck, 
  ShoppingBag, 
  Sparkles, 
  CheckCircle2,
  PackageCheck
} from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import CheckoutForm from "@/components/CheckoutForm";

const FREE_SHIPPING_THRESHOLD = 200000;
const STANDARD_SHIPPING_COST = 15000;

export default function CheckoutPage() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  
  const cart = useCartStore((state) => state.cart);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0f1113] flex items-center justify-center text-[#42938a]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-[#42938a] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-black uppercase tracking-widest text-gray-400">Iniciando pasarela segura...</span>
        </div>
      </div>
    );
  }

  // Cálculos Financieros y de Envío
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingCost = isFreeShipping ? 0 : STANDARD_SHIPPING_COST;
  const total = subtotal + shippingCost;
  const amountNeededForFreeShipping = FREE_SHIPPING_THRESHOLD - subtotal;

  // ESTADO VACÍO (EMPTY STATE)
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#0f1113] flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#42938a]/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-md bg-[#16191c] border border-gray-800 rounded-3xl p-10 shadow-2xl flex flex-col items-center">
          <div className="w-20 h-20 bg-[#0f1113] border border-gray-800 rounded-3xl flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(66,147,138,0.1)]">
            <ShoppingBag className="w-10 h-10 text-[#42938a]" />
          </div>

          <h1 className="text-2xl font-black text-white uppercase tracking-tight mb-2">
            Tu Carrito Está Vacío
          </h1>
          
          <p className="text-gray-400 text-sm mb-8 leading-relaxed">
            No tienes productos añadidos para procesar el pago. Explora nuestro catálogo y arma tu setup definitivo.
          </p>

          <Link 
            href="/productos"
            className="w-full py-3.5 bg-[#42938a] hover:bg-[#357a72] text-black font-black uppercase text-xs tracking-widest rounded-xl transition-all shadow-[0_0_15px_rgba(66,147,138,0.3)] text-center"
          >
            Explorar Catálogo
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f1113] text-white flex flex-col">
      
      {/* =====================================================================
          HEADER MINIMALISTA DE CHECKOUT (SIN DISTRACCIONES)
          ===================================================================== */}
      <header className="w-full border-b border-gray-800/80 bg-[#16191c]/90 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="text-white font-black text-2xl tracking-wider flex items-center gap-1 group">
            <span className="w-9 h-9 rounded-xl bg-[#42938a] text-black flex items-center justify-center font-black text-xl shadow-[0_0_15px_rgba(66,147,138,0.35)] group-hover:scale-105 transition-transform">
              V
            </span>
            <span className="tracking-tighter ml-1">VESTIGIO</span>
          </Link>

          <div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase tracking-widest bg-[#0f1113] border border-gray-800 px-3.5 py-1.5 rounded-full">
            <Lock className="w-3.5 h-3.5 text-[#42938a]" />
            <span>Pago Seguro SSL 256-Bit</span>
          </div>
        </div>
      </header>

      {/* =====================================================================
          MAIN CHECKOUT LAYOUT (GRID 12 COLUMNAS EN DESKTOP)
          ===================================================================== */}
      <main className="max-w-7xl mx-auto px-6 py-10 w-full flex-1">
        
        {/* Botón de retroceso */}
        <button 
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-gray-400 hover:text-[#42938a] transition-colors mb-8 text-xs font-bold uppercase tracking-widest cursor-pointer group"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> 
          Volver a la tienda
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* =================================================================
              COLUMNA IZQUIERDA (7 COLUMNAS): FORMULARIO DE PAGO Y ENVÍO
              ================================================================= */}
          <div className="lg:col-span-7 w-full">
            <CheckoutForm totalAmount={total} />
          </div>

          {/* =================================================================
              COLUMNA DERECHA (5 COLUMNAS): RESUMEN DEL PEDIDO (STICKY)
              ================================================================= */}
          <div className="lg:col-span-5 w-full">
            <div className="lg:sticky lg:top-28 space-y-6">
              
              {/* TARJETA PRINCIPAL DEL RESUMEN */}
              <div className="bg-[#16191c] border border-gray-800 rounded-3xl p-6 md:p-8 shadow-2xl">
                
                {/* Header del Resumen */}
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-800/80">
                  <h2 className="text-base font-black uppercase tracking-wider text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#42938a]" />
                    Resumen del Pedido
                  </h2>
                  <span className="text-xs font-mono font-bold text-gray-400 bg-[#0f1113] border border-gray-800 px-2.5 py-1 rounded-lg">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)} items
                  </span>
                </div>

                {/* LISTA MINIMALISTA DE PRODUCTOS */}
                <div className="overflow-y-auto max-h-[300px] pr-1 space-y-3 mb-6 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
                  {cart.map((item) => (
                    <div 
                      key={item.id} 
                      className="flex gap-3.5 items-center bg-[#0f1113] p-3 rounded-2xl border border-gray-800/70 hover:border-gray-700 transition-colors"
                    >
                      {/* Imagen Thumbnail con fondo blanco */}
                      <div className="w-14 h-14 bg-white rounded-xl p-1 relative flex-shrink-0 flex items-center justify-center overflow-hidden">
                        <Image 
                          src={item.imageSrc} 
                          alt={item.title} 
                          fill 
                          className="object-contain p-0.5" 
                          sizes="56px"
                        />
                        <span className="absolute -top-1.5 -right-1.5 bg-[#42938a] text-black text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#0f1113] shadow-sm">
                          {item.quantity}
                        </span>
                      </div>
                      
                      {/* Información del Producto */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-gray-200 line-clamp-1 uppercase tracking-wide">
                          {item.title}
                        </h4>
                        <p className="text-[10px] text-gray-500 mt-0.5 uppercase tracking-widest font-mono">
                          {item.category}
                        </p>
                      </div>
                      
                      {/* Precio */}
                      <div className="text-right flex-shrink-0">
                        <span className="text-xs sm:text-sm font-bold text-white font-mono">
                          ${(item.price * item.quantity).toLocaleString("es-CO")}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* BANNER DINÁMICO DE ENVÍO GRATIS */}
                <div className="mb-6 p-3 rounded-2xl bg-[#0f1113] border border-gray-800/80 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#42938a]/10 border border-[#42938a]/20 flex items-center justify-center flex-shrink-0">
                    <Truck className="w-4 h-4 text-[#42938a]" />
                  </div>
                  <div className="flex-1 text-xs">
                    {isFreeShipping ? (
                      <p className="text-[#42938a] font-bold">
                        ¡Calificas para <span className="uppercase">Envío Gratis</span> a toda Colombia!
                      </p>
                    ) : (
                      <p className="text-gray-400">
                        Agrega <span className="text-white font-bold font-mono">${amountNeededForFreeShipping.toLocaleString("es-CO")} COP</span> más para desbloquear <span className="text-[#42938a] font-bold">Envío Gratis</span>.
                      </p>
                    )}
                  </div>
                </div>

                {/* DESGLOSE DE COSTOS */}
                <div className="border-t border-gray-800/80 pt-5 space-y-3 text-xs">
                  <div className="flex justify-between text-gray-400 font-medium">
                    <span>Subtotal</span>
                    <span className="text-white font-mono font-bold">${subtotal.toLocaleString("es-CO")} COP</span>
                  </div>

                  <div className="flex justify-between text-gray-400 font-medium items-center">
                    <span>Costo de Envío</span>
                    {isFreeShipping ? (
                      <span className="text-[#42938a] font-black uppercase tracking-wider text-[11px] bg-[#42938a]/10 border border-[#42938a]/30 px-2 py-0.5 rounded-full">
                        ¡Gratis!
                      </span>
                    ) : (
                      <span className="text-white font-mono font-bold">${shippingCost.toLocaleString("es-CO")} COP</span>
                    )}
                  </div>
                  
                  {/* TOTAL FINAL */}
                  <div className="flex justify-between items-baseline text-white border-t border-gray-800 mt-4 pt-5">
                    <div className="flex flex-col">
                      <span className="text-xs font-black text-gray-400 uppercase tracking-widest">Total a Pagar</span>
                      <span className="text-[10px] text-gray-500">Impuestos y envío incluidos</span>
                    </div>

                    <div className="flex items-baseline gap-1.5">
                      <span className="text-3xl font-black text-[#42938a] tracking-tight font-mono">
                        ${total.toLocaleString("es-CO")}
                      </span>
                      <span className="text-xs text-[#42938a] font-bold">COP</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* BADGES DE CONFIANZA Y GARANTÍA */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#16191c] border border-gray-800/80 rounded-2xl p-3.5 flex items-center gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-[#42938a] flex-shrink-0" />
                  <div className="text-[11px] leading-tight">
                    <p className="font-bold text-white uppercase tracking-wider">Garantía Real</p>
                    <p className="text-gray-500">1 año en hardware</p>
                  </div>
                </div>

                <div className="bg-[#16191c] border border-gray-800/80 rounded-2xl p-3.5 flex items-center gap-2.5">
                  <PackageCheck className="w-5 h-5 text-[#42938a] flex-shrink-0" />
                  <div className="text-[11px] leading-tight">
                    <p className="font-bold text-white uppercase tracking-wider">Envío Seguro</p>
                    <p className="text-gray-500">100% asegurado</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </main>
    </div>
  );
}