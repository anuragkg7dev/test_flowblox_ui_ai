import { Card, HStack, Icon, Stat, Text, Box, Heading } from "@chakra-ui/react";
import React from "react";

function CustomBoldDisplayCard(props) {
  const cKey = props.cKey;
  const name = props.name;
  const xicon = props.xicon;
  const stats = props.stats;
  const cml = props.cml;
  const cmr = props.cmr;
  const cmt = props.cmt;
  const cmb = props.cmb;

  return (
    <Box
      key={`wrapper_${cKey}`}
      width={{ base: "100%", sm: "280px", md: "320px", lg: "460px" }}
    
      position="relative"
      _before={{
        content: '""',
        display: "block",
        paddingTop: "54.3%", // Aspect ratio (158 / 291)
      }}
      ml={cml}
      mr={cmr}
      mt={cmt}
      mb={cmb}
    >
      <Card.Root
        key={`cr_${cKey}`}
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        overflow="hidden"
        _hover={{
          borderStyle: "solid",
          borderWidth: "0.1px",
          borderColor: "brand.primaryBrandBorder",
          boxShadow: "md",
        }}
        bg="brand.OffBlackBg"
        color="brand.pureWhiteTxt"
        variant="elevated"
        display="flex"
        flexDirection="column"
      >
        <Card.Body
          key={`cb_${cKey}`}
          px={{ base: 3, sm: 4 }}
          py={2}
          flex="1"
          display="flex"
          justifyContent="center" 
        >
          <Heading color={"brand.subBrandTxt"} size={{ base: "md", sm: "5xl", md: "6xl" }}>{stats}</Heading>
        </Card.Body>

        <Card.Footer
          key={`cf_${cKey}`}
          px={{ base: 3 }}
          pb={5}
          width="100%"
          display="flex"         
        >
          <HStack
            width="100%"
            maxW="90%"
            justify="space-between"
            spacing={{ base: 2, sm: 4 }}
          >
            <Text justifySelf={"start"} fontSize={{ base: "sm", sm: "md", md: "lg" }}>{name}</Text>
            <Icon as={xicon} boxSize={{ base: 6, sm: 8, md: 10 }} color="inherit" />
          </HStack>
        </Card.Footer>
      </Card.Root>
    </Box>
  );
}

export default React.memo(CustomBoldDisplayCard);