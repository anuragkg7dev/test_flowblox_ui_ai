import CustomSelect from "@/components/common/element/CustomSelect";
import {
  Box,
  Heading,
  HStack,
  IconButton,
  Input,
  InputGroup,
  Text
} from "@chakra-ui/react";
import { useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { LuLayoutGrid, LuLayoutList } from "react-icons/lu";
import { CARD_LAYOUT, LIST_LAYOUT } from "../../DashboardConstant";
import IconSwitch from "@/components/common/element/IconSwitch";
import { CommonLabels } from "@/components/common/constants/CommonLabelConstants";
import CustomSwitch from "@/components/common/element/CustomSwitch";


export default function CommonSearchHeaderWithPublish(props) {
  const name = props.name ?? CommonLabels.MY_BLOX
  const [searchQuery, setSearchQuery] = useState("");
  const [sortParam, setSortParam] = useState("");
  const layoutStyle = props.layoutStyle;
  const setLayoutStyle = props.setLayoutStyle;
  const showIcon = props.showIcon;
  const iconType = props.iconType;

  const onAutoPublishSwitchChange = props.onAutoPublishSwitchChange;
  const autoPublishloader = props.autoPublishloader
  const autoPublish = props.autoPublish
  const setAutoPublish = props.setChecked
  const showAutoPublish = props.showAutoPublish

  const sortOptions = [
    { label: "Name", value: "name" },
    { label: "Date", value: "date" },
  ];

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const onClickBurgerMenu = (e) => { };

  const onChangeLayoutStyle = (e) => {
    setLayoutStyle(layoutStyle === CARD_LAYOUT ? LIST_LAYOUT : CARD_LAYOUT);
  };

  return (
    <HStack justifyContent="space-between" width="100%" mb={4}>
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
          />
        </InputGroup>

        <CustomSelect
          sdata={sortOptions}
          slabel=""
          splaceholder="Select"
          cselectCallback={(data) => setSortParam(data)}
          cwidth="131px"
        />

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
