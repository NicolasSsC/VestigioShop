import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import CartDrawer from '@/components/CartDrawer';
import { Toaster } from 'sonner';
import { ThemeProvider } from '@/components/ThemeProvider';
import './globals.css';

// Fuentes optimizadas por Next.js
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// Metadatos avanzados para SEO y Redes Sociales (Open Graph)
export const metadata: Metadata = {
  title: {
    template: '%s | Vestigio',
    default: 'Vestigio | Domina el Juego',
  },
  description:
    'Tienda líder en periféricos y tecnología gaming. Encuentra teclados mecánicos, ratones de alta precisión y equipo profesional para tu setup.',
  keywords: [
    'gaming',
    'periféricos',
    'teclados mecánicos',
    'ratones gamer',
    'setup',
    'tecnología',
    'Vestigio',
  ],
  authors: [{ name: 'Equipo Vestigio' }],
  openGraph: {
    title: 'Vestigio | La tecnología que permanece',
    description:
      'Equipamiento de alto rendimiento para jugadores exigentes. Descubre nuestro catálogo.',
    url: 'https://vestigio.com',
    siteName: 'VestigioShop',
    images: [
      {
        url: '/images/og-vestigio.jpg',
        width: 1200,
        height: 630,
        alt: 'Vestigio Gaming Store',
      },
    ],
    locale: 'es_CO',
    type: 'website',
  },
};

// Configuración del Viewport (¡Accesibilidad corregida, zoom permitido!)
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0f1113' },
    { media: '(prefers-color-scheme: light)', color: '#f4f5f7' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col bg-background text-foreground font-sans transition-colors duration-300">

        <ThemeProvider>

          {children}

          {/* Cart Drawer global (Inyectado para toda la app) */}
          <CartDrawer />

          {/* Toaster global adaptado dinámicamente al tema activo */}
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                color: 'var(--foreground)',
              },
            }}
          />

        </ThemeProvider>

      </body>
    </html>
  );
}