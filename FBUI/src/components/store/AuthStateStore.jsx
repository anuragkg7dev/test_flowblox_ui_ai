import { create } from 'zustand';
import { supabase } from '@/components/client/SuperbasClient';

export const useAuthStore = create((set) => ({

  user: null,
  session: null,
  jwt: null, // Initialize jwt

  setAuth: (user, session) => set({ user, session, jwt: session?.access_token || null }),

  clearAuth: () => set({ user: null, session: null, jwt: null }),

  initializeAuth: async () => {

    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) {
      console.error('Error fetching session:', error.message);
      set({ user: null, session: null, jwt: null });
    } else if (session) {
      set({ user: session.user, session, jwt: session.access_token });
    }
  },


}));