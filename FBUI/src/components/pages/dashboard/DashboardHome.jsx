import { Box, Flex, Text, Button, useBreakpointValue } from "@chakra-ui/react";

const DashboardHome = () => {
    const sidebarWidth = useBreakpointValue({ base: "100%", md: "200px", lg: "250px" });

    return (
        <Flex direction={{ base: "column", md: "row" }} h={{ base: "auto", md: "100vh" }} bg="brand.bgDark">
            {/* Left Sidebar */}
            <Box
                w={sidebarWidth}
                bg="brand.bgDark"
                p={{ base: 2, md: 4 }}
                color="brand.textLight"
                borderRight={{ base: "0.2px solid", _focus: { borderColor: "brand.border" } }}
                borderColor="brand.border"
                fontFamily="heading"
            >
                <Text mb={{ base: 2, md: 4 }} fontWeight="bold" fontSize={{ base: "md", md: "lg" }}>Menu</Text>
                <Flex
                    direction={{ base: "row", md: "column" }}
                    wrap="wrap"
                    justify={{ base: "space-around", md: "flex-start" }}
                >
                    <Button
                      
                        colorScheme="whiteAlpha"
                        mb={{ base: 1, md: 2 }}
                        w={{ base: "auto", md: "full" }}
                        justifyContent="center"
                        fontSize={{ base: "sm", md: "md" }}
                        mr={{ base: 2, md: 0 }}
                        _hover={{ bg: "brand.darkAccent" }}
                    >
                        Option 1
                    </Button>
                    <Button
                        variant="ghost"
                        colorScheme="whiteAlpha"
                        mb={{ base: 1, md: 2 }}
                        w={{ base: "auto", md: "full" }}
                        justifyContent="center"
                        fontSize={{ base: "sm", md: "md" }}
                        mr={{ base: 2, md: 0 }}
                        _hover={{ bg: "brand.darkAccent" }}
                    >
                        Option 2
                    </Button>
                    <Button
                        variant="ghost"
                        colorScheme="whiteAlpha"
                        mb={{ base: 1, md: 2 }}
                        w={{ base: "auto", md: "full" }}
                        justifyContent="center"
                        fontSize={{ base: "sm", md: "md" }}
                        mr={{ base: 2, md: 0 }}
                        _hover={{ bg: "brand.darkAccent" }}
                    >
                        Option 3
                    </Button>
                </Flex>
            </Box>
            {/* Right Content Area */}
            <Box
                flex={{ base: "1", md: "1" }}
                bg="brand.bgDark"
                p={{ base: 2, md: 4 }}
                borderLeft={{ base: "none", md: "2px" }}
                borderTop={{ base: "2px", md: "none" }}
                borderColor="brand.border"
                fontFamily="body"
            >
                <Text fontSize={{ base: "md", md: "xl" }} color="brand.textLight">
                    Select a menu option to load content here
                </Text>
            </Box>
        </Flex>
    );
};

export default DashboardHome;