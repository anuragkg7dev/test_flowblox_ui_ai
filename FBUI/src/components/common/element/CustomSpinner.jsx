import { Box, Center, ProgressCircle, Spinner, Text } from "@chakra-ui/react"

export default function CustomSpinner(props) {

    let show = props.show ?? false
    let cvalue = props.value ?? null
    let ccolor = props.ccolor ?? "brand.primaryBrandBg"

    return (
        <>
            {show && (<>             
                <ProgressCircle.Root value={cvalue} size="sm">
                    <ProgressCircle.Circle>
                        <ProgressCircle.Track />
                        <ProgressCircle.Range stroke={ccolor} />
                    </ProgressCircle.Circle>
                </ProgressCircle.Root>
            </>
            )}
        </>
    )
}
