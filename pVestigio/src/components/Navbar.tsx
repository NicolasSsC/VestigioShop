"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ShoppingCart, User } from 'lucide-react';
import { useHydratedCart } from '@/hooks/useHydratedCart';
import { useUIStore } from '@/store/useUIStore';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import SearchBar from '@/components/SearchBar';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  
  const { totalItems } = useHydratedCart();
  const openCart = useUIStore((state) => state.openCart); 

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const closeMenu = () => setIsMobileMenuOpen(false);

  // Ocultamos el navbar en el checkout (opcional, dependiendo de tu diseño)
  if (pathname.startsWith('/checkout')) {
    return null;
  }

  return (
    <nav className="w-full bg-white dark:bg-[#16191c] border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 shadow-md transition-colors duration-300 relative">
      {/* HEADER PRINCIPAL */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4 lg:gap-8">
        
        {/* LOGO */}
        <Link href="/" className="text-[#42938a] font-black text-2xl tracking-wider flex items-center z-50 flex-shrink-0" onClick={closeMenu}>
          <span className="text-3xl mr-1">V</span> VESTIGIO
        </Link>

        {/* SEARCH BAR DESKTOP (Centro) */}
        <div className="hidden md:block flex-1 max-w-xl mx-auto">
          <SearchBar />
        </div>

        {/* ENLACES DESKTOP */}
        <div className="hidden lg:flex items-center gap-6 flex-shrink-0">
          <Link href="/productos" className="text-xs font-bold text-gray-600 dark:text-gray-300 hover:text-[#42938a] dark:hover:text-[#42938a] uppercase tracking-widest transition-colors">Catálogo</Link>
          <Link href="/productos?category=teclados" className="text-xs font-bold text-gray-600 dark:text-gray-300 hover:text-[#42938a] dark:hover:text-[#42938a] uppercase tracking-widest transition-colors">Teclados</Link>
          <Link href="/productos?category=ratones" className="text-xs font-bold text-gray-600 dark:text-gray-300 hover:text-[#42938a] dark:hover:text-[#42938a] uppercase tracking-widest transition-colors">Ratones</Link>
        </div>

        {/* ICONOS DERECHA */}
        <div className="flex items-center gap-3 sm:gap-4 z-50 flex-shrink-0">
          
          <div className="hidden md:block">
             <ThemeToggle />
          </div>

          {/* BOTÓN LOGIN / USUARIO */}
          <Link 
            href="/login" 
            className="p-2 text-gray-600 dark:text-gray-400 hover:text-[#42938a] dark:hover:text-[#42938a] transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#42938a] rounded-full"
            aria-label="Iniciar Sesión"
          >
            <User className="w-6 h-6" />
          </Link>

          {/* BOTÓN CARRITO */}
          <button 
            onClick={openCart} 
            className="relative p-2 text-gray-600 dark:text-gray-400 hover:text-[#42938a] dark:hover:text-[#42938a] transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#42938a] rounded-full"
            aria-label="Abrir carrito"
          >
            <ShoppingCart className="w-6 h-6" />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 bg-[#42938a] text-black text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-white dark:border-[#16191c] transition-colors shadow-sm">
                {totalItems}
              </span>
            )}
          </button>

          {/* BOTÓN HAMBURGUESA (Móvil) */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-600 dark:text-gray-400 hover:text-[#42938a] dark:hover:text-[#42938a] transition-colors cursor-pointer rounded-full focus:outline-none focus:ring-2 focus:ring-[#42938a]"
            aria-label="Menú principal"
          >
            {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* SEARCH BAR MÓVIL (Bajo el Header) */}
      <div className="md:hidden w-full px-4 pb-4 bg-white dark:bg-[#16191c]">
        <SearchBar />
      </div>

      {/* CORTINA MÓVIL DESPLEGABLE */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full bg-white dark:bg-[#0f1113] border-b border-gray-200 dark:border-gray-800 transition-all duration-300 ease-in-out shadow-2xl overflow-hidden ${
          isMobileMenuOpen ? 'max-h-[500px] opacity-100 border-t' : 'max-h-0 opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col px-6 py-4 space-y-2">
          {/* Botón de tema en móvil */}
          <div className="py-2 border-b border-gray-100 dark:border-gray-800/50 flex justify-between items-center">
            <span className="text-sm font-bold text-gray-600 dark:text-gray-400 uppercase">Tema</span>
            <ThemeToggle />
          </div>

          <Link href="/productos" onClick={closeMenu} className="block py-4 text-lg font-black text-black dark:text-white uppercase tracking-widest border-b border-gray-100 dark:border-gray-800/50 hover:text-[#42938a] transition-colors">
            Todo el Catálogo
          </Link>
          <Link href="/productos?category=teclados" onClick={closeMenu} className="block py-4 text-lg font-black text-gray-600 dark:text-gray-400 hover:text-[#42938a] uppercase tracking-widest border-b border-gray-100 dark:border-gray-800/50 transition-colors">
            Teclados
          </Link>
          <Link href="/productos?category=ratones" onClick={closeMenu} className="block py-4 text-lg font-black text-gray-600 dark:text-gray-400 hover:text-[#42938a] uppercase tracking-widest border-b border-gray-100 dark:border-gray-800/50 transition-colors">
            Ratones
          </Link>
          <Link href="/productos?category=audio" onClick={closeMenu} className="block py-4 text-lg font-black text-gray-600 dark:text-gray-400 hover:text-[#42938a] uppercase tracking-widest border-b border-gray-100 dark:border-gray-800/50 transition-colors">
            Audio
          </Link>
        </div>
      </div>
    </nav>
  );
}
