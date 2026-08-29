export interface Producto {
  id: string;
  title: string;
  category: 'Teclados' | 'Ratones' | 'Auriculares' | 'Alfombrillas' | 'Audio';
  description: string;
  price: number;
  imageSrc: string;
  isNew?: boolean;
}