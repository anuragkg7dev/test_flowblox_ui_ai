import { DASHBOARD, DASHBOARD_ACCOUNTS_PREFERENCE, DASHBOARD_ANALYTICS, DASHBOARD_CBSTORE, DASHBOARD_CONTAINER_ARTICLE_BLOGS_URL, DASHBOARD_CONTAINER_DESTINATION_URL, DASHBOARD_CONTAINER_MANAGE_BLOGS_URL, DASHBOARD_CONTAINER_SETTINGS_BLOGS_URL, DASHBOARD_CONTAINER_SOURCE_URL, DASHBOARD_CONTAINERS, FORGET_PASSWORD, FORGET_PASSWORD_URL, HOME, HOME_URL, IS_AUTHENTICATED, NOT_FOUND_404, NOT_FOUND_404_URL, OPEN_ARTICLE, OPEN_ARTICLE_URL, PRE_LAUNCH, PRE_LAUNCH_URL, PRODUCT_PRICING, PRODUCT_PRICING_URL, PRODUCT_SELECTION, PRODUCT_SELECTION_URL, RESET_PASSWORD, RESET_PASSWORD_URL, SIGN_IN, SIGN_IN_URL, SIGN_UP, SIGN_UP_URL, STRIPE_FAILED, STRIPE_FAILED_URL, STRIPE_SUCCESS, STRIPE_SUCCESS_URL } from "../common/constants/AppRouterConstant";

export const publicRoutes = ['/',
    HOME_URL,
    SIGN_UP_URL,
    SIGN_IN_URL,
    PRODUCT_SELECTION_URL,
    PRODUCT_PRICING_URL,
    STRIPE_SUCCESS_URL,
    STRIPE_FAILED_URL,
    PRE_LAUNCH_URL,
    NOT_FOUND_404_URL,
    FORGET_PASSWORD_URL,
    RESET_PASSWORD_URL,
    OPEN_ARTICLE_URL,
]; // add any other public pages here

export function getDefaultStateOfAppRouter() {
    let init = {}
    init[HOME] = true
    init[SIGN_IN] = true
    init[SIGN_UP] = true   
    init[FORGET_PASSWORD] = true
    init[RESET_PASSWORD] = true
    init[PRODUCT_SELECTION] = true
    init[PRODUCT_PRICING] = true
    init[STRIPE_SUCCESS] = true
    init[STRIPE_FAILED] = true
    init[PRE_LAUNCH] = true
    init[NOT_FOUND_404] = true
    init[OPEN_ARTICLE] = true
    return init
}


export function getStateOfAppRouterAfterSignIn() {
    return {
        ...getDefaultStateOfAppRouter(),
        [IS_AUTHENTICATED]: true,
        //-- Blogs Dashboard
        [DASHBOARD]: true,
        [DASHBOARD_CONTAINERS]: true,
        [DASHBOARD_ANALYTICS]: true,
        [DASHBOARD_ACCOUNTS_PREFERENCE]: true,
        [DASHBOARD_CBSTORE]: true, 
        //-- Blogs Routes
        [DASHBOARD_CONTAINER_MANAGE_BLOGS_URL]: true, 
        [DASHBOARD_CONTAINER_ARTICLE_BLOGS_URL]: true, 
        [DASHBOARD_CONTAINER_SETTINGS_BLOGS_URL]: true, 
        //-- Sub Routes
        [DASHBOARD_CONTAINER_SOURCE_URL]: true, 
        [DASHBOARD_CONTAINER_DESTINATION_URL]: true, 

        [FORGET_PASSWORD] : false,
        [RESET_PASSWORD] : false

    }
}

export function getStateOfAppRouterAfterSignOut() {
    return {
        ...getDefaultStateOfAppRouter(),
        DASHBOARD: null,
        IS_AUTHENTICATED: null,
    }
}

export const filterRoutes = (list, type) => {
    return list.filter(x => type == x.type)
}