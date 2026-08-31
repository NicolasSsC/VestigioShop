// src/components/CatalogFilters.tsx
"use client";

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Filter, SortDesc, X } from 'lucide-react';

interface CatalogFiltersProps {
  categorias: string[];
}

export default function CatalogFilters({ categorias }: CatalogFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Obtenemos los valores actuales de la URL
  const currentCategory = searchParams.get('categoria');
  const currentSort = searchParams.get('sort') || '';

  // Función genérica para actualizar la URL
  const updateQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    // Hacemos push a la nueva URL (sin recargar la página gracias a Next.js)
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="bg-[#16191c] border border-gray-800 rounded-2xl p-6 sticky top-28">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-black uppercase tracking-widest text-white flex items-center gap-2">
          <Filter className="w-5 h-5 text-[#42938a]" />
          Filtros
        </h2>
        {(currentCategory || currentSort) && (
          <button 
            onClick={() => router.push(pathname, { scroll: false })}
            className="text-xs text-gray-500 hover:text-red-400 flex items-center gap-1 transition-colors"
          >
            <X className="w-3 h-3" /> Limpiar
          </button>
        )}
      </div>

      {/* FILTRO POR CATEGORÍA */}
      <div className="mb-8">
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Categorías</h3>
        <div className="flex flex-col gap-2">
          <button
            onClick={() => updateQueryString('categoria', '')}
            className={`text-left text-sm font-semibold transition-colors px-3 py-2 rounded-lg ${
              !currentCategory ? 'bg-[#42938a]/10 text-[#42938a]' : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
            }`}
          >
            Todos los productos
          </button>
          {categorias.map((cat) => (
            <button
              key={cat}
              onClick={() => updateQueryString('categoria', cat)}
              className={`text-left text-sm font-semibold transition-colors px-3 py-2 rounded-lg capitalize ${
                currentCategory === cat ? 'bg-[#42938a]/10 text-[#42938a]' : 'text-gray-400 hover:bg-gray-800/50 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ORDENAMIENTO */}
      <div>
        <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 flex items-center gap-2">
          <SortDesc className="w-4 h-4" /> Ordenar por
        </h3>
        <select
          value={currentSort}
          onChange={(e) => updateQueryString('sort', e.target.value)}
          className="w-full bg-[#0f1113] border border-gray-800 text-white text-sm rounded-xl p-3 focus:outline-none focus:border-[#42938a] transition-colors cursor-pointer appearance-none"
        >
          <option value="">Relevancia</option>
          <option value="nuevos">Novedades primero</option>
          <option value="precio_asc">Precio: Menor a Mayor</option>
          <option value="precio_desc">Precio: Mayor a Menor</option>
        </select>
      </div>
    </div>
  );
}