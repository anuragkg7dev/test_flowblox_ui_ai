import { Box, Center, Spinner } from "@chakra-ui/react"

export default function CustomSpinner(props) {

    let show = props.show ?? false
    let loaderText = props.loaderText ?? "Loading content"


    return (
        <>
            <Box>
                {show && (
                    <Box
                        pos="absolute"
                        inset="0"
                        bg="gray.500/80" // Use a standard Chakra color with opacity
                        aria-label={loaderText}
                    >
                        <Center h="full">
                            <Spinner color="brand.textLight" thickness="4px" size="xl" />
                        </Center>
                    </Box>
                )}
            </Box>
        </>
    )
}
