import Link from 'next/link';
import { ShoppingCart, User } from 'lucide-react';
export default function Navbar() {
  return (
    <header className="w-full border-b border-gray-800 bg-[#0f1113]/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logotipo */}
        <div className="flex items-center gap-3">
          <div className="text-[#42938a] font-bold text-2xl tracking-wider flex items-center">
            {/*poner ícono de logo o la V estilizada */}
            <span className="text-3xl mr-1">V</span> VESTIGIO
          </div>
        </div>

        {/* Enlaces de Navegación */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <Link href="/" className="text-[#42938a] transition-colors">Inicio</Link>
          <Link href="/productos" className="hover:text-[#42938a] transition-colors">Productos</Link>
          <Link href="/categorias" className="hover:text-[#42938a] transition-colors">Categorías</Link>
          <Link href="/sobre-nosotros" className="hover:text-[#42938a] transition-colors">Sobre Nosotros</Link>
          <Link href="/contacto" className="hover:text-[#42938a] transition-colors">Contacto</Link>
        </nav>

        {/* Iconos de Acceso (Carrito y Usuario) */}
        <div className="flex items-center gap-6">
          <div className="relative cursor-pointer">
            <ShoppingCart className="w-6 h-6 text-gray-300 hover:text-[#42938a] transition-colors" />
            <span className="absolute -top-2 -right-2 bg-[#42938a] text-black text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
              2
            </span>
          </div>
          <div className="cursor-pointer">
            <User className="w-6 h-6 text-gray-300 hover:text-[#42938a] transition-colors" />
          </div>
        </div>

      </div>
    </header>
  );
}