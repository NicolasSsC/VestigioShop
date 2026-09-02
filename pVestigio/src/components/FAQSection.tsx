"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle, MessageSquare, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  tag: string;
}

const faqs: FAQItem[] = [
  {
    id: "faq-1",
    question: "¿De qué material son los switches?",
    answer: "Nuestros teclados incorporan switches mecánicos y ópticos de grado profesional (Outemu, Huano, Gateron y Kailh) con contactos en aleación de oro y carcasas de policarbonato reforzado. Ofrecen una durabilidad comprobada de más de 60 a 80 millones de pulsaciones, lubricación de fábrica y soporte Hot-Swap para que puedas cambiarlos fácilmente sin soldar.",
    tag: "Hardware & Switches",
  },
  {
    id: "faq-2",
    question: "¿Cuánto tarda el envío en Colombia?",
    answer: "Procesamos y despachamos tu pedido en menos de 24 horas hábiles. En ciudades principales (Bogotá, Medellín, Cali, Barranquilla, Bucaramanga) la entrega toma entre 24 y 48 horas hábiles. Para el resto del país, entre 2 y 4 días hábiles mediante Servientrega, Coordinadora e Interrapidísimo con número de guía rastreable en tiempo real.",
    tag: "Logística y Envíos",
  },
  {
    id: "faq-3",
    question: "¿Tienen garantía los periféricos?",
    answer: "Sí, todos los productos comercializados en VESTIGIO cuentan con 2 años de Garantía Oficial directa contra cualquier defecto de fabricación, fallas en sensores, botones o circuitos. Además, te ofrecemos 30 días de satisfacción total: si no estás 100% satisfecho, gestionamos el cambio o devolución de tu dinero sin complicaciones.",
    tag: "Garantía Oficial",
  },
  {
    id: "faq-4",
    question: "¿Qué métodos de pago aceptan?",
    answer: "Aceptamos pagos 100% seguros mediante PSE, Tarjetas de Crédito y Débito (Visa, Mastercard, American Express), transferencias Nequi y Daviplata, además de pagos en efectivo vía Efecty. Todos los pagos están encriptados con seguridad bancaria SSL de 256-bit.",
    tag: "Pagos Seguros",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // El primero abierto por defecto

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 max-w-5xl mx-auto px-6 w-full relative">
      {/* Luz ambiental de fondo */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#42938a]/5 blur-[100px] rounded-full pointer-events-none" 
      />

      {/* HEADER DE LA SECCIÓN */}
      <div className="text-center mb-16 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#16191c] border border-gray-800 text-xs font-black text-[#42938a] uppercase tracking-widest mb-4 shadow-[0_0_15px_rgba(66,147,138,0.15)]">
          <HelpCircle className="w-3.5 h-3.5 text-[#42938a]" />
          Respuestas Claras
        </div>

        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-white">
          Preguntas <span className="text-[#42938a]">Frecuentes</span>
        </h2>

        <p className="text-gray-400 mt-3 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
          Resolvemos tus dudas sobre nuestros periféricos gaming, tiempos de despacho y cobertura de garantía.
        </p>
      </div>

      {/* ACORDEÓN INTERACTIVO */}
      <div className="space-y-4 relative z-10">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={faq.id}
              className={`border rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-300 ${
                isOpen 
                  ? "bg-[#16191c] border-[#42938a]/60 shadow-[0_8px_25px_rgba(66,147,138,0.15)]" 
                  : "bg-[#16191c]/60 border-gray-800 hover:border-gray-700 hover:bg-[#16191c]"
              }`}
            >
              {/* BOTÓN PREGUNTA */}
              <button
                type="button"
                onClick={() => toggleFAQ(index)}
                aria-expanded={isOpen}
                className="w-full px-6 py-5 sm:px-8 sm:py-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <span className="text-xs font-black text-[#42938a] uppercase tracking-wider px-2 py-0.5 rounded bg-[#42938a]/10 border border-[#42938a]/20 w-fit">
                    {faq.tag}
                  </span>
                  <span className={`text-base sm:text-lg font-extrabold uppercase tracking-tight transition-colors ${
                    isOpen ? "text-white" : "text-gray-300 hover:text-white"
                  }`}>
                    {faq.question}
                  </span>
                </div>

                <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                  isOpen 
                    ? "bg-[#42938a] text-black rotate-180 shadow-[0_0_10px_rgba(66,147,138,0.4)]" 
                    : "bg-[#0f1113] text-gray-400 border border-gray-800"
                }`}>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {/* CONTENIDO RESPUESTA DESPLEGABLE */}
              <div
                className={`grid transition-all duration-300 ease-in-out px-6 sm:px-8 ${
                  isOpen 
                    ? "grid-rows-[1fr] opacity-100 pb-6 sm:pb-8 pt-0" 
                    : "grid-rows-[0fr] opacity-0 pb-0 pt-0"
                }`}
              >
                <div className="overflow-hidden border-t border-gray-800/80 pt-4">
                  <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* BANNER INFERIOR DE SOPORTE DIRECTO */}
      <div className="mt-12 text-center relative z-10 p-6 rounded-2xl bg-[#0d0f12] border border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-left">
          <div className="w-10 h-10 rounded-xl bg-[#16191c] border border-gray-800 flex items-center justify-center flex-shrink-0">
            <MessageSquare className="w-5 h-5 text-[#42938a]" />
          </div>
          <div>
            <h5 className="text-white font-bold text-sm">¿Tienes alguna otra duda o consulta específica?</h5>
            <p className="text-gray-500 text-xs">Nuestro equipo de soporte técnico gamer responde en minutos.</p>
          </div>
        </div>

        <Link
          href="/productos"
          className="px-5 py-2.5 bg-[#42938a]/15 text-[#42938a] hover:bg-[#42938a] hover:text-black border border-[#42938a]/30 font-black text-xs uppercase tracking-widest rounded-xl transition-all whitespace-nowrap"
        >
          Contactar Soporte
        </Link>
      </div>

    </section>
  );
}
