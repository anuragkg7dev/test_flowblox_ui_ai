import CustomSelect from "@/components/common/element/CustomSelect";
import {
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
import { UX } from "@/components/common/constants/CommonConstant";


export default function CommonSearchHeader(props) {
  const name = props.name ?? CommonLabels.MY_BLOX
  const [searchQuery, setSearchQuery] = useState("");
  const [sortParam, setSortParam] = useState("");
  const layoutStyle = props.layoutStyle;
  const setLayoutStyle = props.setLayoutStyle;
  const showIcon = props.showIcon;
  const iconType = props.iconType;
  const cpl = props.cpl ?? UX.global_left_padding;
  const cpr = props.cpr ?? UX.global_right_padding;
  const enableSelect = props.enableSelect == undefined ?? true;
  const cheight = "40px"


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
    <HStack pl={cpl} pr={cpr} height={UX.global_main_header_width} justifyContent="space-between" width="100%" mb={4}>
      <HStack>
        {showIcon && (
          <IconSwitch type={iconType} boxSize={5} />
        )}
        <Heading size="lg" color={"brand.pureWhiteTxt"}>{name}</Heading>
      </HStack>
      <HStack>
        <InputGroup endElement={<IoMdSearch />} width="131px" mt={1} >
          <Input
            placeholder="Search"
            variant={"fbloxD"}
            onChange={handleSearch}
            height={cheight}
          />
        </InputGroup>

        {enableSelect && (
          <CustomSelect
            sdata={sortOptions}
            slabel=""
            splaceholder="Select"
            cselectCallback={(data) => setSortParam(data)}
            cwidth="131px"
            cheight={cheight}
          />
        )}

        <IconButton
          key="layout"
          aria-label=""
          onClick={onChangeLayoutStyle}
          variant="solid"
          size="sm"
          boxSize={cheight}
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
