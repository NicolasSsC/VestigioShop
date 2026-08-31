// src/app/page.tsx
// ARCHIVO CORREGIDO: Ahora es un Server Component (Optimizado para SEO y carga rápida)

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import { mockInventory } from '@/data/mockInventory';

export default function HomePage() {
  const productosDestacados = mockInventory.slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col bg-[#0f1113] text-white">
      <Navbar />
      
      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative px-6 py-24 md:py-32 flex flex-col items-center justify-center text-center border-b border-gray-800 bg-[#16191c]/50">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 text-white">
            Domina el <span className="text-[#42938a]">Juego</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mb-10">
            Equipamiento de alto rendimiento para jugadores exigentes. Descubre nuestra nueva colección y lleva tu setup al siguiente nivel.
          </p>
          <Link 
            href="/productos" 
            className="bg-[#42938a] text-black font-black uppercase tracking-widest px-8 py-4 rounded-xl hover:bg-[#357a72] transition-transform transform hover:-translate-y-1 inline-flex items-center justify-center"
          >
            Ver Catálogo Completo
          </Link>
        </section>

        {/* PRODUCTOS DESTACADOS */}
        <section className="max-w-7xl mx-auto px-6 py-20 w-full">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
            <div>
              <h2 className="text-3xl font-black uppercase tracking-tight text-white mb-2">Destacados del Mes</h2>
              <p className="text-gray-400">Los periféricos más buscados por la comunidad.</p>
            </div>
            <Link href="/productos" className="text-[#42938a] font-bold hover:underline flex items-center gap-2">
              Ver todos &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {productosDestacados.map((prod) => (
              <ProductCard key={prod.id} product={prod} buttonText="AÑADIR" />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}