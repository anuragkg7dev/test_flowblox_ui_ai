
import { Box, HStack, Text, VStack } from '@chakra-ui/react'
import { appLabels } from '../constants/AppLabels'

export const SimpleSummary = (props) => {

    let heading = props.heading
    let data = props.data
    let keyOrder = props.keyOrder

    let overRideKeyMap = props.overRideKeyMap
    let overRideValueMap = props.overRideValueMap

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
        <>  <Box marginBottom={"15px"}>
            {(heading && <> <h3><Text fontWeight="bold">{heading}</Text></h3>
                <hr /></>
            )}
            <VStack alignItems="start" gap={4} padding={4} >
                {orderedKeys.map((key) => (
                    <HStack key={key} alignItems="start" gap={1}>
                        <Text fontWeight="bold">{getKeyLabel(key)}:</Text>
                        <Text>{overRideValue(data[key]) ?? 'Not provided'}</Text>
                    </HStack>
                ))}
            </VStack>

        </Box>
        </>
    )
}