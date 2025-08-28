import { Button } from "@chakra-ui/react";
import { memo, useState } from "react";
import { getStripeCheckoutSession } from "@/components/client/EdgeFunctionRepository";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "@/components/common/Notification";


const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
const stripePromise = loadStripe(stripePublishableKey);

function StripePaymentButton(props) {

  const [xloader, setXloader] = useState(false)

  const cwidth = props.cwidth ?? "100%";
  const cheight = props.cheight;
  const cmt = props.cmt;
  const cvariant = props.cvariant ?? "fblox";
  const cloadingText = props.cloadingText ?? 'Processing';
  const loader = props.loader ?? xloader;
  const setLoader = props.setLoader ?? setXloader;
  const clabel = props.clabel ?? 'Buy Now';
  const cdisabled = props.cdisabled ?? false
  const cfontSize = props.cfontSize ?? { base: "sm", md: "md" }

  const user = props.user
  const lineItems = props.lineItems
  const paymentDetails = props.paymentDetails

  async function handleCheckout(user, lineItems, paymentDetails) {
    try {
      setLoader(true)
      const payload = {
        name: "Functions",
        userEmail: user.email,
        lineItems: lineItems,
        stripeMetadata: { ...user, ...paymentDetails }
      };

      await getStripeCheckoutSession(payload, stripeCheckoutSessionCallback)
    } catch (e) {
      console.log(e)
      setLoader(false)
      toast.error('Checkout failed !!')
    }
  }

  const stripeCheckoutSessionCallback = (flag, data) => {
    console.log(data)
    if (!flag) {
      throw new Error(`Checkout failed !!`);
    } else {
      const { url } = data;
      if (url) {
        setLoader(false)
        window.location.href = url;
      } else {
        throw new Error(`Checkout failed (URL) !!`);
      }
    }
  }

  return (
    <>
      {loader && (
        <Button
          height={cheight}
          width={cwidth}
          mt={cmt}
          variant={cvariant}
          loading
          loadingText={cloadingText}
          disabled={cdisabled}
          fontSize={cfontSize}
        >
          {clabel}
        </Button>
      )}

      {!loader && (
        <Button
          mt={cmt}
          variant={cvariant}
          height={cheight}
          width={cwidth}
          onClick={() => { handleCheckout(user, lineItems, paymentDetails) }}
          type="button"
          disabled={cdisabled}
          fontSize={cfontSize}
        >
          {clabel}

        </Button>

      )}
    </>

  );
}

export default memo(StripePaymentButton);
