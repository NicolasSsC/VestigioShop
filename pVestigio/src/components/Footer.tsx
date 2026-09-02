"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShieldCheck, Truck, Headphones, Gamepad2, ArrowUpRight } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();

  // En la vista de Checkout se oculta para un flujo de conversión limpio (CRO)
  if (pathname.startsWith('/checkout')) {
    return null;
  }

  return (
    <footer className="w-full bg-[#0d0f12] border-t border-gray-800/80 text-gray-400 mt-auto">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10">
        
        {/* GRID PRINCIPAL */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">
          
          {/* Columna 1: Marca & Descripción */}
          <div className="flex flex-col items-start">
            <Link 
              href="/" 
              className="text-[#42938a] font-black text-2xl tracking-wider flex items-center gap-1.5 mb-4 group"
            >
              <span className="text-3xl font-black text-[#42938a] group-hover:drop-shadow-[0_0_8px_rgba(66,147,138,0.5)] transition-all">
                V
              </span>
              <span className="text-white tracking-widest group-hover:text-[#42938a] transition-colors">
                VESTIGIO
              </span>
            </Link>

            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#16191c] border border-gray-800 text-[11px] font-bold text-[#42938a] uppercase tracking-wider mb-4">
              <Gamepad2 className="w-3.5 h-3.5" />
              Equipamiento de alto rendimiento
            </div>

            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Selección premium de periféricos para gamers y creadores exigentes. Teclados mecánicos, ratones de alta precisión y audio inmersivo diseñados para dominar cada partida.
            </p>

            {/* Redes Sociales con hover #42938a */}
            <div className="flex gap-4 text-gray-500">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-[#42938a] transition-colors">
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter / X" className="hover:text-[#42938a] transition-colors">
                <TwitterIcon className="w-5 h-5" />
              </a>
              <a href="https://twitch.tv" target="_blank" rel="noopener noreferrer" aria-label="Twitch" className="hover:text-[#42938a] transition-colors">
                <TwitchIcon className="w-5 h-5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:text-[#42938a] transition-colors">
                <YoutubeIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Columna 2: Enlaces Rápidos */}
          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#42938a]" />
              Enlaces Rápidos
            </h4>
            <ul className="space-y-3.5 text-sm font-medium">
              <li>
                <Link href="/productos" className="hover:text-[#42938a] transition-colors flex items-center justify-between group">
                  <span>Catálogo Completo</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-[#42938a]" />
                </Link>
              </li>
              <li>
                <Link href="/productos?category=teclados" className="hover:text-[#42938a] transition-colors flex items-center justify-between group">
                  <span>Teclados Mecánicos</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-[#42938a]" />
                </Link>
              </li>
              <li>
                <Link href="/productos?category=ratones" className="hover:text-[#42938a] transition-colors flex items-center justify-between group">
                  <span>Ratones Gaming</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-[#42938a]" />
                </Link>
              </li>
              <li>
                <Link href="/productos?category=audio" className="hover:text-[#42938a] transition-colors flex items-center justify-between group">
                  <span>Audio & Auriculares</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all text-[#42938a]" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 3: Soporte & Ayuda */}
          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#42938a]" />
              Soporte
            </h4>
            <ul className="space-y-3.5 text-sm font-medium">
              <li>
                <Link href="#" className="hover:text-[#42938a] transition-colors flex items-center gap-1.5">
                  <Headphones className="w-4 h-4 text-[#42938a]" />
                  <span>Centro de Ayuda</span>
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#42938a] transition-colors">
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#42938a] transition-colors">
                  Políticas de Envío
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#42938a] transition-colors">
                  Garantías y Devoluciones
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna 4: Confianza y Garantía */}
          <div>
            <h4 className="text-white font-black uppercase tracking-widest text-xs mb-6 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#42938a]" />
              Experiencia Segura
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3 bg-[#16191c]/70 border border-gray-800/80 p-3 rounded-xl">
                <ShieldCheck className="w-5 h-5 text-[#42938a] flex-shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-bold text-white uppercase tracking-wider">Garantía Oficial</h5>
                  <p className="text-[11px] text-gray-400">2 años de cobertura oficial en hardware.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-[#16191c]/70 border border-gray-800/80 p-3 rounded-xl">
                <Truck className="w-5 h-5 text-[#42938a] flex-shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-bold text-white uppercase tracking-wider">Envíos Colombia</h5>
                  <p className="text-[11px] text-gray-400">Despachos rápidos y asegurados.</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* BARRA INFERIOR - COPYRIGHT */}
        <div className="border-t border-gray-800/70 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-medium">
          <p className="text-center sm:text-left">
            &copy; 2026 <span className="text-white font-bold">VESTIGIO</span>. Todos los derechos reservados.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <Link href="/productos" className="hover:text-[#42938a] transition-colors">
              Catálogo
            </Link>
            <span className="text-gray-700 hidden sm:inline">•</span>
            <Link href="#" className="hover:text-[#42938a] transition-colors">
              Términos y Condiciones
            </Link>
            <span className="text-gray-700 hidden sm:inline">•</span>
            <Link href="#" className="hover:text-[#42938a] transition-colors">
              Soporte
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}

/* =====================================================================
   ICONOS SVG DE REDES SOCIALES
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