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


export default function CommonSearchHeader(props) {
  const name = props.name ?? "My Containers"
  const [searchQuery, setSearchQuery] = useState("");
  const [sortParam, setSortParam] = useState("");
  const layoutStyle = props.layoutStyle;
  const setLayoutStyle = props.setLayoutStyle;
  const showIcon = props.showIcon;
  const iconType = props.iconType;

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
