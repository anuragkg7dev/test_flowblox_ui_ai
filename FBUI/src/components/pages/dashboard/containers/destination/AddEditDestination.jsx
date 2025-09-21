import { CONTENT_TYPE, DESTINATION_TYPE } from "@/components/client/EdgeConstant";
import { createAndUpdateSourceAndDestination, removeSourceDestination } from "@/components/client/EdgeFunctionRepository";
import { ACTION, STATUS } from "@/components/common/constants/CommonConstant";
import { CommonMessageLabels } from "@/components/common/constants/CommonLabelConstants";
import ConfirmationDialog from "@/components/common/element/ConfirmationDialog";
import CustomeCloseIcon from "@/components/common/element/CustomeCloseIcon";
import CustomLoaderButton from "@/components/common/element/CustomLoaderButton";
import CustomSelect from "@/components/common/element/CustomSelect";
import { toast } from "@/components/common/Notification";
import { useAuthStore } from "@/components/store/AuthStateStore";
import { validate } from "@/components/validation/ValidationUtil";
import {
    Field,
    HStack,
    Input,
    Text,
    Textarea,
    VStack
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { GiOnTarget } from "react-icons/gi";
import { HiOutlineExclamationTriangle, HiOutlinePencilSquare } from "react-icons/hi2";
import { MdOutlineShare } from "react-icons/md";
import { sourceOutputOption } from "../../DashboardConstant";
import { SOURCE_DESTINATION_KEY } from "../ContainersConstant";
import { destinationValidationSchema } from "../validation/ContainerValidation";
import SquarespaceDetails from "./squarespace/SquarespaceDetails";
import WixDetails from "./wix/WixDetails";
import WordpressDetails from "./wordpress/WordpressDetails";


export default function AddEditDestination(props) {

    const setOpenDrawer = props.setOpenDrawer;
    const drawerHeader = props.drawerHeader;
    const destinationMaster = props.destinationMaster
    const setDestinationMaster = props.setDestinationMaster
    const action = props.action
    const loader = props.loader
    const setLoader = props.setLoader
    const containerId = props.containerId
    const loadDestinationData = props.loadDestinationData
    console.log('AKG ', destinationMaster)
    const [title, setTitle] = useState(destinationMaster[SOURCE_DESTINATION_KEY.TITLE]);
    const [description, setDescription] = useState(destinationMaster[SOURCE_DESTINATION_KEY.DESCRIPTION]);
    const [type, setType] = useState(destinationMaster[SOURCE_DESTINATION_KEY.TYPE]);
    const [config, setConfig] = useState(destinationMaster[SOURCE_DESTINATION_KEY.CONFIG] ?? {});
    const [status, setStatus] = useState(destinationMaster[SOURCE_DESTINATION_KEY.STATUS]);

    const [show, setShow] = useState({});

    const [error, setError] = useState({});
    const [showConfirmation, setShowsConfirmation] = useState(false);
    const [showDeleteConfirmation, setShowsDeleteConfirmation] = useState(false);
    const [isModified, setIsModified] = useState(false);
    const [deleteLoader, setDeleteLoader] = useState(false);

    const { jwt: authkeyBearer } = useAuthStore();

    const fieldMargin = 7
    const fieldWidth = "90%"
    const labelIconSize = 20
    const cvariant = "fbloxD"

    console.log('akg type', type)

    useEffect(() => {
        updateShowSource(type)
    }, []);


    const onConfirmationDelete = () => {
        const payload = {}
        payload[SOURCE_DESTINATION_KEY.KIND] = CONTENT_TYPE.DESTINATION
        payload[SOURCE_DESTINATION_KEY.ID] = destinationMaster?.[SOURCE_DESTINATION_KEY.ID]
        setDeleteLoader(true)
        setShowsDeleteConfirmation(false)
        removeSourceDestination(payload, onDeleteCallback, authkeyBearer)

    };

    const onDeleteCallback = (flag, data) => {

        if (flag) {
            setDeleteLoader(false)
            setLoader(true)
            setOpenDrawer(false)
            loadDestinationData?.();
            toast.success("Deleted");
        } else {
            setLoader?.(false);
            toast.error("Failed to add source !!");
        }
    };

    const onClose = () => {
        if (isModified) {
            setShowsConfirmation(true)
        } else {
            setOpenDrawer(false)
        }
    };

    const onConfirmationOk = () => {
        setShowsConfirmation(false)
        setOpenDrawer(false)
    };

    const onSubmit = () => {

        let requestPayload = updateMaster()
        let errorFlag = validateFields()
        if (!errorFlag) {
            setLoader?.(true)

            createAndUpdateSourceAndDestination(requestPayload, onSubmitCallback, authkeyBearer)
        }

    };

    const onSubmitCallback = (flag, data) => {

        if (flag) {
            setOpenDrawer(false)
        } else {
            setLoader?.(false)
            toast.error("Failed to add destination !!")
        }
        loadDestinationData?.();
    }

    const updateMaster = () => {
        let tempDestination = { ...destinationMaster }
        tempDestination[SOURCE_DESTINATION_KEY.TITLE] = title
        tempDestination[SOURCE_DESTINATION_KEY.DESCRIPTION] = description
        tempDestination[SOURCE_DESTINATION_KEY.TYPE] = type
        tempDestination[SOURCE_DESTINATION_KEY.STATUS] = status
        tempDestination[SOURCE_DESTINATION_KEY.CONFIG] = config
        tempDestination[SOURCE_DESTINATION_KEY.CONTAINERS_ID] = containerId
        tempDestination[SOURCE_DESTINATION_KEY.KIND] = CONTENT_TYPE.DESTINATION
        return tempDestination
    };


    const updateShowSource = (sourceType) => {
        if (!sourceType) {
            setShow({ [SOURCE_DESTINATION_KEY.URL]: false })

        } else if (sourceType == DESTINATION_TYPE.SQUARESPACE || sourceType == DESTINATION_TYPE.WIX) {
            setShow({ ...show, [SOURCE_DESTINATION_KEY.URL]: true })

        } else {
            setShow({ ...show, [SOURCE_DESTINATION_KEY.URL]: false })
        }
    };


    const validateName = () => {

        let nameError = validate(destinationValidationSchema, SOURCE_DESTINATION_KEY.TITLE, title)
        setError({
            ...error,
            [SOURCE_DESTINATION_KEY.NAME]: nameError
        })
    };

    const validateDescription = () => {

        let err = validate(destinationValidationSchema, SOURCE_DESTINATION_KEY.DESCRIPTION, description)
        setError({
            ...error,
            [SOURCE_DESTINATION_KEY.DESCRIPTION]: err
        })
    };

    const validateUrl = () => {
        if (show?.[SOURCE_DESTINATION_KEY.URL]) {


            let err = validate(destinationValidationSchema, SOURCE_DESTINATION_KEY.URL, config?.[SOURCE_DESTINATION_KEY.URL])
            setError({
                ...error,
                [SOURCE_DESTINATION_KEY.URL]: err
            })
        } else {
            setError({
                ...error,
                [SOURCE_DESTINATION_KEY.URL]: undefined
            })
        }
    }

    const updateIsModifiedState = (newValue) => {
        if (newValue !== isModified) {
            setIsModified(newValue);
        }
    };

    const onTitleChange = (value) => {
        updateIsModifiedState(true)
        setTitle(value)
    }

    const onDecriptionChange = (value) => {
        updateIsModifiedState(true)
        setDescription(value)
    }

    const onSourceOutputChange = (value) => {
        updateIsModifiedState(true)
        setType(value)
        updateShowSource(value)
    };

    const updateConfig = (key, value) => {
        setConfig?.(prev => ({ ...prev, [key]: value }));
    }


    const validateFields = () => {

        let nameError = validate(destinationValidationSchema, SOURCE_DESTINATION_KEY.TITLE, title)
        let descriptionError = validate(destinationValidationSchema, SOURCE_DESTINATION_KEY.DESCRIPTION, description)
        //let typeError = validate(destinationValidationSchema, SOURCE_DESTINATION_KEY.TYPE, config[SOURCE_DESTINATION_KEY.TYPE])

        let flag = nameError || descriptionError

        setError({
            ...error,
            [SOURCE_DESTINATION_KEY.TITLE]: nameError,
            [SOURCE_DESTINATION_KEY.DESCRIPTION]: descriptionError,
        })

        if (type == DESTINATION_TYPE.SQUARESPACE) {
            let urlError = validate(destinationValidationSchema, SOURCE_DESTINATION_KEY.URL, config[SOURCE_DESTINATION_KEY.URL])
            flag = flag || urlError
        }


        return flag
    }

    return (
        <>

            <VStack align="stretch" width="100%" mb={4}>
                <HStack
                    key="aeHeader"
                    justifyContent="space-between"
                    width="100%"
                    height={labelIconSize}
                    borderBottom="0.1px solid"
                    borderBottomColor="brand.greyBrandBorder"
                    // position="sticky"
                    top="0"
                    zIndex="10"
                    bg="brand.bg"


                >
                    <Text
                        paddingLeft={2}
                        ml={3}
                        color="brand.pureWhiteTxt"
                        textAlign="left"
                        fontWeight="500"
                        fontSize="16px"
                    >
                        {drawerHeader}
                    </Text>
                    <CustomeCloseIcon onClose={onClose} />
                </HStack>
                <VStack ml={4} mr={4} mt={10}>

                    <Field.Root width="100%" color="brand.pureWhiteTxt" fontSize={{ base: "sm", md: "md" }} mb={6} invalid={error?.[SOURCE_DESTINATION_KEY.TITLE]}>
                        <Field.Label>
                            <HStack>
                                <GiOnTarget size={labelIconSize} color="inherit" />
                                <Text>Destination Name</Text>
                            </HStack>
                        </Field.Label>
                        <Input
                            placeholder="Destination Name"
                            onChange={(e) => onTitleChange(e.target.value)}
                            mb={2}
                            variant={cvariant}
                            value={title}
                            ml={fieldMargin}
                            width={fieldWidth}
                            onBlur={() => validateName?.()}
                        />
                        <Field.ErrorText fontSize={{ base: "xs", md: "sm" }}>{error?.[SOURCE_DESTINATION_KEY.TITLE]}</Field.ErrorText>
                    </Field.Root>

                    <Field.Root width="100%" color="brand.pureWhiteTxt" fontSize={{ base: "sm", md: "md" }} mb={6} invalid={error?.[SOURCE_DESTINATION_KEY.DESCRIPTION]}>
                        <Field.Label>
                            <HStack>
                                <HiOutlinePencilSquare size={labelIconSize} color="inherit" />
                                <Text>Description</Text>
                            </HStack>
                        </Field.Label>

                        <Textarea
                            width={fieldWidth}
                            placeholder="Start typing..."
                            variant={cvariant}
                            ml={fieldMargin}
                            value={description}
                            onChange={(e) => onDecriptionChange(e.target.value)}
                            onBlur={() => validateDescription?.()} />

                        <Field.ErrorText fontSize={{ base: "xs", md: "sm" }}>{error?.[SOURCE_DESTINATION_KEY.DESCRIPTION]}</Field.ErrorText>
                    </Field.Root>


                    <Field.Root width="100%" color="brand.pureWhiteTxt" fontSize={{ base: "sm", md: "md" }} mb={6} invalid={error?.[SOURCE_DESTINATION_KEY.TYPE]} >
                        <Field.Label>
                            <HStack>
                                <MdOutlineShare size={labelIconSize} color="inherit" />
                                <Text>Source Output</Text>
                            </HStack>
                        </Field.Label>
                        <CustomSelect
                            sdata={sourceOutputOption}
                            slabel=""
                            splaceholder="Select"
                            defaultSelected={type}
                            cselectCallback={(data) => onSourceOutputChange(data)}
                            cml={fieldMargin}
                            cwidth={fieldWidth} />
                        <Field.ErrorText fontSize={{ base: "xs", md: "sm" }}>{error?.[SOURCE_DESTINATION_KEY.TYPE]}</Field.ErrorText>
                    </Field.Root>

                    {type && type == [DESTINATION_TYPE.SQUARESPACE] && (<>
                        <SquarespaceDetails
                            config={config}
                            updateConfig={updateConfig}
                            cml={fieldMargin}
                            cwidth={fieldWidth}
                            cvariant={cvariant}
                            labelIconSize={labelIconSize}
                        //error={error?.[SOURCE_DESTINATION_KEY.URL]}
                        //validate={validateUrl}
                        />
                    </>)}

                    {type && type == [DESTINATION_TYPE.WIX] && (<>
                        <WixDetails
                            config={config}
                            updateConfig={updateConfig}
                            cml={fieldMargin}
                            cwidth={fieldWidth}
                            cvariant={cvariant}
                            labelIconSize={labelIconSize}
                        />
                    </>)}

                    {type && type == [DESTINATION_TYPE.WORDPRESS] && (<>
                        <WordpressDetails
                            config={config}
                            updateConfig={updateConfig}
                            cml={fieldMargin}
                            cwidth={fieldWidth}
                            cvariant={cvariant}
                            labelIconSize={labelIconSize}
                        />
                    </>)}

                    <Field.Root width="100%" color="brand.pureWhiteTxt" fontSize={{ base: "sm", md: "md" }} mt={6} >
                        <Field.Label>
                            <HStack>
                                <HiOutlineExclamationTriangle size={labelIconSize} color="inherit" />
                                <Text>Manage Destination</Text>
                            </HStack>
                        </Field.Label>
                        <HStack width={fieldWidth} ml={fieldMargin} justify={"space-between"}>



                            <CustomLoaderButton
                                cwidth="33%"
                                cmt={6}
                                cvariant={"fblox"}
                                cloadingText={action == ACTION.ADD ? 'ADD' : 'UPDATE'}
                                loader={loader}
                                onClickBtn={onSubmit}
                                clabel={action == ACTION.ADD ? 'ADD' : 'UPDATE'}
                            />

                            {action == ACTION.EDIT && (
                                <CustomLoaderButton
                                    cwidth="33%"
                                    cmt={6}
                                    cvariant={"delete"}
                                    cloadingText={'DELETE'}
                                    loader={deleteLoader}
                                    onClickBtn={() => { setShowsDeleteConfirmation(true) }}
                                    clabel={'DELETE'}
                                />
                            )}

                        </HStack>

                    </Field.Root>

                </VStack>

            </VStack>

            <ConfirmationDialog
                show={showConfirmation}
                setShow={setShowsConfirmation}
                header={CommonMessageLabels.CLOSE_HEADING}
                description={CommonMessageLabels.CLOSE_DESCRIPTION}
                onOk={onConfirmationOk}
                closeLabel={CommonMessageLabels.NO}
                okLabel={CommonMessageLabels.YES}
                status={STATUS.WARNING}
            />
            <ConfirmationDialog
                show={showDeleteConfirmation}
                setShow={setShowsDeleteConfirmation}
                header={CommonMessageLabels.DELETE_HEADING}
                description={CommonMessageLabels.DELETE_DESCRIPTION}
                onOk={onConfirmationDelete}
                closeLabel={CommonMessageLabels.CANCEL}
                okLabel={CommonMessageLabels.DELETE}
                status={STATUS.WARNING}
            />
        </>
    );

}
