import { Navigate, Route, Routes } from 'react-router-dom';

import ForgotPassword from '@/components/pages/auth/ForgotPassword';
import NotFound from '@/components/pages/auth/NotFound';
import ResetPassword from '@/components/pages/auth/ResetPassword';
import DashboardHome from '@/components/pages/dashboard/DashboardHome';
import { ProductPriceHolder } from '@/components/pages/PlanSubscription/ProductPriceHolder';
import ProductPricingComboFoundersOffer from '@/components/pages/PlanSubscription/ProductPricingComboFoundersOffer';
import ProductSelection from '@/components/pages/PlanSubscription/ProductSelection';
import PaymentFailed from '@/components/pages/stripe/PaymentFailed';
import PaymentSuccess from '@/components/pages/stripe/PaymentSuccess';
import { useAppRouterStore } from '@/components/store/AppRouterStore';
import { lazy, useEffect } from 'react';
import { DASHBOARD, DASHBOARD_ACCOUNTS_PREFERENCE, DASHBOARD_ACCOUNTS_PREFERENCE_URL, DASHBOARD_ANALYTICS, DASHBOARD_ANALYTICS_URL, DASHBOARD_CBSTORE, DASHBOARD_CBSTORE_URL, DASHBOARD_CONTAINER_ARTICLE_BLOGS, DASHBOARD_CONTAINER_ARTICLE_BLOGS_URL, DASHBOARD_CONTAINER_DESTINATION, DASHBOARD_CONTAINER_DESTINATION_URL, DASHBOARD_CONTAINER_MANAGE_BLOGS, DASHBOARD_CONTAINER_MANAGE_BLOGS_URL, DASHBOARD_CONTAINER_SETTINGS_BLOGS, DASHBOARD_CONTAINER_SETTINGS_BLOGS_URL, DASHBOARD_CONTAINER_SOURCE, DASHBOARD_CONTAINER_SOURCE_URL, DASHBOARD_CONTAINERS, DASHBOARD_CONTAINERS_URL, DASHBOARD_URL, DEFAULT_LOGOUT_URL, FORGET_PASSWORD, FORGET_PASSWORD_URL, HOME, HOME_URL, IS_AUTHENTICATED, NOT_FOUND_404, NOT_FOUND_404_URL, OPEN_ARTICLE, OPEN_ARTICLE_URL, PRE_LAUNCH, PRE_LAUNCH_URL, PRODUCT_PRICING, PRODUCT_PRICING_URL, PRODUCT_SELECTION, PRODUCT_SELECTION_URL, RESET_PASSWORD, RESET_PASSWORD_URL, SIGN_IN, SIGN_IN_URL, SIGN_UP, SIGN_UP_URL, STRIPE_FAILED, STRIPE_FAILED_URL, STRIPE_SUCCESS, STRIPE_SUCCESS_URL } from '../../common/constants/AppRouterConstant';
import SignIn from '../../pages/auth/SignIn';
import SignUp from '../../pages/auth/SignUp';
import Home from '../../pages/Home';
import Containers from '@/components/pages/dashboard/containers/Containers';
import ArticleTemplateExternal from '@/components/pages/dashboard/containers/blogs/ArticleTemplateExternal';


// Lazy load pages
const ContainersHome = lazy(() => import('@/components/pages/dashboard/containers/ContainersHome'));
const AnalyticsHome = lazy(() => import('@/components/pages/dashboard/analytics/AnalyticsHome'));
const CBStoreHome = lazy(() => import('@/components/pages/dashboard/cbstore/CBStoreHome'));
const AccountsPreferenceHome = lazy(() => import('@/components/pages/dashboard/accountsPrefrences/AccountsPreferenceHome'));

const Articles_Blogs = lazy(() => import('@/components/pages/dashboard/containers/blogs/Articles'));
const Manage_Blogs = lazy(() => import('@/components/pages/dashboard/containers/blogs/Manage'));
const Settings_Blogs = lazy(() => import('@/components/pages/dashboard/containers/blogs/Settings'));
const Source = lazy(() => import('@/components/pages/dashboard/containers/source/Source'));
const Destination = lazy(() => import('@/components/pages/dashboard/containers/destination/Destination'));

export default function AppRouter(props) {

    let routeState = useAppRouterStore((state) => state.data);


    useEffect(() => {
        // Subscribe to the whole store state
        const unsub = useAppRouterStore.subscribe((state) => {
            // console.log('AKG Router Updated --> ', state);

        });

        return () => {
            unsub(); // clean up on unmount
        };
    }, []);


    const protectedRoute = (component, componentKey, url = DEFAULT_LOGOUT_URL) => {
        const isAuthenticated = routeState[IS_AUTHENTICATED];
        const componentEnabled = routeState[componentKey];
        return isAuthenticated && componentEnabled ? component : <Navigate to={url} replace />;
    };

    const unprotectedRoute = (component, componentKey, url = DEFAULT_LOGOUT_URL) => {
        const componentEnabled = routeState[componentKey];
        return componentEnabled ? component : <Navigate to={url} replace />;
    };

    return (

        <Routes>

            <Route path={HOME_URL} element={unprotectedRoute(<SignIn />, HOME)} />

            <Route path={SIGN_IN_URL} element={unprotectedRoute(<SignIn />, SIGN_IN)} />

            <Route path={SIGN_UP_URL} element={unprotectedRoute(<SignUp />, SIGN_UP)} />

            <Route path={FORGET_PASSWORD_URL} element={unprotectedRoute(<ForgotPassword />, FORGET_PASSWORD)} />

            <Route path={RESET_PASSWORD_URL} element={unprotectedRoute(<ResetPassword />, RESET_PASSWORD)} />

            <Route path={PRODUCT_SELECTION_URL} element={unprotectedRoute(<ProductSelection />, PRODUCT_SELECTION)} />

            <Route path={PRODUCT_PRICING_URL} element={unprotectedRoute(<ProductPriceHolder />, PRODUCT_PRICING)} />

            <Route path={NOT_FOUND_404_URL} element={unprotectedRoute(<NotFound />, NOT_FOUND_404)} />

            <Route path={STRIPE_SUCCESS_URL} element={unprotectedRoute(<PaymentSuccess />, STRIPE_SUCCESS)} />

            <Route path={STRIPE_FAILED_URL} element={unprotectedRoute(<PaymentFailed />, STRIPE_FAILED)} />

            <Route path={OPEN_ARTICLE_URL} element={unprotectedRoute(<ArticleTemplateExternal />, OPEN_ARTICLE)} />



            {/* Product Pre Launch Founders Offer */}
            <Route path={PRE_LAUNCH_URL} element={unprotectedRoute(<ProductPricingComboFoundersOffer productId={"pre_launch"} />, PRE_LAUNCH)} />

            {/* <Route path={PRODUCT_PRICING_PRELAUNCH_URL} element={unprotectedRoute(<ProductPricingComboFoundersOffer productId={"pre_launch"} />, PRODUCT_PRICING_PRELAUNCH)} /> */}



            {/* <Route path={DASHBOARD_URL} element={protectedRoute(<Dashboard />, DASHBOARD)} /> */}

            {/* Nested Dashboard Routes  (Protected)*/}
            <Route path={DASHBOARD_URL} element={protectedRoute(<DashboardHome />, DASHBOARD)}>
                <Route path={DASHBOARD_CONTAINERS_URL} element={protectedRoute(<ContainersHome />, DASHBOARD_CONTAINERS)} >
                    <Route path={DASHBOARD_CONTAINER_MANAGE_BLOGS_URL} element={protectedRoute(<Manage_Blogs />, DASHBOARD_CONTAINER_MANAGE_BLOGS)} />
                    <Route path={DASHBOARD_CONTAINER_ARTICLE_BLOGS_URL} element={protectedRoute(<Articles_Blogs />, DASHBOARD_CONTAINER_ARTICLE_BLOGS)} />
                    <Route path={DASHBOARD_CONTAINER_SETTINGS_BLOGS_URL} element={protectedRoute(<Settings_Blogs />, DASHBOARD_CONTAINER_SETTINGS_BLOGS)} />
                    <Route path={DASHBOARD_CONTAINER_SOURCE_URL} element={protectedRoute(<Source />, DASHBOARD_CONTAINER_SOURCE)} />
                    <Route path={DASHBOARD_CONTAINER_DESTINATION_URL} element={protectedRoute(<Destination />, DASHBOARD_CONTAINER_DESTINATION)} />
                    <Route index element={<Containers />} />
                </Route>

                <Route path={DASHBOARD_ANALYTICS_URL} element={protectedRoute(<AnalyticsHome />, DASHBOARD_ANALYTICS)} />
                <Route path={DASHBOARD_ACCOUNTS_PREFERENCE_URL} element={protectedRoute(<AccountsPreferenceHome />, DASHBOARD_ACCOUNTS_PREFERENCE)} />
                <Route path={DASHBOARD_CBSTORE_URL} element={protectedRoute(<CBStoreHome />, DASHBOARD_CBSTORE)} />
                <Route index element={<Containers />} />
            </Route>
            {/* <Route path={DASHBOARD_URL} element={<Dashboard />} /> */}

            {/* <Route path={SCRIBE_CREATE_URL} element={<CreateContent />} /> */}



            {/* Catch-all route for invalid URLs */}
            <Route path={"*"} element={unprotectedRoute(<NotFound />, HOME)} />

        </Routes>

    );
}


