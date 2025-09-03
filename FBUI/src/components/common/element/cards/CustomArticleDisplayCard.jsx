import { Button, Card, Heading, HStack, Stack, Text, VisuallyHidden, VStack } from "@chakra-ui/react";
import React from "react";
import { actions, dot, getArticleOptions } from "../../constants/CommonUtilityAndOptions";
import CustomDateTimeDisplay from "../CustomDateTimeDisplay";
import { CustomFloatWithOffset } from "../CustomFloatWithOffset";
import CustomMenu from "../CustomMenu";
import CustomStatusDot from "../CustomStatusDot";
import CustomSpinnerOverlay from "./CustomSpinnerOverlay";
import { UX } from "../../constants/CommonConstant";


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
            width={{ base: "100%", sm: "300px", md: "360px" }}
            height="230px"
            overflow="hidden"
            _hover={{ borderStyle: "solid", borderWidth: "0.1px", borderColor: "brand.primaryBrandBorder", boxShadow: "md" }}
            bg={"brand.OffBlackBg"}
            color={"brand.pureWhiteTxt"}
            variant={"elevated"}
            onClick={onCardClick?.(data)}
            mr={UX.card_mr}
            mb={UX.card_mb}
            p={2}

        >
            <Card.Body key={`cb_${cKey}`} p={{ base: 1, md: 2 }} display="flex" flexDirection="column" gap={{ base: 0.5, md: 1 }}>

                <CustomFloatWithOffset value={sequence} offset={5} />

                <VStack key={`hs_${cKey}`} justify="space-between" align="start" mb={"10px"}>

                    <Stack key={`st_${cKey}`} gap={0} flex={1} width={"80%"} >
                        <HStack>
                            {publishFlag && (<CustomStatusDot type={dot.SUCCESS} cmr={2} cmb={0} csize={'md'} />)}
                            <Heading key={`tx_${cKey}`} size="custom20" lineClamp={1}>
                                {heading}
                            </Heading>
                            <VisuallyHidden>{data?.id}</VisuallyHidden>
                        </HStack>
                        {subHeading && (
                            <Text color="fg.muted" fontSize="16px" lineClamp={1} minWidth="100px">
                                {subHeading}
                            </Text>
                        )}
                    </Stack>
                </VStack>
                <Card.Description
                    key={`cd_${cKey}`}
                    fontSize="12px"
                    flex="1"
                    color={"brand.pureWhiteTxt"}
                >
                    <Text lineClamp={4}> {description}</Text>
                </Card.Description>

                <HStack >
                    <CustomDateTimeDisplay cdate={cdate} cfontSize={"12px"} />
                    {/* Spinner overlay for footer only */}
                    <CustomSpinnerOverlay show={isProcessing} cml={7} cmt={2} type={'beat'} />
                </HStack>



            </Card.Body>
            <Card.Footer width={"100%"} key={`cf_${cKey}`} p={1} mb={1}>
                {!selectView && (
                    <HStack justify="space-between" width={"100%"} p={2}>
                        {optionFlag && (<>
                            <CustomMenu
                                clabel="Action"
                                sdata={getArticleOptions(status)}
                                onSelect={(value) => onActionChange(value, data)}
                                cwidth={"33%"}
                                cheight={"25px"}
                            />

                        </>)}
                        <HStack>
                            {viewFlag && (
                                <Button
                                    key={`bte_${cKey}`}
                                    variant={"fbloxD"}
                                    width="auto"
                                    height="25px"
                                    aria-label="Edit"
                                    onClick={() => onClickView(data)}
                                >
                                    View
                                </Button>
                            )}


                            {showPublishButton && (
                                <Button
                                    key={`btm_${cKey}`}
                                    variant={"fblox"}
                                    width="auto"
                                    height="25px"
                                    aria-label="Manage"
                                    onClick={() => handleStatusChange(data, actions.PUBLISH)}
                                >
                                    Publish
                                </Button>
                            )}
                        </HStack>
                    </HStack>
                )}
            </Card.Footer>
        </Card.Root>
    );
}

export default React.memo(CustomArticleDisplayCard);