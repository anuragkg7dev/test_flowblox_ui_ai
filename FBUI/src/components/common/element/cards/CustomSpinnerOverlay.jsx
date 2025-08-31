import { Avatar, Box, Card, Flex, Skeleton, SkeletonCircle, SkeletonText, Spinner, Stack, VStack } from "@chakra-ui/react";
import { SyncLoader } from "react-spinners";

export default function CustomSpinnerOverlay(props) {

    const show = props.show
    const cml = props.cml
    const cmt = props.cmt
    const type = props.type ?? 'spinner'
    const csize = props.csize ?? 5


    return (
        <>
            {/* Spinner overlay for footer only */}
            {show && (<>
                <Box mt={cmt} ml={cml}>
                    <Box pos="absolute" inset="0" bg="bg/10" zIndex="10">
                        <Box display="flex" justifyContent="center" alignItems="center" h="full" w="full">
                        </Box>
                    </Box>
                    {type == 'spinner' && (<Spinner color="brand.primaryBrandBg" />)}
                    {type == 'syncLoader' && (<SyncLoader size={csize} color="#D2B5F9" />)}

                </Box>
            </>)}
        </>
    );
}
