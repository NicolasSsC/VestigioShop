"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import { Search, SlidersHorizontal, ArrowDownWideNarrow, ChevronLeft, ChevronRight } from 'lucide-react';

// 1. Interfaz de Producto
interface Producto {
  id: string;
  title: string;
  category: 'Teclados' | 'Ratones' | 'Auriculares' | 'Alfombrillas' | 'Audio';
  description: string;
  price: number; // Cambiado a número para poder filtrar y ordenar matemáticamente
  imageSrc: string;
  isNew?: boolean;
}

// 2. Inventario Extendido de Vestigio (Precios numéricos)
const INVENTARIO: Producto[] = [
  { id: "m-001", title: "LOGITECH G502 HERO", category: "Ratones", description: "Sensor HERO 25K, 11 botones programables, pesas ajustables.", price: 45.00, imageSrc: "/images/logitech-g502.png", isNew: true },
  { id: "m-002", title: "ATTACK SHARK X11", category: "Ratones", description: "Ratón inalámbrico ultraligero, sensor PAW3311, base magnética.", price: 38.00, imageSrc: "/images/attack-shark-x11.png" },
  { id: "m-003", title: "RAZER DEATHADDER ESSENTIAL", category: "Ratones", description: "Sensor óptico de 6400 DPI, diseño ergonómico clásico, 5 botones.", price: 25.00, imageSrc: "/images/razer-deathadder.png" },
  { id: "m-004", title: "LOGITECH G102 LIGHTSYNC", category: "Ratones", description: "Sensor de 8000 DPI, iluminación RGB personalizable.", price: 20.00, imageSrc: "/images/logitech-g102.png" },
  { id: "k-001", title: "TECLADO MECÁNICO V1 PRO", category: "Teclados", description: "Switches Táctiles, RGB Adaptativo, Chasis de Aluminio Cepillado.", price: 65.00, imageSrc: "/images/teclado.png" },
  { id: "k-002", title: "TECLADO TKL SPEED", category: "Teclados", description: "Formato 80%, Switches Lineales rojos, ideal para esports.", price: 50.00, imageSrc: "/images/teclado-tkl.png" },
  { id: "k-003", title: "CORSAIR K70 RGB", category: "Teclados", description: "Mecánico de tamaño completo, switches Cherry MX Speed.", price: 120.00, imageSrc: "/images/corsair-k70.png" },
  { id: "p-001", title: "ALFOMBRILLA V4 CONTROL", category: "Alfombrillas", description: "Superficie de alta fricción para precisión extrema, bordes cosidos.", price: 18.00, imageSrc: "/images/alfombrilla1.png" },
  { id: "p-002", title: "ALFOMBRILLA V5 XL RGB", category: "Alfombrillas", description: "Tamaño extendido (900x400mm), iluminación perimetral dinámica.", price: 30.00, imageSrc: "/images/alfombrilla2.png" },
  { id: "h-001", title: "AURICULARES V3 SURROUND", category: "Auriculares", description: "Sonido envolvente 7.1 virtual, micrófono con cancelación de ruido.", price: 55.00, imageSrc: "/images/auriculares.png" },
  { id: "h-002", title: "HYPERX CLOUD II", category: "Auriculares", description: "Marco de aluminio duradero, espuma viscoelástica, audio 7.1.", price: 85.00, imageSrc: "/images/hyperx-cloud2.png" },
  { id: "a-001", title: "MICRÓFONO STREAMER M1", category: "Audio", description: "Patrón polar cardioide, monitoreo de latencia cero, conexión USB.", price: 75.00, imageSrc: "/images/microfono.png" },
];

const ITEMS_POR_PAGINA = 8; // Límite de productos por página para la paginación

export default function ProductosPage() {
  // 3. Estados robustos para todas las funcionalidades
  const [categoriaActiva, setCategoriaActiva] = useState<string>('Todos');
  const [busqueda, setBusqueda] = useState<string>('');
  const [orden, setOrden] = useState<string>('destacados'); // destacados, precio-asc, precio-desc, nombre-asc
  const [precioMaximo, setPrecioMaximo] = useState<number>(150);
  const [paginaActual, setPaginaActual] = useState<number>(1);

  const categorias = ['Todos', 'Teclados', 'Ratones', 'Auriculares', 'Alfombrillas', 'Audio'];

  // 4. Lógica de Filtrado, Búsqueda y Ordenamiento Combinada
  const productosProcesados = useMemo(() => {
    // A. Filtrar
    let filtrados = INVENTARIO.filter((prod) => {
      const coincideCategoria = categoriaActiva === 'Todos' || prod.category === categoriaActiva;
      const coincideBusqueda = prod.title.toLowerCase().includes(busqueda.toLowerCase()) || 
                               prod.description.toLowerCase().includes(busqueda.toLowerCase());
      const coincidePrecio = prod.price <= precioMaximo;
      
      return coincideCategoria && coincideBusqueda && coincidePrecio;
    });

    // B. Ordenar
    switch (orden) {
      case 'precio-asc':
        filtrados.sort((a, b) => a.price - b.price);
        break;
      case 'precio-desc':
        filtrados.sort((a, b) => b.price - a.price);
        break;
      case 'nombre-asc':
        filtrados.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        // 'destacados' asume el orden original o lógica personalizada (ej. isNew primero)
        filtrados.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
    }

    return filtrados;
  }, [categoriaActiva, busqueda, precioMaximo, orden]);

  // C. Calcular Paginación
  const totalPaginas = Math.ceil(productosProcesados.length / ITEMS_POR_PAGINA);
  const productosPaginados = productosProcesados.slice(
    (paginaActual - 1) * ITEMS_POR_PAGINA,
    paginaActual * ITEMS_POR_PAGINA
  );

  // Resetear la página si cambian los filtros
  useMemo(() => {
    setPaginaActual(1);
  }, [categoriaActiva, busqueda, precioMaximo, orden]);

  return (
    <div className="min-h-screen flex flex-col bg-[#0f1113] text-white">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-6 py-10 w-full">
        
        {/* Cabecera */}
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-wider text-[#42938a] uppercase mb-2">
            CATÁLOGO DE PRODUCTOS
          </h1>
          <p className="text-gray-400 text-sm max-w-2xl">
            Explora todos los periféricos y componentes diseñados para llevar tu setup al siguiente nivel. Equipamiento de alto rendimiento para jugadores exigentes.
          </p>
        </div>

        {/* Barra de Controles (Buscador, Orden y Filtro de Precio) */}
        <div className="bg-[#16191c] border border-gray-800 rounded-2xl p-5 mb-8 flex flex-col lg:flex-row gap-6 justify-between items-center shadow-lg">
          
          {/* Buscador */}
          <div className="relative w-full lg:w-1/3">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-[#42938a]" />
            </div>
            <input
              type="text"
              placeholder="Buscar por nombre o característica..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-[#0f1113] border border-gray-700 rounded-xl text-sm text-gray-200 focus:outline-none focus:border-[#42938a] transition-all"
            />
          </div>

          {/* Controles de Filtro y Orden */}
          <div className="flex flex-col sm:flex-row gap-6 w-full lg:w-auto items-center">
            
            {/* Rango de Precio */}
            <div className="flex flex-col w-full sm:w-48">
              <div className="flex justify-between text-xs text-gray-400 mb-1 font-semibold">
                <span>Presupuesto Máx:</span>
                <span className="text-[#42938a]">${precioMaximo}</span>
              </div>
              <input 
                type="range" 
                min="10" 
                max="200" 
                step="5"
                value={precioMaximo}
                onChange={(e) => setPrecioMaximo(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#42938a]"
              />
            </div>

            <div className="h-10 w-px bg-gray-700 hidden sm:block"></div>

            {/* Selector de Ordenamiento */}
            <div className="relative w-full sm:w-56">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <ArrowDownWideNarrow className="h-4 w-4 text-gray-400" />
              </div>
              <select
                value={orden}
                onChange={(e) => setOrden(e.target.value)}
                className="w-full pl-10 pr-8 py-3 bg-[#0f1113] border border-gray-700 rounded-xl text-sm text-gray-300 appearance-none focus:outline-none focus:border-[#42938a] cursor-pointer"
              >
                <option value="destacados">Destacados</option>
                <option value="precio-asc">Precio: Menor a Mayor</option>
                <option value="precio-desc">Precio: Mayor a Menor</option>
                <option value="nombre-asc">Nombre: A - Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Filtros de Categorías (Píldoras) */}
        <div className="flex flex-wrap gap-3 mb-10 pb-6 border-b border-gray-800">
          <div className="flex items-center text-gray-500 mr-2 text-sm font-bold">
            <SlidersHorizontal className="w-4 h-4 mr-2" /> Categorías:
          </div>
          {categorias.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoriaActiva(cat)}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                categoriaActiva === cat
                  ? "bg-[#42938a] text-black shadow-[0_0_15px_rgba(66,147,138,0.4)] transform scale-105"
                  : "bg-[#16191c] border border-gray-700 text-gray-400 hover:border-[#42938a] hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Resumen de resultados */}
        <div className="text-sm text-gray-500 mb-6">
          Mostrando {productosPaginados.length} de {productosProcesados.length} resultados
        </div>

        {/* Grid de Productos o Estado Vacío */}
        {productosPaginados.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {productosPaginados.map((prod) => (
              <Link href={`/productos/${prod.id}`} key={prod.id} className="block group">
                <ProductCard
                  title={prod.title}
                  category={prod.category}
                  description={prod.description}
                  price={`$${prod.price.toFixed(2)}`} // Formateamos el número a string para el componente
                  imageSrc={prod.imageSrc}
                  hasButton={true}
                  buttonText="VER DETALLES"
                  buttonVariant="outline"
                  isSelected={prod.isNew} // Usamos la propiedad visual si es nuevo
                />
              </Link>
            ))}
          </div>
        ) : (
          <div className="w-full py-24 flex flex-col items-center justify-center text-center bg-[#16191c] border border-gray-800 rounded-2xl">
            <div className="text-[#42938a] mb-5 p-4 bg-[#42938a]/10 rounded-full">
              <Search className="h-10 w-10 opacity-80" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Sin coincidencias</h3>
            <p className="text-gray-400 text-sm max-w-md">
              No encontramos periféricos que coincidan con tus filtros actuales. Intenta aumentar el presupuesto o buscar un término diferente.
            </p>
            <button 
              onClick={() => { setBusqueda(''); setCategoriaActiva('Todos'); setPrecioMaximo(200); }}
              className="mt-6 px-6 py-2 border border-[#42938a] text-[#42938a] rounded-full text-sm font-bold hover:bg-[#42938a] hover:text-black transition-colors"
            >
              Limpiar todos los filtros
            </button>
          </div>
        )}

        {/* Paginación */}
        {totalPaginas > 1 && (
          <div className="mt-14 flex justify-center items-center gap-4">
            <button 
              onClick={() => setPaginaActual(prev => Math.max(prev - 1, 1))}
              disabled={paginaActual === 1}
              className="p-2 rounded-full bg-[#16191c] border border-gray-700 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#42938a] transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <span className="text-sm font-medium text-gray-400">
              Página <span className="text-white">{paginaActual}</span> de {totalPaginas}
            </span>

            <button 
              onClick={() => setPaginaActual(prev => Math.min(prev + 1, totalPaginas))}
              disabled={paginaActual === totalPaginas}
              className="p-2 rounded-full bg-[#16191c] border border-gray-700 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#42938a] transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}

      </main>
    </div>
  );
}