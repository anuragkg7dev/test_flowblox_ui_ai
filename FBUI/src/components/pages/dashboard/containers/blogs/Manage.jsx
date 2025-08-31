import CustomBoldDisplayCard from "@/components/common/element/cards/CustomBoldDisplayCard";
import CustomLine from "@/components/common/element/CustomLine";
import {
  FormatNumber,
  HStack
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaRegClock } from "react-icons/fa";
import { ImNewspaper } from "react-icons/im";
import { PiPulseBold } from "react-icons/pi";
import SingleContainerHeader from "../headers/SingleContainerHeader";

import { APP_CONFIG_KEYS } from "@/components/common/constants/CommonConstant";

import { getPublishCountStats } from "@/components/client/EdgeFunctionRepository";
import { CommonLabels } from "@/components/common/constants/CommonLabelConstants";
import { toast } from "@/components/common/Notification";
import { getTimeInHours, getTimeSavedOnArticle } from "@/components/common/util/TimeSaveCaluclatorUtil";
import { useAppConfigStore } from "@/components/store/AppConfigStore";
import { BeatLoader } from "react-spinners";
import { CONTAINERS_KEY } from "../ContainersConstant";
import Articles from "./Articles";

export default function Manage(props) {

  const { config, setConfig } = useAppConfigStore();
  let container = config[APP_CONFIG_KEYS.CONTAINER_DATA]
  const authkeyBearer = config[APP_CONFIG_KEYS.JWT_TOKEN];

  const containerName = container.name ?? CommonLabels.MY_BLOX
  const [status, setStatus] = useState(container[CONTAINERS_KEY.STATUS]);
  const [totalArticle, setTotalArticle] = useState(-1);
  const [totalPublishedArticle, setTotalPublishedArticle] = useState(-1);

  useEffect(() => {
    loadPublishCount();
  }, []);

  const loadPublishCount = () => {
    getPublishCountStats({ id: container.id }, loadPublishCountCallback, authkeyBearer)
  }

  const loadPublishCountCallback = (flag, data) => {
    if (flag) {
      setTotalPublishedArticle(data?.publishedCount)
    } else {
      toast.error('Unable to load Number of Live Articles !!')
      setTotalPublishedArticle(0)
    }
  }

  const getFormatNumber = (cnum) => {
    if (cnum == -1) {
      return (<BeatLoader size={8} color="white" />)
    }
    return (<FormatNumber value={cnum} />)
  }

  const getTimeString = (cnum) => {
    if (cnum == -1) {
      return (<BeatLoader size={8} color="white" />)
    }
    return getTimeInHours(getTimeSavedOnArticle(totalArticle))
  }

  return (
    <>
      <SingleContainerHeader
        status={status}
        setStatus={setStatus}
        containerName={containerName}
        startPauseToggele={true}
        onStart={() => { console.log("Start") }}
        onStop={() => { console.log("Stop") }}
        onPause={() => { console.log("Pause") }}
        disableStop={false}
        disableStart={false}
        disablePause={false}
      />

      <HStack justify={"space-evenly"}>

        <CustomBoldDisplayCard
          cKey={"article"}
          name={"Total Article"}
          xicon={PiPulseBold}
          stats={getFormatNumber(totalArticle)}
        />

        <CustomBoldDisplayCard
          cKey={"article"}
          name={"Number of Live Articles"}
          xicon={ImNewspaper}
          stats={getFormatNumber(totalPublishedArticle)}
        />

        <CustomBoldDisplayCard
          cKey={"article"}
          name={"Time Saved"}
          xicon={FaRegClock}
          stats={getTimeString(totalArticle)}
        />

      </HStack>

      <CustomLine cmt={10} cmb={10} />

      <Articles
        hideFilter={true}
        limit={5} setTotalArticle={setTotalArticle}
        loadPublishCount={loadPublishCount}
        showAutoPublish={true} />
    </>
  );
}