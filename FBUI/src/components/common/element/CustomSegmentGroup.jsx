import { Flex, SegmentGroup } from "@chakra-ui/react";
import { memo, useState } from "react";

function CustomSegmentGroup(props) {
    let filterOptions = props.filterOptions ?? []
    let onChangeFilterOptions = props.onChangeFilterOptions;
    let ckey = props.ckey
    let defaultValue = props.defaultValue
    const [segment, setSegment] = useState(defaultValue);
    let value = props.value ?? segment
    let setValue = props.setValue ?? setSegment

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