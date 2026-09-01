"use client";

import { Mail, User, Phone, MapPin, CreditCard, Building } from 'lucide-react';

export default function CheckoutForm() {
  return (
    <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
      
      {/* SECCIÓN 1: CONTACTO */}
      <section>
        <h3 className="text-lg font-black text-white uppercase tracking-wider mb-4 flex items-center gap-2">
          <span className="bg-[#42938a] text-black w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
          Información de Contacto
        </h3>
        <div className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input 
              type="email" 
              placeholder="Correo electrónico" 
              className="w-full bg-[#0f1113] border border-gray-800 text-white rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-[#42938a] focus:ring-1 focus:ring-[#42938a] transition-all"
              required
            />
          </div>
          <div className="relative">
            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input 
              type="tel" 
              placeholder="Teléfono móvil" 
              className="w-full bg-[#0f1113] border border-gray-800 text-white rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-[#42938a] focus:ring-1 focus:ring-[#42938a] transition-all"
              required
            />
          </div>
        </div>
      </section>

      {/* SECCIÓN 2: ENVÍO */}
      <section>
        <h3 className="text-lg font-black text-white uppercase tracking-wider mb-4 flex items-center gap-2">
          <span className="bg-[#42938a] text-black w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span>
          Dirección de Envío
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative md:col-span-1">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input 
              type="text" 
              placeholder="Nombre" 
              className="w-full bg-[#0f1113] border border-gray-800 text-white rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-[#42938a] focus:ring-1 focus:ring-[#42938a] transition-all"
              required
            />
          </div>
          <div className="relative md:col-span-1">
            <input 
              type="text" 
              placeholder="Apellidos" 
              className="w-full bg-[#0f1113] border border-gray-800 text-white rounded-xl py-3 px-4 focus:outline-none focus:border-[#42938a] focus:ring-1 focus:ring-[#42938a] transition-all"
              required
            />
          </div>
          <div className="relative md:col-span-2">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input 
              type="text" 
              placeholder="Dirección completa (Calle, Carrera, etc.)" 
              className="w-full bg-[#0f1113] border border-gray-800 text-white rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-[#42938a] focus:ring-1 focus:ring-[#42938a] transition-all"
              required
            />
          </div>
          <div className="relative md:col-span-2">
            <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input 
              type="text" 
              placeholder="Apartamento, local, etc. (Opcional)" 
              className="w-full bg-[#0f1113] border border-gray-800 text-white rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-[#42938a] transition-all"
            />
          </div>
          <div className="relative md:col-span-1">
            <input 
              type="text" 
              placeholder="Ciudad" 
              className="w-full bg-[#0f1113] border border-gray-800 text-white rounded-xl py-3 px-4 focus:outline-none focus:border-[#42938a] focus:ring-1 focus:ring-[#42938a] transition-all"
              required
            />
          </div>
          <div className="relative md:col-span-1">
            <select 
              defaultValue="" 
              className="w-full bg-[#0f1113] border border-gray-800 text-gray-400 rounded-xl py-3 px-4 focus:outline-none focus:border-[#42938a] focus:ring-1 focus:ring-[#42938a] transition-all appearance-none cursor-pointer"
            >
              <option value="" disabled>Departamento</option> 
              <option value="bogota">Bogotá D.C.</option>
              <option value="cundinamarca">Cundinamarca</option>
              <option value="antioquia">Antioquia</option>
              <option value="valle">Valle del Cauca</option>
            </select>
          </div>
        </div> {/* <-- Estas etiquetas faltaban */}
      </section> {/* <-- Estas etiquetas faltaban */}

      {/* SECCIÓN 3: PAGO (Placeholder para la pasarela) */}
      <section>
        <h3 className="text-lg font-black text-white uppercase tracking-wider mb-4 flex items-center gap-2">
          <span className="bg-[#42938a] text-black w-6 h-6 rounded-full flex items-center justify-center text-xs">3</span>
          Método de Pago
        </h3>
        <div className="p-6 border border-gray-800 bg-[#0f1113] rounded-xl flex flex-col items-center justify-center text-center space-y-3">
          <CreditCard className="w-8 h-8 text-gray-600" />
          <p className="text-gray-400 text-sm">
            El sistema de pagos se activará en la siguiente fase de integración.
          </p>
        </div>
      </section>

    </form>
  );
}