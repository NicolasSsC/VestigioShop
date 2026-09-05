'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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
  Check,
  Lock,
} from 'lucide-react';
import { toast } from 'sonner';

import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';

// ─────────────────────────────────────────────
// Datos estáticos
// ─────────────────────────────────────────────
const CIUDADES_COLOMBIA = [
  { ciudad: 'Bogotá D.C.', depto: 'Cundinamarca' },
  { ciudad: 'Medellín', depto: 'Antioquia' },
  { ciudad: 'Cali', depto: 'Valle del Cauca' },
  { ciudad: 'Barranquilla', depto: 'Atlántico' },
  { ciudad: 'Bucaramanga', depto: 'Santander' },
  { ciudad: 'Cartagena', depto: 'Bolívar' },
  { ciudad: 'Pereira', depto: 'Risaralda' },
  { ciudad: 'Manizales', depto: 'Caldas' },
  { ciudad: 'Santa Marta', depto: 'Magdalena' },
  { ciudad: 'Cúcuta', depto: 'Norte de Santander' },
  { ciudad: 'Ibagué', depto: 'Tolima' },
  { ciudad: 'Villavicencio', depto: 'Meta' },
  { ciudad: 'Pasto', depto: 'Nariño' },
  { ciudad: 'Armenia', depto: 'Quindío' },
];

const CIUDAD_OPTIONS = CIUDADES_COLOMBIA.map((c) => ({
  value: c.ciudad,
  label: c.ciudad,
}));

const BANCO_OPTIONS = [
  'Bancolombia',
  'Banco Davivienda',
  'Banco de Bogotá',
  'BBVA Colombia',
  'Banco de Occidente',
  'Banco Popular',
  'Scotiabank Colpatria',
  'Banco Falabella',
  'Lulo Bank',
  'Nu Colombia',
  'Nequi',
  'DaviPlata',
].map((b) => ({ value: b, label: b }));

// ─────────────────────────────────────────────
// Helpers de enmascaramiento
// ─────────────────────────────────────────────
function maskCardNumber(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 16);
  return digits.replace(/(\d{4})(?=\d)/g, '$1 ');
}

function maskCardExp(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 4);
  if (digits.length >= 3) return digits.slice(0, 2) + '/' + digits.slice(2);
  if (digits.length === 2) return digits + '/';
  return digits;
}

// ─────────────────────────────────────────────
// Sub-componente: cabecera de sección numerada
// ─────────────────────────────────────────────
function SectionHeader({
  step,
  title,
  subtitle,
}: {
  step: number;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-800/80">
      <span className="w-7 h-7 rounded-full bg-[#42938a] text-black font-black flex items-center justify-center text-xs shadow-[0_0_10px_rgba(66,147,138,0.4)]">
        {step}
      </span>
      <div>
        <h3 className="text-base font-black text-white uppercase tracking-wider">{title}</h3>
        <p className="text-xs text-gray-400">{subtitle}</p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Sub-componente: selector de método de pago
// ─────────────────────────────────────────────
type PaymentMethod = 'card' | 'nequi' | 'pse';

interface PaymentOption {
  id: PaymentMethod;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}

function PaymentMethodCard({
  option,
  isActive,
  onClick,
}: {
  option: PaymentOption;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
        isActive
          ? 'bg-[#42938a]/10 border-[#42938a] shadow-[0_0_15px_rgba(66,147,138,0.25)]'
          : 'bg-[#0f1113] border-gray-800 hover:border-gray-700'
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <span className={`${isActive ? 'text-[#42938a]' : 'text-gray-400'} transition-colors`}>
          {option.icon}
        </span>
        {isActive && (
          <span className="w-4 h-4 rounded-full bg-[#42938a] flex items-center justify-center">
            <Check className="w-3 h-3 text-black stroke-[3]" />
          </span>
        )}
      </div>
      <div>
        <p className="text-sm font-black text-white uppercase">{option.title}</p>
        <p className="text-[10px] text-gray-500 font-medium">{option.subtitle}</p>
      </div>
    </button>
  );
}

// ─────────────────────────────────────────────
// Sub-componente: toggle de tipo de persona
// ─────────────────────────────────────────────
function PersonTypeToggle({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const options = [
    { id: 'natural', label: 'Persona Natural' },
    { id: 'juridica', label: 'Persona Jurídica' },
  ];

  return (
    <div>
      <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-2">
        Tipo de Cliente
      </p>
      {/* Contenedor pill con fondo oscuro */}
      <div className="flex items-center bg-[#0d0f12] border border-gray-800 rounded-xl p-1 gap-1">
        {options.map((opt) => {
          const active = value === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onChange(opt.id)}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                active
                  ? 'bg-[#42938a] text-black shadow-[0_0_10px_rgba(66,147,138,0.3)]'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Componente principal
// ─────────────────────────────────────────────
interface CheckoutFormProps {
  totalAmount?: number;
}

const PAYMENT_OPTIONS: PaymentOption[] = [
  {
    id: 'card',
    icon: <CreditCard className="w-6 h-6" />,
    title: 'Tarjeta',
    subtitle: 'Crédito / Débito',
  },
  {
    id: 'nequi',
    icon: <Smartphone className="w-6 h-6" />,
    title: 'Billeteras',
    subtitle: 'Nequi / DaviPlata',
  },
  {
    id: 'pse',
    icon: <Building2 className="w-6 h-6" />,
    title: 'PSE',
    subtitle: 'Transferencia Bancaria',
  },
];

export default function CheckoutForm({ totalAmount }: CheckoutFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');

  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    documento: '',
    telefono: '',
    direccion: '',
    apartamento: '',
    ciudad: 'Bogotá D.C.',
    departamento: 'Cundinamarca',
    cardNumber: '',
    cardExp: '',
    cardCvc: '',
    cardHolder: '',
    nequiPhone: '',
    bancoPSE: 'Bancolombia',
    tipoPersona: 'natural',
  });

  // Handler genérico con enmascaramiento para campos de tarjeta
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    let processed = value;
    if (name === 'cardNumber') processed = maskCardNumber(value);
    if (name === 'cardExp') processed = maskCardExp(value);

    setFormData((prev) => {
      const next = { ...prev, [name]: processed };
      // Auto-completar departamento al cambiar ciudad
      if (name === 'ciudad') {
        const found = CIUDADES_COLOMBIA.find((c) => c.ciudad === value);
        if (found) next.departamento = found.depto;
      }
      return next;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      toast.success('¡Pago procesado y verificado exitosamente!', {
        description: 'Tu orden ha sido registrada en el sistema de Vestigio.',
        style: {
          border: '1px solid #42938a',
          background: '#16191c',
          color: '#fff',
        },
      });
      router.push('/checkout/success');
    }, 1800);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10">

      {/* ── SECCIÓN 1: CONTACTO ───────────────────────── */}
      <section className="bg-[#16191c] border border-gray-800 rounded-3xl p-6 md:p-8 shadow-xl">
        <SectionHeader
          step={1}
          title="Información de Contacto"
          subtitle="Datos para la factura y confirmación del pedido"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <Input
              label="Nombre Completo *"
              name="nombre"
              type="text"
              required
              placeholder="Ej. Juan Carlos Rodríguez"
              icon={<User className="w-4 h-4" />}
              value={formData.nombre}
              onChange={handleChange}
            />
          </div>

          <Input
            label="Correo Electrónico *"
            name="email"
            type="email"
            required
            placeholder="juan@ejemplo.com"
            icon={<Mail className="w-4 h-4" />}
            value={formData.email}
            onChange={handleChange}
          />

          <Input
            label="Teléfono Móvil (WhatsApp) *"
            name="telefono"
            type="tel"
            required
            placeholder="310 123 4567"
            icon={<Phone className="w-4 h-4" />}
            value={formData.telefono}
            onChange={handleChange}
          />

          <div className="md:col-span-2">
            <Input
              label="Cédula de Ciudadanía o NIT *"
              name="documento"
              type="text"
              required
              placeholder="Ej. 1020304050"
              icon={<FileText className="w-4 h-4" />}
              value={formData.documento}
              onChange={handleChange}
            />
          </div>
        </div>
      </section>

      {/* ── SECCIÓN 2: DIRECCIÓN ─────────────────────── */}
      <section className="bg-[#16191c] border border-gray-800 rounded-3xl p-6 md:p-8 shadow-xl">
        <SectionHeader
          step={2}
          title="Dirección de Envío"
          subtitle="Cobertura nacional con entrega segura y asegurada"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <Input
              label="Dirección de Residencia / Oficina *"
              name="direccion"
              type="text"
              required
              placeholder="Calle 100 # 15-20"
              icon={<MapPin className="w-4 h-4" />}
              value={formData.direccion}
              onChange={handleChange}
            />
          </div>

          <div className="md:col-span-2">
            <Input
              label="Apartamento, Torre, Oficina o Casa (Opcional)"
              name="apartamento"
              type="text"
              placeholder="Apto 402 / Torre 3"
              icon={<Building className="w-4 h-4" />}
              value={formData.apartamento}
              onChange={handleChange}
            />
          </div>

          <Select
            label="Ciudad de Entrega *"
            name="ciudad"
            required
            options={CIUDAD_OPTIONS}
            value={formData.ciudad}
            onChange={handleChange}
          />

          {/* Departamento: solo lectura, no usa nuestro Select */}
          <div className="flex flex-col gap-1.5">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
              Departamento
            </p>
            <div className="w-full bg-[#0f1113]/60 text-gray-400 border border-gray-800/60 rounded-xl px-4 py-3 text-sm font-mono cursor-not-allowed">
              {formData.departamento}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECCIÓN 3: PAGO ──────────────────────────── */}
      <section className="bg-[#16191c] border border-gray-800 rounded-3xl p-6 md:p-8 shadow-xl">
        <SectionHeader
          step={3}
          title="Método de Pago"
          subtitle="Transacción 100% encriptada y procesada al instante"
        />

        {/* Selector de método */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-6">
          {PAYMENT_OPTIONS.map((opt) => (
            <PaymentMethodCard
              key={opt.id}
              option={opt}
              isActive={paymentMethod === opt.id}
              onClick={() => setPaymentMethod(opt.id)}
            />
          ))}
        </div>

        {/* Sub-formulario dinámico */}
        <div className="p-5 bg-[#0f1113] border border-gray-800/80 rounded-2xl space-y-4">

          {/* ── Tarjeta ── */}
          {paymentMethod === 'card' && (
            <>
              <Input
                label="Número de Tarjeta"
                name="cardNumber"
                type="text"
                inputMode="numeric"
                placeholder="4500 1234 5678 9010"
                maxLength={19}
                icon={<CreditCard className="w-4 h-4" />}
                value={formData.cardNumber}
                onChange={handleChange}
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Vencimiento (MM/AA)"
                  name="cardExp"
                  type="text"
                  inputMode="numeric"
                  placeholder="12/28"
                  maxLength={5}
                  value={formData.cardExp}
                  onChange={handleChange}
                />
                <Input
                  label="CVC / CVV"
                  name="cardCvc"
                  type="password"
                  placeholder="•••"
                  maxLength={4}
                  value={formData.cardCvc}
                  onChange={handleChange}
                />
              </div>

              <Input
                label="Nombre del Titular"
                name="cardHolder"
                type="text"
                placeholder="JUAN CARLOS RODRIGUEZ"
                value={formData.cardHolder}
                onChange={handleChange}
                className="uppercase"
              />
            </>
          )}

          {/* ── Nequi / DaviPlata ── */}
          {paymentMethod === 'nequi' && (
            <>
              <Input
                label="Número de Celular Nequi / DaviPlata"
                name="nequiPhone"
                type="tel"
                placeholder="310 987 6543"
                value={formData.nequiPhone}
                onChange={handleChange}
              />
              <p className="text-xs text-gray-500 leading-relaxed">
                Al confirmar, recibirás una notificación push directa en tu
                aplicación para autorizar el cobro.
              </p>
            </>
          )}

          {/* ── PSE ── */}
          {paymentMethod === 'pse' && (
            <>
              <Select
                label="Selecciona tu Entidad Financiera"
                name="bancoPSE"
                options={BANCO_OPTIONS}
                value={formData.bancoPSE}
                onChange={handleChange}
              />
              <PersonTypeToggle
                value={formData.tipoPersona}
                onChange={(v) =>
                  setFormData((prev) => ({ ...prev, tipoPersona: v }))
                }
              />
            </>
          )}
        </div>
      </section>

      {/* ── SUBMIT ───────────────────────────────────── */}
      <div className="pt-2 space-y-3">
        <Button
          type="submit"
          variant="primary"
          fullWidth
          isLoading={isSubmitting}
          leftIcon={<ShieldCheck className="w-5 h-5" />}
          className="py-4 rounded-2xl text-sm shadow-[0_0_25px_rgba(66,147,138,0.25)]"
        >
          CONFIRMAR Y PAGAR
          {totalAmount
            ? ` $${totalAmount.toLocaleString('es-CO')} COP`
            : ''}
        </Button>

        <p className="text-[11px] text-gray-500 text-center flex items-center justify-center gap-1.5 font-medium">
          <Lock className="w-3.5 h-3.5 text-[#42938a]" />
          Transacción encriptada con certificado SSL 256-bit
        </p>
      </div>
    </form>
  );
}
