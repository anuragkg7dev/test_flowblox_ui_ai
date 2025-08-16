import CustomDate from "@/components/common/element/CustomDate";
import { splitString, trimString } from "@/components/common/util/StringUtil";
import {
    Badge,
    Button,
    Card,
    HStack,
    Stack,
    Text
} from "@chakra-ui/react";

import { FaRegEdit } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";

export default function DashboardDisplayCard(props) {
    let cKey = props.cKey
    let heading = props.heading
    let subHeading = props.subHeading
    let badges = props.badges ?? ""
    let description = props.description
    let updatedAt = props.updatedAt;
    let data = props.data;
    let badgesColor = props.badgesColor == undefined ? "purple" : props.badgesColor

    let editFlag = props.editFlag == undefined ? true : props.editFlag
    let deleteFLag = props.deleteFLag == undefined ? true : props.deleteFLag
    let manageFlag = props.manageFlag == undefined ? true : props.manageFlag

    let onClickEdit = props.onClickEdit;
    let onClickDelete = props.onClickDelete;
    let onClickManage = props.onClickManage;

    return (<>
        <Card.Root key={"cr_" + cKey} width="320px" height="320px" _hover={{ borderColor: 'blue.400', boxShadow: 'md' }}>
            <Card.Body key={"cb_" + cKey}>
                <HStack key={"hs_" + cKey} mb="6" gap="3" >
                    <Stack key={"st_" + cKey} gap="0">
                        <Text key={"tx_" + cKey} fontWeight="semibold" textStyle="sm" wordBreak={"break-word"}>
                            {trimString(heading, 67)}
                        </Text>
                        <Text key={"tx2_" + cKey} color="fg.muted" textStyle="sm">
                            {subHeading}
                        </Text>
                    </Stack>

                </HStack>
                <HStack key={"hs2_" + cKey} mb="6" gap="3">
                    <Stack key={"st2_" + cKey} direction="row">
                        {splitString(badges, ",")?.map((x, index) => { return (<><Badge key={"bdg_" + cKey + "_" + index} colorPalette={badgesColor}>{x}</Badge></>) })}
                    </Stack>
                </HStack>
                <HStack key={"hs3_" + cKey} mb="6" marginTop={"3"} justify="space-between" w="100%">
                    <Stack key={"st3_" + cKey} align="start">
                        <Text key={"tx4_" + cKey} fontWeight="semibold" textStyle="sm">
                            Date
                        </Text> <CustomDate iDate={updatedAt} cKey={cKey} />
                    </Stack>

                    {/* <Stack key={"st4_" + cKey} align="end">
                        <Text key={"tx5_" + cKey} fontWeight="semibold" textStyle="sm">
                            Created Date
                        </Text>
                    </Stack> */}
                </HStack>
                <Card.Description key={"cd_" + cKey}>
                    {trimString(description, 30)}
                </Card.Description>



            </Card.Body>
            <Card.Footer key={"cf_" + cKey}>
                {editFlag && (
                    <Button key={"bte_" + cKey} variant="elevated" onClick={() => { onClickEdit(data) }}><FaRegEdit /></Button>
                )}
                {deleteFLag && (
                    <Button key={"btd_" + cKey} variant="elevated" onClick={() => { onClickDelete(data) }} ><MdDeleteSweep /></Button>
                )}
                {manageFlag && (
                    <Button key={"btm_" + cKey} variant="subtle" colorPalette="blue" flex="1" onClick={() => { onClickManage(data) }} >Manage</Button>
                )}
            </Card.Footer>
        </Card.Root>
    </>);
}
