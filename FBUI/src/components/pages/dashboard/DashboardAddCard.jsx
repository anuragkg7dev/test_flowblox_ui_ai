import { SCRIBE_CREATE_URL } from "@/components/common/constants/AppRouterConstant";
import {
    Button,
    Card,
    Flex,
    Icon
} from "@chakra-ui/react";

import { IoIosAddCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
export default function DashboardAddCard(props) {

    const navigate = useNavigate();
    const setShowCreateEditWizard = props.setShowCreateEditWizard

    return (<>

        <Card.Root width="320px" height="320px" _hover={{ borderColor: 'blue.400', boxShadow: 'md' }} onClick={() => { setShowCreateEditWizard(true); }}>
            <Card.Body>
                <Flex width="100%" height="100%" align="center" justify="center">
                    <Icon as={IoIosAddCircleOutline} boxSize={20} />
                </Flex>
            </Card.Body>
            <Card.Footer>
            </Card.Footer>
        </Card.Root>

    </>);
}
