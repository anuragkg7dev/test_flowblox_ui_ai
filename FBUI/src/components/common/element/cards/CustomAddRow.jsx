import { HStack, Icon, Text, Button, VStack } from "@chakra-ui/react";
import { IoIosAddCircleOutline } from "react-icons/io";
import React from "react";
import { trimString } from "../../util/StringUtil";
import { UX } from "../../constants/CommonConstant";

function CustomAddRow(props) {
    let onClickAdd = props.onClickAdd;
    let clabel = props.clabel;

    return (
        <HStack
            key={`row_add`}
            width="100%"
            bg="brand.pureBlackBg"
            color="brand.pureWhiteTxt"
            border={UX.dashed_border}
            borderColor='brand.greyBrandBorder'
            spacing={4}
            align="center"
            onClick={() => onClickAdd()}
            pt={"10px"}
            pb={"10px"}
            borderRadius="md"
        >
            <VStack flex="1" spacing={4} align="center" width={"70%"}>
                <Icon
                    as={IoIosAddCircleOutline}
                    boxSize={{ base: 7, md: 10 }} // Match CustomDisplayCard
                    color="brand.greyBrandBorder"

                />
                <Text
                    fontSize={{ base: "2xs", md: "xs" }} // Match CustomDisplayRow heading
                    fontWeight="semibold"
                    noOfLines={1}
                    color="brand.pureWhiteTxt"
                >
                    {"Add New"} {/* Fallback if clabel undefined */}
                </Text>
            </VStack>
        </HStack>
    );
}

export default React.memo(CustomAddRow);