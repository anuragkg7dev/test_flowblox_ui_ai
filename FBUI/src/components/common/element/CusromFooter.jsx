import { Flex, VStack } from "@chakra-ui/react";
import { CustomBrandLogo } from "./CustomBrandLogo";
import { FlowBloxAddress } from "./CustomSocialLinks";

export const CustomFooter = (props) => {
  const cbg = props.cbg ?? "brand.bgDark"
  return (
    <Flex
      as="footer"
      w="full"
      justify="center"
      py={{ base: 1, md: 2 }}
      bg={cbg}
    >
      <VStack spacing={4}>
        <CustomBrandLogo
          cw={{ base: "100px", sm: "130px", md: "170px", lg: "220px" }}
          ch="auto"
        />
        <FlowBloxAddress />
      </VStack>
    </Flex>
  );
};