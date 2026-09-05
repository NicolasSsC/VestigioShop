'use client';

import { useTheme } from 'next-themes';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useEffect, useState } from 'react';

/**
 * Botón cíclico Dark → Light → System.
 * Usa mounted guard para evitar hydration mismatch (next-themes lee el DOM en cliente).
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Placeholder del mismo tamaño para evitar layout shift
    return (
      <div className="w-9 h-9 rounded-xl border border-gray-800 bg-transparent animate-pulse" />
    );
  }

  const cycle = () => {
    if (theme === 'dark') setTheme('light');
    else if (theme === 'light') setTheme('system');
    else setTheme('dark');
  };

  const icon =
    theme === 'dark' ? (
      <Moon className="w-4 h-4" />
    ) : theme === 'light' ? (
      <Sun className="w-4 h-4" />
    ) : (
      <Monitor className="w-4 h-4" />
    );

  const label =
    theme === 'dark'
      ? 'Modo oscuro activo'
      : theme === 'light'
      ? 'Modo claro activo'
      : 'Sigue el sistema';

  return (
    <button
      type="button"
      onClick={cycle}
      title={label}
      aria-label={label}
      className={`group relative flex items-center justify-center w-9 h-9 rounded-xl
        border border-gray-800 bg-transparent
        text-gray-400 hover:text-[#42938a] hover:border-[#42938a]
        transition-all duration-200 cursor-pointer
        hover:shadow-[0_0_12px_rgba(66,147,138,0.2)]
        ${className ?? ''}`}
    >
      {icon}
    </button>
  );
}
