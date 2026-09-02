"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { 
  SlidersHorizontal, 
  ChevronDown, 
  Check, 
  RotateCcw, 
  Boxes, 
  DollarSign, 
  PackageCheck, 
  ArrowUpDown,
  X,
  Filter,
  Sparkles,
  AlertCircle
} from "lucide-react";

export interface CatalogFiltersProps {
  categorias?: string[];
  className?: string;
}

const DEFAULT_CATEGORIAS = ["Teclados", "Ratones", "Audio", "Alfombrillas"];

// Mapeo de inventario para indicadores de conteo
const CATEGORY_COUNTS: Record<string, number> = {
  Teclados: 12,
  Ratones: 18,
  Audio: 8,
  Alfombrillas: 14,
  Accesorios: 6,
};

const SORT_LABELS: Record<string, string> = {
  destacados: "Destacados",
  nuevos: "Novedades",
  precio_asc: "Menor precio",
  precio_desc: "Mayor precio",
};

export default function CatalogFilters({
  categorias = DEFAULT_CATEGORIAS,
  className = "",
}: CatalogFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 1. Lectura directa del estado desde la URL (Single Source of Truth)
  const activeCategory = searchParams.get("category") || searchParams.get("categoria") || "";
  const urlMinPrice = searchParams.get("minPrice") || "";
  const urlMaxPrice = searchParams.get("maxPrice") || "";
  const inStockOnly = searchParams.get("inStock") === "true";
  const activeSort = searchParams.get("sort") || "destacados";

  // 2. Estados locales para inputs de precio y UI
  const [minInput, setMinInput] = useState<string>(urlMinPrice);
  const [maxInput, setMaxInput] = useState<string>(urlMaxPrice);
  const [priceError, setPriceError] = useState<string | null>(null);
  const [isCategoryOpen, setIsCategoryOpen] = useState<boolean>(true);
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);

  // Sincroniza los inputs si la URL cambia externamente (ej: al limpiar filtros o navegar)
  useEffect(() => {
    setMinInput(urlMinPrice);
    setMaxInput(urlMaxPrice);
    setPriceError(null);
  }, [urlMinPrice, urlMaxPrice]);

  // 3. Función Centralizada para actualizar la URL con URLSearchParams
  const handleFilterChange = (key: string, value: string | null | undefined) => {
    const params = new URLSearchParams(searchParams.toString());
    
    // Limpiamos variante previa si se toca categoría
    if (key === "category") {
      params.delete("categoria");
    }

    if (value && value !== "" && value !== "destacados") {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  // 4. Manejador de Selección de Categoría (Toggle)
  const handleCategorySelect = (cat: string) => {
    const isCurrentlySelected = activeCategory.toLowerCase() === cat.toLowerCase();
    handleFilterChange("category", isCurrentlySelected ? null : cat);
  };

  // 5. Manejador de Aplicación de Rango de Precio con Validación
  const handleApplyPrice = () => {
    const minVal = minInput ? Number(minInput) : 0;
    const maxVal = maxInput ? Number(maxInput) : Infinity;

    if (minInput && maxInput && minVal > maxVal) {
      setPriceError("El mínimo no puede superar al máximo");
      return;
    }

    setPriceError(null);
    const params = new URLSearchParams(searchParams.toString());

    if (minInput && minInput !== "") {
      params.set("minPrice", minInput);
    } else {
      params.delete("minPrice");
    }

    if (maxInput && maxInput !== "") {
      params.set("maxPrice", maxInput);
    } else {
      params.delete("maxPrice");
    }

    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  const handleResetPrice = () => {
    setMinInput("");
    setMaxInput("");
    setPriceError(null);
    const params = new URLSearchParams(searchParams.toString());
    params.delete("minPrice");
    params.delete("maxPrice");
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  // 6. Manejador de Switch "En Stock"
  const handleToggleStock = () => {
    handleFilterChange("inStock", inStockOnly ? null : "true");
  };

  // 7. Manejador de Ordenamiento
  const handleSortChange = (newSort: string) => {
    handleFilterChange("sort", newSort === "destacados" ? null : newSort);
  };

  // 8. Limpiar todos los filtros
  const handleClearAll = () => {
    setMinInput("");
    setMaxInput("");
    setPriceError(null);
    router.push(pathname, { scroll: false });
  };

  // 9. Cálculo Dinámico de Píldoras de Filtros Activos (Active Tags)
  const activeFilters = useMemo(() => {
    const filters: { id: string; label: string; onRemove: () => void }[] = [];

    if (activeCategory) {
      filters.push({
        id: "cat",
        label: `Categoría: ${activeCategory}`,
        onRemove: () => handleFilterChange("category", null),
      });
    }

    if (urlMinPrice || urlMaxPrice) {
      const minStr = urlMinPrice ? `$${Number(urlMinPrice).toLocaleString("es-CO")}` : "$0";
      const maxStr = urlMaxPrice ? `$${Number(urlMaxPrice).toLocaleString("es-CO")}` : "+";
      filters.push({
        id: "price",
        label: `Precio: ${minStr} - ${maxStr}`,
        onRemove: handleResetPrice,
      });
    }

    if (inStockOnly) {
      filters.push({
        id: "stock",
        label: "En Stock",
        onRemove: () => handleFilterChange("inStock", null),
      });
    }

    if (activeSort && activeSort !== "destacados") {
      filters.push({
        id: "sort",
        label: `Orden: ${SORT_LABELS[activeSort] || activeSort}`,
        onRemove: () => handleFilterChange("sort", null),
      });
    }

    return filters;
  }, [activeCategory, urlMinPrice, urlMaxPrice, inStockOnly, activeSort]);

  const hasActiveFilters = activeFilters.length > 0;
  const displayCategorias = categorias.length > 0 ? categorias : DEFAULT_CATEGORIAS;

  // =========================================================================
  // CONTENIDO VISUAL DEL PANEL DE FILTROS
  // =========================================================================
  const filterPanelBody = (
    <div className="flex flex-col gap-6">
      
      {/* HEADER DEL PANEL */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-800/80">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-[#0f1113] border border-gray-800 flex items-center justify-center">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#42938a]" />
          </div>
          <h2 className="text-xs font-black uppercase tracking-widest text-white">
            Filtros
          </h2>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={handleClearAll}
            className="text-[11px] font-bold text-gray-500 hover:text-[#42938a] focus:text-[#42938a] flex items-center gap-1 transition-colors uppercase tracking-wider cursor-pointer rounded px-1.5 py-0.5 focus:outline-none focus:ring-1 focus:ring-[#42938a]"
          >
            <RotateCcw className="w-3 h-3" />
            Limpiar Todo
          </button>
        )}
      </div>

      {/* PÍLDORAS DE FILTROS ACTIVOS (ACTIVE PILLS) */}
      {hasActiveFilters && (
        <div className="flex flex-col gap-2 p-3 rounded-2xl bg-[#0f1113] border border-gray-800/80">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#42938a]" />
              Filtros Aplicados ({activeFilters.length})
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {activeFilters.map((filter) => (
              <span
                key={filter.id}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold bg-[#16191c] border border-[#42938a]/40 text-[#42938a] hover:border-[#42938a] transition-all shadow-[0_0_8px_rgba(66,147,138,0.15)] group"
              >
                <span className="truncate max-w-[130px]">{filter.label}</span>
                <button
                  type="button"
                  onClick={filter.onRemove}
                  aria-label={`Eliminar filtro ${filter.label}`}
                  className="p-0.5 hover:bg-[#42938a] hover:text-black rounded transition-colors cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#42938a]"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* SECCIÓN 1: CATEGORÍAS CON CHECKBOXES CONECTADOS */}
      <div className="flex flex-col">
        <button
          type="button"
          onClick={() => setIsCategoryOpen(!isCategoryOpen)}
          aria-expanded={isCategoryOpen}
          className="flex items-center justify-between w-full py-1 text-left cursor-pointer group rounded focus:outline-none focus:ring-2 focus:ring-[#42938a]"
        >
          <div className="flex items-center gap-2">
            <Boxes className="w-3.5 h-3.5 text-[#42938a]" />
            <span className="text-xs font-black text-white uppercase tracking-widest">
              Categorías
            </span>
          </div>
          <ChevronDown className={`w-4 h-4 text-gray-500 group-hover:text-[#42938a] transition-transform duration-200 ${
            isCategoryOpen ? "rotate-180" : ""
          }`} />
        </button>

        {isCategoryOpen && (
          <div className="flex flex-col gap-2 mt-3.5 pl-0.5">
            {displayCategorias.map((cat) => {
              const isSelected = activeCategory.toLowerCase() === cat.toLowerCase();
              const count = CATEGORY_COUNTS[cat] ?? 10;

              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleCategorySelect(cat)}
                  aria-pressed={isSelected}
                  className="flex items-center justify-between text-left w-full py-1.5 px-2 rounded-xl transition-all cursor-pointer group hover:bg-[#0f1113] focus:outline-none focus:ring-2 focus:ring-[#42938a]"
                >
                  <div className="flex items-center gap-2.5">
                    {/* Checkbox Personalizado Gaming conectado a la URL */}
                    <div
                      className={`w-4 h-4 rounded-md flex items-center justify-center transition-all duration-200 border flex-shrink-0 ${
                        isSelected
                          ? "bg-[#42938a] border-[#42938a] shadow-[0_0_10px_rgba(66,147,138,0.4)]"
                          : "bg-[#0f1113] border-gray-800 group-hover:border-gray-600"
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 text-black stroke-[3]" />}
                    </div>

                    {/* Nombre de la Categoría */}
                    <span
                      className={`text-sm transition-colors ${
                        isSelected
                          ? "text-white font-black"
                          : "text-gray-400 group-hover:text-[#42938a]"
                      }`}
                    >
                      {cat}
                    </span>
                  </div>

                  {/* Indicador de Cantidad */}
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                    isSelected 
                      ? "text-[#42938a] bg-[#42938a]/10 font-bold" 
                      : "text-gray-500 group-hover:text-gray-400"
                  }`}>
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* SECCIÓN 2: RANGO DE PRECIO CON VALIDACIÓN */}
      <div className="flex flex-col pt-4 border-t border-gray-800/80">
        <div className="flex items-center gap-2 mb-3">
          <DollarSign className="w-3.5 h-3.5 text-[#42938a]" />
          <span className="text-xs font-black text-white uppercase tracking-widest">
            Rango de Precio
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5 mb-2.5">
          {/* Input Mínimo */}
          <div>
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1 block">
              Mín ($)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs font-mono">
                $
              </span>
              <input
                type="number"
                placeholder="0"
                min="0"
                value={minInput}
                onChange={(e) => {
                  setMinInput(e.target.value);
                  setPriceError(null);
                }}
                onKeyDown={(e) => e.key === "Enter" && handleApplyPrice()}
                className="w-full bg-[#0f1113] border border-gray-800 rounded-xl pl-6 pr-2 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#42938a] focus:ring-2 focus:ring-[#42938a] transition-all font-mono"
              />
            </div>
          </div>

          {/* Input Máximo */}
          <div>
            <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1 block">
              Máx ($)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs font-mono">
                $
              </span>
              <input
                type="number"
                placeholder="200.000"
                min="0"
                value={maxInput}
                onChange={(e) => {
                  setMaxInput(e.target.value);
                  setPriceError(null);
                }}
                onKeyDown={(e) => e.key === "Enter" && handleApplyPrice()}
                className="w-full bg-[#0f1113] border border-gray-800 rounded-xl pl-6 pr-2 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-[#42938a] focus:ring-2 focus:ring-[#42938a] transition-all font-mono"
              />
            </div>
          </div>
        </div>

        {/* Mensaje de Error de Validación */}
        {priceError && (
          <div className="flex items-center gap-1.5 text-red-400 text-[11px] mb-2 font-medium">
            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
            <span>{priceError}</span>
          </div>
        )}

        {/* Botón Aplicar Precio */}
        <button
          type="button"
          onClick={handleApplyPrice}
          className="w-full py-2 px-3 rounded-xl border border-gray-700 hover:border-[#42938a] hover:text-[#42938a] text-gray-300 bg-[#0f1113] text-xs font-black uppercase tracking-wider transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#42938a]"
        >
          Aplicar Precio
        </button>
      </div>

      {/* SECCIÓN 3: DISPONIBILIDAD (TOGGLE SWITCH) */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-800/80">
        <div className="flex items-center gap-2.5">
          <PackageCheck className="w-3.5 h-3.5 text-[#42938a]" />
          <div className="flex flex-col">
            <span className="text-xs font-black text-white uppercase tracking-widest">
              Solo en Stock
            </span>
            <span className="text-[10px] text-gray-500">
              Ocultar productos agotados
            </span>
          </div>
        </div>

        <button
          type="button"
          role="switch"
          aria-checked={inStockOnly}
          onClick={handleToggleStock}
          className={`w-11 h-6 rounded-full transition-colors duration-200 relative p-0.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#42938a] ${
            inStockOnly
              ? "bg-[#42938a] shadow-[0_0_12px_rgba(66,147,138,0.35)]"
              : "bg-[#0f1113] border border-gray-800"
          }`}
          aria-label="Filtrar solo productos con inventario disponible"
        >
          <div
            className={`w-5 h-5 rounded-full bg-black transition-transform duration-200 shadow-md ${
              inStockOnly ? "translate-x-5" : "translate-x-0 bg-gray-500"
            }`}
          />
        </button>
      </div>

      {/* SECCIÓN 4: ORDENAR POR */}
      <div className="flex flex-col pt-4 border-t border-gray-800/80">
        <div className="flex items-center gap-2 mb-3">
          <ArrowUpDown className="w-3.5 h-3.5 text-[#42938a]" />
          <span className="text-xs font-black text-white uppercase tracking-widest">
            Ordenar Por
          </span>
        </div>

        <div className="relative">
          <select
            value={activeSort}
            onChange={(e) => handleSortChange(e.target.value)}
            className="w-full bg-[#0f1113] border border-gray-800 text-white text-xs sm:text-sm rounded-xl px-4 py-2.5 appearance-none focus:outline-none focus:border-[#42938a] focus:ring-2 focus:ring-[#42938a] transition-colors cursor-pointer pr-10 font-medium"
          >
            <option value="destacados">Destacados (Relevancia)</option>
            <option value="nuevos">Nuevos Lanzamientos</option>
            <option value="precio_asc">Precio: Menor a Mayor</option>
            <option value="precio_desc">Precio: Mayor a Menor</option>
          </select>
          <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

    </div>
  );

  return (
    <>
      {/* BOTÓN DISPARADOR PARA MÓVILES */}
      <div className="lg:hidden w-full mb-6">
        <button
          type="button"
          onClick={() => setIsMobileOpen(true)}
          className="w-full bg-[#16191c] border border-gray-800 hover:border-[#42938a] text-white p-4 rounded-2xl flex items-center justify-between text-xs font-black uppercase tracking-widest transition-all shadow-md focus:outline-none focus:ring-2 focus:ring-[#42938a]"
        >
          <div className="flex items-center gap-2.5">
            <Filter className="w-4 h-4 text-[#42938a]" />
            <span>Filtros y Ordenamiento</span>
          </div>

          <div className="flex items-center gap-2">
            {hasActiveFilters && (
              <span className="px-2 py-0.5 rounded-full bg-[#42938a]/15 text-[#42938a] text-[10px] font-black border border-[#42938a]/30">
                {activeFilters.length} activo(s)
              </span>
            )}
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
        </button>
      </div>

      {/* DRAWER DESPLEGABLE EN MÓVIL */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileOpen(false)}
          />

          <div className="relative w-full max-w-xs sm:max-w-sm bg-[#16191c] border-l border-gray-800 h-full p-6 overflow-y-auto z-10 flex flex-col justify-between shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-800">
                <span className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#42938a]" />
                  Filtros del Catálogo
                </span>
                <button
                  type="button"
                  onClick={() => setIsMobileOpen(false)}
                  className="p-1.5 rounded-lg text-gray-400 hover:text-white bg-[#0f1113] border border-gray-800 focus:outline-none focus:ring-2 focus:ring-[#42938a]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {filterPanelBody}
            </div>

            <div className="pt-6 mt-6 border-t border-gray-800">
              <button
                type="button"
                onClick={() => setIsMobileOpen(false)}
                className="w-full py-3.5 bg-[#42938a] text-black font-black uppercase text-xs tracking-widest rounded-xl hover:bg-[#357a72] transition-colors focus:outline-none focus:ring-2 focus:ring-white"
              >
                Ver Resultados {hasActiveFilters ? `(${activeFilters.length})` : ""}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SIDEBAR PERSISTENTE Y STICKY EN ESCRITORIO */}
      <aside className={`hidden lg:block w-full bg-[#16191c] border border-gray-800 rounded-3xl p-6 lg:sticky lg:top-24 z-20 shadow-xl transition-all ${className}`}>
        {filterPanelBody}
      </aside>
    </>
  );
}

