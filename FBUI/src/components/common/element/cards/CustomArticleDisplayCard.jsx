import { trimString } from "@/components/common/util/StringUtil";
import { Button, Card, Heading, HStack, Stack, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { actions, dot, getArticleOptions } from "../../constants/CommonUtilityAndOptions";
import CustomDateTimeDisplay from "../CustomDateTimeDisplay";
import { CustomFloatWithOffset } from "../CustomFloatWithOffset";
import CustomMenu from "../CustomMenu";
import CustomStatusDot from "../CustomStatusDot";
import CustomSpinnerOverlay from "./CustomSpinnerOverlay";


function CustomArticleDisplayCard(props) {
    const selectView = props.selectView ?? false;
    const cKey = props.cKey;
    const heading = props.heading;
    const subHeading = props.subHeading;
    const description = props.description;
    const data = props.data;
    const optionFlag = props.optionFlag == undefined ? true : props.optionFlag;
    const viewFlag = props.viewFlag == undefined ? true : props.viewFlag;
    const publishFlag = props.publishFlag == undefined ? false : props.publishFlag;
    const onClickView = props.onClickView;
    const handleStatusChange = props.handleStatusChange;
    const onCardClick = props.onCardClick;
    const sequence = props.sequence;
    const cdate = props.cdate
    const isProcessing = props.isProcessing
    const showPublishButton = props.showPublishButton
    const status = props.status



    let wordLimit = selectView ? 300 : 150;

    const onActionChange = (value, data) => {     
        handleStatusChange(data, value)
    };

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
            onClick={onCardClick?.(data)}

        >
            <Card.Body key={`cb_${cKey}`} p={{ base: 1, md: 2 }} display="flex" flexDirection="column" gap={{ base: 0.5, md: 1 }}>

                <CustomFloatWithOffset value={sequence} offset={5} />

                <VStack key={`hs_${cKey}`} justify="space-between" align="start">

                    <Stack key={`st_${cKey}`} gap={0} flex={1} >
                        <HStack>
                            {publishFlag && (<CustomStatusDot type={dot.SUCCESS} cmr={2} cmb={0} csize={'md'} />)}
                            <Heading key={`tx_${cKey}`} size="custom20">
                                {trimString(heading, 30)} {/* Reduced to fit */}
                            </Heading>
                        </HStack>
                        {subHeading && (
                            <Text color="fg.muted" fontSize="16px" noOfLines={1} minWidth="100px">
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
                    {trimString(description, wordLimit)}
                </Card.Description>

                <HStack >
                    <CustomDateTimeDisplay cmt={2} cdate={cdate} />
                    {/* Spinner overlay for footer only */}
                    <CustomSpinnerOverlay show={isProcessing} cml={7} cmt={2} type={'syncLoader'} />
                </HStack>



            </Card.Body>
            <Card.Footer width={"100%"} key={`cf_${cKey}`} p={1} mb={2}>
                {!selectView && (
                    <HStack justify="space-between" width={"100%"} p={2}>
                        {optionFlag && (<>
                            <CustomMenu
                                clabel="Action"
                                sdata={getArticleOptions(status)}
                                onSelect={(value) => onActionChange(value, data)}
                                cwidth={"33%"}
                            />

                        </>)}

                        {viewFlag && (
                            <Button
                                mt={1}
                                key={`bte_${cKey}`}
                                variant={"fbloxD"}
                                width="auto"
                                height="35px"
                                aria-label="Edit"
                                onClick={() => onClickView(data)}
                            >
                                View
                            </Button>
                        )}


                        {showPublishButton && (
                            <Button
                                mt={1}
                                key={`btm_${cKey}`}
                                variant={"fblox"}
                                width="auto"
                                height="35px"
                                aria-label="Manage"
                                onClick={() => handleStatusChange(data, actions.PUBLISH)}
                            >
                                Publish
                            </Button>
                        )}
                    </HStack>
                )}
            </Card.Footer>
        </Card.Root>
    );
}

export default React.memo(CustomArticleDisplayCard);