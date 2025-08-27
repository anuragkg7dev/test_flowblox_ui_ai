import { API_PARAM_KEY, SOURCE_DESTINATION_KEY } from "../pages/dashboard/containers/ContainersConstant"
import { edgeFunction, getEdgeFunctionApiKeys } from "./EdgeFunctionConstants"

let superbasEdgeBaseUrl = import.meta.env.VITE_SUPABASE_EDGE_URL

//--------------

export function getProductBundleSubscription(callback) {
  return callEdgeFunctionNonAuth(edgeFunction.GET_BUNDLED_PRODUCTS, undefined, callback)
}

export function getStripeCheckoutSession(body, callback) {
  callEdgeFunctionNonAuth(edgeFunction.STRIPE_CHECKOUT_SESSION, body, callback)
}

export function getProductComboSubscription(productId, callback) {
  let rbody = { "combo_plan_ids": [productId] }
  return callEdgeFunctionNonAuth(edgeFunction.GET_COMBO_PRODUCTS, rbody, callback)
}

export function verifyRegistration(body, callback) {
  callEdgeFunctionNonAuth(edgeFunction.VERIFY_REGISTRATION, body, callback)
}

export function verifyStripePreTransaction(body, callback) {
  callEdgeFunctionNonAuth(edgeFunction.VERIFY_STRIPE_PRE_TRANSACTION, body, callback)
}

export function createAndUpdateBlogContainers(body, callback, authkeyBearer) {
  callEdgeFunction(edgeFunction.CREATE_UPDATE_BLOG_CONTAINERS, body, callback, authkeyBearer)
}

export function getContainers(filterMap, callback, authkeyBearer) {
  callEdgeFunctionWithParams(edgeFunction.GET_CONTAINERS, {}, filterMap, callback, authkeyBearer)
}

export function createAndUpdateSourceAndDestination(body, callback, authkeyBearer) {
  callEdgeFunction(edgeFunction.CREATE_UPDATE_SOURCE_DESTINATION, body, callback, authkeyBearer)
}

export function getSourceAndDestination(filterMap, callback, authkeyBearer) {
  callEdgeFunctionWithParams(edgeFunction.GET_SOURCE_DESTINATION, {}, filterMap, callback, authkeyBearer)
}

export function generateArticleTrigger(paramMap, callback, authkeyBearer) {
  callEdgeFunctionWithParams(edgeFunction.GENERATE_ARTICLES_TRIGGER, {}, paramMap, callback, authkeyBearer)
}

export function getGeneratedArticles(filterMap, callback, authkeyBearer) {
  callEdgeFunctionWithParams(edgeFunction.GET_GENERATED_ARTICLES, {}, filterMap, callback, authkeyBearer)
}

export function getBalance(container_type, callback, authkeyBearer) {
  let paramMap = new Map([[API_PARAM_KEY.CONTAINER_TYPE, container_type],]);
  callEdgeFunctionWithParams(edgeFunction.GET_BALANCE, {}, paramMap, callback, authkeyBearer)
}

export function updatePersonalDetails(body, callback, authkeyBearer) {
  callEdgeFunction(edgeFunction.UPDATE_PERSONAL_DETAILS, body, callback, authkeyBearer)
}

export function getUsersPersonalDetails(callback, authkeyBearer) {
  callEdgeFunction(edgeFunction.GET_USERS_PERSONAL_DETAILS, {}, callback, authkeyBearer)
}









//--------------------------------------

export function callEdgeFunctionNonAuth(functionName, rbody, callback) {
  return callEdgeFunction(functionName, rbody, callback, undefined)
}

export function callEdgeFunction(functionName, rbody, callback, authkeyBearer) {
  return callEdgeFunctionWithParams(functionName, rbody, undefined, callback, authkeyBearer)
}

export function callEdgeFunctionWithParams(functionName, rbody, params, callback, authkeyBearer) {

  let cbody = rbody ?? {}

  let url = superbasEdgeBaseUrl + functionName

  url = appendParams(url, params)

  let apiKey = getEdgeFunctionApiKeys(functionName)

  let cHeaders = { "Content-Type": "application/json" }

  if (apiKey) {
    cHeaders["x-api-key"] = apiKey
  }

  if (authkeyBearer) {
    cHeaders["Authorization"] = "Bearer " + authkeyBearer
  }

  fetch(url, {
    method: "POST",
    headers: cHeaders,

    body: JSON.stringify({ name: "Functions", ...cbody }),

  }).then((response) => {
    return response.json().then((data) => {
      if (!response.ok) {
        // Handle HTTP errors here
        if (callback) callback(false, data);
        return; // prevent further .then() from running
      }

      // Success
      if (callback) callback(true, data);
    });
  }).catch((error) => {

    console.error("Error calling EdgeFunction :", error, url);
    if (callback) callback(false, "Something went wrong : url - ");

  });
}

function appendParams(url, paramMap) {
  if (paramMap) {
    const urlObj = new URL(url);
    paramMap.forEach((value, key) => {
      urlObj.searchParams.append(key, value?.toString());
    });
    return urlObj.toString();
  }
  return url
}


