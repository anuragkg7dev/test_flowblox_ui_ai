import { getCountStats } from "@/components/client/EdgeFunctionRepository";
import { APP_CONFIG_KEYS } from "@/components/common/constants/CommonConstant";
import { toast } from "@/components/common/Notification";
import { calculateTotalTimeSavedFroAllContainers } from "@/components/common/util/TimeSaveCaluclatorUtil";
import { useAppConfigStore } from "@/components/store/AppConfigStore";
import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { TbClockHour5 } from "react-icons/tb";
import { BeatLoader } from "react-spinners";

export default function TimeSavedWidget(props) {

    const [timeSaved, setTimeSaved] = useState(false);
    const [loader, setLoader] = useState(false);
    const { config, setConfig, updateConfig } = useAppConfigStore();
    const authkeyBearer = config[APP_CONFIG_KEYS.JWT_TOKEN];

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = () => {
        let countStats = config[APP_CONFIG_KEYS.COUNT_STATS];
        if (!countStats) {
            loadStatsData()
        } else {
            setTimeSaved(config?.[APP_CONFIG_KEYS.COUNT_STATS])
        }
    }

    const loadStatsData = () => {
        setLoader(true)
        getCountStats(loadStatsDataCallback, authkeyBearer)

    }

    const loadStatsDataCallback = (flag, data) => {
        if (flag) {
            let stats = calculateTotalTimeSavedFroAllContainers(data)
            updateConfig(APP_CONFIG_KEYS.COUNT_STATS, stats)
            setTimeSaved(stats)
        } else {
            console.log('Failed to load Stats', data)
            toast.error('Unable to load Stats data !!')
        }
        setLoader(false)
    }

    return (<>
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
                
                {!loader && (<>
                    <Text fontSize="40px" fontWeight={100} color="brand.subBrandBg">
                        {timeSaved}
                    </Text>
                </>)}

                {loader && (<>
                    <BeatLoader size={8} color="white" />
                </>)}

                <VStack align="start" flexShrink={0}>
                    <Text>Saved</Text>
                    <Text fontSize="10px">Using this tool</Text>
                </VStack>
            </HStack>
        </Box>
    </>)
}