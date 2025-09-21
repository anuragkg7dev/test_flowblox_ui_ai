import {
  IS_AUTHENTICATED,
  SIGN_OUT
} from "@/components/common/constants/AppRouterConstant";
import { APP_CONFIG_KEYS, STATUS } from "@/components/common/constants/CommonConstant";
import { useAppConfigStore } from "@/components/store/AppConfigStore";
import { useAppRouterStore } from "@/components/store/AppRouterStore";
import { Box, Button, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { PiSignOutBold } from "react-icons/pi";
import { TbClockHour5 } from "react-icons/tb";
import SidebarTemplate from "./SidebarTemplate";
import SidebarTopSwitch from "./SidebarTopSwitch";
import { getCurrentSelection, getSBarButtonStyles, mainSidebarBottomOptions } from "./SidebarUtil";
import TimeSavedWidget from "./TimeSavedWidget";
import ConfirmationDialog from "@/components/common/element/ConfirmationDialog";
import { useState } from "react";
import { CommonMessageLabels } from "@/components/common/constants/CommonLabelConstants";
import { handleSignOut } from "../../auth/AuthLogic";
import { useAuthStore } from "@/components/store/AuthStateStore";
import { toast } from "@/components/common/Notification";

export default function CommonSidebar(props) {

  const { clearAuth } = useAuthStore();
  const { data: routeState, updateRouterAtSignOut } = useAppRouterStore();
  const { config: appConfig, setConfig, updateConfig, clearConfig} = useAppConfigStore();

  const [previousSelection, setPreviousSelection] = useState();
  const [showConfirmation, setShowsConfirmation] = useState(false);

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

  const onClickOfSignout = (previousSelection) => {
    setPreviousSelection(previousSelection)
    setShowsConfirmation(true)
  };

  const onSignOutOkConfirmation = () => {
    setShowsConfirmation(false)     
    handleSignOut(handleSignOutCallback)
  };

  const onSignOutNoConfirmation = () => {
    setShowsConfirmation(false)
    setCurrentSelection(previousSelection);
  };


  const handleSignOutCallback = (flag, data) => {
    if (flag) {      
      toast.success(data)
    } else {
      toast.error(data)
    }
  }

  return (
    <>
      {" "}
      {isAuthenticated && (
        <Flex
          direction="column"
          minH="calc(100vh - 96px)" // Adjusted for logo (80px) + padding (8px) + margin (8px)
          maxH="calc(100vh - 96px)" // Prevent overflow
          justifyContent="space-between"
          mt={0}
          mb={2}
        >
          {/* Top Group: My Containers and Analytics */}
          <Flex direction="column" gap={1}>
            <SidebarTopSwitch flag={appConfig?.[APP_CONFIG_KEYS.SIDEBAR_SWITCH_FLAG_KEY]} />
          </Flex>

          {/* Bottom Group: Settings and Profile */}
          <Flex direction="column" gap={1} mb={2}>


            <TimeSavedWidget />

            <SidebarTemplate options={mainSidebarBottomOptions} />

            <Button
              width="100%"
              height="60px"
              fontSize={{ base: "sm", md: "md" }}
              mb={"20px"}
              onClick={() => {

                onClickOfSignout(getCurrentSelection(appConfig))
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

      <ConfirmationDialog
        show={showConfirmation}
        setShow={setShowsConfirmation}
        header={CommonMessageLabels.SIGN_OUT_HEADING}
        description={CommonMessageLabels.SIGN_OUT_DESCRIPTION}
        onOk={onSignOutOkConfirmation}
        onClose={onSignOutNoConfirmation}
        closeLabel={CommonMessageLabels.NO}
        okLabel={CommonMessageLabels.YES}
        status={STATUS.WARNING}
      />
    </>
  );
}
