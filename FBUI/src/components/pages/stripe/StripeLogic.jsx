import { getStripeCheckoutSession } from "@/components/client/EdgeFunctionRepository";
import { loadStripe } from "@stripe/stripe-js";


const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
const stripePromise = loadStripe(stripePublishableKey);

export async function handleCheckout(user, lineItems, paymentDetails) {
  const payload = {
    name: "Functions",
    userEmail: user.email,
    lineItems: lineItems,
    stripeMetadata: { ...user, ...paymentDetails }
  };

  await getStripeCheckoutSession(payload, stripeCheckoutSessionCallback)
}

const stripeCheckoutSessionCallback = (flag, data) => {
  console.log(data)
  if (!flag) {
    throw new Error(`Checkout failed: ${response.statusText}`);
  } else {
    const { url } = data;
    if (url) {
      window.location.href = url;
    } else {
      console.error("Checkout session URL not returned.");
    }
  }

}
