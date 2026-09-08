"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { SlidersHorizontal, DollarSign, Boxes, ArrowUpDown } from "lucide-react";

export interface CatalogFiltersProps {
  categorias: string[];
}

export default function CatalogFilters({ categorias }: CatalogFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Leer estado desde la URL
  const activeCategory = searchParams.get("category") || "";
  const maxPrice = searchParams.get("maxPrice") || "500000";
  const sort = searchParams.get("sort") || "";

  // Función para actualizar URL
  const updateUrl = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <aside className="w-full bg-white dark:bg-[#16191c] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 lg:sticky lg:top-24 shadow-xl transition-colors">
      
      <div className="flex items-center gap-2.5 pb-4 border-b border-gray-200 dark:border-gray-800/80 mb-6">
        <div className="w-7 h-7 rounded-lg bg-gray-100 dark:bg-[#0f1113] border border-gray-200 dark:border-gray-800 flex items-center justify-center">
          <SlidersHorizontal className="w-3.5 h-3.5 text-[#42938a]" />
        </div>
        <h2 className="text-xs font-black uppercase tracking-widest text-gray-900 dark:text-white">
          Filtros
        </h2>
      </div>

      {/* 1. FILTRO CATEGORÍA */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Boxes className="w-3.5 h-3.5 text-[#42938a]" />
          <h3 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-widest">
            Categoría
          </h3>
        </div>
        <div className="flex flex-col gap-3">
          {/* Opción para "Todas" */}
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="radio"
              name="category"
              checked={activeCategory === ""}
              onChange={() => updateUrl("category", "")}
              className="w-4 h-4 text-[#42938a] bg-gray-100 border-gray-300 focus:ring-[#42938a] dark:focus:ring-[#42938a] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
            />
            <span className={`text-sm transition-colors ${activeCategory === "" ? "text-gray-900 dark:text-white font-bold" : "text-gray-600 dark:text-gray-400 group-hover:text-[#42938a]"}`}>
              Todas
            </span>
          </label>
          
          {categorias.map((cat) => (
            <label key={cat} className="flex items-center gap-3 cursor-pointer group">
              <input
                type="radio"
                name="category"
                checked={activeCategory.toLowerCase() === cat.toLowerCase()}
                onChange={() => updateUrl("category", cat.toLowerCase())}
                className="w-4 h-4 text-[#42938a] bg-gray-100 border-gray-300 focus:ring-[#42938a] dark:focus:ring-[#42938a] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
              />
              <span className={`text-sm transition-colors ${activeCategory.toLowerCase() === cat.toLowerCase() ? "text-gray-900 dark:text-white font-bold" : "text-gray-600 dark:text-gray-400 group-hover:text-[#42938a]"}`}>
                {cat}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* 2. FILTRO PRECIO (RANGE) */}
      <div className="mb-8 pt-6 border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <DollarSign className="w-3.5 h-3.5 text-[#42938a]" />
            <h3 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-widest">
              Precio Máximo
            </h3>
          </div>
          <span className="text-xs font-bold text-[#42938a] bg-[#42938a]/10 px-2 py-1 rounded-md border border-[#42938a]/20">
            ${Number(maxPrice).toLocaleString('es-CO')}
          </span>
        </div>
        
        <input
          type="range"
          min="0"
          max="500000"
          step="10000"
          value={maxPrice}
          onChange={(e) => updateUrl("maxPrice", e.target.value)}
          className="w-full h-2 bg-gray-200 dark:bg-gray-800 rounded-lg appearance-none cursor-pointer accent-[#42938a]"
        />
        <div className="flex justify-between mt-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
          <span>$0</span>
          <span>$500.000+</span>
        </div>
      </div>

      {/* 3. ORDENAMIENTO */}
      <div className="pt-6 border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-2 mb-4">
          <ArrowUpDown className="w-3.5 h-3.5 text-[#42938a]" />
          <h3 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-widest">
            Ordenar Por
          </h3>
        </div>
        <select
          value={sort}
          onChange={(e) => updateUrl("sort", e.target.value)}
          className="w-full bg-gray-50 dark:bg-[#0f1113] border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white text-sm rounded-xl px-4 py-3 appearance-none focus:outline-none focus:ring-2 focus:ring-[#42938a] transition-colors cursor-pointer"
        >
          <option value="">Relevancia (Por defecto)</option>
          <option value="asc">Menor a mayor precio</option>
          <option value="desc">Mayor a menor precio</option>
        </select>
      </div>

    </aside>
  );
}
