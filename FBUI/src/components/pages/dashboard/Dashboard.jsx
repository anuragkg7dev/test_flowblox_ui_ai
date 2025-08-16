import {
  Box,
  Container,
  Flex,
  Heading,
  Image,
  Stack
} from "@chakra-ui/react";

import { USER } from '@/components/common/constants/AppRouterConstant';
import { toast } from '@/components/common/Notification';
import { useAppRouterStore } from '@/components/store/AppRouterStore';
import { useEffect, useState } from 'react';
import { fetchLoggedInUserDetails } from '../auth/AuthLogic';

import { getDropdownOptions } from "@/components/client/EdgeFunctionRepository";
import { getAiInputs } from "@/components/client/SuperbaseRepository";
import { COMMA_SEPERATOR, CREATED_AT, PROMPTS, TOPIC } from "@/components/client/SuperbaseRepositoryConstants";
import { ACTION_ADD, ACTION_EDIT, CLOSE, CONFIRM, getDeleteDescription } from "@/components/common/Options/GlobalConfiguration";
import { useAppConfigStore } from "@/components/store/AppConfigStore";
import { default as logo } from '../../../assets/blogPilot.png';
import DashboardWizardPlayGround from "./createAndEditWizard/DashboardWizardPlayGround";
import DashboardAddCard from "./DashboardAddCard";
import DashboardDisplayCard from "./DashboardDisplayCard";
import DashboardMenu from "./DashboardMenu";
import { initializeMasterDataFormDBData } from "./DashboardUtil";
import ConfirmationDialog from "@/components/common/element/ConfirmationDialog";



function Dashboard() {

  const updateRouter = useAppRouterStore((state) => state.updateRouter);

  const [user, setUser] = useState('')
  const [showCreateEditWizard, setShowCreateEditWizard] = useState(false)
  const [topics, setTopics] = useState([])
  const [selectedTopic, setSelectedTopic] = useState(undefined)
  const [action, setAction] = useState(ACTION_ADD)

  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false)

  const setConfig = useAppConfigStore((state) => state.setConfig);

  let aiInputColumns = TOPIC + COMMA_SEPERATOR + PROMPTS + COMMA_SEPERATOR + CREATED_AT

  useEffect(() => {
    fetchLoggedInUserDetails(loggedInUserDetailCallback);
    getDropdownOptions(getDropdownOptionsCallBack);
    getAiInputs(aiInputColumns, getAiInputsCallback);
  }, []);


  const getDropdownOptionsCallBack = (flag, result) => {
    if (flag) {

      setConfig(result)
    }
  }

  const loggedInUserDetailCallback = (status, session) => {

    if (!status) {
      toast.error(session);
    }
    else {
      toast.success('Welcome ' + session?.user?.email)
      setUser(session?.user?.email);
      updateRouter(USER, session?.user)
      //
    }

  }

  const getAiInputsCallback = (flag, dbData) => {

    if (flag && dbData) {
      let transformedData = dbData?.data?.map(x => {
        let result = {}
        return initializeMasterDataFormDBData(x)

      })

      setTopics(transformedData)
    }
  }

  const onClickEdit = (data) => {
    setAction(ACTION_EDIT)
    setSelectedTopic(data);
    setShowCreateEditWizard(true)
  }


  const onClickManage = (data) => {

  }
  const onClickDelete = (data) => {   
    setSelectedTopic(data);
    setShowConfirmationDialog(true)
  }

  const onCLose = () => {
    setShowConfirmationDialog(false)
  }

  const onConfirm = () => {
    console.log("Deleting ", selectedTopic)
    setShowConfirmationDialog(false)
  }

  return (
    <>
      <Box minH="100vh" bg="gray.50">
        {/* Header */}
        <Flex
          as="header"
          justify="space-between"
          align="center"
          p={4}
          bg="white"
          shadow="sm"
          position="sticky"
          top="0"
          zIndex="10"
        >
          <Flex align="center">
            <Image src={logo} alt="Logo" boxSize="50px" mr={3} />
            <Heading size="md">BlogPilot</Heading>
          </Flex>

          <DashboardMenu user={user} />

        </Flex>

        {/* Content */}
        <Container maxW="6xl" py={10}>

          <Flex width="100%" height="100%" align="center" justify="center">
            <Stack gap="4" direction="row" wrap="wrap">
              {topics?.map(x => {
                return (<>
                  <DashboardDisplayCard
                    cKey={x?.createConfig?.id}
                    heading={x?.createConfig?.topic}
                    subHeading={undefined}
                    badges={x?.createConfig?.keywords}
                    description={x?.createConfig?.description}
                    updatedAt={x.updated_at}
                    data={x}
                    onClickEdit={onClickEdit}
                    onClickDelete={onClickDelete}
                    onClickManage={onClickManage}

                  />
                </>)

              })}


              <DashboardAddCard
                showCreateEditWizard={showCreateEditWizard}
                setShowCreateEditWizard={setShowCreateEditWizard} />
            </Stack>
          </Flex>



        </Container>
      </Box>

      {showCreateEditWizard && (<>
        <DashboardWizardPlayGround
          showCreateEditWizard={showCreateEditWizard}
          setShowCreateEditWizard={setShowCreateEditWizard}
          data={selectedTopic}
          action={action} />
      </>)}

      <ConfirmationDialog
        show={showConfirmationDialog}
        setShow={setShowConfirmationDialog}
        header="DELETE"
        description={getDeleteDescription(selectedTopic?.createConfig?.topic ?? "")}
        onClose={onCLose}
        onOk={onConfirm}
        closeLabel={CLOSE}
        okLabel={CONFIRM}
      />
    </>
  );
}

export default Dashboard
