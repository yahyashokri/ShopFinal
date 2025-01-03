import { create } from 'zustand';

export const useStore = create((set) => ({
  showCardPortal: false,
  setShowCardPortal: () => set((state) => ({ showCardPortal: !state.showCardPortal })),
  showAddCard: false,
  setShowAddCard: () => set((state) => ({ showAddCard: !state.showAddCard })),
  product: { user: null, pid: null, image: null, title: null, price: null, description: null, rating: null, category: null },
  setProduct: (product) => set({ product }),
}));
