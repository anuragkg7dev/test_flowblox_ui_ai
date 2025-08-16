import { Navigate, Route, Routes } from 'react-router-dom';

import ForgotPassword from '@/components/pages/auth/ForgotPassword';
import ResetPassword from '@/components/pages/auth/ResetPassword';
import DashboardHome from '@/components/pages/dashboard/DashboardHome';
import { ProductPriceHolder } from '@/components/pages/PlanSubscription/ProductPriceHolder';
import ProductSelection from '@/components/pages/PlanSubscription/ProductSelection';
import PaymentFailed from '@/components/pages/stripe/PaymentFailed';
import PaymentSuccess from '@/components/pages/stripe/PaymentSuccess';
import { useAppRouterStore } from '@/components/store/AppRouterStore';
import { useEffect } from 'react';
import { DASHBOARD, DASHBOARD_URL, FORGET_PASSWORD, FORGET_PASSWORD_URL, HOME, HOME_URL, IS_AUTHENTICATED, NOT_FOUND_404, NOT_FOUND_404_URL, PRODUCT_PRICING, PRODUCT_PRICING_PRELAUNCH, PRODUCT_PRICING_PRELAUNCH_URL, PRODUCT_PRICING_URL, PRODUCT_SELECTION, PRODUCT_SELECTION_URL, RESET_PASSWORD, RESET_PASSWORD_URL, SIGN_IN, SIGN_IN_URL, SIGN_UP, SIGN_UP_URL, STRIPE_FAILED, STRIPE_FAILED_URL, STRIPE_SUCCESS, STRIPE_SUCCESS_URL } from '../../common/constants/AppRouterConstant';
import SignIn from '../../pages/auth/SignIn';
import SignUp from '../../pages/auth/SignUp';
import Home from '../../pages/Home';
import ProductPricingComboFoundersOffer from '@/components/pages/PlanSubscription/ProductPricingComboFoundersOffer';
import NotFound from '@/components/pages/auth/NotFound';

export default function AppRouter(props) {

    let routeState = useAppRouterStore((state) => state.data);
    //const [routeState, setRouteState] = useState(appRouteState)

    useEffect(() => {
        // Subscribe to the whole store state
        const unsub = useAppRouterStore.subscribe((state) => {
            console.log('AKG Router Updated --> ', state);
            //  setRouteState(state);
        });

        return () => {
            unsub(); // clean up on unmount
        };
    }, []);


    const protectedRoute = (component, componentKey, url = HOME_URL) => {
        const isAuthenticated = routeState[IS_AUTHENTICATED];
        const componentEnabled = routeState[componentKey];
        return isAuthenticated && componentEnabled ? component : <Navigate to={url} replace />;
    };

    const unprotectedRoute = (component, componentKey, url = HOME_URL) => {
        const componentEnabled = routeState[componentKey];
        return componentEnabled ? component : <Navigate to={url} replace />;
    };

    return (

        <Routes>

            {/* <Route path={HOME_URL} element={unprotectedRoute(<Home />, HOME)} />

            <Route path={SIGN_IN_URL} element={unprotectedRoute(<SignIn />, SIGN_IN)} />

            <Route path={SIGN_UP_URL} element={unprotectedRoute(<SignUp />, SIGN_UP)} />

            <Route path={FORGET_PASSWORD_URL} element={unprotectedRoute(<ForgotPassword />, FORGET_PASSWORD)} />

            <Route path={RESET_PASSWORD_URL} element={unprotectedRoute(<ResetPassword />, RESET_PASSWORD)} />

            <Route path={PRODUCT_SELECTION_URL} element={unprotectedRoute(<ProductSelection />, PRODUCT_SELECTION)} />

            <Route path={PRODUCT_PRICING_URL} element={unprotectedRoute(<ProductPriceHolder />, PRODUCT_PRICING)} />  enable*/}

            <Route path={NOT_FOUND_404_URL} element={unprotectedRoute(<NotFound />, NOT_FOUND_404)} />
            
            <Route path={STRIPE_SUCCESS_URL} element={unprotectedRoute(<PaymentSuccess />, STRIPE_SUCCESS)} />

            <Route path={STRIPE_FAILED_URL} element={unprotectedRoute(<PaymentFailed />, STRIPE_FAILED)} />



            {/* Product Pre Launch Founders Offer */}
            <Route path={HOME_URL} element={unprotectedRoute(<ProductPricingComboFoundersOffer productId={"pre_launch"} />, HOME)} />

            {/* <Route path={PRODUCT_PRICING_PRELAUNCH_URL} element={unprotectedRoute(<ProductPricingComboFoundersOffer productId={"pre_launch"} />, PRODUCT_PRICING_PRELAUNCH)} /> */}



            {/* <Route path={DASHBOARD_URL} element={protectedRoute(<Dashboard />, DASHBOARD)} /> */}

            {/* <Route path={DASHBOARD_URL} element={protectedRoute(<DashboardHome />, DASHBOARD)} />  enable*/}

            {/* <Route path={DASHBOARD_URL} element={<Dashboard />} /> */}

            {/* <Route path={SCRIBE_CREATE_URL} element={<CreateContent />} /> */}



            {/* Catch-all route for invalid URLs */}
            <Route path={"*"} element={unprotectedRoute(<NotFound />, HOME)} />

        </Routes>

    );
}


