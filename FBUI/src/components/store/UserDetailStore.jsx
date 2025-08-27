import { create } from "zustand";

export const useUserDetailStore = create((set) => ({
  user: {},
  setUser: (data) => set({ user: { ...data } }), 
}));
