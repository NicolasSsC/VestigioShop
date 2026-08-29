"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // Extraemos las acciones del store de Zustand de manera limpia y tipada
  const getTotalItems = useCartStore((state) => state.getTotalItems);
  const toggleCart = useCartStore((state) => state.toggleCart);

  // Garantizar hidratación correcta del lado del cliente
  useEffect(() => {
    setMounted(true);
  }, []);

  // Bloquear el scroll del body cuando el menú móvil está activo
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const totalItems = mounted ? getTotalItems() : 0;

  const navLinks = [
    { name: 'Inicio', href: '/' },
    { name: 'Productos', href: '/productos' },
    { name: 'Categorías', href: '/categorias' },
    { name: 'Sobre Nosotros', href: '/sobre-nosotros' },
    { name: 'Contacto', href: '/contacto' },
  ];

  return (
    <header className="w-full border-b border-gray-800 bg-[#0f1113]/90 backdrop-blur-md sticky top-0 z-40 transition-all">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logotipo Corporativo */}
        <div className="flex items-center gap-3 z-50">
          <Link href="/" className="text-[#42938a] font-black text-2xl tracking-wider flex items-center group">
            <span className="text-3xl mr-1 transform group-hover:scale-110 transition-transform">V</span> VESTIGIO
          </Link>
        </div>

        {/* Navegación Desktop */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-300">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="hover:text-[#42938a] transition-colors tracking-wide"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Iconos de Acceso y Acciones */}
        <div className="flex items-center gap-4 md:gap-6 z-50">
          
          {/* Botón del Carrito (Abre el CartDrawer global) */}
          <button 
            onClick={toggleCart}
            className="relative p-2 cursor-pointer text-gray-300 hover:text-[#42938a] transition-colors focus:outline-none"
            aria-label="Abrir carrito de compras"
          >
            <ShoppingCart className="w-6 h-6" />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 bg-[#42938a] text-black text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(66,147,138,0.5)] animate-pulse">
                {totalItems}
              </span>
            )}
          </button>
          
          {/* Botón de Usuario */}
          <button 
            className="hidden md:block p-2 cursor-pointer text-gray-300 hover:text-[#42938a] transition-colors focus:outline-none"
            aria-label="Ir al perfil de usuario"
          >
            <User className="w-6 h-6" />
          </button>
          
          {/* Botón Menú Hamburguesa Mobile */}
          <button 
            className="md:hidden p-2 text-gray-300 hover:text-[#42938a] transition-colors focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú principal"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Menú Drawer Mobile Desplegable */}
      <div 
        className={`fixed inset-0 bg-[#0f1113] z-40 transform transition-transform duration-300 ease-in-out md:hidden flex flex-col pt-28 px-8 ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={!isMobileMenuOpen}
      >
        <nav className="flex flex-col gap-6 text-xl font-bold text-gray-200">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="hover:text-[#42938a] transition-colors pb-3 border-b border-gray-800/80 flex items-center justify-between"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
              <span className="text-xs text-[#42938a] font-normal">Explorar</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}