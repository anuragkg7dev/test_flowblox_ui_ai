import CustomBoldDisplayCard from "@/components/common/element/cards/CustomBoldDisplayCard";
import CustomLine from "@/components/common/element/CustomLine";
import {
  FormatNumber,
  HStack
} from "@chakra-ui/react";
import { useState } from "react";
import { FaRegClock } from "react-icons/fa";
import { ImNewspaper } from "react-icons/im";
import { PiPulseBold } from "react-icons/pi";
import SingleContainerHeader from "../headers/SingleContainerHeader";

import { APP_CONFIG_KEYS } from "@/components/common/constants/CommonConstant";

import { useAppConfigStore } from "@/components/store/AppConfigStore";
import { CONTAINERS_KEY } from "../ContainersConstant";
import Articles from "./Articles";
import { CommonLabels } from "@/components/common/constants/CommonLabelConstants";
import { getTimeInHours, getTimeSavedOnArticle } from "@/components/common/util/TimeSaveCaluclatorUtil";
import { BeatLoader } from "react-spinners";

export default function Manage(props) {

  const { config, setConfig } = useAppConfigStore();
  let container = config[APP_CONFIG_KEYS.CONTAINER_DATA]

  const containerName = container.name ?? CommonLabels.MY_BLOX
  const [status, setStatus] = useState(container[CONTAINERS_KEY.STATUS]);
  const [totalArticle, setTotalArticle] = useState(-1);
  const [totalPublishedArticle, setTotalPublishedArticle] = useState(1024);

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

      <Articles hideFilter={true} limit={5} setTotalArticle={setTotalArticle} />

    </>
  );
}