"use client";

import { Suspense, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import CatalogFilters from "@/components/CatalogFilters";
import { mockInventory } from "@/data/mockInventory";
import { Producto } from "@/types/product";
import { PackageSearch, RotateCcw, Sparkles } from "lucide-react";

function CatalogContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const category = searchParams.get("category");
  const maxPrice = searchParams.get("maxPrice");
  const sort = searchParams.get("sort");

  const filteredProducts = useMemo(() => {
    let result = [...mockInventory];

    // Filtro Categoría
    if (category) {
      result = result.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    // Filtro Precio Máximo
    if (maxPrice && !isNaN(Number(maxPrice))) {
      result = result.filter((p) => p.price <= Number(maxPrice));
    }

    // Ordenamiento
    if (sort === "asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "desc") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [category, maxPrice, sort]);

  const categoriasUnicas = useMemo(
    () => Array.from(new Set(mockInventory.map((p) => p.category))),
    []
  );

  const hasActiveFilters = Boolean(category || maxPrice || sort);

  const clearFilters = () => {
    router.push("/productos", { scroll: false });
  };

  return (
    <main className="flex-1">
      {/* HEADER */}
      <section className="px-6 py-12 md:py-16 bg-gray-100/80 dark:bg-[#16191c]/60 border-b border-gray-200 dark:border-gray-800 text-center relative overflow-hidden transition-colors">
        <div aria-hidden="true" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#42938a]/5 blur-[100px] rounded-full pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-3 bg-white dark:bg-[#0f1113] border border-gray-200 dark:border-gray-800 text-[11px] font-black text-[#42938a] uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-[#42938a]" />
            Catálogo Dinámico
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter mb-4 text-gray-900 dark:text-white">
            Selección <span className="text-[#42938a]">Premium</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base leading-relaxed">
            {category ? `Explorando la categoría ${category}.` : "Explora todo nuestro inventario gaming en tiempo real."}
          </p>
        </div>
      </section>

      {/* LAYOUT SIDEBAR + GRID */}
      <section className="max-w-7xl mx-auto px-6 py-12 w-full">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">
          {/* SIDEBAR DE FILTROS */}
          <div className="w-full lg:w-72 flex-shrink-0">
            <CatalogFilters categorias={categoriasUnicas} />
          </div>

          {/* GRID DE PRODUCTOS */}
          <div className="flex-1 w-full">
            <div className="mb-6 flex items-center justify-between text-xs font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 pb-3 border-b border-gray-200 dark:border-gray-800/80">
              <span className="flex items-center gap-2 text-gray-900 dark:text-white">
                <span className="w-2 h-2 rounded-full bg-[#42938a]" />
                {filteredProducts.length} {filteredProducts.length === 1 ? "Producto" : "Productos"}
              </span>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((prod: Producto) => (
                  <ProductCard key={prod.id} product={prod} buttonText="AÑADIR" />
                ))}
              </div>
            ) : (
              // ESTADO SIN RESULTADOS
              <div className="w-full rounded-3xl p-12 sm:p-16 text-center flex flex-col items-center justify-center shadow-xl bg-white dark:bg-[#16191c] border border-dashed border-gray-300 dark:border-gray-800">
                <div className="w-20 h-20 rounded-3xl flex items-center justify-center mb-6 bg-gray-50 dark:bg-[#0f1113] border border-gray-200 dark:border-gray-800 shadow-[0_0_20px_rgba(66,147,138,0.1)]">
                  <PackageSearch className="w-10 h-10 text-[#42938a]" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight mb-3">
                  No encontramos productos
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm max-w-md mb-8 leading-relaxed">
                  Tus filtros son muy estrictos. Prueba subiendo el precio máximo o cambiando de categoría.
                </p>
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center gap-2 bg-[#42938a] text-black px-6 py-3 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-[#357a72] transition-all shadow-lg cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Limpiar Filtros
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export default function ProductosPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-[#0f1113] text-gray-900 dark:text-[#ededed] transition-colors">
      <Navbar />
      <Suspense fallback={<div className="flex-1 flex items-center justify-center min-h-[60vh]"><div className="w-10 h-10 border-2 border-[#42938a] border-t-transparent rounded-full animate-spin" /></div>}>
        <CatalogContent />
      </Suspense>
      <Footer />
    </div>
  );
}
