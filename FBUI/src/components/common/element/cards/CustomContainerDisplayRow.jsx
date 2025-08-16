import { trimString } from "@/components/common/util/StringUtil";
import { Button, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import React from "react";
import CustomTag from "../CustomTag";
import IconSwitch from "../IconSwitch";

function CustomContainerDisplayRow(props) {
  let cKey = props.cKey;
  let heading = props.heading;
  let subHeading = props.subHeading;
  let badges = props.badges ?? [];
  let description = props.description;
  let data = props.data;
  let editFlag = props.editFlag ?? true;
  let manageFlag = props.manageFlag ?? true;
  let onClickEdit = props.onClickEdit;
  let onClickManage = props.onClickManage;
  let enableRandomColor = props.enableRandomColor;
  let badgeColor = props.badgeColor ?? "brand.subBrandBg";
  let badgeTextColor = props.badgeColor ?? "brand.pureBlackTxt";
  let type = props.type;


  const colors = ["#dc2b37ff", "#46AB50", "#3f36e8ff", "#873AE1"];
  const startIndex = Math.floor(Math.random() * colors.length);

  const getRandomColor = (index) => {
    if (enableRandomColor) {
      return colors[(startIndex + index) % colors.length]
    }
    return badgeColor
  }

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
    >
      <IconSwitch type={type} boxSize={6} bgColor="brand.primaryBrandBorder" />

      <HStack flex="1" spacing={4} align="center">
        <VStack flex="1" spacing={2} align={"flex-start"}>
          <Heading key={`tx_${cKey}`} size="custom20">
            {trimString(heading, 100)}
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

        <HStack spacing={1} maxWidth="auto">
          {badges.slice(0, 6)?.map(
            (badge, index) =>
              badge.trim() && (
                <CustomTag
                  key={`bdg_${cKey}_${index}`}
                  cbg={getRandomColor(index)}
                  txtColor={badgeTextColor}
                  name={trimString(badge, 10)}
                  cpx={1}
                  cmt={1}
                  csize={"sm"} />

              )
          )}
        </HStack>
      </HStack>

      <HStack spacing={2}>
        {editFlag && (
          <Button
            key={`bte_${cKey}`}
            variant={"fbloxD"}
            size="sm"
            aria-label="Edit"
            onClick={() => onClickEdit(data)}
          >
            Edit
          </Button>
        )}
        {manageFlag && (
          <Button
            key={`btm_${cKey}`}
            variant={"fblox"}
            size="sm"
            aria-label="Manage"
            onClick={() => onClickManage(data)}
          >
            Manage
          </Button>
        )}
      </HStack>
    </HStack>
  );
}

export default React.memo(CustomContainerDisplayRow);
