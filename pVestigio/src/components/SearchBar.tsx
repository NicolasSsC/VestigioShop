"use client";

import { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { mockInventory } from "@/data/mockInventory";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleFocus = () => {
    if (query.length > 0) setIsOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    setIsOpen(val.length > 0);
  };

  // Filtrado por nombre (título) ignorando mayúsculas/minúsculas
  const filtered = mockInventory.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div ref={wrapperRef} className="relative w-full z-[100]">
      <div className="relative flex items-center">
        <Search className="absolute left-4 w-4 h-4 text-gray-400 dark:text-gray-500" />
        <input
          type="text"
          value={query}
          onChange={handleChange}
          onFocus={handleFocus}
          placeholder="Buscar teclados, ratones, audio..."
          className="w-full bg-gray-100 dark:bg-[#0f1113] border border-gray-200 dark:border-gray-800 rounded-full py-2.5 pl-11 pr-4 text-sm text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#42938a] transition-all font-medium"
        />
      </div>

      {isOpen && (
        <div className="absolute top-full mt-2 w-full bg-white dark:bg-[#16191c] border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl overflow-hidden max-h-[400px] flex flex-col animate-fadeIn">
          <div className="flex-1 overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
            {filtered.length > 0 ? (
              <ul className="flex flex-col gap-1">
                {filtered.map((product) => (
                  <li key={product.id}>
                    <Link
                      href={`/productos/${product.slug}`}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-[#0f1113] transition-colors group"
                    >
                      <div className="relative w-12 h-12 bg-white rounded-lg flex-shrink-0 p-1 border border-gray-200 dark:border-gray-800 group-hover:border-[#42938a]/50 transition-colors">
                        <Image
                          src={product.imageSrc}
                          alt={product.title}
                          fill
                          className="object-contain"
                          sizes="48px"
                        />
                      </div>
                      <div className="flex flex-col overflow-hidden justify-center">
                        <span className="text-xs font-bold text-gray-900 dark:text-white truncate group-hover:text-[#42938a] transition-colors">
                          {product.title}
                        </span>
                        <span className="text-[11px] text-[#42938a] font-black uppercase tracking-wider mt-0.5">
                          ${product.price.toLocaleString("es-CO")}
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-6 text-center text-sm font-medium text-gray-500 dark:text-gray-400 flex flex-col items-center gap-2">
                <Search className="w-6 h-6 text-gray-300 dark:text-gray-600" />
                No se encontraron productos.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
