import { create } from 'zustand';

const useServicesStore = create((set) => ({
  services: [],
  activeService: null,
  setServices: (services) => set({ services }),
  setActiveService: (service) => set({ activeService: service }),
  clearServices: () => set({ services: [], activeService: null }),
}));

export default useServicesStore; 