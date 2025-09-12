import { COMMON_STATUS, CONTENT_TYPE } from "@/components/client/EdgeConstant";
import { generateArticleTrigger, getBalance, getContainerNextRun, updateContainerStatus } from "@/components/client/EdgeFunctionRepository";
import { ACTION, APP_CONFIG_KEYS, STATUS, UX } from "@/components/common/constants/CommonConstant";
import { CommonLabels, CommonMessageLabels } from "@/components/common/constants/CommonLabelConstants";
import ConfirmationDialog from "@/components/common/element/ConfirmationDialog";
import CustomDateTimeDisplay from "@/components/common/element/CustomDateTimeDisplay";
import CustomLoaderButton from "@/components/common/element/CustomLoaderButton";
import { toast } from "@/components/common/Notification";
import { useAppConfigStore } from "@/components/store/AppConfigStore";
import {
  Box,
  Heading,
  HStack,
  Stack,
  Text,
  Wrap
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { CgSandClock } from "react-icons/cg";
import { GoZap } from "react-icons/go";
import { SiTicktick } from "react-icons/si";
import { BeatLoader } from "react-spinners";
import { CONTAINERS_KEY } from "../ContainersConstant";
import { useAuthStore } from "@/components/store/AuthStateStore";

export default function SingleContainerHeader(props) {

  const { config, setConfig, updateConfig, updateConfigObj } = useAppConfigStore();
  let container = config[APP_CONFIG_KEYS.CONTAINER_DATA]
  const { jwt: authkeyBearer } = useAuthStore();

  const [loader, setLoader] = useState(false)
  const [statusLoader, setStatusLoader] = useState(false)

  const [balance, setBalance] = useState('Check Balance');
  const [balanceLoader, setBalanceLoader] = useState(false);

  const [action, setAction] = useState(false);
  const [showConfirmation, setShowsConfirmation] = useState(false);

  const [startPauseToggele, setStartPauseToggele] = useState(container?.status == COMMON_STATUS.ACTIVE);

  const [info, setInfo] = useState(undefined);


  const containerName = container?.name ?? CommonLabels.MY_BLOX


  const disableStop = props.disableStop ?? false;
  const disableStart = props.disableStart ?? false;
  const disablePause = props.disablePause ?? false;
  const cpl = props.cpl ?? UX.global_left_padding;
  const cpr = props.cpr ?? UX.global_right_padding;


  useEffect(() => {
    loadBalance();
    loadContainerNextRun();
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

  const onStart = () => {
    setAction(ACTION.START)
    setShowsConfirmation(true)
  }

  const onPause = () => {
    setAction(ACTION.PAUSE)
    setShowsConfirmation(true)
  }

  const onOkConfirmation = () => {
    if (action == ACTION.START) {
      changeStatus(COMMON_STATUS.ACTIVE)
    } else if (action == ACTION.PAUSE) {
      changeStatus(COMMON_STATUS.PAUSED)
    }
  }

  const changeStatus = (status) => {
    setShowsConfirmation(false)
    setStatusLoader(true)
    let payload = { id: container.id, status }
    updateContainerStatus(payload, (flag, data) => { onChangeStatusCallback(flag, data, status) }, authkeyBearer)
  };

  const onChangeStatusCallback = (flag, data, status) => {
    if (flag) {
      let tempContainer = { ...container }
      tempContainer[CONTAINERS_KEY.STATUS] = status

      updateConfigObj({
        [APP_CONFIG_KEYS.CONTAINER_DATA]: tempContainer, // Update current container data in context
        [APP_CONFIG_KEYS.CONTAINER_MODIFIED]: true,  // This will reload the container list data
        [APP_CONFIG_KEYS.CONTAINER_DATA_LIST]: []
      });

      setStartPauseToggele(status == COMMON_STATUS.ACTIVE);

      console.log(startPauseToggele, status == COMMON_STATUS.ACTIVE, data)

      toast.success("Updated")
      updateContainerNextRun(status)

    } else {
      toast.error("Failed to update status !!")
    }
    setStatusLoader(false)
  }

  const loadContainerNextRun = () => {
    updateContainerNextRun(container.status)
  }

  const updateContainerNextRun = (status) => {
    if (status == COMMON_STATUS.ACTIVE) {
      setInfo(<BeatLoader size={8} color="white" />)
      getContainerNextRun(container?.id, getContainerNextRunCallback, authkeyBearer)
    } else {
      setInfo(getWaitingInput())
    }
  }

  const getContainerNextRunCallback = (flag, data) => {
    if (flag) {
      if (data.status == COMMON_STATUS.ACTIVE) {
        setInfo(getWaitingTime(data))
      } else if (data.status == COMMON_STATUS.COMPLETED) {
        setInfo(getCompleteStatus())
      } else if (data.status == COMMON_STATUS.NA) {
        setInfo(getWaitingInput())
      } else {
        setInfo('')
      }
    } else {
      setInfo('')
      toast.error('Failed to load container info!!')
    }
  }

  const getCompleteStatus = () => {
    return (<HStack>
      <Text color={'brand.activeTxt'} fontSize={'16px'}>Completed</Text>
      <SiTicktick color={'#46AB50'} />
    </HStack>)
  }

  const getWaitingTime = (data) => {
    return (<HStack>
      <Text color={'brand.subBrandTxt'} fontSize={'16px'}>Waiting: </Text>
      <CustomDateTimeDisplay cdate={data.nextRun} cfontSize={"16px"} ccolor={'brand.subBrandTxt'} />
      <CgSandClock color={'#D2B5F9'} />
    </HStack>)
  }

  const getWaitingInput = () => {
    return (<HStack>
      <Text color={'brand.subBrandTxt'} fontSize={'16px'}>Waiting Input</Text>
      <GoZap color={'#D2B5F9'} />
    </HStack>)
  }



  return (
    <>
      <Stack
        direction={{ base: "column", md: "row" }}
        justifyContent="space-between"
        width="100%"
        mb={4}
        pr={cpr}
        pl={cpl}
        alignItems={{ base: "stretch", md: "center" }}
      >
        <Heading size="lg" color={"brand.pureWhiteTxt"}>{containerName}</Heading>
        <Wrap>

          <CustomLoaderButton
            cwidth="auto"
            cmt={6}
            cvariant={"fbloxD"}
            cloadingText={'Loading...'}
            loader={balanceLoader}
            onClickBtn={loadBalance}
            clabel={balance == undefined ? 'Fetch Balance' : balance + ' Articles'}
          />

          {startPauseToggele && (<>  <CustomLoaderButton
            cwidth="auto"
            cmt={6}
            cvariant={"fblox"}
            cloadingText={'Generate'}
            loader={loader}
            onClickBtn={handleGenerateArticle}
            clabel={'Generate'}
          />
          </>)}

          {!startPauseToggele && (<>
            <CustomLoaderButton
              cwidth="auto"
              cmt={6}
              cvariant={"fblox"}
              cloadingText={'Starting'}
              loader={statusLoader}
              onClickBtn={onStart}
              clabel={'Start'}
              cdisabled={disableStart}
            />

          </>)}

          {startPauseToggele && (<>
            <CustomLoaderButton
              cwidth="auto"
              cmt={6}
              cvariant={"fblox"}
              cloadingText={'Stopping'}
              loader={statusLoader}
              onClickBtn={onPause}
              clabel={'Stop'}
              cdisabled={disablePause}
            />

          </>)}

          <Box ml={4} mt={8}>{info}</Box>
        </Wrap>

      </Stack >

      <ConfirmationDialog
        show={showConfirmation}
        setShow={setShowsConfirmation}
        header={action == ACTION.START ? CommonMessageLabels.START_CONTAINER_HEADING : CommonMessageLabels.STOP_CONTAINER_HEADING}
        description={action == ACTION.START ? CommonMessageLabels.START_CONTAINER_DESCRIPTION : CommonMessageLabels.STOP_CONTAINER_DESCRIPTION}
        onOk={onOkConfirmation}
        closeLabel={CommonMessageLabels.CANCEL}
        okLabel={CommonMessageLabels.YES}
        status={STATUS.WARNING}
      />
    </>
  );
}
