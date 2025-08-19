import { trimString } from "@/components/common/util/StringUtil";
import { Button, Card, Heading, HStack, Stack, Text, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import CustomSelect from "../CustomSelect";
import { articleOptions } from "@/components/pages/dashboard/DashboardConstant";
import CustomMenu from "../CustomMenu";
import CustomDateTimeDisplay from "../CustomDateTimeDisplay";

function CustomArticleDisplayCard(props) {
    let selectView = props.selectView ?? false;
    let cKey = props.cKey;
    let heading = props.heading;
    let subHeading = props.subHeading;
    let description = props.description;
    let data = props.data;
    let optionFlag = props.optionFlag == undefined ? true : props.optionFlag;
    let viewFlag = props.viewFlag == undefined ? true : props.viewFlag;
    let publishFlag = props.publishFlag == undefined ? true : props.publishFlag;
    let onClickView = props.onClickView;
    let onClickPublish = props.onClickPublish;
    let onCardClick = props.onCardClick;
    let sequence = props.sequence;
    let cdate = props.cdate

    console.log('akg', sequence, cdate)
    let wordLimit = selectView ? 340 : 170;

    let [articleOption, setArticleOption] = useState("");

    const onArticleOptionChange = (value) => {
        console.log("AKG.......value......", value)
        setArticleOption(value)
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
                <VStack key={`hs_${cKey}`} justify="space-between" align="start">

                    <Stack key={`st_${cKey}`} gap={0} flex={1} >
                        <Heading key={`tx_${cKey}`} size="custom20">
                            {trimString(heading, 30)} {/* Reduced to fit */}
                        </Heading>
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
                    <HStack justify={'space-between'} mt={1}>
                         <Text>Id - {sequence}</Text> 
                        <CustomDateTimeDisplay cdate={cdate} />
                    </HStack>
                </Card.Description>

            </Card.Body>
            <Card.Footer width={"100%"} key={`cf_${cKey}`} p={1} mb={2}>
                {!selectView && (
                    <HStack justify="space-between" width={"100%"} p={2}>
                        {optionFlag && (<>
                            <CustomMenu
                                clabel="Action"
                                sdata={articleOptions}
                                onSelect={(value) => onArticleOptionChange(value)}
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
                        {publishFlag && (
                            <Button
                                mt={1}
                                key={`btm_${cKey}`}
                                variant={"fblox"}
                                width="auto"
                                height="35px"
                                aria-label="Manage"
                                onClick={() => onClickPublish(data)}
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