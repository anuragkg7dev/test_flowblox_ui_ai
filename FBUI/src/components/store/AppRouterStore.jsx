import { create } from 'zustand';
import { getDefaultStateOfAppRouter, getStateOfAppRouterAfterSignIn, getStateOfAppRouterAfterSignOut } from './AppRouterStoreUtil';

export const useAppRouterStore = create((set) => ({
    data: getDefaultStateOfAppRouter(),
    updateRouter: (key, value) => set((state) => ({
         data: { ...state.data, [key]: value, }, 
        })),
    updateRouterAtSignIn: () => set({ data: getStateOfAppRouterAfterSignIn() }),
    updateRouterAtSignOut: () => set({ data: getStateOfAppRouterAfterSignOut() }),
    resetRouter: () => set({ data: getDefaultStateOfAppRouter() }),
}));
