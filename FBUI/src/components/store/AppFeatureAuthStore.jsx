import { create } from 'zustand';
import { getDefaultAppFeatureAuthStore } from './AppFeatureAuthStoreUtil';

export const useAppFeatureAuthStore = create((set) => ({
    data: getDefaultAppFeatureAuthStore(),
    updateFeatureFlag: (key, value) => set((state) => ({
         data: { ...state.data, [key]: value, }, 
        })),
    resetFeatureFlag: () => set({ data: getDefaultAppFeatureAuthStore() }),
}));
