import Link from "next/link";
import { ArrowRight, Keyboard, Mouse, Headphones, ShieldCheck, Zap, Truck, Flame, Sparkles } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import { mockInventory } from "@/data/mockInventory"; 
import { Producto } from "@/types/product"; 

function BannerPromocional() {
  return (
    <aside 
      aria-label="Anuncio promocional" 
      className="relative bg-white dark:bg-[#16191c] border-b border-[#42938a]/20 dark:border-[#42938a]/30 py-2.5 px-4 sm:px-6 overflow-hidden shadow-sm dark:shadow-[0_4px_20px_rgba(0,0,0,0.35)] z-40 transition-colors"
    >
      <div 
        aria-hidden="true" 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 max-w-2xl h-8 bg-[#42938a]/10 blur-xl rounded-full pointer-events-none" 
      />

      <div className="max-w-7xl mx-auto flex items-center justify-center relative z-10">
        <Link 
          href="/productos" 
          className="group flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-center text-xs sm:text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <span className="inline-flex items-center gap-1.5 bg-[#42938a]/10 dark:bg-[#42938a]/15 text-[#42938a] border border-[#42938a]/30 dark:border-[#42938a]/40 px-2.5 py-0.5 rounded-full font-black text-[10px] sm:text-xs uppercase tracking-wider">
            <Truck className="w-3.5 h-3.5 text-[#42938a]" />
            <span>Envío Gratis</span>
          </span>

          <span className="font-medium">
            a toda <span className="text-gray-900 dark:text-white font-bold">Colombia</span> en compras superiores a{" "}
            <span className="text-[#42938a] font-black tracking-wide bg-[#42938a]/10 px-2 py-0.5 rounded border border-[#42938a]/30">
              $200.000 COP
            </span>
          </span>

          <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-gray-500 dark:text-gray-400 group-hover:text-[#42938a] uppercase tracking-widest transition-all sm:ml-1">
            Ver catálogo <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </span>
        </Link>
      </div>
    </aside>
  );
}

export default function HomePage() {
  const featuredProductIds = ["m-001", "m-004", "k-001", "a-001"];
  const featuredProducts = mockInventory.filter((p) => featuredProductIds.includes(p.id));
  const displayProducts = featuredProducts.length === 4 ? featuredProducts : mockInventory.slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-[#0f1113] transition-colors">
      <Navbar />
      <BannerPromocional />
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-20 pb-20 md:pt-32 md:pb-32 overflow-hidden border-b border-gray-200 dark:border-gray-800/50 bg-white dark:bg-[#0f1113] transition-colors">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#42938a]/10 dark:bg-[#42938a]/15 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <span className="text-[#42938a] font-bold tracking-widest uppercase text-xs sm:text-sm mb-6 block">
            Equipamiento de Alto Rendimiento
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 dark:text-white uppercase tracking-tighter mb-6 leading-none">
            Domina el <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#42938a] to-[#5bc0b5]">Juego</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Descubre nuestra selección premium de teclados mecánicos, ratones de ultra precisión y audio inmersivo diseñados para la victoria.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/productos"
              className="bg-[#42938a] text-white dark:text-black px-8 py-4 rounded-xl font-black uppercase tracking-widest hover:bg-[#357a72] transition-all flex items-center justify-center gap-2 w-full sm:w-auto shadow-lg dark:shadow-[0_0_20px_rgba(66,147,138,0.2)]"
            >
              Ver Catálogo <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. SEÑALES DE CONFIANZA */}
      <section className="bg-white dark:bg-[#16191c] border-b border-gray-200 dark:border-gray-800/50 py-12 transition-colors">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-4 justify-center md:justify-start">
            <div className="w-12 h-12 bg-gray-50 dark:bg-[#0f1113] border border-gray-200 dark:border-gray-800 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors">
              <Zap className="w-6 h-6 text-[#42938a]" />
            </div>
            <div>
              <h4 className="text-gray-900 dark:text-white font-bold uppercase tracking-wider text-sm mb-1">Rendimiento Extremo</h4>
              <p className="text-gray-600 dark:text-gray-500 text-xs">Latencia cero en cada movimiento.</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4 justify-center md:justify-start">
            <div className="w-12 h-12 bg-gray-50 dark:bg-[#0f1113] border border-gray-200 dark:border-gray-800 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors">
              <ShieldCheck className="w-6 h-6 text-[#42938a]" />
            </div>
            <div>
              <h4 className="text-gray-900 dark:text-white font-bold uppercase tracking-wider text-sm mb-1">Garantía Extendida</h4>
              <p className="text-gray-600 dark:text-gray-500 text-xs">2 años de cobertura de fábrica.</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4 justify-center md:justify-start">
            <div className="w-12 h-12 bg-gray-50 dark:bg-[#0f1113] border border-gray-200 dark:border-gray-800 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors">
              <Truck className="w-6 h-6 text-[#42938a]" />
            </div>
            <div>
              <h4 className="text-gray-900 dark:text-white font-bold uppercase tracking-wider text-sm mb-1">Envíos a todo el país</h4>
              <p className="text-gray-600 dark:text-gray-500 text-xs">Despachos seguros en 24/48h.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. EXPLORACIÓN POR CATEGORÍAS */}
      <section className="py-20 max-w-7xl mx-auto px-6 w-full">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">Equípate por Categoría</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Elige tu arma para la siguiente partida.</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/productos?category=teclados" className="group relative h-48 rounded-3xl overflow-hidden bg-white dark:bg-[#16191c] border border-gray-200 dark:border-gray-800 hover:border-[#42938a] dark:hover:border-[#42938a] transition-all flex flex-col items-center justify-center p-6 text-center shadow-sm hover:shadow-md">
            <div className="absolute inset-0 bg-gradient-to-t from-gray-50 dark:from-[#0f1113] to-transparent opacity-80 z-0" />
            <Keyboard className="w-12 h-12 text-gray-400 dark:text-gray-500 group-hover:text-[#42938a] dark:group-hover:text-[#42938a] transition-colors mb-4 relative z-10" />
            <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-widest relative z-10">Teclados</h3>
            <span className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest mt-2 relative z-10 flex items-center gap-1 group-hover:text-[#42938a] dark:group-hover:text-[#42938a] transition-colors">
              Explorar <ArrowRight className="w-3 h-3" />
            </span>
          </Link>

          <Link href="/productos?category=ratones" className="group relative h-48 rounded-3xl overflow-hidden bg-white dark:bg-[#16191c] border border-gray-200 dark:border-gray-800 hover:border-[#42938a] dark:hover:border-[#42938a] transition-all flex flex-col items-center justify-center p-6 text-center shadow-sm hover:shadow-md">
            <div className="absolute inset-0 bg-gradient-to-t from-gray-50 dark:from-[#0f1113] to-transparent opacity-80 z-0" />
            <Mouse className="w-12 h-12 text-gray-400 dark:text-gray-500 group-hover:text-[#42938a] dark:group-hover:text-[#42938a] transition-colors mb-4 relative z-10" />
            <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-widest relative z-10">Ratones</h3>
            <span className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest mt-2 relative z-10 flex items-center gap-1 group-hover:text-[#42938a] dark:group-hover:text-[#42938a] transition-colors">
              Explorar <ArrowRight className="w-3 h-3" />
            </span>
          </Link>

          <Link href="/productos?category=audio" className="group relative h-48 rounded-3xl overflow-hidden bg-white dark:bg-[#16191c] border border-gray-200 dark:border-gray-800 hover:border-[#42938a] dark:hover:border-[#42938a] transition-all flex flex-col items-center justify-center p-6 text-center shadow-sm hover:shadow-md">
            <div className="absolute inset-0 bg-gradient-to-t from-gray-50 dark:from-[#0f1113] to-transparent opacity-80 z-0" />
            <Headphones className="w-12 h-12 text-gray-400 dark:text-gray-500 group-hover:text-[#42938a] dark:group-hover:text-[#42938a] transition-colors mb-4 relative z-10" />
            <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-widest relative z-10">Audio</h3>
            <span className="text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest mt-2 relative z-10 flex items-center gap-1 group-hover:text-[#42938a] dark:group-hover:text-[#42938a] transition-colors">
              Explorar <ArrowRight className="w-3 h-3" />
            </span>
          </Link>
        </div>
      </section>

      {/* 4. SECCIÓN DE PRODUCTOS DESTACADOS */}
      <section className="py-16 max-w-7xl mx-auto px-6 w-full border-t border-gray-200 dark:border-gray-800/50 relative transition-colors">
        <div 
          aria-hidden="true" 
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-3/4 max-w-3xl h-64 bg-[#42938a]/5 blur-[120px] rounded-full pointer-events-none" 
        />

        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-[#16191c] border border-gray-200 dark:border-gray-800 text-[11px] font-black text-[#42938a] uppercase tracking-widest mb-3 transition-colors shadow-sm">
              <Flame className="w-3.5 h-3.5 text-[#42938a]" />
              Top Performance
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">
              Productos <span className="text-[#42938a]">Destacados</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm sm:text-base">
              El hardware preferido por los profesionales y la comunidad gaming.
            </p>
          </div>
          
          <Link 
            href="/productos" 
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white dark:bg-[#16191c] border border-gray-200 dark:border-gray-800 hover:border-[#42938a] dark:hover:border-[#42938a] text-[#42938a] text-xs font-black uppercase tracking-widest transition-all shadow-sm"
          >
            Ver todo el catálogo <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {displayProducts.map((product: Producto) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 5. SECCIÓN DE RESEÑAS Y TESTIMONIOS */}
      <section className="border-t border-gray-200 dark:border-gray-800/50 bg-gray-50 dark:bg-[#0d0f12]/60 transition-colors">
        <TestimonialsSection />
      </section>

      {/* 6. SECCIÓN DE PREGUNTAS FRECUENTES */}
      <section className="border-t border-gray-200 dark:border-gray-800/50 transition-colors">
        <FAQSection />
      </section>

      <Footer />
    </div>
  );
}
