const api_open_key = import.meta.env.VITE_API_OPEN_KEY;

export const edgeFunction = {
    GET_BUNDLED_PRODUCTS: "getBundleProducts",
    GET_COMBO_PRODUCTS: "getComboProducts",
    GET_DROP_DOWN_OPTIONS: "getDropdownOptions",
    STRIPE_CHECKOUT_SESSION: "stripeCreateCheckoutSession",
    VERIFY_REGISTRATION: "verifyRegistration",
    VERIFY_STRIPE_PRE_TRANSACTION: "verifyStripeTransaction",
};

const edgeFunctionKeys = {};
edgeFunctionKeys[edgeFunction.GET_BUNDLED_PRODUCTS] = api_open_key;
edgeFunctionKeys[edgeFunction.GET_COMBO_PRODUCTS] = api_open_key;
edgeFunctionKeys[edgeFunction.GET_DROP_DOWN_OPTIONS] = api_open_key;
edgeFunctionKeys[edgeFunction.STRIPE_CHECKOUT_SESSION] = api_open_key;
edgeFunctionKeys[edgeFunction.VERIFY_REGISTRATION] = api_open_key;
edgeFunctionKeys[edgeFunction.VERIFY_STRIPE_PRE_TRANSACTION] = api_open_key;


export const getEdgeFunctionApiKeys = (functionName) => {
    return edgeFunctionKeys[functionName] || null;
};