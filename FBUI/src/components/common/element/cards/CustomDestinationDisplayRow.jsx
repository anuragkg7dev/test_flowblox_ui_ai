import { trimString } from "@/components/common/util/StringUtil";
import { Button, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import React from "react";
import CustomSwitch from "../CustomSwitch";
import IconSwitch from "../IconSwitch";
import CustomSpinnerOverlay from "./CustomSpinnerOverlay";

function CustomDestinationDisplayRow(props) {
  const cKey = props.cKey;
  const heading = props.heading;
  const subHeading = props.subHeading;
  const description = props.description;
  const type = props.type;
  const destinationFlag = props.destinationFlag == undefined ? true : props.destinationFlag;
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
      p={{ base: 2, md: 3 }}
      bg="brand.OffBlackBg"
      color="brand.pureWhiteTxt"
      borderBottom='0.1px solid'
      borderBottomColor='brand.greyBrandBorder'
      spacing={4}
      align="center"
      position="relative"
    >

      <HStack flex="1" spacing={4} align="center">
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

      <HStack spacing={2}>


        {editFlag && (
          <Button
            mt={1}
            key={`btm_${cKey}`}
            variant={"fblox"}
            width="auto"
            height={"34px"}
            aria-label="Manage"
            onClick={() => onClickEdit(data)}
          >
            Edit
          </Button>
        )}

        {/* Spinner overlay for footer only */}
        <CustomSpinnerOverlay show={isProcessing} />

        {destinationFlag && (
          <CustomSwitch
            label={"Destination On/Off"}
            onSwitchChange={(val) => { onChangeSwitch?.(val, data); }}
            defaultValue={enabled}

            cp={2}
          />
        )}
      </HStack>
    </HStack>
  );
}

export default React.memo(CustomDestinationDisplayRow);
