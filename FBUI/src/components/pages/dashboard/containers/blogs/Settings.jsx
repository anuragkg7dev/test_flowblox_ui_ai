import CustomSegmentGroup from "@/components/common/element/CustomSegmentGroup";
import { Heading, HStack } from "@chakra-ui/react";
import { AI_AGENTS, articleSettingOptions, CONFIGURABLE, FREQUENCY } from "../../DashboardConstant";

import { STATUS } from "@/components/common/constants/CommonConstant";
import { CommonMessageLabels } from "@/components/common/constants/CommonLabelConstants";
import ConfirmationDialog from "@/components/common/element/ConfirmationDialog";
import CustomSpinner from "@/components/common/element/CustomSpinner";
import { lazy, Suspense, useState } from "react";
import SettingsConfigurable from "./SettingsConfigurable";

const SettingsFrequency = lazy(() => import("./SettingsFrequency"));
const SettingsAIAgent = lazy(() => import("./SettingsAIAgent"));


export default function Settings(props) {


  const [segment, setSegment] = useState(FREQUENCY);
  const [tempSegmentValue, setTempSegmentValue] = useState(FREQUENCY);
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

      <HStack justify={"space-between"} pl={"30px"} pr={"60px"}>

        <Heading size="lg" color={"brand.pureWhiteTxt"}>Container Settings</Heading>
        <CustomSegmentGroup
          value={segment}
          setValue={setSegment}
          filterOptions={articleSettingOptions}
          cmt={8}
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

      </HStack>

      {segment == FREQUENCY && (
        <>
          <Suspense fallback={<CustomSpinner show={true} />}>
            <SettingsFrequency isModified={isModified} setIsModified={setIsModified} />
          </Suspense>
        </>
      )}

      {segment == AI_AGENTS && (
        <>
          <Suspense fallback={<CustomSpinner show={true} />}>
            <SettingsAIAgent isModified={isModified} setIsModified={setIsModified} />
          </Suspense>
        </>
      )}

      {segment == CONFIGURABLE && (
        <>
          <Suspense fallback={<CustomSpinner show={true} />}>
            <SettingsConfigurable isModified={isModified} setIsModified={setIsModified} />
          </Suspense>
        </>
      )}

      <ConfirmationDialog
        show={showConfirmation}
        setShow={setShowsConfirmation}
        header={CommonMessageLabels.CLOSE_HEADING}
        description={CommonMessageLabels.CLOSE_DESCRIPTION}
        onOk={onConfirmationOk}
        onClose={onCloseConfirmation}
        closeLabel={CommonMessageLabels.NO}
        okLabel={CommonMessageLabels.YES}
        status={STATUS.WARNING}
      />


    </>
  );
}