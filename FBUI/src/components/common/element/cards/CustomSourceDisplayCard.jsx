import { trimString } from "@/components/common/util/StringUtil";
import { Avatar, Button, Card, Heading, HStack, Stack, VStack } from "@chakra-ui/react";
import React from "react";
import CustomSwitch from "../CustomSwitch";
import CustomTag from "../CustomTag";
import IconSwitch from "../IconSwitch";
import CustomSpinnerOverlay from "./CustomSpinnerOverlay";

function CustomSourceDisplayCard(props) {
    const cKey = props.cKey;
    const heading = props.heading;
    const subHeading = props.subHeading;
    const description = props.description;
    const type = props.type;
    const typeLabel = props.typeLabel ?? '';
    const sourceFlag = props.sourceFlag == undefined ? true : props.sourceFlag;
    const editFlag = props.editFlag == undefined ? true : props.editFlag;
    const enabled = props.enabled == undefined ? true : props.enabled;
    const data = props.data;
    const isProcessing = props.isProcessing

    const onClickEdit = props.onClickEdit;
    const onChangeSwitch = props.onChangeSwitch;


    return (
        <Card.Root
            key={`cr_${cKey}`}
            width={{ base: "100%", sm: "300px", md: "360px" }}
            height="230px"
            overflow="hidden"
            _hover={{ borderStyle: "solid", borderWidth: "0.1px", borderColor: "brand.primaryBrandBorder", boxShadow: "md" }}
            bg={"brand.OffBlackBg"}
            color={"brand.pureWhiteTxt"}
            variant={"elevated"}
            mr={"30px"}
            mb={"20px"}
            p={2}

        >
            <Card.Body key={`cb_${cKey}`} p={{ base: 1, md: 2 }} display="flex" flexDirection="column" gap={{ base: 0.5, md: 1 }}>
                <VStack key={`hs_${cKey}`} justify="space-between" align="start">

                    <HStack>
                        <Avatar.Root size="sm" bgColor={"brand.primaryBrandBorder"}>
                            <IconSwitch type={type} boxSize={5} />
                        </Avatar.Root>

                        <CustomTag
                            key={`bdg_${cKey}`}
                            cbg={"brand.subBrandBg"}
                            txtColor={"brand.pureBlackTxt"}
                            name={trimString(typeLabel, 10)}
                            cpx={1}
                            cmt={1}
                            csize={"sm"} />

                    </HStack>


                    <Stack key={`st_${cKey}`} gap={0} flex={1} >
                        <Heading key={`tx_${cKey}`} size="custom20" lineClamp={1}>
                            {heading}
                        </Heading>
                        {subHeading && (
                            <Text color="fg.muted" fontSize="xs" lineClamp={1} minWidth="100px">
                                {subHeading}
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
                    lineClamp={3}

                >
                    {description}
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

                    {sourceFlag && (
                        <CustomSwitch
                            label={"Enable Source"}
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

export default React.memo(CustomSourceDisplayCard);