import { generateArticleTrigger, getBalance } from "@/components/client/EdgeFunctionRepository";
import CustomLoaderButton from "@/components/common/element/CustomLoaderButton";
import {
  Box,
  Button,
  HStack,
  Text
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { CONTAINERS_KEY, SOURCE_DESTINATION_KEY } from "../ContainersConstant";
import { useAppConfigStore } from "@/components/store/AppConfigStore";
import { APP_CONFIG_KEYS, UX } from "@/components/common/constants/CommonConstant";
import { toast } from "@/components/common/Notification";
import { JWT_TOKEN } from "@/components/common/constants/AppRouterConstant";
import { CONTENT_TYPE } from "@/components/client/EdgeConstant";

export default function SingleContainerHeader(props) {

  const status = props.status ?? "Testing"
  const setStatus = props.setStatus
  const containerName = props.containerName;
  const startPauseToggele = props.startPauseToggele ?? true;
  const onStart = props.onStart;
  const onStop = props.onStop;
  const onPause = props.ononPause;
  const disableStop = props.disableStop ?? false;
  const disableStart = props.disableStart ?? false;
  const disablePause = props.disablePause ?? false;
  const cpl = props.cpl ?? UX.global_left_padding;
  const cpr = props.cpr ?? UX.global_right_padding;

  const [loader, setLoader] = useState(false)

  const [balance, setBalance] = useState('Check Balance');
  const [balanceLoader, setBalanceLoader] = useState(false);

  const { config, setConfig } = useAppConfigStore();
  let container = config[APP_CONFIG_KEYS.CONTAINER_DATA]
  const authkeyBearer = config[JWT_TOKEN];

  useEffect(() => {
    loadBalance();
  }, []);

  const handleGenerateArticle = () => {
    setLoader(true)
    let paramMap = new Map([[CONTAINERS_KEY.ID, container?.[CONTAINERS_KEY.ID]],])
    generateArticleTrigger(paramMap, generateArticleTriggerCallback, authkeyBearer)
  }

  const generateArticleTriggerCallback = (flag, data) => {
    if (!flag) {
      toast.error(data?.message ?? 'Something went worng!!!')
    } else {
      toast.success(data?.message)
    }
    setLoader(false)
  }


  const loadBalance = () => {

    setBalanceLoader(true)

    getBalance(CONTENT_TYPE.ARTICLE_BLOG,
      (flag, data) => {
        if (flag) {

          setBalance(data?.[CONTENT_TYPE.ARTICLE_BLOG] ?? undefined);
        } else {
          setBalance(undefined)
          toast.error('Failed to load balance!!')
        }
        setBalanceLoader(false);
      },
      authkeyBearer)
  };

  return (
    <HStack justifyContent="space-between" width="100%" mb={4} pr={cpr} pl={cpl}>
      <Text color="brand.pureWhiteTxt">{containerName}</Text>
      <HStack>

        <CustomLoaderButton
          cwidth="auto"
          cmt={6}
          cvariant={"fbloxD"}
          cloadingText={'Loading...'}
          loader={balanceLoader}
          onClickBtn={loadBalance}
          clabel={balance == undefined ? 'Fetch Balance' : balance + ' Articles'}
        />

        <CustomLoaderButton
          cwidth="auto"
          cmt={6}
          cvariant={"fblox"}
          cloadingText={'Generate'}
          loader={loader}
          onClickBtn={handleGenerateArticle}
          clabel={'Generate'}
        />

        <Button
          mt={6}
          variant={"fbloxD"}
          cwidth="auto"
          fontSize={{ base: "sm", md: "md" }}
          onClick={onStop}
          disabled={disableStop}
        >
          Stop
        </Button>


        {!startPauseToggele && (<>
          <Button
            mt={6}
            variant={"fblox"}
            cwidth="auto"
            fontSize={{ base: "sm", md: "md" }}
            onClick={onStart}
            disabled={disableStart}
          >
            Start
          </Button>
        </>)}

        {startPauseToggele && (<>
          <Button
            mt={6}
            variant={"fblox"}
            cwidth="auto"
            fontSize={{ base: "sm", md: "md" }}
            onClick={onPause}
            disabled={disablePause}
          >
            Pause
          </Button>
        </>)}
        <Box mr={5} mt={5} ml={5}>
          <Text textStyle="md" color={"brand.pureWhiteTxt"}>{status}</Text>
        </Box>

      </HStack>
    </HStack >
  );
}
