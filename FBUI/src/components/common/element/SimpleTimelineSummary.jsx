
import { Box, HStack, Text, Timeline, VStack } from '@chakra-ui/react'
import { appLabels } from '../constants/AppLabels'

export const SimpleTimelineSummary = (props) => {

    let cicon = props.cicon
    let heading = props.heading
    let data = props.data
    let keyOrder = props.keyOrder

    let overRideKeyMap = props.overRideKeyMap
    let overRideValueMap = props.overRideValueMap

    let skipKeys = props.skipKeys??["id"]

    const overRideKey = (key) => {
        if (overRideKeyMap) {
            return overRideKeyMap[key] ?? key
        }
        return key
    }

    const overRideValue = (value) => {
        if (overRideValueMap) {
            return overRideValueMap[value] ?? value
        }
        return value
    }

    const getKeyLabel = (key) => {
        let nKey = overRideKey(key)
        return appLabels[nKey] ?? nKey
    }


    // Determine the order of keys to display
    const orderedKeys = keyOrder
        ? [
            // Include keys from keyOrder that exist in data
            ...keyOrder.filter((key) => key in data),
            // Append any remaining keys from data not in keyOrder
            ...Object.keys(data).filter((key) => !keyOrder.includes(key)),
        ]
        : Object.keys(data)

    return (
        <>
            <Timeline.Item>
                <Timeline.Connector>
                    <Timeline.Separator />
                    <Timeline.Indicator>
                        {cicon}
                    </Timeline.Indicator>
                </Timeline.Connector>
                <Timeline.Content>
                    <Timeline.Title>{heading}</Timeline.Title>

                    <VStack alignItems="start" gap={4} padding={4} >
                        {orderedKeys.filter(item => !skipKeys.includes(item)).map((key) => (
                            <HStack key={key} alignItems="start" gap={1}>
                                <Text fontWeight="bold">{getKeyLabel(key)}:</Text>
                                <Text>{overRideValue(data[key]) ?? 'Not provided'}</Text>
                            </HStack>
                        ))}
                    </VStack>
                </Timeline.Content>
            </Timeline.Item>



        </>
    )
}