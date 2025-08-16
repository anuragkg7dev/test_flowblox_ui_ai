import { Box, Flex } from "@chakra-ui/react";
import ProductPricing from "./ProductPricing";

export const ProductPriceHolder = () => {
  return (
    // <Flex
    //   minH="100vh"
    //   bg="#09090B" // Dark background
    //   align="center"
    //   justify="center"
    //   p={{ base: 4, md: 6, lg: 8 }} // padding for spacing on smaller screens
    // >
    //   <Box
    //     w={{ base: "100%", sm: "95%", md: "90%", lg: "80%", xl: "70%" }}
    //     maxW="1280px"
    //     bg="gray.800"
    //     rounded="xl"
    //     boxShadow="lg"
    //     overflow="hidden"
    //   >
        <ProductPricing />
    //   </Box>
    // </Flex>
  );
};
