"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, Lock, User, ShieldCheck } from "lucide-react";

import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

const registerSchema = z.object({
  fullName: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  email: z.string().email("Ingresa un correo electrónico válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
  confirmPassword: z.string().min(6, "Confirma tu contraseña"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"], // Este error se asociará al input de confirmar contraseña
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setIsSubmitting(true);
    // Simulación de delay de red
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    console.log("Registro Exitoso:", data);
    setIsSubmitting(false);
    
    // Redirección simulada al catálogo
    router.push("/productos");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0f1113] p-4 transition-colors">
      <div className="w-full max-w-md bg-white dark:bg-[#16191c] rounded-3xl p-8 shadow-2xl border border-gray-200 dark:border-gray-800">
        
        {/* LOGO Y HEADER */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block text-[#42938a] font-black text-3xl tracking-widest mb-2 hover:opacity-80 transition-opacity">
            VESTIGIO
          </Link>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white uppercase tracking-wider">
            Crear Cuenta
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Únete y equípate con el mejor hardware
          </p>
        </div>

        {/* FORMULARIO */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input
            label="Nombre Completo"
            type="text"
            placeholder="Ej: John Doe"
            icon={<User className="w-4 h-4" />}
            error={errors.fullName?.message}
            {...register("fullName")}
            className="bg-gray-50 dark:bg-[#0f1113]"
          />

          <Input
            label="Correo Electrónico"
            type="email"
            placeholder="ejemplo@correo.com"
            icon={<Mail className="w-4 h-4" />}
            error={errors.email?.message}
            {...register("email")}
            className="bg-gray-50 dark:bg-[#0f1113]"
          />

          <Input
            label="Contraseña"
            type="password"
            placeholder="••••••••"
            icon={<Lock className="w-4 h-4" />}
            error={errors.password?.message}
            {...register("password")}
            className="bg-gray-50 dark:bg-[#0f1113]"
          />

          <Input
            label="Confirmar Contraseña"
            type="password"
            placeholder="••••••••"
            icon={<ShieldCheck className="w-4 h-4" />}
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
            className="bg-gray-50 dark:bg-[#0f1113]"
          />

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              fullWidth
              isLoading={isSubmitting}
              className="py-4 font-black tracking-widest uppercase"
            >
              {isSubmitting ? "Creando Cuenta..." : "Crear Cuenta"}
            </Button>
          </div>
        </form>

        {/* FOOTER LINK */}
        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400 font-medium">
          ¿Ya tienes una cuenta?{" "}
          <Link href="/login" className="text-[#42938a] font-bold hover:underline transition-all">
            Inicia Sesión
          </Link>
        </div>
      </div>
    </div>
  );
}
