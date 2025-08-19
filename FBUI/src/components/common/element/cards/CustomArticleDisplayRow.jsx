import { trimString } from "@/components/common/util/StringUtil";
import { Button, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import CustomSelect from "../CustomSelect";
import { articleOptions } from "@/components/pages/dashboard/DashboardConstant";
import CustomMenu from "../CustomMenu";
import CustomDateTimeDisplay from "../CustomDateTimeDisplay";

function CustomArticleDisplayRow(props) {
  let cKey = props.cKey;
  let heading = props.heading;
  let subHeading = props.subHeading;
  let description = props.description;
  let data = props.data;
  let viewFlag = props.viewFlag ?? true;
  let publishFlag = props.publishFlag ?? true;
  let optionFlag = props.optionFlag ?? true
  let onClickView = props.onClickView;
  let onClickPublish = props.onClickPublish;
  let sequence = props.sequence;
  let cdate = props.cdate


  let [articleOption, setArticleOption] = useState("");

  const onArticleOptionChange = (value) => {
    console.log("AKG.......value......", value)
    setArticleOption(value)
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
    >

      <HStack flex="1" spacing={4} align="center">
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

        <Text>Sequence - ${sequence}</Text>
        <CustomDateTimeDisplay cdate={cdate} />

        {optionFlag && (<>
          <CustomMenu
            clabel="Action"
            sdata={articleOptions}
            onSelect={(value) => onArticleOptionChange(value)}
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
        {publishFlag && (
          <Button
            key={`btm_${cKey}`}
            variant={"fblox"}
            size="sm"
            aria-label="Publish"
            onClick={() => onClickPublish(data)}
            mt={1.5}
          >
            Publish
          </Button>
        )}
      </HStack>
    </HStack>
  );
}

export default React.memo(CustomArticleDisplayRow);
