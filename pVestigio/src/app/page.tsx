import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0f1113] text-white">
      {/* Barra de Navegación */}
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-6 py-10 w-full">
        {/* Título Principal tipo Hero */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-wider text-[#42938a] mb-2 uppercase">
            DOMINA EL JUEGO
          </h1>
          <p className="text-gray-400 text-sm md:text-base tracking-wide">
            La tecnología que permanece
          </p>
        </div>

        {/* Sección Superior: Teclado y Ratón Destacados */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-w-4xl mx-auto">
          <div className="bg-[#16191c] border border-[#2a2e33] rounded-xl p-6 flex flex-col items-center">
            <div className="h-44 flex items-center justify-center mb-4">
              <span className="text-gray-500 text-xs">[Imagen Teclado Mecánico V1]</span>
            </div>
            <h2 className="text-lg font-bold text-white mb-1">TECLADO MECÁNICO V1</h2>
            <p className="text-gray-400 text-xs mb-1">Teclado</p>
            <p className="text-gray-500 text-xs text-center mb-6">Switches Táctiles, RGB Adaptativa, Diseño de Aluminio</p>
            <div className="w-full mt-auto">
              <button className="w-full py-2.5 rounded-full border border-[#42938a] text-[#42938a] text-xs font-bold tracking-wider hover:bg-[#42938a]/10 transition-colors">
                VER PRODUCTO
              </button>
            </div>
          </div>

          <div className="bg-[#16191c] border border-[#2a2e33] rounded-xl p-6 flex flex-col items-center">
            <div className="h-44 flex items-center justify-center mb-4">
              <span className="text-gray-500 text-xs">[Imagen Ratón Gamer R2]</span>
            </div>
            <h2 className="text-lg font-bold text-white mb-1">RATÓN GAMER R2</h2>
            <p className="text-gray-400 text-xs mb-1">Ratón</p>
            <p className="text-gray-500 text-xs text-center mb-6">Sensor de 26k DPI, 11 Botones Programables</p>
            <div className="w-full mt-auto">
              <button className="w-full py-2.5 rounded-full bg-[#42938a] text-black text-xs font-bold tracking-wider hover:bg-[#33746d] transition-colors">
                AGREGAR AL CARRITO
              </button>
            </div>
          </div>
        </div>

        {/* Sección Inferior: Destacados del Mes */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-xl md:text-2xl font-bold tracking-widest text-white uppercase">
              DESTACADOS DEL MES
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <ProductCard 
              title="AURICULARES V3" 
              category="Auriculares" 
              description="Switches Táctiles, RGB Adaptativa, Diseño de Aluminio" 
              price="$25.00" 
              imageSrc="/path-to-image.png" 
            />
            <ProductCard 
              title="ALFOMBRILLA V4" 
              category="Alfombrilla" 
              description="Alfombrilla de alta calidad, Antideslizante, Micro de alta precisión" 
              price="$26.00" 
              imageSrc="/path-to-image.png" 
            />
            <ProductCard 
              title="ALFOMBRILLA V5" 
              category="Alfombrilla" 
              description="Sensor de 26k DPI, 11 RGB Adaptativa, Diseño de Aluminio" 
              price="$24.00" 
              imageSrc="/path-to-image.png" 
              isSelected={true} 
            />
            <ProductCard 
              title="RATÓN GAMER R2" 
              category="Ratón" 
              description="Sensor de 26k DPI, 11 Botones Programables" 
              price="$25.00" 
              imageSrc="/path-to-image.png" 
            />
          </div>
        </section>
      </main>
    </div>
  );
}