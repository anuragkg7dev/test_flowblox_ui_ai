import { Box, HStack, IconButton, Text, VStack } from "@chakra-ui/react";
import { memo } from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

export const Facebook = (props) => {
  let iconColor = props.iconColor ?? "brand.accent";
  let hoverBG = props.hoverBG ?? "brand.accent";
  let hoverColor = props.hoverColor ?? "brand.bgDark";

  let curl = "https://www.facebook.com/flowbloxai";

  return (
    <>
      <IconButton
        as="a"
        href={curl}
        target="_blank"
        aria-label="Facebook"
        bg={"brand.light"}
        variant="subtle"
        size={{ base: "sm", md: "md" }}
        _hover={{ bg: hoverBG, color: hoverColor }}
      >
        <FaFacebook color={iconColor} />
      </IconButton>
    </>
  );
};

export const Instagram = (props) => {
  let iconColor = props.iconColor ?? "brand.accent";
  let hoverBG = props.hoverBG ?? "brand.accent";
  let hoverColor = props.hoverColor ?? "brand.bgDark";

  let curl = "https://www.instagram.com/flowblox.ai";

  return (
    <>
      <IconButton
        as="a"
        href={curl}
        target="_blank"
        aria-label="Facebook"
        variant="subtle"
        size={{ base: "sm", md: "md" }}
        _hover={{ bg: hoverBG, color: hoverColor }}
      >
        <FaInstagram color={iconColor} />
      </IconButton>
    </>
  );
};

export const XTwitter = (props) => {
  let iconColor = props.iconColor ?? "brand.accent";
  let hoverBG = props.hoverBG ?? "brand.accent";
  let hoverColor = props.hoverColor ?? "brand.bgDark";

  let curl = "https://x.com/FlowbloxAI";

  return (
    <>
      <IconButton
        as="a"
        href={curl}
        target="_blank"
        aria-label="Facebook"
        variant="subtle"
        size={{ base: "sm", md: "md" }}
        _hover={{ bg: hoverBG, color: hoverColor }}
      >
        <FaXTwitter color={iconColor} />
      </IconButton>
    </>
  );
};


export const FlowBloxAddress = memo((props) => {
  return (
    <Box
      as="address"
      maxW={{ base: "90%", sm: "80%", md: "container.sm", lg: "container.md" }}
      mx="auto"
      py={{ base: 4, md: 6 }}
      px={{ base: 2, md: 4 }}
      textAlign="center"
      fontSize={{ base: "xs", sm: "sm", md: "md", lg: "lg" }}
      color="brand.textLight"
    >
      <VStack
        align="center"
        spacing={{ base: 2, sm: 3, md: 4 }}
      >
        <Text fontWeight="semibold">
          © 2025 Flowblox. All rights reserved.
        </Text>
        <Text fontWeight="semibold">
          Flowblox.ai is a trading product of Valkari Ltd, registered in England and Wales.
        </Text>
        <Text fontWeight="semibold">
          Company Number: 09841692. Registered Address: 4 Beaufort Parklands, Railton Road, Guildford, Surrey, England, GU2 9JX.
        </Text>
        <Text fontWeight="semibold">
          Contact Information:{" "}
          <Link
            href="mailto:info@flowblox.ai"
            color="brand.accent"
            aria-label="Email Flowblox at info@flowblox.ai"
            _hover={{ textDecoration: "underline", color: "brand.accentHover" }}
            _focus={{ outline: "2px solid", outlineColor: "brand.accent", outlineOffset: "2px" }}
            p={1} // Increase tap target size
          >
            info@flowblox.ai
          </Link>
        </Text>
      </VStack>
    </Box>
  );
});


