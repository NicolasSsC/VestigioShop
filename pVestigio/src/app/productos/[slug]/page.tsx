"use client";

import { useState } from "react";
import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { 
  ChevronRight, 
  ShieldCheck, 
  Truck, 
  Zap, 
  RotateCcw, 
  ArrowLeft,
  Cpu,
  Layers,
  Sliders,
  Minus,
  Plus,
  ShoppingCart
} from "lucide-react";
import { mockInventory } from "@/data/mockInventory";
import { useCartStore } from "@/store/useCartStore";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Colores hardcodeados para la demostración visual
const AVAILABLE_COLORS = [
  { id: 'black', hex: '#0f1113', name: 'Phantom Black' },
  { id: 'white', hex: '#ededed', name: 'Arctic White' },
];

const AVAILABLE_SWITCHES = [
  { id: 'red', name: 'Red (Lineal)', color: 'bg-red-500' },
  { id: 'blue', name: 'Blue (Clicky)', color: 'bg-blue-500' },
  { id: 'brown', name: 'Brown (Táctil)', color: 'bg-amber-700' },
];

export default function ProductDetailPage() {
  const params = useParams();
  const rawSlug = params?.slug;
  const slug = typeof rawSlug === "string" ? rawSlug : Array.isArray(rawSlug) ? rawSlug[0] : "";

  // 1. Buscamos el producto
  const product = mockInventory.find((p) => p.slug === slug);

  // 2. Estados locales
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [selectedColor, setSelectedColor] = useState<string>(AVAILABLE_COLORS[0].id);
  const [selectedSwitch, setSelectedSwitch] = useState<string>(AVAILABLE_SWITCHES[0].id);

  // 3. Si no existe, llama a notFound() de Next.js
  if (!product) {
    notFound();
  }

  // Zustand
  const addToCart = useCartStore((state) => state.addToCart);

  const galleryImages = [
    product.imageSrc,
    product.imageSrc,
    product.imageSrc,
  ];

  const handleDecrement = () => setQuantity((prev) => Math.max(1, prev - 1));
  const handleIncrement = () => setQuantity((prev) => Math.min(product.stock, prev + 1));

  const handleAddToCart = () => {
    if (product.stock === 0) return;
    
    // Llamamos a la acción del store enviando solo el ID (Múltiples veces según quantity)
    for (let i = 0; i < quantity; i++) {
      addToCart(product.id);
    }

    toast.success("Agregado al carrito", {
      description: `${quantity}x ${product.title}`,
      style: { borderColor: "#42938a" },
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-[#0f1113] text-gray-900 dark:text-[#ededed] transition-colors duration-300">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-6 py-8 md:py-12 w-full">
        {/* BREADCRUMB */}
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center text-[11px] font-bold tracking-widest uppercase mb-8 md:mb-12">
          <Link href="/" className="text-gray-500 dark:text-gray-400 hover:text-[#42938a] dark:hover:text-[#42938a] transition-colors">
            Inicio
          </Link>
          <ChevronRight className="w-3.5 h-3.5 mx-2 text-gray-400 dark:text-gray-600" />
          <Link href={`/productos?category=${product.category.toLowerCase()}`} className="text-gray-500 dark:text-gray-400 hover:text-[#42938a] dark:hover:text-[#42938a] transition-colors">
            {product.category}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 mx-2 text-gray-400 dark:text-gray-600" />
          <span className="text-[#42938a] font-black truncate max-w-[200px] sm:max-w-none">
            {product.title}
          </span>
        </nav>

        {/* GRID PRINCIPAL */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 items-start">
          
          {/* COLUMNA IZQUIERDA: GALERÍA */}
          <div className="flex flex-col gap-4">
            <div className="w-full aspect-square bg-white dark:bg-[#16191c] rounded-3xl relative flex items-center justify-center p-8 sm:p-12 border border-gray-200 dark:border-gray-800 shadow-xl overflow-hidden group transition-colors">
              
              {product.badge ? (
                <span className={`absolute top-5 left-5 text-xs font-black px-3.5 py-1.5 rounded-xl uppercase tracking-wider z-10 shadow-lg ${
                  product.badge.toLowerCase().includes("vendido")
                    ? "bg-amber-400 text-black border border-amber-300"
                    : "bg-[#42938a] text-black border border-teal-200"
                }`}>
                  {product.badge}
                </span>
              ) : product.isNew ? (
                <span className="absolute top-5 left-5 bg-[#42938a] text-black text-xs font-black px-3.5 py-1.5 rounded-xl uppercase tracking-wider z-10 shadow-lg border border-teal-200">
                  Nuevo
                </span>
              ) : null}

              <div className="relative w-full h-full group-hover:scale-105 transition-transform duration-500 ease-out">
                <Image
                  src={galleryImages[selectedImageIndex]}
                  alt={product.title}
                  fill
                  priority
                  className="object-contain drop-shadow-xl"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* MINIATURAS */}
            <div className="grid grid-cols-3 gap-4">
              {galleryImages.map((imgSrc, idx) => {
                const isActive = selectedImageIndex === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative aspect-square bg-white dark:bg-[#16191c] rounded-2xl p-3 border transition-all duration-200 overflow-hidden cursor-pointer ${
                      isActive
                        ? "border-[#42938a] ring-2 ring-[#42938a] shadow-md"
                        : "border-gray-200 dark:border-gray-800 hover:border-[#42938a] opacity-70 hover:opacity-100"
                    }`}
                  >
                    <div className="relative w-full h-full">
                      <Image src={imgSrc} alt={`Mini ${idx}`} fill className="object-contain" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* COLUMNA DERECHA: INFO Y COMPRA */}
          <div className="flex flex-col bg-white dark:bg-[#16191c] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl transition-colors">
            
            <div className="flex items-center justify-between gap-4 mb-3">
              <span className="text-[#42938a] font-black tracking-widest uppercase text-xs">
                {product.category}
              </span>
              <span className="text-gray-400 dark:text-gray-500 font-mono text-[11px] tracking-wider uppercase">
                SKU: {product.sku}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 dark:text-white uppercase tracking-tighter mb-4 leading-tight">
              {product.title}
            </h1>

            {/* PRECIO */}
            <div className="mb-6 pb-6 border-b border-gray-100 dark:border-gray-800/80">
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-base sm:text-lg text-gray-400 dark:text-gray-500 line-through font-bold">
                    ${product.compareAtPrice.toLocaleString("es-CO")}
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#42938a] bg-[#42938a]/10 px-2 py-0.5 rounded border border-[#42938a]/20">
                    Ahorras ${(product.compareAtPrice - product.price).toLocaleString("es-CO")}
                  </span>
                </div>
              )}

              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white leading-none">
                  ${product.price.toLocaleString("es-CO")}
                </span>
                <span className="text-sm sm:text-base text-[#42938a] font-bold tracking-widest">
                  COP
                </span>
              </div>
            </div>

            {/* VARIANTES: COLORES */}
            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">
                Color Seleccionado: <span className="text-gray-900 dark:text-white">{AVAILABLE_COLORS.find(c => c.id === selectedColor)?.name}</span>
              </h4>
              <div className="flex gap-3">
                {AVAILABLE_COLORS.map(color => (
                  <button
                    key={color.id}
                    onClick={() => setSelectedColor(color.id)}
                    className={`w-10 h-10 rounded-full border-2 transition-transform ${
                      selectedColor === color.id 
                        ? 'border-[#42938a] scale-110 shadow-md' 
                        : 'border-transparent hover:scale-105 border-gray-200 dark:border-gray-700'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    aria-label={`Seleccionar color ${color.name}`}
                  />
                ))}
              </div>
            </div>

            {/* VARIANTES: SWITCHES (SOLO TECLADOS) */}
            {product.category.toLowerCase() === 'teclados' && (
              <div className="mb-8">
                <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">
                  Tipo de Switch
                </h4>
                <div className="flex flex-wrap gap-2">
                  {AVAILABLE_SWITCHES.map(sw => (
                    <button
                      key={sw.id}
                      onClick={() => setSelectedSwitch(sw.id)}
                      className={`px-4 py-2 rounded-xl text-xs font-black tracking-wider uppercase transition-all border ${
                        selectedSwitch === sw.id
                          ? 'bg-[#42938a]/10 border-[#42938a] text-[#42938a]'
                          : 'bg-transparent border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                    >
                      <span className={`inline-block w-2 h-2 rounded-full mr-2 ${sw.color}`} />
                      {sw.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed mb-8">
              {product.description}
            </p>

            {/* ACCIONES Y CANTIDAD */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-8">
              <div className="flex items-center justify-between sm:justify-start bg-gray-50 dark:bg-[#0f1113] border border-gray-200 dark:border-gray-800 rounded-xl p-1 h-14 sm:w-40 flex-shrink-0">
                <button
                  type="button"
                  onClick={handleDecrement}
                  disabled={quantity <= 1 || product.stock === 0}
                  className="w-12 h-full flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-[#42938a] dark:hover:text-[#42938a] disabled:opacity-30 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="flex-1 text-center font-black text-gray-900 dark:text-white text-base">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={handleIncrement}
                  disabled={quantity >= product.stock || product.stock === 0}
                  className="w-12 h-full flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-[#42938a] dark:hover:text-[#42938a] disabled:opacity-30 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={`flex-1 h-14 rounded-xl font-black uppercase text-xs sm:text-sm tracking-widest flex items-center justify-center gap-3 transition-all duration-200 cursor-pointer shadow-lg active:scale-[0.98] ${
                  product.stock === 0
                    ? "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed border border-gray-200 dark:border-gray-700"
                    : "bg-[#42938a] text-black hover:bg-[#357a72] hover:shadow-[0_0_20px_rgba(66,147,138,0.4)]"
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
                <span>{product.stock === 0 ? "Agotado" : "Añadir al Carrito"}</span>
              </button>
            </div>

            {/* ESPECIFICACIONES (HARDWARE SPECS) */}
            <div className="bg-gray-50 dark:bg-[#0f1113] border border-gray-200 dark:border-gray-800/80 rounded-2xl p-5 mb-8">
              <h4 className="text-gray-900 dark:text-white font-black uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-[#42938a]" />
                Especificaciones
              </h4>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Zap className="w-3.5 h-3.5 text-[#42938a]" />
                  <span>Latencia: <strong className="text-gray-900 dark:text-white">0.2 ms</strong></span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Cpu className="w-3.5 h-3.5 text-[#42938a]" />
                  <span>Sensor: <strong className="text-gray-900 dark:text-white">Grado Esports</strong></span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <Layers className="w-3.5 h-3.5 text-[#42938a]" />
                  <span>Conexión: <strong className="text-gray-900 dark:text-white">Tri-Mode</strong></span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#42938a]" />
                  <span>Garantía: <strong className="text-gray-900 dark:text-white">2 Años</strong></span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
