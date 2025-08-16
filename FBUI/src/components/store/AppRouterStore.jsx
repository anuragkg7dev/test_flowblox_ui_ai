import { create } from 'zustand';
import { getDefaultStateOfAppRouter } from './AppRouterStoreUtil';

export const useAppRouterStore = create((set) => ({
    data: getDefaultStateOfAppRouter(),
    updateRouter: (key, value) => set((state) => ({
         data: { ...state.data, [key]: value, }, 
        })),
    resetRouter: () => set({ data: getDefaultStateOfAppRouter() }),
}));
