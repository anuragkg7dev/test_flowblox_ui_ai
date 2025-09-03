import { trimString } from "@/components/common/util/StringUtil";
import { Button, Heading, HStack, Text, VStack, Wrap } from "@chakra-ui/react";
import React from "react";
import CustomTag from "../CustomTag";
import IconSwitch from "../IconSwitch";
import { getIndexByCharSum } from "../../util/JsonUtil";

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
  let sliceIndex = getIndexByCharSum(badges, 35) + 1

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
      bg="brand.OffBlackBg"
      color="brand.pureWhiteTxt"      
      spacing={4}
      align="center"
      pt={"10px"}
      pb={"10px"}
      borderRadius="md"
    >
      <IconSwitch type={type} boxSize={6} bgColor="brand.primaryBrandBorder" cml={"10px"} cmr={"10px"} />

      <HStack flex="1" spacing={4} align="center" >
        <VStack flex="1" spacing={2} align={"flex-start"} mb={"10px"} width={"70%"}>
          <Heading key={`tx_${cKey}`} size="custom20" lineClamp={1}>
            {heading}
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
          <Wrap>
            {badges.slice(0, sliceIndex)?.map(
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
          </Wrap>
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
            height={"30px"}
            ml="10px"
            mr="5px"
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
            height={"30px"}
            mr={"10px"}
          >
            Manage
          </Button>
        )}
      </HStack>
    </HStack>
  );
}

export default React.memo(CustomContainerDisplayRow);
