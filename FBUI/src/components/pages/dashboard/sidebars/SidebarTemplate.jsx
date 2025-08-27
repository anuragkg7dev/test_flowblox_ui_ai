import { APP_CONFIG_KEYS } from "@/components/common/constants/CommonConstant";
import CustomLine from "@/components/common/element/CustomLine";
import { useAppConfigStore } from "@/components/store/AppConfigStore";
import { Button, HStack, Icon, Text } from "@chakra-ui/react";
import { GrPrevious } from "react-icons/gr";
import { NavLink } from "react-router-dom";
import { getCurrentSelection, getSBarButtonStyles, PREVIOUS } from "./SidebarUtil";

export default function SidebarTemplate(props) {
  const { config, setConfig } = useAppConfigStore();

  const options = props.options ?? [];
  const previousIcon = GrPrevious;

  const setCurrentSelection = (value) => {
 
    let iConfig = { [APP_CONFIG_KEYS.CURRENT_SELECTION]: value };
    let nconfig = config ? { ...config, ...iConfig } : iConfig;
    setConfig(nconfig);
  };

  const getButtonStyles = (type) => {
    let currentSelection = getCurrentSelection(config);
    return getSBarButtonStyles(type, currentSelection)
  };

  return (
    <>
      {options
        .filter((x) => x.hidden != true)
        .map((x) => {
          return (
            <>
              <Button
                as={NavLink}
                to={x.to}
                key={"btn-" + x.key}
                width="100%"
                height="60px" // Reduced to fit better
                fontSize={{ base: "sm", md: "md" }}
                onClick={() => {
                  setCurrentSelection?.(x.key);
                }}
                justifyContent="flex-start"
                aria-label={x.label}
                {...getButtonStyles?.(x.key)}
              >
                <HStack
                  key={"hs-" + x.key}
                  w="full"
                  justifyContent="start"
                  spacing={2}
                >
                  <Icon
                    as={x.type == PREVIOUS ? previousIcon : x.icon}
                    size={20}
                    color="inherit"
                    key={"icon-" + x.key}
                  />
                  <Text key={"txt-" + x.key} fontSize="16px">
                    {x.label}
                  </Text>
                </HStack>
              </Button>

              {x.type == PREVIOUS && <CustomLine cmt={10} />}
            </>
          );
        })}
    </>
  );
}
