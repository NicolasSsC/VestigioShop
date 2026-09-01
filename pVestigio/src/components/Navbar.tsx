"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useUIStore } from '@/store/useUIStore'; // 👈 IMPORTACIÓN CORRECTA DEL UI STORE
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  
  // 1. Extraemos los DATOS del carrito
  const cart = useCartStore((state) => state.cart);
  
  // 2. Extraemos la FUNCIÓN VISUAL desde el UI Store
  const openCart = useUIStore((state) => state.openCart); 
  
  // Calculamos la cantidad total de productos para la burbuja (badge)
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Cierra el menú automáticamente si el usuario cambia de página
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const closeMenu = () => setIsMobileMenuOpen(false);

  // CRO: Ocultamos el Navbar entero en el Checkout
  if (pathname.startsWith('/checkout')) {
    return null;
  }

  return (
    <nav className="w-full bg-[#16191c] border-b border-gray-800 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" className="text-[#42938a] font-black text-2xl tracking-wider flex items-center z-50" onClick={closeMenu}>
          <span className="text-3xl mr-1">V</span> VESTIGIO
        </Link>

        {/* ENLACES DESKTOP (Se ocultan en móvil con 'hidden md:flex') */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/productos" className="text-sm font-bold text-gray-300 hover:text-[#42938a] uppercase tracking-widest transition-colors">Catálogo</Link>
          <Link href="/productos?category=teclados" className="text-sm font-bold text-gray-300 hover:text-[#42938a] uppercase tracking-widest transition-colors">Teclados</Link>
          <Link href="/productos?category=ratones" className="text-sm font-bold text-gray-300 hover:text-[#42938a] uppercase tracking-widest transition-colors">Ratones</Link>
          <Link href="/productos?category=audio" className="text-sm font-bold text-gray-300 hover:text-[#42938a] uppercase tracking-widest transition-colors">Audio</Link>
        </div>

        {/* ICONOS DERECHA (Carrito + Menú Hamburguesa) */}
        <div className="flex items-center gap-4 z-50">
          
          {/* BOTÓN CARRITO (Visible en Desktop y Móvil) */}
          <button 
            onClick={openCart} 
            className="relative p-2 text-gray-400 hover:text-[#42938a] transition-colors cursor-pointer"
            aria-label="Abrir carrito"
          >
            <ShoppingCart className="w-6 h-6" />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 bg-[#42938a] text-black text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-[#16191c]">
                {totalItems}
              </span>
            )}
          </button>

          {/* BOTÓN HAMBURGUESA (Solo visible en Móvil con 'md:hidden') */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-400 hover:text-[#42938a] transition-colors cursor-pointer"
            aria-label="Menú principal"
          >
            {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* CORTINA MÓVIL DESPLEGABLE */}
      <div 
        className={`md:hidden absolute top-20 left-0 w-full bg-[#0f1113] border-b border-gray-800 transition-all duration-300 ease-in-out overflow-hidden shadow-2xl ${
          isMobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col px-6 py-4 space-y-2">
          <Link href="/productos" onClick={closeMenu} className="block py-4 text-lg font-black text-white uppercase tracking-widest border-b border-gray-800/50 hover:text-[#42938a] transition-colors">
            Todo el Catálogo
          </Link>
          <Link href="/productos?category=teclados" onClick={closeMenu} className="block py-4 text-lg font-black text-gray-400 hover:text-[#42938a] uppercase tracking-widest border-b border-gray-800/50 transition-colors">
            Teclados
          </Link>
          <Link href="/productos?category=ratones" onClick={closeMenu} className="block py-4 text-lg font-black text-gray-400 hover:text-[#42938a] uppercase tracking-widest border-b border-gray-800/50 transition-colors">
            Ratones
          </Link>
          <Link href="/productos?category=audio" onClick={closeMenu} className="block py-4 text-lg font-black text-gray-400 hover:text-[#42938a] uppercase tracking-widest border-b border-gray-800/50 transition-colors">
            Audio
          </Link>
          <Link href="/productos?category=alfombrillas" onClick={closeMenu} className="block py-4 text-lg font-black text-gray-400 hover:text-[#42938a] uppercase tracking-widest transition-colors">
            Alfombrillas
          </Link>
        </div>
      </div>
    </nav>
  );
}