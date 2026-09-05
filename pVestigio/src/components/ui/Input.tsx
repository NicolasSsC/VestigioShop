'use client';

import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Etiqueta flotante sobre el input */
  label?: string;
  /** Ícono posicionado a la izquierda del input */
  icon?: ReactNode;
  /** Mensaje de error */
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, icon, error, className, id, ...props }, ref) => {
    const inputId =
      id ?? (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              'text-xs font-bold uppercase tracking-widest',
              error ? 'text-red-400' : 'text-gray-400',
            )}
          >
            {label}
          </label>
        )}

        <div className="relative w-full">
          {icon && (
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none flex items-center">
              {icon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            className={cn(
              'w-full bg-[#0f1113] text-white font-mono text-sm',
              'border rounded-xl py-3 transition-all',
              'placeholder:text-gray-600',
              icon ? 'pl-11 pr-4' : 'px-4',
              error
                ? 'border-red-500/60 focus:ring-red-500'
                : 'border-gray-800 focus:ring-[#42938a]',
              'focus:outline-none focus:ring-2 focus:border-transparent',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              className,
            )}
            {...props}
          />
        </div>

        {error && (
          <p className="text-xs text-red-400 font-medium mt-0.5">{error}</p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
export { Input };
