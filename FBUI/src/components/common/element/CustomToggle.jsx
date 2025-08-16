import { Box, SegmentGroup } from "@chakra-ui/react"

export const CustomToggle = (props) => {

    let coptions = props.coptions
    let onChangeT = props.onChangeT
    let defaultValue = props.defaultValue

    function onChangeToggle(e) {
        console.log("AKG hiiii",e)
        if (onChangeT) {
            console.log("AKG hiiii 2",e)
            onChangeT(e.target.value)
        }
    }

    return (
        <Box width="fit-content"
            bg="gray.900"
            rounded="sm"
            border="1px solid"
            borderColor="gray.700" >

            <SegmentGroup.Root p={1} height="fit-content" defaultValue={defaultValue} onChange={(e) => { onChangeToggle(e); }} gap={1} bg={"black"}>
                <SegmentGroup.Indicator />
                <SegmentGroup.Items items={coptions}
                    bg={"gray.900"}
                    color={"white"}
                    height={"32px"}
                    renderItem={(item) => item.label}
                    _checked={{
                        bg: "gray.700",
                        color: "white",
                    }}
                    _hover={{
                        bg: "gray.700",
                    }} />
            </SegmentGroup.Root>

        </Box>
    )
}
