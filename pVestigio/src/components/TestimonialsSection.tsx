import { Star, CheckCircle2, Quote, Trophy, Sparkles } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  handle: string;
  avatarText: string;
  comment: string;
  rating: number;
  highlight: string;
  verifiedTag: string;
}

const testimonials: Testimonial[] = [
  {
    id: "t-1",
    name: "Kronos_FPS",
    handle: "@kronos_pro",
    role: "Pro Player Valorant • Radiante",
    avatarText: "KR",
    rating: 5,
    highlight: "Latencia Cero & Precisión Milimétrica",
    comment: "El teclado mecánico con switches ópticos me dio esa ventaja en milisegundos que necesitas en competitivo. La respuesta táctil y la cero latencia de Vestigio están a otro nivel profesional.",
    verifiedTag: "Streamer Partner",
  },
  {
    id: "t-2",
    name: "ValenPlay",
    handle: "@valenplay_tv",
    role: "Creadora de Contenido & Twitch Partner",
    avatarText: "VP",
    rating: 5,
    highlight: "Setup Impecable & Autonomía Brutal",
    comment: "El mouse inalámbrico no pesa absolutamente nada, los clics son ultra consistentes y la base de carga RGB en el setup queda espectacular. Hago streams de 8 horas sin fatiga.",
    verifiedTag: "Creadora Verificada",
  },
  {
    id: "t-3",
    name: "DarthViper",
    handle: "@darth_viper",
    role: "Apex Legends Predator • Creador",
    avatarText: "DV",
    rating: 5,
    highlight: "Envío Rápido 24h & 2 Años de Garantía",
    comment: "Llegó a Medellín en menos de 24 horas en un empaque blindado de primer nivel. Saber que cuentan con 2 años de garantía oficial en Colombia te da una tranquilidad que nadie más ofrece.",
    verifiedTag: "Comprador Verificado",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 max-w-7xl mx-auto px-6 w-full relative">
      {/* Luz ambiental sutil decorativa */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-72 bg-[#42938a]/5 blur-[120px] rounded-full pointer-events-none" 
      />

      {/* HEADER DE LA SECCIÓN */}
      <div className="flex flex-col items-center text-center mb-16 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#16191c] border border-gray-800 text-xs font-black text-[#42938a] uppercase tracking-widest mb-4 shadow-[0_0_15px_rgba(66,147,138,0.15)]">
          <Trophy className="w-3.5 h-3.5 text-[#42938a]" />
          Aprobado por Profesionales
        </div>

        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">
          La Voz de los <span className="text-[#42938a]">Campeones</span>
        </h2>
        
        <p className="text-gray-400 mt-3 max-w-2xl text-sm sm:text-base leading-relaxed">
          Descubre por qué los mejores streamers y jugadores competitivos de Colombia eligen equipamiento <span className="text-white font-bold">VESTIGIO</span> para dominar cada partida.
        </p>

        {/* METRICA GLOBAL DE SATISFACCIÓN */}
        <div className="mt-8 inline-flex flex-wrap items-center justify-center gap-6 px-6 py-3 rounded-2xl bg-[#16191c]/80 border border-gray-800 backdrop-blur-md">
          <div className="flex items-center gap-1.5 text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
            <span className="text-white font-black text-sm ml-1.5">4.9 / 5.0</span>
          </div>
          <span className="hidden sm:inline text-gray-700">•</span>
          <span className="text-xs font-bold text-gray-400 tracking-wider uppercase">
            Más de <span className="text-[#42938a] font-black">2.500+</span> gamers satisfechos en todo el país
          </span>
        </div>
      </div>

      {/* GRID DE RESEÑAS EN TARJETAS OSCURAS (bg-[#0d0f12]) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
        {testimonials.map((item) => (
          <div 
            key={item.id}
            className="group relative bg-[#0d0f12] border border-gray-800 hover:border-[#42938a]/60 rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_12px_30px_rgba(66,147,138,0.15)]"
          >
            {/* Glow de esquina */}
            <div className="absolute top-0 right-0 w-28 h-28 bg-[#42938a]/5 rounded-bl-full pointer-events-none group-hover:bg-[#42938a]/10 transition-colors" />

            <div>
              {/* HEADER DE LA TARJETA */}
              <div className="flex items-center justify-between mb-6">
                {/* Estrellas */}
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Badge de Verificación */}
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#16191c] border border-gray-800 text-[10px] font-black text-[#42938a] uppercase tracking-wider">
                  <CheckCircle2 className="w-3 h-3 text-[#42938a]" />
                  {item.verifiedTag}
                </span>
              </div>

              {/* Titular de la reseña */}
              <h4 className="text-white font-black text-base uppercase tracking-tight mb-3 group-hover:text-[#42938a] transition-colors">
                "{item.highlight}"
              </h4>

              {/* Comentario */}
              <p className="text-gray-400 text-sm leading-relaxed mb-6 font-normal">
                {item.comment}
              </p>
            </div>

            {/* INFO DEL USUARIO / STREAMER */}
            <div className="pt-6 border-t border-gray-800/80 flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#16191c] to-[#0f1113] border border-[#42938a]/40 flex items-center justify-center text-white font-black text-sm tracking-wider shadow-inner">
                {item.avatarText}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-white font-bold text-sm tracking-wide">{item.name}</span>
                  <span className="text-gray-500 text-xs">{item.handle}</span>
                </div>
                <span className="text-xs text-gray-500 font-medium">{item.role}</span>
              </div>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}
