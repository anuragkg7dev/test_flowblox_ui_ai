const api_open_key = import.meta.env.VITE_API_OPEN_KEY;

export const edgeFunction = {
    GET_BUNDLED_PRODUCTS: "getBundleProducts",
    GET_COMBO_PRODUCTS: "getComboProducts",
    STRIPE_CHECKOUT_SESSION: "stripeCreateCheckoutSession",
    STRIPE_MANAGE_BILLING_PORTAL_URL: 'stripeManageBillinPortalUrl',
    VERIFY_REGISTRATION: "verifyRegistration",
    VERIFY_STRIPE_PRE_TRANSACTION: "verifyStripeTransaction",
    CREATE_UPDATE_BLOG_CONTAINERS: "createAndUpdateBlogContainers",
    GET_CONTAINERS: "getContainers",
    CREATE_UPDATE_SOURCE_DESTINATION: "createUpdateSourceDestination",
    GET_SOURCE_DESTINATION: "getSourceAndDestination",
    GENERATE_ARTICLES_TRIGGER: "generateArticlesTrigger",
    GET_GENERATED_ARTICLES: 'getGeneratedArticles',
    GET_BALANCE: 'getBalance',
    UPDATE_PERSONAL_DETAILS: 'updatePersonalDetails',
    GET_USERS_PERSONAL_DETAILS: "getUsersPersonalDetails",
    GET_COUNT_STATS: "getCountStats",
    UPDATE_ARTICLE_STATUS: "updateArticleStatus",
    GET_PUBLISH_COUNT_STATS: "getPublishCountStats",
    UPDATE_CONTAINER_AUTOPUBLISH: "updateContainerAutoPublish",
    REMOVE_SOURCE_AND_DESTINATION: "removeSourceDestination",
    UPDATE_CONTAINER_STATUS: "updateContainerStatus",
    GET_NEXT_RUN: "getContainerNextRun",
    GET_MEDIA_ASSETS: "getMediaAssets",
    GET_ARTICLES_BY_UID_EXT: "getArticlesByUidExt",
    VERIFY_DESTINATION: "verifyDestination",
    IS_CONTAINER_ACTIVE_BY_SUBSCRIPTION: "isContainerActiveBySubscription",
    GET_AVAILABLE_PRODUCT_SID: "getAvailableProductSId",
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