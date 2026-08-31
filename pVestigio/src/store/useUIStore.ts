// src/store/useUIStore.ts
import { create } from 'zustand';

interface UIStore {
  // Estados
  isCartOpen: boolean;
  isMobileMenuOpen: boolean;
  
  // Acciones del Carrito
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  
  // Acciones del Menú Móvil
  openMobileMenu: () => void;
  closeMobileMenu: () => void;
  toggleMobileMenu: () => void;
}

export const useUIStore = create<UIStore>((set) => ({
  isCartOpen: false,
  isMobileMenuOpen: false,
  
  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
  
  openMobileMenu: () => set({ isMobileMenuOpen: true }),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
}));