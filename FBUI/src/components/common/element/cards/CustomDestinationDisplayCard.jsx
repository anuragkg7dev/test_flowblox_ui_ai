import { trimString } from "@/components/common/util/StringUtil";
import { Avatar, Box, Button, Card, Center, Heading, HStack, Spinner, Stack, VStack } from "@chakra-ui/react";
import React from "react";
import CustomSwitch from "../CustomSwitch";
import IconSwitch from "../IconSwitch";
import CustomSpinnerOverlay from "./CustomSpinnerOverlay";

function CustomDestinationDisplayCard(props) {
    let cKey = props.cKey;
    let heading = props.heading;
    let subHeading = props.subHeading;
    let description = props.description;
    let type = props.type;

    let destinationFlag = props.destinationFlag == undefined ? true : props.destinationFlag;
    let editFlag = props.editFlag == undefined ? true : props.editFlag;
    let enabled = props.enabled == undefined ? false : props.enabled;
    let data = props.data;

    let isProcessing = props.isProcessing;
    console.log("isProcessing ", isProcessing)

    let onClickEdit = props.onClickEdit;
    let onChangeSwitch = props.onChangeSwitch;


    return (
        <Card.Root
            key={`cr_${cKey}`}
            width={{ base: "100%", sm: "280px", md: "340px" }}
            height="203px"
            overflow="hidden"
            _hover={{ borderStyle: "solid", borderWidth: "0.1px", borderColor: "brand.primaryBrandBorder", boxShadow: "md" }}
            bg={"brand.OffBlackBg"}
            color={"brand.pureWhiteTxt"}
            variant={"elevated"}

        >
            <Card.Body key={`cb_${cKey}`} p={{ base: 1, md: 2 }} display="flex" flexDirection="column" gap={{ base: 0.5, md: 1 }}>
                <VStack key={`hs_${cKey}`} justify="space-between" align="start">

                    <HStack>
                        <Avatar.Root size="sm" bgColor={"brand.primaryBrandBorder"}>
                            <IconSwitch type={type} boxSize={5} />
                        </Avatar.Root>
                    </HStack>

                    <Stack key={`st_${cKey}`} gap={0} flex={1} >
                        <Heading key={`tx_${cKey}`} size="custom20">
                            {trimString(heading, 30)} {/* Reduced to fit */}
                        </Heading>
                        {subHeading && (
                            <Text color="fg.muted" fontSize="xs" noOfLines={1} minWidth="100px">
                                {trimString(subHeading, 30)}
                            </Text>
                        )}
                    </Stack>
                </VStack>
                <Card.Description
                    key={`cd_${cKey}`}
                    fontSize="12px"
                    noOfLines={2}
                    flex="1"
                    color={"brand.pureWhiteTxt"}

                >
                    {trimString(description, 170)}
                </Card.Description>

            </Card.Body>
            <Card.Footer width={"100%"} key={`cf_${cKey}`} p={1} mb={2} position="relative">
                <HStack justify="space-between" width={"100%"} p={2} userSelect="none">
                    {editFlag && (
                        <Button
                            mt={1}
                            key={`btm_${cKey}`}
                            variant={"fblox"}
                            width="auto"
                            height="25px"
                            aria-label="Manage"
                            onClick={() => onClickEdit(data)}
                        >
                            Edit
                        </Button>
                    )}

                    {/* Spinner overlay for footer only */}
                    <CustomSpinnerOverlay show={isProcessing} />

                    {destinationFlag && (
                        <CustomSwitch
                            label={"Destination On/Off"}
                            onSwitchChange={(val) => { onChangeSwitch?.(val, data); }}
                            defaultValue={enabled}
                            cheight="25px"
                            cp={2}
                        />
                    )}


                </HStack>
            </Card.Footer>
        </Card.Root>
    );
}

export default React.memo(CustomDestinationDisplayCard);