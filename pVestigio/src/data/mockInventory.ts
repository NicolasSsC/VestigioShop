// src/data/mockInventory.ts
import { Producto } from '@/types/product';

export const INVENTARIO: Producto[] = [
  { id: "m-001", title: "LOGITECH G502 HERO", category: "Ratones", description: "Sensor HERO 25K, 11 botones programables, pesas ajustables.", price: 45.00, imageSrc: "/images/logitech-g502.png", isNew: true },
  { id: "m-002", title: "ATTACK SHARK X11", category: "Ratones", description: "Ratón inalámbrico ultraligero, sensor PAW3311, base magnética.", price: 38.00, imageSrc: "/images/attack-shark-x11.png" },
  { id: "m-003", title: "RAZER DEATHADDER ESSENTIAL", category: "Ratones", description: "Sensor óptico de 6400 DPI, diseño ergonómico clásico, 5 botones.", price: 25.00, imageSrc: "/images/razer-deathadder.png" },
  { id: "m-004", title: "LOGITECH G102 LIGHTSYNC", category: "Ratones", description: "Sensor de 8000 DPI, iluminación RGB personalizable.", price: 20.00, imageSrc: "/images/logitech-g102.png" },
  { id: "k-001", title: "TECLADO MECÁNICO V1 PRO", category: "Teclados", description: "Switches Táctiles, RGB Adaptativo, Chasis de Aluminio Cepillado.", price: 65.00, imageSrc: "/images/teclado.png" },
  { id: "k-002", title: "TECLADO TKL SPEED", category: "Teclados", description: "Formato 80%, Switches Lineales rojos, ideal para esports.", price: 50.00, imageSrc: "/images/teclado-tkl.png" },
  { id: "k-003", title: "CORSAIR K70 RGB", category: "Teclados", description: "Mecánico de tamaño completo, switches Cherry MX Speed.", price: 120.00, imageSrc: "/images/corsair-k70.png" },
  { id: "p-001", title: "ALFOMBRILLA V4 CONTROL", category: "Alfombrillas", description: "Superficie de alta fricción para precisión extrema, bordes cosidos.", price: 18.00, imageSrc: "/images/alfombrilla1.png" },
  { id: "p-002", title: "ALFOMBRILLA V5 XL RGB", category: "Alfombrillas", description: "Tamaño extendido (900x400mm), iluminación perimetral dinámica.", price: 30.00, imageSrc: "/images/alfombrilla2.png" },
  { id: "h-001", title: "AURICULARES V3 SURROUND", category: "Auriculares", description: "Sonido envolvente 7.1 virtual, micrófono con cancelación de ruido.", price: 55.00, imageSrc: "/images/auriculares.png" },
  { id: "h-002", title: "HYPERX CLOUD II", category: "Auriculares", description: "Marco de aluminio duradero, espuma viscoelástica, audio 7.1.", price: 85.00, imageSrc: "/images/hyperx-cloud2.png" },
  { id: "a-001", title: "MICRÓFONO STREAMER M1", category: "Audio", description: "Patrón polar cardioide, monitoreo de latencia cero, conexión USB.", price: 75.00, imageSrc: "/images/microfono.png" },
];