import Link from "next/link";
import { ArrowRight, Keyboard, Mouse, Headphones, ShieldCheck, Zap, Truck } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import { mockInventory } from "@/data/mockInventory"; // 1. CORREGIDO: Ahora usamos el nombre exacto exportado
import { Producto } from "@/types/product"; 

/**
 * Componente BannerPromocional
 * Barra de anuncio superior con estética gaming oscura, efectos de luz sutiles
 * y llamado de atención responsivo para incentivar la compra mediante envío gratuito.
 */
function BannerPromocional() {
  return (
    <aside 
      aria-label="Anuncio promocional" 
      className="relative bg-[#16191c] border-b border-[#42938a]/30 py-2.5 px-4 sm:px-6 overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.35)] z-40"
    >
      {/* Efecto de luz ambiental gamer sutil */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 max-w-2xl h-8 bg-[#42938a]/10 blur-xl rounded-full pointer-events-none" 
      />

      <div className="max-w-7xl mx-auto flex items-center justify-center relative z-10">
        <Link 
          href="/productos" 
          className="group flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-center text-xs sm:text-sm text-gray-300 hover:text-white transition-colors"
        >
          {/* Badge con ícono temático */}
          <span className="inline-flex items-center gap-1.5 bg-[#42938a]/15 text-[#42938a] border border-[#42938a]/40 px-2.5 py-0.5 rounded-full font-black text-[10px] sm:text-xs uppercase tracking-wider shadow-[0_0_12px_rgba(66,147,138,0.25)]">
            <Truck className="w-3.5 h-3.5 text-[#42938a]" />
            <span>Envío Gratis</span>
          </span>

          {/* Texto principal del beneficio */}
          <span className="font-medium">
            a toda <span className="text-white font-bold">Colombia</span> en compras superiores a{" "}
            <span className="text-[#42938a] font-black tracking-wide bg-[#42938a]/10 px-2 py-0.5 rounded border border-[#42938a]/30 shadow-[0_0_8px_rgba(66,147,138,0.15)]">
              $200.000 COP
            </span>
          </span>

          {/* Microinteracción / Call To Action para pantallas medianas y grandes */}
          <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-gray-400 group-hover:text-[#42938a] uppercase tracking-widest transition-all sm:ml-1">
            Ver catálogo <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </span>
        </Link>
      </div>
    </aside>
  );
}

export default function HomePage() {
  // 2. CORREGIDO: Usamos mockInventory para extraer los 4 primeros
  const featuredProducts = mockInventory.slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      {/* 0. NAVEGACIÓN Y BANNER PROMOCIONAL */}
      <Navbar />
      <BannerPromocional />
      
      {/* 1. HERO SECTION (Impacto visual) */}
      <section className="relative pt-20 pb-20 md:pt-32 md:pb-32 overflow-hidden border-b border-gray-800/50">
        {/* Efecto de luz de fondo (Glow) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#42938a]/15 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <span className="text-[#42938a] font-bold tracking-widest uppercase text-xs sm:text-sm mb-6 block">
            Equipamiento de Alto Rendimiento
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter mb-6 leading-none">
            Domina el <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#42938a] to-teal-100">Juego</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Descubre nuestra selección premium de teclados mecánicos, ratones de ultra precisión y audio inmersivo diseñados para la victoria.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/productos"
              className="bg-[#42938a] text-black px-8 py-4 rounded-xl font-black uppercase tracking-widest hover:bg-[#357a72] transition-all flex items-center justify-center gap-2 w-full sm:w-auto shadow-[0_0_20px_rgba(66,147,138,0.2)]"
            >
              Ver Catálogo <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. SEÑALES DE CONFIANZA (Trust Badges) */}
      <section className="bg-[#16191c] border-b border-gray-800/50 py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-4 justify-center md:justify-start">
            <div className="w-12 h-12 bg-[#0f1113] border border-gray-800 rounded-xl flex items-center justify-center flex-shrink-0">
              <Zap className="w-6 h-6 text-[#42938a]" />
            </div>
            <div>
              <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-1">Rendimiento Extremo</h4>
              <p className="text-gray-500 text-xs">Latencia cero en cada movimiento.</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4 justify-center md:justify-start">
            <div className="w-12 h-12 bg-[#0f1113] border border-gray-800 rounded-xl flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-6 h-6 text-[#42938a]" />
            </div>
            <div>
              <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-1">Garantía Extendida</h4>
              <p className="text-gray-500 text-xs">2 años de cobertura de fábrica.</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4 justify-center md:justify-start">
            <div className="w-12 h-12 bg-[#0f1113] border border-gray-800 rounded-xl flex items-center justify-center flex-shrink-0">
              <Truck className="w-6 h-6 text-[#42938a]" />
            </div>
            <div>
              <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-1">Envíos a todo el país</h4>
              <p className="text-gray-500 text-xs">Despachos seguros en 24/48h.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. EXPLORACIÓN POR CATEGORÍAS */}
      <section className="py-20 max-w-7xl mx-auto px-6 w-full">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Equípate por Categoría</h2>
            <p className="text-gray-400 mt-2">Elige tu arma para la siguiente partida.</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Tarjeta Teclados */}
          <Link href="/productos?category=teclados" className="group relative h-48 rounded-3xl overflow-hidden bg-[#16191c] border border-gray-800 hover:border-[#42938a] transition-all flex flex-col items-center justify-center p-6 text-center">
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f1113] to-transparent opacity-80 z-0" />
            <Keyboard className="w-12 h-12 text-gray-500 group-hover:text-[#42938a] transition-colors mb-4 relative z-10" />
            <h3 className="text-xl font-black text-white uppercase tracking-widest relative z-10">Teclados</h3>
            <span className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-2 relative z-10 flex items-center gap-1 group-hover:text-[#42938a] transition-colors">
              Explorar <ArrowRight className="w-3 h-3" />
            </span>
          </Link>

          {/* Tarjeta Ratones */}
          <Link href="/productos?category=ratones" className="group relative h-48 rounded-3xl overflow-hidden bg-[#16191c] border border-gray-800 hover:border-[#42938a] transition-all flex flex-col items-center justify-center p-6 text-center">
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f1113] to-transparent opacity-80 z-0" />
            <Mouse className="w-12 h-12 text-gray-500 group-hover:text-[#42938a] transition-colors mb-4 relative z-10" />
            <h3 className="text-xl font-black text-white uppercase tracking-widest relative z-10">Ratones</h3>
            <span className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-2 relative z-10 flex items-center gap-1 group-hover:text-[#42938a] transition-colors">
              Explorar <ArrowRight className="w-3 h-3" />
            </span>
          </Link>

          {/* Tarjeta Audio */}
          <Link href="/productos?category=audio" className="group relative h-48 rounded-3xl overflow-hidden bg-[#16191c] border border-gray-800 hover:border-[#42938a] transition-all flex flex-col items-center justify-center p-6 text-center">
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f1113] to-transparent opacity-80 z-0" />
            <Headphones className="w-12 h-12 text-gray-500 group-hover:text-[#42938a] transition-colors mb-4 relative z-10" />
            <h3 className="text-xl font-black text-white uppercase tracking-widest relative z-10">Audio</h3>
            <span className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-2 relative z-10 flex items-center gap-1 group-hover:text-[#42938a] transition-colors">
              Explorar <ArrowRight className="w-3 h-3" />
            </span>
          </Link>
        </div>
      </section>

      {/* 4. PRODUCTOS DESTACADOS */}
      <section className="py-10 pb-32 max-w-7xl mx-auto px-6 w-full border-t border-gray-800/50">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Destacados</h2>
            <p className="text-gray-400 mt-2">El hardware preferido por los profesionales.</p>
          </div>
          <Link href="/productos" className="text-[#42938a] font-bold text-sm uppercase tracking-widest hover:text-white transition-colors flex items-center gap-1">
            Ver todo el inventario <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Reutilizamos nuestro potente componente ProductCard */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product: Producto) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

    </div>
  );
}