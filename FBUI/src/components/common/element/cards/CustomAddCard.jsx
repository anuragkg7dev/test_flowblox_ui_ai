import { Card, Flex, Icon, Text, VStack } from "@chakra-ui/react";
import { IoIosAddCircleOutline } from "react-icons/io";

export default function CustomAddCard(props) {
    let onClickAdd = props.onClickAdd;
    let clabel = props.clabel;
    return (
        <Card.Root
            width={{ base: "100%", sm: "300px", md: "360px" }}
            height="230px"
            overflow="hidden"
            borderWidth="0.1px"
            borderStyle="solid"
            borderColor="transparent"
            _hover={{ borderStyle: "solid", borderWidth: "0.1px", borderColor: "brand.primaryBrandBorder", boxShadow: "md" }}
            bg="brand.OffBlackBg"
            color="brand.pureWhiteTxt"
            variant="elevated"
            onClick={() => onClickAdd()}
            mr={"30px"}
            mb={"20px"}
            p={2}
        >
            <Card.Body p={{ base: 1, md: 2 }} display="flex" alignItems="center" justifyContent="center">
                <Flex width="100%" height="100%" align="center" justify="center">
                    <VStack>
                        <Icon as={IoIosAddCircleOutline} boxSize={{ base: 16, md: 20 }} color="brand.greyBrandBorder" />
                        <Text>{clabel} </Text>
                    </VStack>
                </Flex>
            </Card.Body>
            <Card.Footer p={1} mb={2} />
        </Card.Root>
    );
}
