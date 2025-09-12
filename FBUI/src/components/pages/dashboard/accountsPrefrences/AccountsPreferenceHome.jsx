import { getStripeManageBillinPortalUrl } from "@/components/client/EdgeFunctionRepository";
import { toast } from "@/components/common/Notification";
import CustomLoaderButton from "@/components/common/element/CustomLoaderButton";
import CustomSegmentGroup from "@/components/common/element/CustomSegmentGroup";
import CustomSpinner from "@/components/common/element/CustomSpinner";
import { useAppConfigStore } from "@/components/store/AppConfigStore";
import { Heading, HStack, Text } from "@chakra-ui/react";
import { lazy, Suspense, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ACCOUNT_DETAILS, accountPrefrenceOptions, PREFRENCES, SUBSCRIPTIONS_BOLTONS } from "../DashboardConstant";
import { useAuthStore } from "@/components/store/AuthStateStore";


const AccountDetails = lazy(() => import("./AccountDetails"));

export default function AccountsPreferenceHome() {
  const navigate = useNavigate();

  const [segment, setSegment] = useState(ACCOUNT_DETAILS);
  const [tempSegmentValue, setTempSegmentValue] = useState(ACCOUNT_DETAILS);
  const [showConfirmation, setShowsConfirmation] = useState(false);
  const [isModified, setIsModified] = useState(false);

  const [stripeUrl, setStripeUrl] = useState(undefined);
  const [stripeUrlLoader, setStripeUrlLoader] = useState(false);

  const { jwt: authkeyBearer } = useAuthStore();


  useEffect(() => {
    fetchStripeManageUrl();
  }, []);


  const fetchStripeManageUrl = () => {

    setStripeUrlLoader(true)

    getStripeManageBillinPortalUrl(
      (flag, data) => {
        if (flag) {
          setStripeUrl(data?.url);
        } else {
          setStripeUrl(undefined)
          toast.error('Failed to invoice url!!')
        }
        setStripeUrlLoader(false);
      },
      authkeyBearer)
  };

  const onConfirmationOk = () => {
    setShowsConfirmation(false)
    setSegment(tempSegmentValue)
    setIsModified(false)
  };

  const onCloseConfirmation = () => {
    setTempSegmentValue(segment)
    setShowsConfirmation(false)
  }

  return (
    <>
      <HStack justifyContent="space-between" width="100%" height={"80px"} mb={4} pl={"30px"} pr={"60px"}>
        <Heading size="lg" color="brand.pureWhiteTxt">Accounts & Preference</Heading>
        <CustomLoaderButton
          cwidth="auto"
          cmt={6}
          cvariant="fblox"
          cloadingText="Loading..."
          loader={stripeUrlLoader}
          onClickBtn={() => { window.open(stripeUrl, "_blank") }}
          clabel="Change Subscription"
          cdisabled={!stripeUrl}
        />
      </HStack>

      {false && (<>
        <CustomSegmentGroup
          value={segment}
          setValue={setSegment}
          filterOptions={accountPrefrenceOptions}
          onChangeFilterOptions={(val) => {
            if (isModified) {
              setTempSegmentValue(val);
              setShowsConfirmation(true)
            } else {
              setSegment(val)
            }

          }}
          defaultValue={segment}
        />
      </>)}

      {segment == ACCOUNT_DETAILS && (
        <>
          <Suspense fallback={<CustomSpinner show={true} />} >
            <AccountDetails isModified={isModified} setIsModified={setIsModified} />
          </Suspense>
        </>
      )}

      {segment == PREFRENCES && (
        <>
          <Suspense fallback={<CustomSpinner show={true} />}>
            <Text color={"brand.pureWhiteTxt"}>{PREFRENCES} </Text>
          </Suspense>
        </>
      )}

      {segment == SUBSCRIPTIONS_BOLTONS && (
        <>
          <Suspense fallback={<CustomSpinner show={true} />}>
            <Text color={"brand.pureWhiteTxt"}> {SUBSCRIPTIONS_BOLTONS} </Text>
          </Suspense>
        </>
      )}



    </>
  );
}