import { CommonLabels } from "@/components/common/constants/CommonLabelConstants";
import CustomSwitch from "@/components/common/element/CustomSwitch";
import IconSwitch from "@/components/common/element/IconSwitch";
import {
  Box,
  Heading,
  HStack,
  IconButton,
  Input,
  InputGroup
} from "@chakra-ui/react";
import { useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { LuLayoutGrid, LuLayoutList } from "react-icons/lu";
import { CARD_LAYOUT, LIST_LAYOUT } from "../../DashboardConstant";


export default function CommonSearchHeaderWithPublish(props) {
  const [xsearchQuery, setXSearchQuery] = useState("");

  const searchQuery = props.searchQuery ?? xsearchQuery
  const setSearchQuery = props.setSearchQuery ?? setXSearchQuery

  const name = props.name ?? CommonLabels.MY_BLOX
  const layoutStyle = props.layoutStyle;
  const setLayoutStyle = props.setLayoutStyle;
  const showIcon = props.showIcon;
  const iconType = props.iconType;

  const onAutoPublishSwitchChange = props.onAutoPublishSwitchChange;
  const autoPublishloader = props.autoPublishloader
  const autoPublish = props.autoPublish
  const setAutoPublish = props.setChecked
  const showAutoPublish = props.showAutoPublish

  const cpl = props.cpl ?? '30px';
  const cpr = props.cpr ?? '60px';
  

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const onChangeLayoutStyle = (e) => {
    setLayoutStyle(layoutStyle === CARD_LAYOUT ? LIST_LAYOUT : CARD_LAYOUT);
  };

  return (
    <HStack pl={cpl} pr={cpr} height={"80px"} justifyContent="space-between" width="100%" >
      <HStack>
        {showIcon && (
          <IconSwitch type={iconType} boxSize={5} />
        )}
        <Heading size="lg" color={"brand.pureWhiteTxt"}>{name}</Heading>
      </HStack>
      <HStack>
        {showAutoPublish && (<Box userSelect="none" position="relative" mt={2}>

          <CustomSwitch
            label={"Auto Publish"}
            onSwitchChange={(val) => { onAutoPublishSwitchChange?.(val) }}
            defaultValue={autoPublish}
            cheight={'37px'}
            switchLoader={autoPublishloader}
            checked={autoPublish}
            setChecked={setAutoPublish}
          />

        </Box>
        )}
        <InputGroup endElement={<IoMdSearch />} width="131px" mt={2}>
          <Input
            placeholder="Search"
            variant={"fbloxD"}
            onChange={handleSearch}
            height={"37px"}
            value={searchQuery}
          />
        </InputGroup>


        <IconButton
          key="layout"
          aria-label=""
          onClick={onChangeLayoutStyle}
          variant="solid"
          size="sm"
          mt={1}
        >
          {layoutStyle === CARD_LAYOUT ? (
            <LuLayoutGrid color="brand.pureWhiteBg" />
          ) : (
            <LuLayoutList color="brand.pureWhiteBg" />
          )}
        </IconButton>
      </HStack>
    </HStack>
  );
}
