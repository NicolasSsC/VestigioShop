'use client';

import { forwardRef, SelectHTMLAttributes } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  /** Etiqueta flotante sobre el select */
  label?: string;
  /** Opciones del select */
  options: SelectOption[];
  /** Mensaje de error */
  error?: string;
  /** Placeholder / primera opción vacía */
  placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, error, placeholder, className, id, ...props }, ref) => {
    const selectId =
      id ?? (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label
            htmlFor={selectId}
            className={cn(
              'text-xs font-bold uppercase tracking-widest',
              error ? 'text-red-400' : 'text-gray-400',
            )}
          >
            {label}
          </label>
        )}

        <div className="relative w-full">
          <select
            ref={ref}
            id={selectId}
            className={cn(
              'w-full bg-[#0f1113] text-white font-mono text-sm',
              'border rounded-xl py-3 pl-4 pr-10',
              'transition-all cursor-pointer appearance-none',
              '[&>option]:bg-[#16191c] [&>option]:text-white',
              error
                ? 'border-red-500/60 focus:ring-red-500'
                : 'border-gray-800 focus:ring-[#42938a]',
              'focus:outline-none focus:ring-2 focus:border-transparent',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              className,
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled className="bg-[#16191c] text-gray-500">
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option
                key={opt.value}
                value={opt.value}
                className="bg-[#16191c] text-white"
              >
                {opt.label}
              </option>
            ))}
          </select>

          <ChevronDown
            className="w-4 h-4 text-gray-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
            aria-hidden
          />
        </div>

        {error && (
          <p className="text-xs text-red-400 font-medium mt-0.5">{error}</p>
        )}
      </div>
    );
  },
);

Select.displayName = 'Select';
export { Select };
