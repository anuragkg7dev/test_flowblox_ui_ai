import { Box, HStack, Menu, Text } from "@chakra-ui/react";
import { useRef } from "react";
import {
  CustomBrandFBTxtLogoMiniBlackBG,
  CustomBrandLogoMiniBlackBG,
  CustomBrandSBTxtLogoMiniBlackBG,
} from "./CustomBrandLogo";

export const CustomApplicationSwitch = (props) => {
  const open = props.open;
  const setOpen = props.setOpen;

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  const triggerRef = useRef(null); // Ref for Box positioning

  const onSendBloxSelect = () => {
    window.location.href = "https://sendblox.ai";
  };

  return (
    <>
      <Box mb={5}>
        <Menu.Root
          open={open}
          onOpenChange={(details) => setOpen(details.open)}
          positioning={{
            placement: "bottom-start",
            gutter: -0,
          }}
        >
          <Menu.Trigger asChild padding={"none"}>
            <Box
              key="trigger"
              display="flex"
              justifyContent="center"
              alignItems="center"
              h="100px"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && handleToggle()}
              cursor="pointer"
              _hover={{
                transform: "scale(1.05)",
                transition: "transform 0.2s ease",
              }}
              userSelect="none"
            >
              <CustomBrandLogoMiniBlackBG
                ch="60px"
                cw="60px"
                ccolor="brand.pureWhiteBg"
              />
            </Box>
          </Menu.Trigger>

          <Menu.Positioner width="95%">
            <Menu.Content p={0} m={0} mt={0} boxShadow="none" bg="black">
              <Menu.Item
                value="flowblox.ai"
                justifyContent="center"
                alignItems="center"
                minH="80px"
                _hover={{ bg: "#873AE1" }}
                borderRight="4px solid #873AE1"
              
              >
                <HStack>
                  <Text
                    textStyle="lg"
                    fontWeight="medium"
                    color={"brand.pureWhiteTxt"}
                  >
                    FLOWBLOX
                  </Text>
                  <CustomBrandFBTxtLogoMiniBlackBG
                    ch="60px"
                    ccolor="brand.pureWhiteBg"
                  />
                </HStack>
              </Menu.Item>
              <Menu.Item
                value="sendblox.io"
                justifyContent="center"
                alignItems="center"
                minH="80px" // Add back for logo breathing room
                _hover={{ bg: "#00A383" }}
                borderRight="4px solid #00A383"
                onSelect={onSendBloxSelect}
              >
                <HStack>
                  <Text
                    textStyle="lg"
                    fontWeight="medium"
                    color={"brand.pureWhiteTxt"}
                  >
                    SENDBLOX
                  </Text>
                  <CustomBrandSBTxtLogoMiniBlackBG
                    ch="60px"
                    ccolor="brand.pureWhiteBg"
                  />
                </HStack>
              </Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Menu.Root>
      </Box>
    </>
  );
};
