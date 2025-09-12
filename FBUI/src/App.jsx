import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from './components/client/SuperbasClient';
import AppRouter from './components/navigation/routes/AppRouter';
import { Toaster } from '@/components/ui/toaster';
import { DASHBOARD_URL, HOME_URL } from './components/common/constants/AppRouterConstant';
import { publicRoutes } from './components/store/AppRouterStoreUtil';
import { useAuthStore } from './components/store/AuthStateStore';
import { useAppRouterStore } from './components/store/AppRouterStore';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuth, initializeAuth } = useAuthStore();
  const updateRouterAtSignIn = useAppRouterStore((state) => state.updateRouterAtSignIn);

  useEffect(() => {
    // Initialize auth on mount
    initializeAuth();

    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth event:', event);
      setAuth(session?.user, session); // Update auth store

      if (session) {
        updateRouterAtSignIn(); // Sync IS_AUTHENTICATED in useAppRouterStore
        if (publicRoutes.includes(location.pathname)) {
          navigate(DASHBOARD_URL); // Redirect to dashboard if on public route
        }
      } else if (!session && !publicRoutes.includes(location.pathname)) {
        navigate(HOME_URL); // Redirect to home if not authenticated and on protected route
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate, location.pathname, setAuth, initializeAuth, updateRouterAtSignIn]);

  return (
    <>
      <AppRouter />
      <Toaster />
    </>
  );
}

export default App;