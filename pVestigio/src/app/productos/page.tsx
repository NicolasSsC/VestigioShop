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

  const category = searchParams.get("category") || searchParams.get("categoria");
  const minPrice = searchParams.get("minPrice");
  const maxPrice = searchParams.get("maxPrice");
  const inStock = searchParams.get("inStock");
  const sort = searchParams.get("sort");

  const filteredProducts = useMemo(() => {
    let result = [...mockInventory];

    if (category) {
      result = result.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      );
    }
    if (minPrice && !isNaN(Number(minPrice))) {
      result = result.filter((p) => p.price >= Number(minPrice));
    }
    if (maxPrice && !isNaN(Number(maxPrice))) {
      result = result.filter((p) => p.price <= Number(maxPrice));
    }
    if (inStock === "true") {
      result = result.filter((p) => p.stock > 0);
    }
    if (sort === "precio_asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "precio_desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sort === "nuevos") {
      result.sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1));
    }

    return result;
  }, [category, minPrice, maxPrice, inStock, sort]);

  const categoriasUnicas = useMemo(
    () => Array.from(new Set(mockInventory.map((p) => p.category))),
    []
  );

  const hasActiveFilters = Boolean(
    category || minPrice || maxPrice || inStock || (sort && sort !== "destacados")
  );

  return (
    <main className="flex-1">

      {/* HEADER */}
      <section className="
        px-6 py-12 md:py-16
        bg-gray-100/80 dark:bg-[#16191c]/60
        border-b border-gray-200 dark:border-gray-800
        text-center relative overflow-hidden
      ">
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#42938a]/5 blur-[100px] rounded-full pointer-events-none"
        />

        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="
            inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-3
            bg-white dark:bg-[#0f1113]
            border border-gray-200 dark:border-gray-800
            text-[11px] font-black text-[#42938a] uppercase tracking-widest
          ">
            <Sparkles className="w-3.5 h-3.5 text-[#42938a]" />
            Equipamiento Pro Gamer
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter mb-4 text-gray-900 dark:text-white">
            Catálogo de <span className="text-[#42938a]">Productos</span>
          </h1>

          <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base leading-relaxed">
            {category
              ? `Explorando nuestra selección premium de ${category} de alto rendimiento.`
              : "Explora todo nuestro inventario gaming. Periféricos de máxima precisión diseñados para la victoria."}
          </p>
        </div>
      </section>

      {/* LAYOUT SIDEBAR + GRID */}
      <section className="max-w-7xl mx-auto px-6 py-12 w-full">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">

          {/* SIDEBAR */}
          <div className="w-full lg:w-72 flex-shrink-0">
            <CatalogFilters categorias={categoriasUnicas} />
          </div>

          {/* GRID */}
          <div className="flex-1 w-full">

            {/* Encabezado de resultados */}
            <div className="
              mb-6 flex items-center justify-between text-xs font-black uppercase tracking-widest
              text-gray-500 dark:text-gray-400
              pb-3 border-b border-gray-200 dark:border-gray-800/80
            ">
              <span className="flex items-center gap-2 text-gray-900 dark:text-white">
                <span className="w-2 h-2 rounded-full bg-[#42938a]" />
                {filteredProducts.length}{" "}
                {filteredProducts.length === 1 ? "Producto encontrado" : "Productos encontrados"}
              </span>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={() => router.push("/productos", { scroll: false })}
                  className="text-[#42938a] hover:text-[#357a72] flex items-center gap-1 transition-colors cursor-pointer text-[11px]"
                >
                  <RotateCcw className="w-3 h-3" />
                  Restablecer Catálogo
                </button>
              )}
            </div>

            {/* PRODUCTOS O EMPTY STATE */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((prod: Producto) => (
                  <ProductCard key={prod.id} product={prod} buttonText="AÑADIR" />
                ))}
              </div>
            ) : (
              <div className="
                w-full rounded-3xl p-12 sm:p-16 text-center
                flex flex-col items-center justify-center shadow-xl
                bg-white dark:bg-[#16191c]
                border border-dashed border-gray-300 dark:border-gray-800
              ">
                <div className="
                  w-20 h-20 rounded-3xl flex items-center justify-center mb-6
                  bg-gray-50 dark:bg-[#0f1113]
                  border border-gray-200 dark:border-gray-800
                  shadow-[0_0_20px_rgba(66,147,138,0.1)]
                ">
                  <PackageSearch className="w-10 h-10 text-[#42938a]" />
                </div>

                <span className="text-[#42938a] font-bold text-xs uppercase tracking-widest mb-2 block">
                  Sin coincidencias
                </span>
                <h3 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight mb-3">
                  No se encontraron productos
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm max-w-md mb-8 leading-relaxed">
                  Prueba cambiando el rango de precios, seleccionando otra categoría o limpiando los filtros aplicados.
                </p>

                <button
                  type="button"
                  onClick={() => router.push("/productos", { scroll: false })}
                  className="inline-flex items-center gap-2 bg-[#42938a] text-black px-6 py-3 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-[#357a72] transition-all shadow-[0_0_15px_rgba(66,147,138,0.3)] cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Limpiar Filtros y Ver Todo
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
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-[#0f1113] text-gray-900 dark:text-[#ededed]">
      <Navbar />
      <Suspense fallback={
        <div className="flex-1 flex items-center justify-center min-h-[60vh]">
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-2 border-[#42938a] border-t-transparent rounded-full animate-spin" />
            <span className="text-xs font-black uppercase tracking-widest text-gray-400 dark:text-gray-400">
              Cargando catálogo Vestigio...
            </span>
          </div>
        </div>
      }>
        <CatalogContent />
      </Suspense>
      <Footer />
    </div>
  );
}
