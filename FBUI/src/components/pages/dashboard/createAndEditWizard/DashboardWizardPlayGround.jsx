import { Box, Dialog, Portal, Text } from "@chakra-ui/react"

import { saveContentAiConfiguration, saveContentPublicationConfiguration, saveCreateContentData } from "@/components/client/SuperbaseRepository"
import { toast } from '@/components/common/Notification'
import { ACTION_ADD, CANCEL, CLOSE, CONFIRM, messages } from "@/components/common/Options/GlobalConfiguration"
import { createContentSteps, STEP0, STEP1, STEP2, STEP3 } from "@/components/common/Options/StepperOptions"
import CustomProgress from "@/components/common/element/CustomProgress"
import CustomStepper from "@/components/common/element/CustomStepper"
import CustomStepperNavigator from "@/components/common/element/CustomStepperNavigator"
import { clone } from "@/components/common/util/JsonUtil"
import { useEffect, useRef, useState } from "react"
import { initContentConfiguration, initializeMasterDataFormDBData } from "../DashboardUtil"
import ContentAiConfiguration from "./ContentAiConfiguration"
import ContentPublicationConfiguration from "./ContentPublicationConfiguration"
import ContentSummary from "./ContentSummary"
import CreateContent from "./CreateContent"
import ConfirmationDialog from "@/components/common/element/ConfirmationDialog"

export default function DashboardWizardPlayGround(props) {

    const data = props.data
    const action = props.action ?? ACTION_ADD
    const setShowCreateEditWizard = props.setShowCreateEditWizard
    const showCreateEditWizard = props.showCreateEditWizard

    const [currentStep, setCurrentStep] = useState(0);
    const [masterData, setMasterData] = useState({})
    const [showLoader, setShowLoader] = useState(false)

    const [status, setStatus] = useState(0);

    const [showConfirmationDialog, setShowConfirmationDialog] = useState(false)

    // Create a ref to hold the child component reference
    const createContentRef = useRef();
    const contentConfigurationRef = useRef();
    const contentPublicationConfigurationRef = useRef();



    useEffect(() => {

        if (action == ACTION_ADD) {
            console.log("ADD")
            initializeMasterDataForAdd()
        } else {
            console.log("EDIT")
            setMasterData(data)
        }

    }, []);


    useEffect(() => {

        console.log("AKG Updated Master Data ", masterData)

    }, [masterData]);

    const initializeMasterDataForAdd = () => {
        let init = clone(initContentConfiguration)
        setMasterData(init)

    }



    const handleValidationViaRef = (childRef) => {
        if (childRef && childRef.current) {
            const result = childRef.current.validate();
            console.log('ANurag Validation result:', currentStep, result);
            return result;
        }
        return false;
    };

    const handleValidateNSave = async () => {
        console.log("currentStep ", currentStep)
        let isValid = true;
        if (currentStep == STEP0) {
            isValid = handleValidationViaRef(createContentRef);
            moveNext(isValid)
        } else if (currentStep == STEP1) {
            isValid = handleValidationViaRef(contentConfigurationRef);
            moveNext(isValid)
        } else if (currentStep == STEP2) {
            isValid = handleValidationViaRef(contentPublicationConfigurationRef);
            moveNext(isValid)
        }

        return isValid;
    }

    const moveNext = (flag) => {
        if (flag) {
            setCurrentStep(prev => prev == 0 ? 1 : prev + 1);
        }
    }

    const onFinish = async () => {
        await saveCreateContent(masterData);

    }
    const saveCreateContent = async (mData) => {
        setShowLoader(true)
        await saveCreateContentData(mData?.createConfig, saveCreateContentCallback)

    }

    const saveAIConfig = async (mData) => {
        await saveContentAiConfiguration(mData?.aiConfigure, generalTostMsgCallback)
    }

    const savePublishConfig = async (mData) => {
        await saveContentPublicationConfiguration(mData?.publishConfig, generalTostMsgCallback)
    }

    const saveCreateContentCallback = async (flag, data) => {
        if (flag) {
            setStatus(x => x + 1)
            let umData = updateMasterDataWithId(data.id, data.status)
            await saveAIConfig(umData)
            await savePublishConfig(umData)
            console.log("Gupta saveCC")
            setShowCreateEditWizard(false)
            
        } else {
            toast.error("Something went wrong: E9");
        }

        setShowLoader(false)
    }

    
    const generalTostMsgCallback = (flag, data) => {
        console.log("Gupta generalTostMsgCallback ", data)
        if (flag) {
            setStatus(x => x + 1)            //toast.success("Saved");

        } else {
            toast.error("Something went wrong: E10");
        }

        setShowLoader(false)
    }

    const updateMasterDataWithId = (id, status) => {
        let updatedMasterData = clone(masterData)
        updatedMasterData.createConfig.id = id
        updatedMasterData.aiConfigure.id = id
        updatedMasterData.publishConfig.id = id
        updatedMasterData.status = status
        setMasterData(updatedMasterData)
        return updatedMasterData
    }

    const oncloseWizard = () => {
        console.log("Hiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii")
        setShowConfirmationDialog(true)
    }

    const onCancel = () => {
        setShowConfirmationDialog(false)
    }

    const onConfirm = () => {
        setShowConfirmationDialog(false)
        setShowCreateEditWizard(false)
    }

    return (<>
        <Box>
            <Dialog.Root size="cover" placement="center" motionPreset="slide-in-bottom"
                open={showCreateEditWizard} onOpenChange={(e) => console.log("showCreateEditWizard ", e)}

            >
                <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content
                            maxH="90vh" // Prevent dialog from exceeding viewport height
                            w="90%" // Set dialog width to 50% of viewport
                            //maxW="container.md" // Optional: cap max width for larger screens
                            maxW="900px"
                            display="flex"
                            flexDirection="column"
                        >
                            <Dialog.Header>
                                <CustomStepper
                                    steps={createContentSteps}
                                    currentStep={currentStep} />
                            </Dialog.Header>
                            <Dialog.Body
                                overflowY="auto" // Make the body scrollable
                                flex="1" // Allow the body to take remaining space
                                maxH="100%" u
                            >

                                {(currentStep == STEP0 && <>
                                    <CreateContent
                                        masterData={masterData}
                                        setMasterData={setMasterData}
                                        ref={createContentRef} />
                                </>)}

                                {(currentStep == STEP1 && <>
                                    <ContentAiConfiguration
                                        masterData={masterData}
                                        setMasterData={setMasterData}
                                        ref={contentConfigurationRef} />
                                </>)}

                                {(currentStep == STEP2 && <>
                                    <ContentPublicationConfiguration
                                        masterData={masterData}
                                        setMasterData={setMasterData}
                                        ref={contentPublicationConfigurationRef} />
                                </>)}

                                {(currentStep == STEP3 && <>
                                    <ContentSummary
                                        masterData={masterData} />
                                </>)}

                                {true && (<>
                                    <Text>Current Step : {currentStep + 1} </Text>
                                    <Text>Status : {status} </Text>

                                </>)}

                            </Dialog.Body>
                            <Dialog.Footer>
                                <CustomStepperNavigator
                                    steps={createContentSteps}
                                    currentStep={currentStep}
                                    setCurrentStep={setCurrentStep}
                                    nextBtnLabel={"Next"}
                                    prevBtnLabel={"Previous"}
                                    completeBtnLabel={"Finish"}

                                    validate={handleValidateNSave}
                                    onFinish={onFinish}

                                    onClose={oncloseWizard}
                                />



                            </Dialog.Footer>

                            <CustomProgress show={showLoader}  progressLabel={"Saving"} />

                            {showConfirmationDialog && (<>
                                <Box pos="absolute" inset="0" bg="bg/80" alignContent={"center"} display="flex" justifyContent="center"
                                    alignItems="center" zIndex="10">
                                    <ConfirmationDialog
                                        show={showConfirmationDialog}
                                        setShow={setShowConfirmationDialog}
                                        header="CLOSE"
                                        description={messages.close}
                                        onClose={onCancel}
                                        onOk={onConfirm}
                                        closeLabel={CANCEL}
                                        okLabel={CONFIRM}
                                    />
                                </Box></>)}

                        </Dialog.Content>
                    </Dialog.Positioner>
                </Portal>
            </Dialog.Root>




        </Box>

    </>)
}