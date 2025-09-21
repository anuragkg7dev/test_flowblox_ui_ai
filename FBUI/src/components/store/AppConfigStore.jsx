import { create } from "zustand";

export const useAppConfigStore = create((set) => ({
  config: {},
  setConfig: (data) => set({ config: data }),
  updateConfig: (key, value) =>
    set((state) => ({
      config: { ...state.config, [key]: value },
    })),
  updateConfigObj: (data) =>
    set((state) => ({
      config: { ...state.config, ...data },
    })),
  clearConfig: () => set({ config: {} }), // Reset only the config object
}));