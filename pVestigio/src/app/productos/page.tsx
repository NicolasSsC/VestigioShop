// src/app/productos/page.tsx
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import CatalogFilters from '@/components/CatalogFilters';
import { mockInventory } from '@/data/mockInventory';
import type { Metadata } from 'next';

// 1. METADATA DINÁMICA (SEO)
export const metadata: Metadata = {
  title: 'Catálogo de Periféricos Premium | Vestigio',
  description: 'Explora nuestra colección de ratones, teclados y audio para profesionales y gamers. Equipamiento de alto rendimiento.',
};

interface ProductosPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ProductosPage({ searchParams }: ProductosPageProps) {
  // 2. RESOLUCIÓN DE PROMESAS EN NEXT 16 (Evita errores de asincronía)
  const resolvedSearchParams = await searchParams;
  
  // Extraemos parámetros de la URL
  const categoria = typeof resolvedSearchParams.categoria === 'string' ? resolvedSearchParams.categoria : undefined;
  const sort = typeof resolvedSearchParams.sort === 'string' ? resolvedSearchParams.sort : undefined;

  // 3. LÓGICA DE FILTRADO Y ORDENAMIENTO (En el Servidor)
  let productosMostrados = [...mockInventory];

  // Filtrar por categoría
  if (categoria) {
    productosMostrados = productosMostrados.filter(
      (p) => p.category.toLowerCase() === categoria.toLowerCase()
    );
  }

  // Ordenar productos
  if (sort === 'precio_asc') {
    productosMostrados.sort((a, b) => a.price - b.price);
  } else if (sort === 'precio_desc') {
    productosMostrados.sort((a, b) => b.price - a.price);
  } else if (sort === 'nuevos') {
    productosMostrados.sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1));
  }

  // Extraer categorías únicas para el menú de filtros
  const categoriasUnicas = Array.from(new Set(mockInventory.map(p => p.category)));

  return (
    <div className="min-h-screen flex flex-col bg-[#0f1113] text-white">
      <Navbar />
      
      <main className="flex-1">
        <section className="px-6 py-12 md:py-16 bg-[#16191c]/50 border-b border-gray-800 text-center">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4 text-white">
            Catálogo de <span className="text-[#42938a]">Productos</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {categoria 
              ? `Explorando nuestra selección premium de ${categoria}.` 
              : 'Explora todo nuestro inventario. Equipamiento premium para llevar tu rendimiento al máximo nivel.'}
          </p>
        </section>

        {/* 4. LAYOUT DE CATÁLOGO (Sidebar + Grid) */}
        <section className="max-w-7xl mx-auto px-6 py-12 w-full">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* SIDEBAR DE FILTROS (Izquierda) */}
            <aside className="w-full lg:w-64 flex-shrink-0">
              <CatalogFilters categorias={categoriasUnicas} />
            </aside>

            {/* GRID DE RESULTADOS (Derecha) */}
            <div className="flex-1">
              {/* Header de resultados */}
              <div className="mb-6 flex items-center justify-between text-sm text-gray-400 font-bold uppercase tracking-widest">
                <span>{productosMostrados.length} productos encontrados</span>
              </div>

              {productosMostrados.length > 0 ? (
                // Ajustamos a lg:grid-cols-3 porque el sidebar ocupa espacio
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {productosMostrados.map((prod) => (
                    <ProductCard 
                      key={prod.id} 
                      product={prod} 
                      buttonText="AÑADIR AL CARRITO" 
                    />
                  ))}
                </div>
              ) : (
                /* ESTADO VACÍO (UX/CRO) */
                <div className="w-full bg-[#16191c] border border-dashed border-gray-800 rounded-3xl p-12 text-center flex flex-col items-center justify-center">
                  <span className="text-4xl mb-4">📭</span>
                  <h3 className="text-xl font-bold text-white mb-2">No se encontraron productos</h3>
                  <p className="text-gray-500 mb-6">Intenta ajustando los filtros de búsqueda.</p>
                </div>
              )}
            </div>
            
          </div>
        </section>
      </main>
    </div>
  );
}