import { HStack, Icon, Text } from "@chakra-ui/react";
import { memo } from "react";
import { LiaExternalLinkAltSolid } from "react-icons/lia";
import { Link } from "react-router-dom";

function CustomHelpLink(props) {

  const help_link = "https://superblox.ai/faqs"

  return (
    <Link variant="underline" target="#" to={help_link} isExternal>
      <Text color="brand.primaryBrandTxt" cursor="pointer" userSelect="none">
        Help <Icon as={LiaExternalLinkAltSolid} color="brand.subBrandBg" boxSize={{ base: 3, md: 4 }} />
      </Text>
    </Link>
  );
}

export default memo(CustomHelpLink);