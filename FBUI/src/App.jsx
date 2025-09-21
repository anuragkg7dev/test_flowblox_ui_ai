import { toast } from '@/components/common/Notification';
import { Toaster } from '@/components/ui/toaster';
import { useEffect, useState } from 'react'; // Add useState
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from './components/client/SuperbasClient';
import { DASHBOARD_URL, HOME_URL } from './components/common/constants/AppRouterConstant';
import AppRouter from './components/navigation/routes/AppRouter';
import { useAppConfigStore } from './components/store/AppConfigStore';
import { useAppRouterStore } from './components/store/AppRouterStore';
import { publicRoutes } from './components/store/AppRouterStoreUtil';
import { useAuthStore } from './components/store/AuthStateStore';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuth, clearAuth, initializeAuth , jwt} = useAuthStore();
  const { updateRouterAtSignIn, updateRouterAtSignOut } = useAppRouterStore();
  const { config, clearConfig } = useAppConfigStore();
  const [isAuthInitialized, setIsAuthInitialized] = useState(false); // Track auth initialization


  useEffect(() => {
    // Initialize auth and mark as initialized
    initializeAuth().then(() => {
      setIsAuthInitialized(true);
    });

    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log(`----------------${event}-------------------------`, session)
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED' ||  session || (event === 'INITIAL_SESSION' && session)) {
        setAuth(session?.user, session);
        updateRouterAtSignIn();
        // Only redirect to DASHBOARD_URL if on HOME_URL (not SIGN_IN_URL)
   
        if (location.pathname === HOME_URL) {
          navigate(DASHBOARD_URL, { replace: true });
        }
      } else if (event === 'SIGNED_OUT' || !session ||  (event === 'INITIAL_SESSION' && !session)) {
        clearConfig();
        clearAuth();
        updateRouterAtSignOut();

        if (!publicRoutes.includes(location.pathname)) {

          if (event != 'SIGNED_OUT') {
            console.log('----------------Session Timed-Out-------------------------')
            toast.error('Session expired. Please sign in again.');
          }
          navigate(HOME_URL, { replace: true });
        }
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate, location.pathname, setAuth, clearAuth, initializeAuth, updateRouterAtSignIn, updateRouterAtSignOut]);

  // Prevent rendering until auth is initialized
  if (!isAuthInitialized) {
    return null; // Or a loading spinner
  }

  return (
    <>
      <AppRouter />
      <Toaster />
    </>
  );
}

export default App;