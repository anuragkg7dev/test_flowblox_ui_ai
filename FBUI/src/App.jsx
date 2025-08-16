import { Heading } from "@chakra-ui/react";
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './App.css';
import { supabase } from "./components/client/SuperbasClient";
import AppRouter from "./components/navigation/routes/AppRouter";
import { Toaster } from "@/components/ui/toaster"
import { HOME_URL, SIGN_UP } from "./components/common/constants/AppRouterConstant";
import { publicRoutes } from "./components/store/AppRouterStoreUtil";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth event:', event);

      if (!session && !publicRoutes.includes(location.pathname)) {
        navigate(HOME_URL);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate, location.pathname]);

  return (
    <>
      <AppRouter />
      <Toaster />
    </>
  );
}

export default App;
