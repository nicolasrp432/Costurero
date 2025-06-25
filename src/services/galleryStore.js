import { create } from 'zustand';

const useGalleryStore = create((set) => ({
  items: [],
  activeCategory: 'all',
  setItems: (items) => set({ items }),
  setActiveCategory: (category) => set({ activeCategory: category }),
  clearGallery: () => set({ items: [], activeCategory: 'all' }),
}));

export default useGalleryStore; 