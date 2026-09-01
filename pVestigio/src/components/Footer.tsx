"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
// 1. CORRECCIÓN: Quitamos las redes sociales de aquí. Solo dejamos los íconos genéricos.
import { ShieldCheck, CreditCard, Truck } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();

  if (pathname.startsWith('/checkout')) {
    return null;
  }

  return (
    <footer className="bg-[#16191c] border-t border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        
        {/* GRID PRINCIPAL */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Columna 1: Marca */}
          <div className="flex flex-col">
            <Link href="/" className="text-[#42938a] font-black text-2xl tracking-wider flex items-center mb-6">
              <span className="text-3xl mr-1">V</span> VESTIGIO
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Equipamiento de alto rendimiento para jugadores exigentes. Domina el juego con tecnología de precisión diseñada para la victoria.
            </p>
            <div className="flex gap-4 text-gray-500">
              {/* 2. Usamos nuestros propios componentes SVG de redes sociales */}
              <a href="#" className="hover:text-[#42938a] transition-colors"><InstagramIcon className="w-5 h-5" /></a>
              <a href="#" className="hover:text-[#42938a] transition-colors"><TwitterIcon className="w-5 h-5" /></a>
              <a href="#" className="hover:text-[#42938a] transition-colors"><TwitchIcon className="w-5 h-5" /></a>
              <a href="#" className="hover:text-[#42938a] transition-colors"><YoutubeIcon className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Columna 2: Tienda */}
          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-sm mb-6">Tienda</h4>
            <ul className="space-y-4 text-sm text-gray-400 font-medium">
              <li><Link href="/productos" className="hover:text-[#42938a] transition-colors">Todo el Catálogo</Link></li>
              <li><Link href="/productos?category=teclados" className="hover:text-[#42938a] transition-colors">Teclados Mecánicos</Link></li>
              <li><Link href="/productos?category=ratones" className="hover:text-[#42938a] transition-colors">Ratones Gaming</Link></li>
              <li><Link href="/productos?category=audio" className="hover:text-[#42938a] transition-colors">Audio y Auriculares</Link></li>
              <li><Link href="/productos?category=alfombrillas" className="hover:text-[#42938a] transition-colors">Alfombrillas XL</Link></li>
            </ul>
          </div>

          {/* Columna 3: Soporte */}
          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-sm mb-6">Soporte</h4>
            <ul className="space-y-4 text-sm text-gray-400 font-medium">
              <li><a href="#" className="hover:text-[#42938a] transition-colors">Centro de Ayuda</a></li>
              <li><a href="#" className="hover:text-[#42938a] transition-colors">Estado de mi pedido</a></li>
              <li><a href="#" className="hover:text-[#42938a] transition-colors">Políticas de Envío</a></li>
              <li><a href="#" className="hover:text-[#42938a] transition-colors">Garantías y Devoluciones</a></li>
              <li><a href="#" className="hover:text-[#42938a] transition-colors">Contáctanos</a></li>
            </ul>
          </div>

          {/* Columna 4: Confianza */}
          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-sm mb-6">Compra Segura</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-400">
                <ShieldCheck className="w-8 h-8 text-[#42938a] flex-shrink-0" />
                <p className="text-xs">Garantía oficial en todos nuestros productos.</p>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Truck className="w-8 h-8 text-[#42938a] flex-shrink-0" />
                <p className="text-xs">Envíos asegurados a toda Colombia.</p>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <CreditCard className="w-8 h-8 text-[#42938a] flex-shrink-0" />
                <p className="text-xs">Pagos encriptados de extremo a extremo.</p>
              </div>
            </div>
          </div>

        </div>

        {/* BARRA INFERIOR (Copyright) */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-600 font-medium uppercase tracking-wider">
          <p>&copy; {new Date().getFullYear()} Vestigio Gaming. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-[#42938a] transition-colors">Términos</a>
            <a href="#" className="hover:text-[#42938a] transition-colors">Privacidad</a>
          </div>
        </div>

      </div>
    </footer>
  );
}

/* =====================================================================
   COMPONENTES SVG INLINE (Reemplazo de los logos eliminados de Lucide)
   ===================================================================== */

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
);

const TwitchIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M21 2H3v16h5v4l4-4h5l4-4V2zm-10 9V7m5 4V7"/>
  </svg>
);

const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2.5 7.1C2.3 8.7 2 10.3 2 12s.3 3.3.5 4.9C3 20 5.4 20.3 12 20.3s9-.3 9.5-3.4c.2-1.6.5-3.2.5-4.9s-.3-3.3-.5-4.9C21 4 18.6 3.7 12 3.7s-9 .3-9.5 3.4z"/>
    <polygon points="10 15 15 12 10 9"/>
  </svg>
);