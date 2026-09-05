'use client';

import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ButtonVariant = 'primary' | 'outline' | 'ghost';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Variante visual del botón */
  variant?: ButtonVariant;
  /** Muestra spinner y deshabilita el botón mientras sea true */
  isLoading?: boolean;
  /** Expande el botón al 100% del contenedor */
  fullWidth?: boolean;
  /** Ícono renderizado a la izquierda del texto */
  leftIcon?: ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: [
    'bg-[#42938a] hover:bg-[#357a72] text-black',
    'font-black uppercase tracking-widest',
    'shadow-[0_0_20px_rgba(66,147,138,0.2)] hover:shadow-[0_0_28px_rgba(66,147,138,0.35)]',
    'border border-transparent',
  ].join(' '),
  outline: [
    'bg-transparent text-[#42938a]',
    'border border-[#42938a] hover:bg-[#42938a]/10',
    'font-black uppercase tracking-widest',
  ].join(' '),
  ghost: [
    'bg-transparent text-gray-400 hover:text-white hover:bg-white/5',
    'border border-transparent',
    'font-bold uppercase tracking-wider',
  ].join(' '),
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      isLoading = false,
      fullWidth = false,
      leftIcon,
      className,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={cn(
          'inline-flex items-center justify-center gap-2',
          'rounded-xl px-5 py-3 text-sm transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-[#42938a]',
          'focus:ring-offset-2 focus:ring-offset-[#0f1113]',
          variantStyles[variant],
          fullWidth && 'w-full',
          isDisabled
            ? 'opacity-60 cursor-not-allowed pointer-events-none'
            : 'cursor-pointer hover:scale-[1.02] active:scale-[0.98]',
          className,
        )}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin flex-shrink-0" aria-hidden />
        ) : (
          leftIcon && (
            <span className="flex-shrink-0 flex items-center">{leftIcon}</span>
          )
        )}
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
export { Button };
