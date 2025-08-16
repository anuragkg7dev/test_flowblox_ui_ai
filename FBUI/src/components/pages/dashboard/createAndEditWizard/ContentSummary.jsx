import { SimpleSummary } from "@/components/common/element/SimpleSummary"
import { SimpleTimelineSummary } from "@/components/common/element/SimpleTimelineSummary";
import { createContentSteps } from "@/components/common/Options/StepperOptions";

import { getCombinedOptionsKVObject } from "@/components/common/util/JsonUtil"
import { useAppConfigStore } from "@/components/store/AppConfigStore";
import { Box, Heading, Timeline } from "@chakra-ui/react"

export default function ContentSummary(props) {

    let masterData = props.masterData

    const configuration = useAppConfigStore((state) => state.config);
    let valueMap = getCombinedOptionsKVObject(configuration)

    console.log("valueMap ", valueMap)
    
    return (<>
        <Box maxW="600px" mx="auto" py={10} px={4} >
        <Heading mb={2}>Summary</Heading>
        <Timeline.Root >
        <SimpleTimelineSummary data={masterData.createConfig} heading={"Scribe"} overRideValueMap={valueMap} cicon={createContentSteps[0]["icon"]}/>
        <SimpleTimelineSummary data={masterData.aiConfigure} heading={"AI Configuration"} overRideValueMap={valueMap} cicon={createContentSteps[1]["icon"]}/>
        <SimpleTimelineSummary data={masterData.publishConfig} heading={"Publication Configuration"} overRideValueMap={valueMap} cicon={createContentSteps[2]["icon"]}/>
        </Timeline.Root>
        </Box>
    </>)


}


