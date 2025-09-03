import { Flex, SegmentGroup } from "@chakra-ui/react";
import { memo, useState } from "react";

function CustomSegmentGroup(props) {
    const filterOptions = props.filterOptions ?? []
    const onChangeFilterOptions = props.onChangeFilterOptions;
    const ckey = props.ckey
    const defaultValue = props.defaultValue
    const [segment, setSegment] = useState(defaultValue);
    const value = props.value ?? segment
    const setValue = props.setValue ?? setSegment
    const cmt=props.cmt

    return (
        <Flex
            borderColor="brand.greyBrandBorder"
            borderWidth="1px"
            borderStyle="solid"
            width={"fit-content"}
            paddingBottom={4.5}
            paddingTop={2}
            paddingLeft={2}
            paddingRight={2}
            mt={cmt}
            
        >
            <SegmentGroup.Root
                value={value}
                border="none"
                bg="brand.OffBlackBg"
                height="30px"
                onValueChange={(e) => {
                    onChangeFilterOptions?.(e.value);
                    if (!onChangeFilterOptions) {
                        setValue(e.value);
                    }
                }}
                key={ckey}
            >
                <SegmentGroup.Indicator bg="brand.OffBlackButtonHover" />

                <SegmentGroup.Items
                    color="brand.pureWhiteTxt"
                    items={[...filterOptions]}
                    _before={{ content: "none" }}
                />
            </SegmentGroup.Root>
        </Flex>
    );
}

export default memo(CustomSegmentGroup);