import { Avatar, Box, Card, Flex, Skeleton, SkeletonCircle, SkeletonText, Spinner, Stack, VStack } from "@chakra-ui/react";

export default function CustomSpinnerOverlay(props) {

    const show = props.show

    return (
        <>
            {/* Spinner overlay for footer only */}
            {show && (<>
                <Box>
                    <Box pos="absolute" inset="0" bg="bg/10" zIndex="10">
                        <Box display="flex" justifyContent="center" alignItems="center" h="full" w="full">
                        </Box>
                    </Box>
                    <Spinner color="brand.primaryBrandBg" />
                </Box>
            </>)}
        </>
    );
}
