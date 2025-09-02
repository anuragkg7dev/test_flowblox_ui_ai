import { HStack, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import React from "react";

function CustomLoaderRow(props) {


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
        >
            <HStack flex="1" spacing={4} align="center" mb={"10px"} width={"70%"}>
                <SkeletonCircle size={10} variant="pulse" />
                <SkeletonText noOfLines={1} variant="pulse" />
            </HStack>
        </HStack>
    );
}

export default React.memo(CustomLoaderRow);