"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  ChevronRight, 
  ShieldCheck, 
  Truck, 
  Zap, 
  RotateCcw, 
  PackageX, 
  ArrowLeft,
  Cpu,
  Layers,
  Sliders
} from "lucide-react";
import { mockInventory } from "@/data/mockInventory";
import { useCartStore } from "@/store/useCartStore";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ProductDetailPage() {
  const params = useParams();
  const rawSlug = params?.slug;
  const slug = typeof rawSlug === "string" ? rawSlug : Array.isArray(rawSlug) ? rawSlug[0] : "";

  // 1. Buscamos el producto en la data estática
  const product = mockInventory.find((p) => p.slug === slug);

  // 2. Estados locales interactivos
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  // 3. Zustand store
  const addToCart = useCartStore((state) => state.addToCart);

  // 4. Componente 404 Estilizado si el producto no existe
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-[#0f1113] text-[#ededed]">
        <Navbar />
        <main className="flex-1 max-w-7xl mx-auto px-6 py-20 flex flex-col items-center justify-center text-center">
          <div className="relative w-28 h-28 bg-[#16191c] border border-gray-800 rounded-3xl flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(66,147,138,0.15)]">
            <div className="absolute inset-0 bg-[#42938a]/10 blur-xl rounded-full" />
            <PackageX className="w-12 h-12 text-[#42938a] relative z-10" />
          </div>
          
          <span className="text-[#42938a] font-bold text-xs uppercase tracking-widest mb-2 block">
            Error 404 • Producto No Encontrado
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
            Equipamiento Fuera de Radar
          </h1>
          <p className="text-gray-400 max-w-md mb-8 text-sm sm:text-base leading-relaxed">
            El periférico que buscas no existe o ha sido retirado de nuestro inventario oficial.
          </p>

          <Link
            href="/productos"
            className="inline-flex items-center gap-2 bg-[#42938a] text-black px-8 py-4 rounded-xl font-black uppercase text-xs tracking-widest hover:bg-[#357a72] transition-all shadow-[0_0_20px_rgba(66,147,138,0.25)]"
          >
            <ArrowLeft className="w-4 h-4" /> Volver al Catálogo
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  // Galería simulada de 3 vistas (usando la imagen del producto como base)
  const galleryImages = [
    product.imageSrc,
    product.imageSrc,
    product.imageSrc,
  ];

  // 5. Manejadores de Cantidad (+ / -)
  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleIncrement = () => {
    setQuantity((prev) => (prev < product.stock ? prev + 1 : prev));
  };

  // 6. Manejador de Añadir al Carrito con Zustand y Toast
  const handleAddToCart = () => {
    if (product.stock === 0) return;

    addToCart(product, quantity);

    toast.success("Agregado al carrito", {
      description: `${quantity}x ${product.title}`,
      style: {
        background: "#16191c",
        border: "1px solid #42938a",
        color: "#ffffff",
      },
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0f1113] text-[#ededed]">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-6 py-8 md:py-12 w-full">
        {/* BREADCRUMB GAMING */}
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center text-[11px] font-bold tracking-widest uppercase mb-8 md:mb-12">
          <Link href="/" className="text-gray-400 hover:text-[#42938a] transition-colors">
            Inicio
          </Link>
          <ChevronRight className="w-3.5 h-3.5 mx-2 text-gray-600" />
          <Link href={`/productos?category=${product.category.toLowerCase()}`} className="text-gray-400 hover:text-[#42938a] transition-colors">
            {product.category}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 mx-2 text-gray-600" />
          <span className="text-[#42938a] font-black truncate max-w-[200px] sm:max-w-none">
            {product.title}
          </span>
        </nav>

        {/* GRID PRINCIPAL RESPONSIVE (1 col móvil / 2 cols desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 items-start">
          
          {/* =========================================================================
              COLUMNA IZQUIERDA: GALERÍA DE IMÁGENES
              ========================================================================= */}
          <div className="flex flex-col gap-4">
            
            {/* Contenedor Cuadrado de Imagen Principal */}
            <div className="w-full aspect-square bg-white rounded-3xl relative flex items-center justify-center p-8 sm:p-12 border border-gray-800 shadow-[0_10px_30px_rgba(0,0,0,0.5)] overflow-hidden group">
              
              {/* INSIGNIA FLOTANTE (Badge) */}
              {product.badge ? (
                <span className={`absolute top-5 left-5 text-xs font-black px-3.5 py-1.5 rounded-xl uppercase tracking-wider z-10 shadow-lg ${
                  product.badge.toLowerCase().includes("vendido")
                    ? "bg-amber-400 text-black border border-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.4)]"
                    : "bg-[#42938a] text-black border border-teal-200 shadow-[0_0_15px_rgba(66,147,138,0.4)]"
                }`}>
                  {product.badge}
                </span>
              ) : product.isNew ? (
                <span className="absolute top-5 left-5 bg-[#42938a] text-black text-xs font-black px-3.5 py-1.5 rounded-xl uppercase tracking-wider z-10 shadow-[0_0_15px_rgba(66,147,138,0.4)] border border-teal-200">
                  Nuevo Lanzamiento
                </span>
              ) : null}

              {/* Imagen Principal */}
              <div className="relative w-full h-full group-hover:scale-105 transition-transform duration-500 ease-out">
                <Image
                  src={galleryImages[selectedImageIndex]}
                  alt={`Fotografía oficial de ${product.title}`}
                  fill
                  priority
                  className="object-contain filter drop-shadow-2xl"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Tira de 3 Miniaturas de Galería */}
            <div className="grid grid-cols-3 gap-4">
              {galleryImages.map((imgSrc, idx) => {
                const isActive = selectedImageIndex === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImageIndex(idx)}
                    aria-label={`Ver ángulo ${idx + 1} de ${product.title}`}
                    className={`relative aspect-square bg-white rounded-2xl p-3 border transition-all duration-200 overflow-hidden cursor-pointer ${
                      isActive
                        ? "border-[#42938a] ring-2 ring-[#42938a] shadow-[0_0_15px_rgba(66,147,138,0.3)]"
                        : "border-gray-800 hover:border-gray-600 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={imgSrc}
                        alt={`Miniatura ${idx + 1}`}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 33vw, 15vw"
                      />
                    </div>
                  </button>
                );
              })}
            </div>

          </div>

          {/* =========================================================================
              COLUMNA DERECHA: INFORMACIÓN Y CHECKOUT
              ========================================================================= */}
          <div className="flex flex-col bg-[#16191c] border border-gray-800 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl">
            
            {/* Categoría y SKU */}
            <div className="flex items-center justify-between gap-4 mb-3">
              <span className="text-[#42938a] font-black tracking-widest uppercase text-xs">
                {product.category}
              </span>
              <span className="text-gray-500 font-mono text-[11px] tracking-wider uppercase">
                SKU: {product.sku}
              </span>
            </div>

            {/* Título Principal */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4 leading-tight">
              {product.title}
            </h1>

            {/* Bloque de Precio y Stock */}
            <div className="mb-6 pb-6 border-b border-gray-800/80">
              {/* Precio Anterior Tachado (Descuento CRO) */}
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-base sm:text-lg text-gray-500 line-through font-bold">
                    ${product.compareAtPrice.toLocaleString("es-CO")}
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#42938a] bg-[#42938a]/10 px-2 py-0.5 rounded border border-[#42938a]/20">
                    Ahorras ${(product.compareAtPrice - product.price).toLocaleString("es-CO")}
                  </span>
                </div>
              )}

              {/* Precio Actual Formateado */}
              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-black text-white leading-none">
                  ${product.price.toLocaleString("es-CO")}
                </span>
                <span className="text-sm sm:text-base text-[#42938a] font-bold tracking-widest">
                  COP
                </span>
              </div>

              {/* Estado de Inventario */}
              <div className="mt-3">
                {product.stock > 0 ? (
                  <span className="inline-flex items-center gap-2 text-xs font-bold text-green-400 tracking-wider uppercase bg-green-500/10 border border-green-500/20 px-2.5 py-1 rounded-md">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    En Stock ({product.stock} disponibles • Despacho Inmediato)
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2 text-xs font-bold text-red-400 tracking-wider uppercase bg-red-500/10 border border-red-500/20 px-2.5 py-1 rounded-md">
                    <span className="w-2 h-2 rounded-full bg-red-400" />
                    Agotado Temporalmente
                  </span>
                )}
              </div>
            </div>

            {/* Descripción del Producto */}
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-8">
              {product.description}
            </p>

            {/* ACCIONES: SELECTOR DE CANTIDAD Y BOTÓN AÑADIR */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8">
              
              {/* Selector de Cantidad interactivo */}
              <div className="flex items-center justify-between sm:justify-start bg-[#0f1113] border border-gray-800 rounded-xl p-1 h-14 sm:w-40 flex-shrink-0">
                <button
                  type="button"
                  onClick={handleDecrement}
                  disabled={quantity <= 1 || product.stock === 0}
                  aria-label="Disminuir cantidad"
                  className="w-12 h-full flex items-center justify-center text-gray-400 hover:text-[#42938a] disabled:opacity-30 disabled:hover:text-gray-400 transition-colors cursor-pointer"
                >
                  <Minus className="w-4 h-4" />
                </button>

                <span className="flex-1 text-center font-black text-white text-base">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={handleIncrement}
                  disabled={quantity >= product.stock || product.stock === 0}
                  aria-label="Aumentar cantidad"
                  className="w-12 h-full flex items-center justify-center text-gray-400 hover:text-[#42938a] disabled:opacity-30 disabled:hover:text-gray-400 transition-colors cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Botón Principal Añadir al Carrito */}
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={`flex-1 h-14 rounded-xl font-black uppercase text-xs sm:text-sm tracking-widest flex items-center justify-center gap-3 transition-all duration-200 cursor-pointer shadow-lg active:scale-[0.98] ${
                  product.stock === 0
                    ? "bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700"
                    : "bg-[#42938a] text-black hover:bg-[#357a72] hover:shadow-[0_0_20px_rgba(66,147,138,0.4)]"
                }`}
                aria-label={`Añadir ${quantity} unidad(es) de ${product.title} al carrito`}
              >
                <ShoppingCart className="w-5 h-5" />
                <span>{product.stock === 0 ? "Producto Agotado" : "Añadir al Carrito"}</span>
              </button>
            </div>

            {/* ESPECIFICACIONES TÉCNICAS (SIMULADAS / HARDWARE SPECS) */}
            <div className="bg-[#0f1113] border border-gray-800/80 rounded-2xl p-5 mb-8">
              <h4 className="text-white font-black uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#42938a]" />
                Especificaciones Competitivas
              </h4>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="flex items-center gap-2 text-gray-400">
                  <Zap className="w-3.5 h-3.5 text-[#42938a]" />
                  <span>Latencia: <strong className="text-white">0.2 ms Ultra-Fast</strong></span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Cpu className="w-3.5 h-3.5 text-[#42938a]" />
                  <span>Sensor: <strong className="text-white">Grado Esports</strong></span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Layers className="w-3.5 h-3.5 text-[#42938a]" />
                  <span>Conexión: <strong className="text-white">Plug & Play USB/Tri-Mode</strong></span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#42938a]" />
                  <span>Garantía: <strong className="text-white">2 Años Oficial</strong></span>
                </div>
              </div>
            </div>

            {/* SEÑALES DE CONFIANZA Y GARANTÍA (CRO) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-gray-800/80">
              <div className="flex items-center gap-2.5 text-gray-400">
                <Truck className="w-4 h-4 text-[#42938a] flex-shrink-0" />
                <span className="text-[11px] font-bold uppercase tracking-wider">Envíos 24/48h</span>
              </div>
              <div className="flex items-center gap-2.5 text-gray-400">
                <ShieldCheck className="w-4 h-4 text-[#42938a] flex-shrink-0" />
                <span className="text-[11px] font-bold uppercase tracking-wider">Garantía Directa</span>
              </div>
              <div className="flex items-center gap-2.5 text-gray-400">
                <RotateCcw className="w-4 h-4 text-[#42938a] flex-shrink-0" />
                <span className="text-[11px] font-bold uppercase tracking-wider">30 Días Devolución</span>
              </div>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}