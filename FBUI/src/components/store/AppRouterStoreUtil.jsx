import { DASHBOARD, FORGET_PASSWORD, HOME, HOME_URL, IS_AUTHENTICATED, NOT_FOUND_404, NOT_FOUND_404_URL, PRODUCT_PRICING, PRODUCT_PRICING_PRELAUNCH, PRODUCT_PRICING_PRELAUNCH_URL, PRODUCT_PRICING_URL, PRODUCT_SELECTION, PRODUCT_SELECTION_URL, RESET_PASSWORD, SIGN_IN, SIGN_IN_URL, SIGN_UP, SIGN_UP_URL, STRIPE_FAILED, STRIPE_FAILED_URL, STRIPE_SUCCESS, STRIPE_SUCCESS_URL } from "../common/constants/AppRouterConstant";

export const publicRoutes = ['/',
    HOME_URL,
    SIGN_UP_URL,
    SIGN_IN_URL,
    PRODUCT_SELECTION_URL,
    PRODUCT_PRICING_URL,
    STRIPE_SUCCESS_URL,
    STRIPE_FAILED_URL,
    PRODUCT_PRICING_PRELAUNCH_URL,
    NOT_FOUND_404_URL
]; // add any other public pages here

export function getDefaultStateOfAppRouter() {
    let init = {}
    init[HOME] = true
    init[SIGN_IN] = true
    init[SIGN_UP] = true
    init[DASHBOARD] = false // check
    init[FORGET_PASSWORD] = true
    init[RESET_PASSWORD] = true
    init[PRODUCT_SELECTION] = true
    init[PRODUCT_PRICING] = true
    init[STRIPE_SUCCESS] = true
    init[STRIPE_FAILED] = true
    init[PRODUCT_PRICING_PRELAUNCH] = true
    init[NOT_FOUND_404] = true
    return init
}


export function getStateOfAppRouterAfterSignIn(state) {
    return {
        ...state.data,
        [DASHBOARD]: true,
        [IS_AUTHENTICATED]: true,
    }
}

export function getStateOfAppRouterAfterSignOut(data) {
    return {
        ...data,
        DASHBOARD: null,
        IS_AUTHENTICATED: null,
    }
}