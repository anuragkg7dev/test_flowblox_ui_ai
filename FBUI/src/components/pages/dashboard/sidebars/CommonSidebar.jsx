import {
  IS_AUTHENTICATED,
  SIGN_OUT
} from "@/components/common/constants/AppRouterConstant";
import { APP_CONFIG_KEYS } from "@/components/common/constants/CommonConstant";
import { useAppConfigStore } from "@/components/store/AppConfigStore";
import { useAppRouterStore } from "@/components/store/AppRouterStore";
import { Box, Button, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { PiSignOutBold } from "react-icons/pi";
import { TbClockHour5 } from "react-icons/tb";
import SidebarTemplate from "./SidebarTemplate";
import SidebarTopSwitch from "./SidebarTopSwitch";
import { getCurrentSelection, getSBarButtonStyles, mainSidebarBottomOptions } from "./SidebarUtil";

export default function CommonSidebar(props) {

  const { data: routeState } = useAppRouterStore();
  const { config: appConfig, setConfig } = useAppConfigStore();

  const isAuthenticated = routeState[IS_AUTHENTICATED];

  const setCurrentSelection = (value) => {
    let iConfig = { [APP_CONFIG_KEYS.CURRENT_SELECTION]: value };
    let nconfig = appConfig ? { ...appConfig, ...iConfig } : iConfig;
    setConfig(nconfig);
  };

  const getButtonStyles = (type) => {
    let currentSelection = getCurrentSelection(appConfig);
    return getSBarButtonStyles(type, currentSelection)
  };

  return (
    <>
      {" "}
      {isAuthenticated && (
        <Flex
          direction="column"
          minH="calc(100vh - 96px)" // Adjusted for logo (80px) + padding (8px) + margin (8px)
          maxH="calc(100vh - 96px)" // Prevent overflow
          justifyContent="space-between"
          mt={2}
          mb={2}
        >
          {/* Top Group: My Containers and Analytics */}
          <Flex direction="column" gap={1}>
            <SidebarTopSwitch flag={appConfig?.[APP_CONFIG_KEYS.SIDEBAR_SWITCH_FLAG_KEY]} />
          </Flex>

          {/* Bottom Group: Settings and Profile */}
          <Flex direction="column" gap={1} mb={2}>
            <Box
              p={4}
              borderRadius="md"
              w="100%" // Ensure full width for spacing
            >
              <HStack
                spacing={2}
                flexShrink={0}
                w="100%"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <TbClockHour5 size={22} color="inherit" />
                <Text fontSize="40px" fontWeight={100} color="brand.subBrandBg">
                  37:30
                </Text>

                <VStack align="start" flexShrink={0}>
                  <Text>Saved</Text>
                  <Text fontSize="10px">Using this tool</Text>
                </VStack>
              </HStack>
            </Box>

            <SidebarTemplate options={mainSidebarBottomOptions} />

            <Button
              width="100%"
              height="60px"
              fontSize={{ base: "sm", md: "md" }}
              onClick={() => {
               
                setCurrentSelection(SIGN_OUT);
              }}
              justifyContent="flex-start"
              aria-label="View Profile"
              {...getButtonStyles(SIGN_OUT)}
            >
              <HStack w="full" justifyContent="start" spacing={2}>
                <PiSignOutBold size={20} color="inherit" />
                <Text fontSize="16px">Sign Out</Text>
              </HStack>
            </Button>
          </Flex>
        </Flex>
      )}
    </>
  );
}
