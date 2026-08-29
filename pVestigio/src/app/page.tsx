// src/app/page.tsx
"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import { productService } from '@/services/productService';
import { Producto } from '@/types/product';
import { Loader2, ArrowRight, ShieldCheck, Zap, Package } from 'lucide-react';

export default function HomePage() {
  const [destacados, setDestacados] = useState<Producto[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Cargamos dinámicamente algunos productos para la sección "Destacados"
  useEffect(() => {
    const fetchDestacados = async () => {
      setIsLoading(true);
      const data = await productService.getProducts();
      // Tomamos 4 productos específicos o los primeros 4 para exhibir
      setDestacados(data.slice(0, 4));
      setIsLoading(false);
    };
    fetchDestacados();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-vestigio-bg text-white">
      <Navbar />

      <main className="flex-1 w-full">
        
        {/* 1. HERO SECTION (Cabecera Principal) */}
        <section className="relative py-20 md:py-32 px-6 text-center max-w-5xl mx-auto flex flex-col items-center">
          {/* Un toque de luz de fondo (Glow) para estética premium */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-vestigio-primary/10 blur-[100px] rounded-full -z-10 pointer-events-none"></div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-vestigio-primary uppercase mb-6 drop-shadow-lg">
            Domina el Juego
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 font-light tracking-wide mb-12 max-w-2xl">
            La tecnología que permanece. Periféricos premium para llevar tu setup al siguiente nivel.
          </p>

          <Link 
            href="/productos" 
            className="inline-flex items-center gap-3 bg-vestigio-primary text-black px-10 py-4 rounded-full font-extrabold uppercase tracking-widest hover:bg-vestigio-primaryHover transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_rgba(66,147,138,0.4)]"
          >
            Explorar Catálogo <ArrowRight className="w-5 h-5" />
          </Link>
        </section>

        {/* 2. SECCIÓN DE BENEFICIOS (Confianza) */}
        <section className="border-y border-vestigio-border bg-vestigio-surface/50">
          <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-vestigio-border">
            <div className="flex flex-col items-center pt-4 md:pt-0">
              <Package className="w-8 h-8 text-vestigio-primary mb-3" />
              <h3 className="font-bold text-white mb-1">Stock Local Inmediato</h3>
              <p className="text-sm text-gray-400">Envíos rápidos en Bogotá y Soacha</p>
            </div>
            <div className="flex flex-col items-center pt-4 md:pt-0">
              <ShieldCheck className="w-8 h-8 text-vestigio-primary mb-3" />
              <h3 className="font-bold text-white mb-1">Garantía Asegurada</h3>
              <p className="text-sm text-gray-400">Productos testeados y confiables</p>
            </div>
            <div className="flex flex-col items-center pt-4 md:pt-0">
              <Zap className="w-8 h-8 text-vestigio-primary mb-3" />
              <h3 className="font-bold text-white mb-1">Alta Competitividad</h3>
              <p className="text-sm text-gray-400">Selección experta con la mejor relación calidad-precio</p>
            </div>
          </div>
        </section>

        {/* 3. SECCIÓN DESTACADOS DEL MES */}
        <section className="py-20 px-6 max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-2xl md:text-4xl font-bold tracking-wider uppercase text-white mb-2">
                Destacados del Mes
              </h2>
              <p className="text-gray-400 text-sm md:text-base">Los favoritos de nuestra comunidad.</p>
            </div>
            <Link href="/productos" className="text-vestigio-primary text-sm font-bold hover:underline hidden sm:flex items-center gap-1 transition-all">
              Ver todos <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {isLoading ? (
            <div className="w-full py-20 flex flex-col items-center justify-center">
              <Loader2 className="w-10 h-10 text-vestigio-primary animate-spin mb-4" />
              <p className="text-gray-400 font-medium tracking-wide">Cargando destacados...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {destacados.map((prod) => (
                <Link href={`/productos/${prod.id}`} key={prod.id} className="block group h-full">
                  <ProductCard
                    title={prod.title}
                    category={prod.category}
                    description={prod.description}
                    price={`$${prod.price.toFixed(2)}`}
                    imageSrc={prod.imageSrc}
                    hasButton={true}
                    buttonText="AGREGAR AL CARRITO"
                    buttonVariant="primary"
                    isSelected={prod.isNew}
                  />
                </Link>
              ))}
            </div>
          )}

          {/* Botón ver todos para móvil */}
          <div className="mt-10 text-center sm:hidden">
            <Link href="/productos" className="inline-flex items-center justify-center w-full bg-vestigio-surface border border-vestigio-border text-white px-6 py-3 rounded-xl font-bold hover:bg-vestigio-border transition-colors">
              Ver todo el catálogo
            </Link>
          </div>
        </section>

      </main>
    </div>
  );
}