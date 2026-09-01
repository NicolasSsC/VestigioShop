import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer"; // 1. NUEVO: Importamos el Footer
import { Toaster } from "sonner";
import "./globals.css";

// Fuentes optimizadas por Next.js
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadatos avanzados para SEO y Redes Sociales (Open Graph)
export const metadata: Metadata = {
  title: {
    template: "%s | Vestigio",
    default: "Vestigio | Domina el Juego",
  },
  description: "Tienda líder en periféricos y tecnología gaming. Encuentra teclados mecánicos, ratones de alta precisión y equipo profesional para tu setup.",
  keywords: ["gaming", "periféricos", "teclados mecánicos", "ratones gamer", "setup", "tecnología", "Vestigio"],
  authors: [{ name: "Equipo Vestigio" }],
  openGraph: {
    title: "Vestigio | La tecnología que permanece",
    description: "Equipamiento de alto rendimiento para jugadores exigentes. Descubre nuestro catálogo.",
    url: "https://vestigio.com",
    siteName: "VestigioShop",
    images: [
      {
        url: "/images/og-vestigio.jpg",
        width: 1200,
        height: 630,
        alt: "Vestigio Gaming Store",
      },
    ],
    locale: "es_CO",
    type: "website",
  },
};

// Configuración del Viewport (Responsive y color de navegador en móviles)
export const viewport: Viewport = {
  themeColor: "#0f1113",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

// Tipado estricto estándar de React / Next.js
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-[#0f1113] text-[#ededed] font-sans selection:bg-[#42938a] selection:text-black">
        
        {/* Renderizado de las vistas principales */}
        {children}

        {/* 2. NUEVO: Footer global */}
        <Footer />

        {/* Cart Drawer global inyectado para que esté disponible en toda la app */}
        <CartDrawer />
        
        {/* Configuración del Toaster a nivel global estilizado para el tema oscuro */}
        <Toaster 
          position="bottom-right" 
          toastOptions={{
            style: {
              background: '#16191c',
              border: '1px solid #1f2937', // border-gray-800 de Tailwind
              color: '#fff',
            },
          }}
        />
        
      </body>
    </html>
  );
}