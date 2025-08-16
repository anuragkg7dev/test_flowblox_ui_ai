import { edgeFunction, getEdgeFunctionApiKeys } from "./EdgeFunctionConstants"



let authKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVnaXdpaWh4ZGxzaGx1a2ZibXdkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQzOTAyNTcsImV4cCI6MjA1OTk2NjI1N30.dCbaAyze4esGyzBhp2pii85P1-bsd0AHKnz7rTgV6bk"


let superbasEdgeBaseUrl = import.meta.env.VITE_SUPABASE_EDGE_URL

//--------------

export function getProductBundleSubscription(callback) {
  return callEdgeFunctionNonAuth(edgeFunction.GET_BUNDLED_PRODUCTS, undefined, callback)
}

export function getDropdownOptions(callback) {
  callEdgeFunction(edgeFunction.GET_DROP_DOWN_OPTIONS, undefined, callback)
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

//--------------------------------------

export function callEdgeFunctionNonAuth(functionName, rbody, callback) {
  return callEdgeFunction(functionName, rbody, callback)
}

export function callEdgeFunction(functionName, rbody, callback) {

  let cbody = rbody ?? {}

  let url = superbasEdgeBaseUrl + functionName

  let apiKey = getEdgeFunctionApiKeys(functionName)

  let authkeyBearer = authKey

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


