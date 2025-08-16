import { Avatar, Card, Flex, Skeleton, SkeletonCircle, SkeletonText, Stack, VStack } from "@chakra-ui/react";

export default function CustomLoaderCard(props) {


    return (
        <>
            <Card.Root
                width={{ base: "100%", sm: "280px", md: "340px" }}
                height="203px"
                overflow="hidden"
                borderWidth="0.1px"
                borderStyle="solid"
                borderColor="transparent"
                _hover={{ borderStyle: "solid", borderWidth: "0.1px", borderColor: "brand.primaryBrandBorder", boxShadow: "md" }}
                bg="brand.OffBlackBg"
                color="brand.pureWhiteTxt"
                variant="elevated"

            >

                <Card.Body p={{ base: 1, md: 2 }} display="flex" flexDirection="column" gap={{ base: 0.5, md: 1 }}>
                    <VStack justify="space-between" align="start">
                        <Avatar.Root size="sm" >
                            <SkeletonCircle size={5} variant="pulse" />
                        </Avatar.Root>
                        <Stack gap={0} flex={1} >
                            <SkeletonText noOfLines={1} />

                        </Stack>
                    </VStack>
                   
                        <SkeletonText noOfLines={2}  variant="pulse"/>
                  
                </Card.Body>

                <Card.Footer p={1} mb={2} />

            </Card.Root>
        </>
    );
}
