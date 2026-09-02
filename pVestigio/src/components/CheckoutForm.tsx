"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  User, 
  Mail, 
  Phone, 
  FileText, 
  MapPin, 
  Building, 
  CreditCard, 
  Smartphone, 
  Building2, 
  ShieldCheck, 
  Loader2, 
  Check, 
  Lock,
  ChevronDown
} from "lucide-react";
import { toast } from "sonner";

const CIUDADES_COLOMBIA = [
  { ciudad: "Bogotá D.C.", depto: "Cundinamarca" },
  { ciudad: "Medellín", depto: "Antioquia" },
  { ciudad: "Cali", depto: "Valle del Cauca" },
  { ciudad: "Barranquilla", depto: "Atlántico" },
  { ciudad: "Bucaramanga", depto: "Santander" },
  { ciudad: "Cartagena", depto: "Bolívar" },
  { ciudad: "Pereira", depto: "Risaralda" },
  { ciudad: "Manizales", depto: "Caldas" },
  { ciudad: "Santa Marta", depto: "Magdalena" },
  { ciudad: "Cúcuta", depto: "Norte de Santander" },
  { ciudad: "Ibagué", depto: "Tolima" },
  { ciudad: "Villavicencio", depto: "Meta" },
  { ciudad: "Pasto", depto: "Nariño" },
  { ciudad: "Armenia", depto: "Quindío" },
];

const BANCOS_PSE = [
  "Bancolombia",
  "Banco Davivienda",
  "Banco de Bogotá",
  "BBVA Colombia",
  "Banco de Occidente",
  "Banco Popular",
  "Scotiabank Colpatria",
  "Banco Falabella",
  "Lulo Bank",
  "Nu Colombia",
  "Nequi",
  "DaviPlata",
];

type PaymentMethod = "card" | "nequi" | "pse";

interface CheckoutFormProps {
  totalAmount?: number;
}

export default function CheckoutForm({ totalAmount }: CheckoutFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    documento: "",
    telefono: "",
    direccion: "",
    apartamento: "",
    ciudad: "Bogotá D.C.",
    departamento: "Cundinamarca",
    cardNumber: "",
    cardExp: "",
    cardCvc: "",
    cardHolder: "",
    nequiPhone: "",
    bancoPSE: "Bancolombia",
    tipoPersona: "natural",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "ciudad") {
      const encontrada = CIUDADES_COLOMBIA.find((c) => c.ciudad === value);
      if (encontrada) {
        setFormData((prev) => ({ ...prev, departamento: encontrada.depto }));
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("¡Pago procesado y verificado exitosamente!", {
        description: "Tu orden ha sido registrada en el sistema.",
        style: {
          border: "1px solid #42938a",
          background: "#16191c",
          color: "#fff",
        },
      });
      router.push("/checkout/success");
    }, 1800);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      
      <section className="bg-[#16191c] border border-gray-800 rounded-3xl p-6 md:p-8 shadow-xl">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-800/80">
          <span className="w-7 h-7 rounded-full bg-[#42938a] text-black font-black flex items-center justify-center text-xs shadow-[0_0_10px_rgba(66,147,138,0.4)]">
            1
          </span>
          <div>
            <h3 className="text-base font-black text-white uppercase tracking-wider">
              Información de Contacto
            </h3>
            <p className="text-xs text-gray-400">Datos para la factura y confirmación del pedido</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1.5 block">
              Nombre Completo *
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                name="nombre"
                required
                placeholder="Ej. Juan Carlos Rodríguez"
                value={formData.nombre}
                onChange={handleInputChange}
                className="w-full bg-[#0f1113] text-white border border-gray-800 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#42938a] focus:border-transparent transition-all placeholder:text-gray-600"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1.5 block">
              Correo Electrónico *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="email"
                name="email"
                required
                placeholder="juan@ejemplo.com"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full bg-[#0f1113] text-white border border-gray-800 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#42938a] focus:border-transparent transition-all placeholder:text-gray-600"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1.5 block">
              Teléfono Móvil (WhatsApp) *
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="tel"
                name="telefono"
                required
                placeholder="310 123 4567"
                value={formData.telefono}
                onChange={handleInputChange}
                className="w-full bg-[#0f1113] text-white border border-gray-800 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#42938a] focus:border-transparent transition-all placeholder:text-gray-600 font-mono"
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1.5 block">
              Cédula de Ciudadanía o NIT (Para facturación legal) *
            </label>
            <div className="relative">
              <FileText className="w-4 h-4 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                name="documento"
                required
                placeholder="Ej. 1020304050"
                value={formData.documento}
                onChange={handleInputChange}
                className="w-full bg-[#0f1113] text-white border border-gray-800 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#42938a] focus:border-transparent transition-all placeholder:text-gray-600 font-mono"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#16191c] border border-gray-800 rounded-3xl p-6 md:p-8 shadow-xl">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-800/80">
          <span className="w-7 h-7 rounded-full bg-[#42938a] text-black font-black flex items-center justify-center text-xs shadow-[0_0_10px_rgba(66,147,138,0.4)]">
            2
          </span>
          <div>
            <h3 className="text-base font-black text-white uppercase tracking-wider">
              Dirección de Envío
            </h3>
            <p className="text-xs text-gray-400">Cobertura nacional con entrega segura y asegurada</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1.5 block">
              Dirección de Residencia / Oficina *
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                name="direccion"
                required
                placeholder="Calle 100 # 15-20"
                value={formData.direccion}
                onChange={handleInputChange}
                className="w-full bg-[#0f1113] text-white border border-gray-800 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#42938a] focus:border-transparent transition-all placeholder:text-gray-600"
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1.5 block">
              Apartamento, Torre, Oficina o Casa (Opcional)
            </label>
            <div className="relative">
              <Building className="w-4 h-4 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                name="apartamento"
                placeholder="Apto 402 / Torre 3"
                value={formData.apartamento}
                onChange={handleInputChange}
                className="w-full bg-[#0f1113] text-white border border-gray-800 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#42938a] focus:border-transparent transition-all placeholder:text-gray-600"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1.5 block">
              Ciudad de Entrega *
            </label>
            <div className="relative">
              <select
                name="ciudad"
                required
                value={formData.ciudad}
                onChange={handleInputChange}
                className="w-full bg-[#0f1113] text-white border border-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#42938a] focus:border-transparent transition-all appearance-none cursor-pointer pr-10"
              >
                {CIUDADES_COLOMBIA.map((c) => (
                  <option key={c.ciudad} value={c.ciudad} className="bg-[#16191c] text-white">
                    {c.ciudad}
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-gray-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1.5 block">
              Departamento *
            </label>
            <input
              type="text"
              name="departamento"
              required
              readOnly
              value={formData.departamento}
              className="w-full bg-[#0f1113]/60 text-gray-300 border border-gray-800/80 rounded-xl px-4 py-3 text-sm focus:outline-none cursor-not-allowed"
            />
          </div>
        </div>
      </section>

      <section className="bg-[#16191c] border border-gray-800 rounded-3xl p-6 md:p-8 shadow-xl">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-800/80">
          <span className="w-7 h-7 rounded-full bg-[#42938a] text-black font-black flex items-center justify-center text-xs shadow-[0_0_10px_rgba(66,147,138,0.4)]">
            3
          </span>
          <div>
            <h3 className="text-base font-black text-white uppercase tracking-wider">
              Método de Pago
            </h3>
            <p className="text-xs text-gray-400">Transacción 100% encriptada y procesada al instante</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-6">
          <button
            type="button"
            onClick={() => setPaymentMethod("card")}
            className={`p-4 rounded-2xl border text-left transition-all relative flex flex-col justify-between cursor-pointer ${
              paymentMethod === "card"
                ? "bg-[#42938a]/10 border-[#42938a] shadow-[0_0_15px_rgba(66,147,138,0.25)]"
                : "bg-[#0f1113] border-gray-800 hover:border-gray-700"
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <CreditCard className={`w-6 h-6 ${paymentMethod === "card" ? "text-[#42938a]" : "text-gray-400"}`} />
              {paymentMethod === "card" && (
                <span className="w-4 h-4 rounded-full bg-[#42938a] flex items-center justify-center">
                  <Check className="w-3 h-3 text-black stroke-[3]" />
                </span>
              )}
            </div>
            <div>
              <p className="text-sm font-black text-white uppercase">Tarjeta</p>
              <p className="text-[10px] text-gray-500 font-medium">Crédito / Débito</p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setPaymentMethod("nequi")}
            className={`p-4 rounded-2xl border text-left transition-all relative flex flex-col justify-between cursor-pointer ${
              paymentMethod === "nequi"
                ? "bg-[#42938a]/10 border-[#42938a] shadow-[0_0_15px_rgba(66,147,138,0.25)]"
                : "bg-[#0f1113] border-gray-800 hover:border-gray-700"
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <Smartphone className={`w-6 h-6 ${paymentMethod === "nequi" ? "text-[#42938a]" : "text-gray-400"}`} />
              {paymentMethod === "nequi" && (
                <span className="w-4 h-4 rounded-full bg-[#42938a] flex items-center justify-center">
                  <Check className="w-3 h-3 text-black stroke-[3]" />
                </span>
              )}
            </div>
            <div>
              <p className="text-sm font-black text-white uppercase">Billeteras</p>
              <p className="text-[10px] text-gray-500 font-medium">Nequi / DaviPlata</p>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setPaymentMethod("pse")}
            className={`p-4 rounded-2xl border text-left transition-all relative flex flex-col justify-between cursor-pointer ${
              paymentMethod === "pse"
                ? "bg-[#42938a]/10 border-[#42938a] shadow-[0_0_15px_rgba(66,147,138,0.25)]"
                : "bg-[#0f1113] border-gray-800 hover:border-gray-700"
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <Building2 className={`w-6 h-6 ${paymentMethod === "pse" ? "text-[#42938a]" : "text-gray-400"}`} />
              {paymentMethod === "pse" && (
                <span className="w-4 h-4 rounded-full bg-[#42938a] flex items-center justify-center">
                  <Check className="w-3 h-3 text-black stroke-[3]" />
                </span>
              )}
            </div>
            <div>
              <p className="text-sm font-black text-white uppercase">PSE</p>
              <p className="text-[10px] text-gray-500 font-medium">Transferencia Bancaria</p>
            </div>
          </button>
        </div>

        <div className="p-5 bg-[#0f1113] border border-gray-800/80 rounded-2xl">
          {paymentMethod === "card" && (
            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1.5 block">
                  Número de Tarjeta
                </label>
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="4500 1234 5678 9010"
                  maxLength={19}
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  className="w-full bg-[#16191c] text-white border border-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#42938a] focus:border-transparent transition-all font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1.5 block">
                    Vencimiento (MM/AA)
                  </label>
                  <input
                    type="text"
                    name="cardExp"
                    placeholder="12/28"
                    maxLength={5}
                    value={formData.cardExp}
                    onChange={handleInputChange}
                    className="w-full bg-[#16191c] text-white border border-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#42938a] focus:border-transparent transition-all font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1.5 block">
                    Código CVC / CVV
                  </label>
                  <input
                    type="password"
                    name="cardCvc"
                    placeholder="•••"
                    maxLength={4}
                    value={formData.cardCvc}
                    onChange={handleInputChange}
                    className="w-full bg-[#16191c] text-white border border-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#42938a] focus:border-transparent transition-all font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1.5 block">
                  Nombre del Titular (Como aparece en la tarjeta)
                </label>
                <input
                  type="text"
                  name="cardHolder"
                  placeholder="JUAN CARLOS RODRIGUEZ"
                  value={formData.cardHolder}
                  onChange={handleInputChange}
                  className="w-full bg-[#16191c] text-white border border-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#42938a] focus:border-transparent transition-all uppercase"
                />
              </div>
            </div>
          )}

          {paymentMethod === "nequi" && (
            <div className="space-y-3">
              <label className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1.5 block">
                Número de Celular Nequi / DaviPlata
              </label>
              <input
                type="tel"
                name="nequiPhone"
                placeholder="310 987 6543"
                value={formData.nequiPhone}
                onChange={handleInputChange}
                className="w-full bg-[#16191c] text-white border border-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#42938a] focus:border-transparent transition-all font-mono"
              />
              <p className="text-xs text-gray-500">
                Al confirmar, recibirás una notificación push directa en tu aplicación para autorizar el cobro.
              </p>
            </div>
          )}

          {paymentMethod === "pse" && (
            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1.5 block">
                  Selecciona tu Entidad Financiera
                </label>
                <div className="relative">
                  <select
                    name="bancoPSE"
                    value={formData.bancoPSE}
                    onChange={handleInputChange}
                    className="w-full bg-[#16191c] text-white border border-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#42938a] focus:border-transparent transition-all appearance-none cursor-pointer pr-10"
                  >
                    {BANCOS_PSE.map((banco) => (
                      <option key={banco} value={banco} className="bg-[#16191c] text-white">
                        {banco}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-1.5 block">
                  Tipo de Cliente
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData((p) => ({ ...p, tipoPersona: "natural" }))}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold uppercase transition-all ${
                      formData.tipoPersona === "natural"
                        ? "bg-[#42938a]/10 border-[#42938a] text-[#42938a]"
                        : "bg-[#16191c] border-gray-800 text-gray-400"
                    }`}
                  >
                    Persona Natural
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData((p) => ({ ...p, tipoPersona: "juridica" }))}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold uppercase transition-all ${
                      formData.tipoPersona === "juridica"
                        ? "bg-[#42938a]/10 border-[#42938a] text-[#42938a]"
                        : "bg-[#16191c] border-gray-800 text-gray-400"
                    }`}
                  >
                    Persona Jurídica
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-4 px-6 rounded-2xl font-black uppercase text-sm tracking-widest transition-all flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(66,147,138,0.25)] cursor-pointer ${
            isSubmitting
              ? "bg-[#357a72] text-black/80 cursor-wait"
              : "bg-[#42938a] hover:bg-[#357a72] text-black hover:scale-[1.01]"
          }`}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>PROCESANDO PAGO...</span>
            </>
          ) : (
            <>
              <ShieldCheck className="w-5 h-5" />
              <span>CONFIRMAR Y PAGAR {totalAmount ? `$${totalAmount.toLocaleString("es-CO")} COP` : ""}</span>
            </>
          )}
        </button>

        <p className="text-[11px] text-gray-500 text-center mt-4 flex items-center justify-center gap-1.5 font-medium">
          <Lock className="w-3.5 h-3.5 text-[#42938a]" /> Transacción encriptada con certificado SSL 256-bit
        </p>
      </div>
    </form>
  );
}