import CustomSelect from "@/components/common/element/CustomSelect";
import {
  Heading,
  HStack,
  IconButton,
  Input,
  InputGroup,
  Stack,
  Text,
  useBreakpointValue
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
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
  const enableSearch = props.enableSearch == undefined ?? true;
  const cheight = "40px"

  // Detect if the current breakpoint is mobile ('base')
  const isMobile = useBreakpointValue({ base: true, md: false });

  // Enforce CARD_LAYOUT on mobile view
  useEffect(() => {
    if (isMobile && layoutStyle !== CARD_LAYOUT) {
      setLayoutStyle(CARD_LAYOUT);
    }
  }, [isMobile, layoutStyle, setLayoutStyle]);

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
    <Stack pl={cpl} pr={cpr} height={UX.global_main_header_width} justifyContent="space-between" width="100%" mb={4} alignItems={{ base: "stretch", md: "center" }} direction={{ base: "column", md: "row" }}>
      <HStack>
        {showIcon && (
          <IconSwitch type={iconType} boxSize={5} />
        )}
        <Heading size="lg" color={"brand.pureWhiteTxt"}>{name}</Heading>
      </HStack>
      <HStack>
        {enableSearch && (
          <InputGroup endElement={<IoMdSearch />} width="131px" mt={1} >
            <Input
              placeholder="Search"
              variant={"fbloxD"}
              onChange={handleSearch}
              height={cheight}
            />
          </InputGroup>
        )}

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
          display={{ base: "none", md: "inline-flex" }} // Hide on mobile, show on md and above
        >
          {layoutStyle === CARD_LAYOUT ? (
            <LuLayoutGrid color="brand.pureWhiteBg" />
          ) : (
            <LuLayoutList color="brand.pureWhiteBg" />
          )}
        </IconButton>
      </HStack>
    </Stack>
  );
}
