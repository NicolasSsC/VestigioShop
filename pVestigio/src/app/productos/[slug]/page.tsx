// src/app/productos/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { mockInventory } from '@/data/mockInventory';
import Navbar from '@/components/Navbar';
import AddToCartButton from '@/components/AddToCartButton';
import { ChevronRight, ShieldCheck, Truck } from 'lucide-react';

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  // Resolvemos los parámetros asíncronos para Next.js 16
  const resolvedParams = await params;

  // Buscamos el producto en nuestro inventario usando el slug resuelto
  const product = mockInventory.find((p) => p.slug === resolvedParams.slug);

  // Si alguien escribe una URL de un producto que no existe, lanzamos un 404
  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0f1113] text-white">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-6 py-8 w-full">
        {/* Breadcrumbs (Navegación SEO) */}
        <nav className="flex items-center text-xs text-gray-500 font-bold tracking-widest uppercase mb-10">
          <Link href="/" className="hover:text-[#42938a] transition-colors">Inicio</Link>
          <ChevronRight className="w-3 h-3 mx-2" />
          <Link href="/productos" className="hover:text-[#42938a] transition-colors">Catálogo</Link>
          <ChevronRight className="w-3 h-3 mx-2" />
          <span className="text-gray-300">{product.category}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* GALERÍA DE IMÁGENES (Izquierda) */}
          <div className="flex flex-col gap-4">
            <div className="w-full aspect-square bg-white rounded-3xl relative flex items-center justify-center p-10 border border-gray-800">
              {product.isNew && (
                <span className="absolute top-6 left-6 bg-[#42938a] text-black text-xs font-black px-3 py-1.5 rounded-md uppercase tracking-wider z-10">
                  Nuevo
                </span>
              )}
              <div className="relative w-full h-full">
                <Image 
                  src={product.imageSrc} 
                  alt={product.title} 
                  fill
                  className="object-contain filter drop-shadow-2xl"
                  priority // Prop vital: Le dice a Next.js que cargue esta imagen inmediatamente
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>

          {/* INFORMACIÓN DEL PRODUCTO (Derecha) */}
          <div className="flex flex-col justify-center">
            <span className="text-[#42938a] font-bold tracking-widest uppercase text-sm mb-2">
              {product.category} • SKU: {product.sku}
            </span>
            <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mb-6">
              {product.title}
            </h1>
            
            <p className="text-gray-400 text-base leading-relaxed mb-8">
              {product.description}
            </p>

            <div className="flex flex-col mb-10 pb-10 border-b border-gray-800">
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <span className="text-lg text-gray-500 line-through font-bold mb-1">
                  ${product.compareAtPrice.toLocaleString('es-CO')}
                </span>
              )}
              <div className="flex items-baseline gap-2">
                <span className="text-4xl md:text-5xl font-black text-white leading-none">
                  ${product.price.toLocaleString('es-CO')}
                </span>
                <span className="text-sm text-[#42938a] font-bold tracking-widest">COP</span>
              </div>
              
              {product.stock > 0 ? (
                <span className="text-xs text-green-500 font-bold tracking-wider mt-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  EN STOCK ({product.stock} disponibles)
                </span>
              ) : (
                <span className="text-xs text-red-500 font-bold tracking-wider mt-3">
                  SIN INVENTARIO
                </span>
              )}
            </div>

            {/* Inyectamos nuestro Client Component aquí */}
            <AddToCartButton product={product} />

            {/* Badges de Confianza (CRO) */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="flex items-center gap-3 text-gray-400">
                <Truck className="w-5 h-5 text-[#42938a]" />
                <span className="text-xs font-bold uppercase tracking-wider">Envíos a todo el país</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <ShieldCheck className="w-5 h-5 text-[#42938a]" />
                <span className="text-xs font-bold uppercase tracking-wider">Garantía Oficial</span>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}