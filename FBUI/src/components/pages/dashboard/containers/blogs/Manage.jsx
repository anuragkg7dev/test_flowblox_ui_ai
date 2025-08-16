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

export default function Manage(props) {

  const { config, setConfig } = useAppConfigStore();
  let container = config[APP_CONFIG_KEYS.CONTAINER_DATA]

  const containerName = container.name ?? "My Container"
  const [status, setStatus] = useState(container[CONTAINERS_KEY.STATUS]);

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
          stats={<FormatNumber value={12345} />}
        />

        <CustomBoldDisplayCard
          cKey={"article"}
          name={"Number of Live Articles"}
          xicon={ImNewspaper}
          stats={<FormatNumber value={1024} />}
        />

        <CustomBoldDisplayCard
          cKey={"article"}
          name={"Time Saved"}
          xicon={FaRegClock}
          stats={"12:30"}
        />

      </HStack>

      <CustomLine cmt={10} cmb={10} />

      <Articles hideFilter={true} limit={5} />

    </>
  );
}