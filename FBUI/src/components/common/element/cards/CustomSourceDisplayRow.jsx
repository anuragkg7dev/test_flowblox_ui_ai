import { trimString } from "@/components/common/util/StringUtil";
import { Button, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import React from "react";
import CustomSwitch from "../CustomSwitch";
import CustomTag from "../CustomTag";
import IconSwitch from "../IconSwitch";
import CustomSpinnerOverlay from "./CustomSpinnerOverlay";

function CustomSourceDisplayRow(props) {
  const cKey = props.cKey;
  const heading = props.heading;
  const subHeading = props.subHeading;
  const description = props.description;
  const type = props.type;
  const typeLabel = props.typeLabel ?? '';
  const sourceFlag = props.sourceFlag == undefined ? true : props.sourceFlag;
  const editFlag = props.editFlag == undefined ? true : props.editFlag;
  const enabled = props.enabled == undefined ? true : props.enabled;
  const data = props.data;

  const onClickEdit = props.onClickEdit;
  const onChangeSwitch = props.onChangeSwitch;

  const isProcessing = props.isProcessing;

  return (
    <HStack
      key={`row_${cKey}`}
      width="100%"
      bg="brand.OffBlackBg"
      color="brand.pureWhiteTxt"
      pt={"10px"}
      pb={"10px"}
      spacing={4}
      align="center"
      position="relative"
    >

      <HStack flex="1" spacing={4} align="center" mb={"10px"} width={"70%"}>
        <HStack>

          <IconSwitch type={type} boxSize={6} bgColor="brand.primaryBrandBorder" />

        </HStack>
        <VStack flex="1" spacing={2} align={"flex-start"}>
          <Heading key={`tx_${cKey}`} size="custom20">
            {trimString(heading, 30)}
          </Heading>
          {subHeading && (
            <Text color="fg.muted" fontSize="xs" noOfLines={1} minWidth="100px">
              {trimString(subHeading, 30)}
            </Text>
          )}
          <Text fontSize="xs" noOfLines={1} flex="1" color="brand.pureWhiteTxt">
            {trimString(description, 170)}
          </Text>
        </VStack>

      </HStack>

      <HStack spacing={2} userSelect="none" >
        <CustomTag
          key={`bdg_${cKey}`}
          cbg={"brand.subBrandBg"}
          txtColor={"brand.pureBlackTxt"}
          name={trimString(typeLabel, 10)}
          cpx={1}
          cmt={1}
          csize={"sm"} />

        {editFlag && (
          <Button
            key={`btm_${cKey}`}
            variant={"fblox"}
            width="auto"
            aria-label="Manage"
            onClick={() => onClickEdit(data)}
            height="30px"
            mr={"5px"}
            ml={"5px"}
          >
            Edit
          </Button>
        )}
        {/* Spinner overlay for footer only */}
        <CustomSpinnerOverlay show={isProcessing} />

        {sourceFlag && (
          <CustomSwitch
            label={"Enable Source"}
            onSwitchChange={(val) => { onChangeSwitch?.(val, data); }}
            defaultValue={enabled}
            cheight="30px"
            cp={2}
          />
        )}
      </HStack>
    </HStack>
  );
}

export default React.memo(CustomSourceDisplayRow);
