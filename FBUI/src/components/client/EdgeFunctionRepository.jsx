import { isNotUndefinedOrWhitespace } from "../common/util/StringUtil"
import { API_PARAM_KEY, SOURCE_DESTINATION_KEY } from "../pages/dashboard/containers/ContainersConstant"
import { edgeFunction, getEdgeFunctionApiKeys } from "./EdgeFunctionConstants"

let superbasEdgeBaseUrl = import.meta.env.VITE_SUPABASE_EDGE_URL
let POST = 'POST'
let GET = 'GET'
let DELETE = 'DELETE'
//--------------

export function getProductBundleSubscription(callback) {
  return callEdgeFunctionNonAuth(edgeFunction.GET_BUNDLED_PRODUCTS, undefined, callback, GET)
}

export function getStripeCheckoutSession(body, callback) {
  callEdgeFunctionNonAuth(edgeFunction.STRIPE_CHECKOUT_SESSION, body, callback, POST)
}

export function getProductComboSubscription(productId, callback) {
  let rbody = { "combo_plan_ids": [productId] }
  return callEdgeFunctionNonAuth(edgeFunction.GET_COMBO_PRODUCTS, rbody, callback, POST)
}

export function verifyRegistration(body, callback) {
  callEdgeFunctionNonAuth(edgeFunction.VERIFY_REGISTRATION, body, callback, POST)
}

export function verifyStripePreTransaction(body, callback) {
  callEdgeFunctionNonAuth(edgeFunction.VERIFY_STRIPE_PRE_TRANSACTION, body, callback, POST)
}

export function getArticleExternalUid(uid, callback) {
  callEdgeFunctionNonAuth(edgeFunction.GET_ARTICLES_BY_UID_EXT+'?id='+uid, undefined, callback, GET)
}

//---

export function createAndUpdateBlogContainers(body, callback, authkeyBearer) {
  callEdgeFunction(edgeFunction.CREATE_UPDATE_BLOG_CONTAINERS, body, callback, authkeyBearer, POST)
}

export function getContainers(filterMap, callback, authkeyBearer) {
  callEdgeFunctionWithParams(edgeFunction.GET_CONTAINERS, {}, filterMap, callback, authkeyBearer, GET)
}

export function createAndUpdateSourceAndDestination(body, callback, authkeyBearer) {
  callEdgeFunction(edgeFunction.CREATE_UPDATE_SOURCE_DESTINATION, body, callback, authkeyBearer, POST)
}

export function getSourceAndDestination(filterMap, callback, authkeyBearer) {
  callEdgeFunctionWithParams(edgeFunction.GET_SOURCE_DESTINATION, {}, filterMap, callback, authkeyBearer, GET)
}

export function generateArticleTrigger(paramMap, callback, authkeyBearer) {
  callEdgeFunctionWithParams(edgeFunction.GENERATE_ARTICLES_TRIGGER, {}, paramMap, callback, authkeyBearer, GET)
}

export function getGeneratedArticles(filterMap, callback, authkeyBearer) {
  callEdgeFunctionWithParams(edgeFunction.GET_GENERATED_ARTICLES, {}, filterMap, callback, authkeyBearer, GET)
}

export function getBalance(container_type, callback, authkeyBearer) {
  let paramMap = new Map([[API_PARAM_KEY.CONTAINER_TYPE, container_type],]);
  callEdgeFunctionWithParams(edgeFunction.GET_BALANCE, {}, paramMap, callback, authkeyBearer, GET)
}

export function updatePersonalDetails(body, callback, authkeyBearer) {
  callEdgeFunction(edgeFunction.UPDATE_PERSONAL_DETAILS, body, callback, authkeyBearer, POST)
}

export function getUsersPersonalDetails(callback, authkeyBearer) {
  callEdgeFunction(edgeFunction.GET_USERS_PERSONAL_DETAILS, {}, callback, authkeyBearer, GET)
}

export function getStripeManageBillinPortalUrl(callback, authkeyBearer) {
  callEdgeFunction(edgeFunction.STRIPE_MANAGE_BILLING_PORTAL_URL, { returnUrl: window.location.origin }, callback, authkeyBearer, POST)
}

export function getCountStats(callback, authkeyBearer) {
  callEdgeFunction(edgeFunction.GET_COUNT_STATS, {}, callback, authkeyBearer, GET)
}

export function updateArticleStatus(body, callback, authkeyBearer) {
  callEdgeFunction(edgeFunction.UPDATE_ARTICLE_STATUS, body, callback, authkeyBearer, POST)
}

export function getPublishCountStats(body, callback, authkeyBearer) {
  callEdgeFunction(edgeFunction.GET_PUBLISH_COUNT_STATS, body, callback, authkeyBearer, POST)
}

export function updateContainerAutoPublish(body, callback, authkeyBearer) {
  callEdgeFunction(edgeFunction.UPDATE_CONTAINER_AUTOPUBLISH, body, callback, authkeyBearer, POST)
}

export function removeSourceDestination(body, callback, authkeyBearer) {
  callEdgeFunction(edgeFunction.REMOVE_SOURCE_AND_DESTINATION, body, callback, authkeyBearer, DELETE)
}

export function updateContainerStatus(body, callback, authkeyBearer) {
  callEdgeFunction(edgeFunction.UPDATE_CONTAINER_STATUS, body, callback, authkeyBearer, POST)
}

export function getContainerNextRun(container_id, callback, authkeyBearer) {
  let paramMap = new Map([[API_PARAM_KEY.ID, container_id],]);
  callEdgeFunctionWithParams(edgeFunction.GET_NEXT_RUN, {}, paramMap, callback, authkeyBearer, GET)
}

export function getMediaAssets(container_id, sub_id, callback, authkeyBearer) {
  let paramMap = new Map([[API_PARAM_KEY.CONTAINERS_ID, container_id], [API_PARAM_KEY.SUB_ID, sub_id]]);
  callEdgeFunctionWithParams(edgeFunction.GET_MEDIA_ASSETS, {}, paramMap, callback, authkeyBearer, GET)
}

export function verifyDestination(body, callback, authkeyBearer) {
  callEdgeFunction(edgeFunction.VERIFY_DESTINATION, body, callback, authkeyBearer, POST)
}










//--------------------------------------

export function callEdgeFunctionNonAuth(functionName, rbody, callback, method) {
  return callEdgeFunction(functionName, rbody, callback, undefined, method)
}

export function callEdgeFunction(functionName, rbody, callback, authkeyBearer, method) {
  return callEdgeFunctionWithParams(functionName, rbody, undefined, callback, authkeyBearer, method)
}

export function callEdgeFunctionWithParams(functionName, rbody, params, callback, authkeyBearer, method) {

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
    method: method ?? "POST",
    headers: cHeaders,

    body: method != GET ? JSON.stringify({ name: "Functions", ...cbody }) : undefined,

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
      if (isNotUndefinedOrWhitespace(value)) {
        urlObj.searchParams.append(key, value?.toString());
      }
    });
    return urlObj.toString();
  }
  return url
}


