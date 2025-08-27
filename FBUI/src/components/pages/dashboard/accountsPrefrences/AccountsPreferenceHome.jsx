import CustomSegmentGroup from "@/components/common/element/CustomSegmentGroup";
import CustomSpinner from "@/components/common/element/CustomSpinner";
import { Heading, HStack, Text } from "@chakra-ui/react";
import { lazy, Suspense, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ACCOUNT_DETAILS, accountPrefrenceOptions, PREFRENCES, SUBSCRIPTIONS_BOLTONS } from "../DashboardConstant";


const AccountDetails = lazy(() => import("./AccountDetails"));

export default function AccountsPreferenceHome() {
  const navigate = useNavigate();

  const [segment, setSegment] = useState(ACCOUNT_DETAILS);
  const [tempSegmentValue, setTempSegmentValue] = useState(ACCOUNT_DETAILS);
  const [showConfirmation, setShowsConfirmation] = useState(false);
  const [isModified, setIsModified] = useState(false);






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
      <HStack justifyContent="space-between" width="100%" mb={4}>
        <HStack>
          <Heading size="lg" color={"brand.pureWhiteTxt"}>{'Accounts & Preference'}</Heading>
        </HStack>
      </HStack>


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

      {segment == ACCOUNT_DETAILS && (
        <>
          <Suspense fallback={<CustomSpinner show={true} />}>
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