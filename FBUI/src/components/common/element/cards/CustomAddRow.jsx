import { HStack, Icon, Text, Button } from "@chakra-ui/react";
import { IoIosAddCircleOutline } from "react-icons/io";
import React from "react";
import { trimString } from "../../util/StringUtil";

function CustomAddRow(props) {
    let onClickAdd = props.onClickAdd;
    let clabel = props.clabel;

    return (
        <HStack
            key={`row_add`}
            width="100%"
            p={{ base: 2, md: 3 }}
            bg="brand.OffBlackBg"
            color="brand.pureWhiteTxt"
            borderBottom='0.1px solid'
            borderBottomColor='brand.greyBrandBorder'
            spacing={4}
            align="center"
            onClick={() => onClickAdd()}
        >
            <HStack flex="1" spacing={4} align="center" mb={"10px"} width={"70%"}>
                <Icon
                    as={IoIosAddCircleOutline}
                    boxSize={{ base: 7, md: 10 }} // Match CustomDisplayCard
                    color="brand.pureWhiteTxt"
                />
                <Text
                    fontSize={{ base: "2xs", md: "xs" }} // Match CustomDisplayRow heading
                    fontWeight="semibold"
                    noOfLines={1}
                    color="brand.pureWhiteTxt"
                >
                    {trimString(clabel || "Add New", 30)} {/* Fallback if clabel undefined */}
                </Text>
            </HStack>
        </HStack>
    );
}

export default React.memo(CustomAddRow);