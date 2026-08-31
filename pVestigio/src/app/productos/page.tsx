// src/app/productos/page.tsx
// ARCHIVO CORREGIDO: Server Component para el catálogo completo

import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import { mockInventory } from '@/data/mockInventory';

export default function ProductosPage() {
  // Tomamos TODOS los productos del inventario
  const todosLosProductos = mockInventory;

  return (
    <div className="min-h-screen flex flex-col bg-[#0f1113] text-white">
      <Navbar />
      
      <main className="flex-1">
        {/* Cabecera del Catálogo (Más limpia y enfocada que el Hero de la Home) */}
        <section className="px-6 py-12 md:py-16 bg-[#16191c]/50 border-b border-gray-800 text-center">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4 text-white">
            Catálogo de <span className="text-[#42938a]">Productos</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explora todo nuestro inventario. Equipamiento premium para llevar tu rendimiento al máximo nivel.
          </p>
        </section>

        {/* Grid Principal de Productos */}
        <section className="max-w-7xl mx-auto px-6 py-16 w-full">
          {/* 
            NÓTESE: El <ProductCard> va libre, SIN estar envuelto en un <Link>.
            Esto soluciona el error rojo de hidratación definitivamente.
          */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {todosLosProductos.map((prod) => (
              <ProductCard 
                key={prod.id} 
                product={prod} 
                buttonText="AÑADIR AL CARRITO" 
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}