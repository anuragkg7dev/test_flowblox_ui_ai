import { Box, Center, HStack, Progress, Spinner } from "@chakra-ui/react"

export default function CustomProgress(props) {

    let show = props.show ?? false  
    let progressLabel = props.progressLabel ?? "In Progress"   
    let colorPalette=props.colorPalette ??"blue"  

    return (
        <>
            {show && (<>
                <Box pos="absolute" inset="0" bg="bg/80" alignContent={"center"} display="flex" justifyContent="center"
          alignItems="center" zIndex="10">
                   
                        <Progress.Root  value={null} w="sm" maxW="sm"  colorPalette={colorPalette} >
                            <HStack gap="5" >
                                <Progress.Label>{progressLabel}</Progress.Label>
                                <Progress.Track flex="1">
                                    <Progress.Range />
                                </Progress.Track>
                                {/* <Progress.ValueText >{((100/totalItem) * currentItemIndex)}{"%"}</Progress.ValueText> */}
                            </HStack>
                        </Progress.Root> 
                    
                </Box>
                      
               
                        
            </>)}
        </>
    )
}
