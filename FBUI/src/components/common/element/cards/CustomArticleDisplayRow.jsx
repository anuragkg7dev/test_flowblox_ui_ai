import { trimString } from "@/components/common/util/StringUtil";
import { Box, Button, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { actions, dot, getArticleOptions } from "../../constants/CommonUtilityAndOptions";
import CustomDateTimeDisplay from "../CustomDateTimeDisplay";
import { CustomFloatWithOffset } from "../CustomFloatWithOffset";
import CustomMenu from "../CustomMenu";
import CustomStatusDot from "../CustomStatusDot";
import CustomSpinnerOverlay from "./CustomSpinnerOverlay";

function CustomArticleDisplayRow(props) {
  const selectView = props.selectView ?? false;
  const cKey = props.cKey;
  const heading = props.heading;
  const subHeading = props.subHeading;
  const description = props.description;
  const data = props.data;
  const optionFlag = props.optionFlag == undefined ? true : props.optionFlag;
  const viewFlag = props.viewFlag == undefined ? true : props.viewFlag;
  const publishFlag = props.publishFlag == undefined ? false : props.publishFlag;
  const onClickView = props.onClickView;
  const handleStatusChange = props.handleStatusChange;
  const onCardClick = props.onCardClick;
  const sequence = props.sequence;
  const cdate = props.cdate
  const isProcessing = props.isProcessing
  const showPublishButton=props.showPublishButton
  const status = props.status 



  const onActionChange = (value, data) => {
    setAction(value)
    handleStatusChange(data, value)
  };


  return (
    <HStack
      key={`row_${cKey}`}
      width="100%"
      p={{ base: 2, md: 3 }}
      bg="brand.OffBlackBg"
      color="brand.pureWhiteTxt"
      borderBottom='0.1px solid'
      borderBottomColor='brand.greyBrandBorder'
      spacing={4}
      align="center"
      userSelect="none"
      position="relative"
    >

      <HStack flex="1" spacing={4} align="center">
        <VStack flex="1" spacing={2} align={"flex-start"}>
          <Box position="relative">
            <HStack>
              {publishFlag && (<CustomStatusDot type={dot.SUCCESS} cmr={2} cmb={0} csize={'md'} />)}
              <Heading key={`tx_${cKey}`} size="custom20">
                {trimString(heading, 30)}
              </Heading>
            </HStack>
            <CustomFloatWithOffset value={sequence} offset={-5} placement={'middle-end'} />
          </Box>
          {subHeading && (
            <Text color="fg.muted" fontSize="xs" noOfLines={1} minWidth="100px">
              {trimString(subHeading, 30)}
            </Text>
          )}

          <Text fontSize="xs" noOfLines={1} flex="1" color="brand.pureWhiteTxt">
            {trimString(description, 170)}
          </Text>

          <CustomDateTimeDisplay cdate={cdate} cfontSize="xs" />

        </VStack>

      </HStack>


      <HStack spacing={2}>


        {/* Spinner overlay for footer only */}
        <CustomSpinnerOverlay show={isProcessing} type={'syncLoader'} />


        {optionFlag && (<>
          <CustomMenu
            clabel="Action"
            sdata={getArticleOptions(status)}
            onSelect={(value) => onActionChange(value, data)}
            cwidth={"100px"}
          />


        </>)}
        {viewFlag && (
          <Button
            key={`bte_${cKey}`}
            variant={"fbloxD"}
            size="sm"
            aria-label="View"
            onClick={() => onClickView(data)}
            mt={1.5}
          >
            View
          </Button>
        )}



        {showPublishButton && (
          <Button
            mt={1}
            key={`btm_${cKey}`}
            variant={"fblox"}
            width="auto"
            height="35px"
            aria-label="Manage"
            onClick={() => handleStatusChange(data, actions.PUBLISH)}
          >
            Publish
          </Button>
        )}
      </HStack>
    </HStack>
  );
}

export default React.memo(CustomArticleDisplayRow);
