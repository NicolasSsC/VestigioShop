"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, Lock, ArrowRight, Loader2 } from "lucide-react";

import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

const loginSchema = z.object({
  email: z.string().email("Ingresa un correo electrónico válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsSubmitting(true);
    // Simulación de delay de red
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    console.log("Login Exitoso:", data);
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
            Bienvenido de vuelta
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            Ingresa a tu cuenta para continuar
          </p>
        </div>

        {/* FORMULARIO */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

          <div className="flex justify-end">
            <Link href="#" className="text-xs font-bold text-[#42938a] hover:text-[#357a72] transition-colors">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          <Button
            type="submit"
            variant="primary"
            fullWidth
            isLoading={isSubmitting}
            className="py-4 font-black tracking-widest uppercase"
          >
            {isSubmitting ? "Autenticando..." : "Iniciar Sesión"}
          </Button>
        </form>

        {/* FOOTER LINK */}
        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400 font-medium">
          ¿No tienes cuenta?{" "}
          <Link href="/registro" className="text-[#42938a] font-bold hover:underline transition-all">
            Regístrate aquí
          </Link>
        </div>
      </div>
    </div>
  );
}
