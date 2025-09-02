import { trimString } from "@/components/common/util/StringUtil";
import { Avatar, Button, Card, Heading, HStack, Stack, Text, VisuallyHidden, VStack } from "@chakra-ui/react";
import React from "react";
import { getIndexByCharSum } from "../../util/JsonUtil";
import CustomTag from "../CustomTag";
import IconSwitch from "../IconSwitch";

function CustomContainerDisplayCard(props) {
    let cKey = props.cKey;
    let heading = props.heading;
    let subHeading = props.subHeading;
    let badges = props.badges ?? [];
    let description = props.description;
    let data = props.data;
    let editFlag = props.editFlag == undefined ? true : props.editFlag;
    let manageFlag = props.manageFlag == undefined ? true : props.manageFlag;
    let onClickEdit = props.onClickEdit;
    let onClickManage = props.onClickManage;
    let type = props.type;
    let enableRandomColor = props.enableRandomColor;
    let badgeColor = props.badgeColor ?? "brand.subBrandBg";
    let badgeTextColor = props.badgeColor ?? "brand.pureBlackTxt";
    let sliceIndex = getIndexByCharSum(badges, 35) + 1

    const colors = ["#dc2b37ff", "#46AB50", "#3f36e8ff", "#873AE1"];

    const startIndex = Math.floor(Math.random() * colors.length);


    const getRandomColor = (index) => {
        if (enableRandomColor) {
            return colors[(startIndex + index) % colors.length]
        }
        return badgeColor
    }

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
                    <Avatar.Root size="sm" bgColor={"brand.primaryBrandBorder"}>
                        <IconSwitch type={type} boxSize={5} />
                    </Avatar.Root>
                    <Stack key={`st_${cKey}`} gap={0} flex={1} >
                        <Heading key={`tx_${cKey}`} size="custom20" lineClamp={1}>
                            {heading}
                        </Heading>
                        <VisuallyHidden>{data?.id}</VisuallyHidden>
                        {subHeading && (
                            <Text
                                key={`tx2_${cKey}`}
                                color="fg.muted"
                                fontSize="2xs"
                                lineClamp={1}
                            >
                                <Text lineClamp={1}> {subHeading}</Text>
                            </Text>
                        )}
                    </Stack>
                </VStack>
                <Card.Description
                    key={`cd_${cKey}`}
                    fontSize="12px"
                    flex="1"
                    color={"brand.pureWhiteTxt"}
                    lineClamp={3}
                >
                    <Text lineClamp={3}> {description}</Text>
                </Card.Description>

                <HStack key={`hs2_${cKey}`} gap={1}>
                    <Stack key={`st2_${cKey}`} direction="row" wrap="wrap" gap={1}>
                        {badges.slice(0, sliceIndex)?.map(
                            (badge, index) =>
                                badge.trim() && (
                                    <CustomTag
                                        key={`bdg_${cKey}_${index}`}
                                        cbg={getRandomColor(index)}
                                        txtColor={badgeTextColor}
                                        name={trimString(badge, 10)}
                                        cpx={1}
                                        cmt={1}
                                        csize={"sm"} />

                                )
                        )}
                    </Stack>
                </HStack>
            </Card.Body>
            <Card.Footer key={`cf_${cKey}`} p={1} justify="space-between" mb={2}>
                {editFlag && (
                    <Button
                        key={`bte_${cKey}`}
                        variant={"fbloxD"}
                        width="auto"
                        height="25px"
                        aria-label="Edit"
                        onClick={() => onClickEdit(data)}
                    >
                        Edit
                    </Button>
                )}
                {manageFlag && (
                    <Button
                        key={`btm_${cKey}`}
                        variant={"fblox"}
                        width="auto"
                        height="25px"
                        aria-label="Manage"
                        onClick={() => onClickManage(data)}
                    >
                        Manage
                    </Button>
                )}
            </Card.Footer>
        </Card.Root>
    );
}

export default React.memo(CustomContainerDisplayCard);