import { HStack, Text } from "@chakra-ui/react";
import { memo } from "react";
import { Link } from "react-router-dom";

function CustomTermsNConditions(props) {
  const purpose = props.purpose;
  const terms_of_service_link = "https://superblox.ai"
  const privacy_policy_link = "https://superblox.ai"

  return (
    <HStack
      w="full"
      justify="center"
      flexWrap="wrap"
      gap={{ base: 1, md: 2 }}
      fontSize={{ base: "xs", md: "sm" }}
      lineHeight="shorter"
      mt={4}
    >
      <Text color="brand.pureWhiteTxt">{purpose}, you agree to our</Text>
      <Link target="#" variant="underline" color="brand.primaryBrandTxt" to={terms_of_service_link} isExternal>

        <Text color="brand.primaryBrandTxt"> Terms of Service</Text>
      </Link>
      <Text color="brand.pureWhiteTxt">and</Text>
      <Link variant="underline" target="#" to={privacy_policy_link} isExternal>
        <Text color="brand.primaryBrandTxt">Privacy Policy.</Text>
      </Link>
    </HStack>
  );
}

export default memo(CustomTermsNConditions);