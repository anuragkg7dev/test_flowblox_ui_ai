import { CONTENT_TYPE } from "@/components/client/EdgeConstant";
import { createAndUpdateSourceAndDestination } from "@/components/client/EdgeFunctionRepository";
import { JWT_TOKEN } from "@/components/common/constants/AppRouterConstant";
import { ACTION, STATUS } from "@/components/common/constants/CommonConstant";
import CustomeCloseIcon from "@/components/common/element/CustomeCloseIcon";
import CustomSelect from "@/components/common/element/CustomSelect";
import { toast } from "@/components/common/Notification";
import { useAppConfigStore } from "@/components/store/AppConfigStore";
import { validate } from "@/components/validation/ValidationUtil";
import {
    Button,
    Field,
    HStack,
    Input,
    Text,
    Textarea,
    VStack
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FiCodesandbox } from "react-icons/fi";
import { HiOutlineExclamationTriangle, HiOutlinePencilSquare } from "react-icons/hi2";
import { MdOutlineShare } from "react-icons/md";
import { SiCurl } from "react-icons/si";
import { sourceOption } from "../../DashboardConstant";
import { SOURCE_DESTINATION_KEY } from "../ContainersConstant";
import FieldUrl from "../fields/FieldUrl";
import { sourceValidationSchema } from "../validation/ContainerValidation";
import CustomLoaderButton from "@/components/common/element/CustomLoaderButton";
import { CommonMessageLabels } from "@/components/common/constants/CommonLabelConstants";
import ConfirmationDialog from "@/components/common/element/ConfirmationDialog";

export default function AddEditSource(props) {
    const setOpenDrawer = props.setOpenDrawer;
    const drawerHeader = props.drawerHeader;
    const sourceMaster = props.sourceMaster;
    const setSourceMaster = props.setSourceMaster;
    const action = props.action;
    const loader = props.loader;
    const setLoader = props.setLoader;
    const containerId = props.containerId;
    const loadSourceData = props.loadSourceData;

    const [title, setTitle] = useState(sourceMaster?.[SOURCE_DESTINATION_KEY.TITLE] || '');
    const [description, setDescription] = useState(sourceMaster?.[SOURCE_DESTINATION_KEY.DESCRIPTION] || '');
    const [config, setConfig] = useState(sourceMaster[SOURCE_DESTINATION_KEY.CONFIG]);
    const [type, setType] = useState(sourceMaster?.[SOURCE_DESTINATION_KEY.TYPE] || '');
    const [status, setStatus] = useState(sourceMaster?.[SOURCE_DESTINATION_KEY.STATUS] || '');
    const [error, setError] = useState({});
    const [showConfirmation, setShowsConfirmation] = useState(false);
    const [isModified, setIsModified] = useState(false);

    const xconfig = useAppConfigStore((state) => state.config);
    const authkeyBearer = xconfig[JWT_TOKEN];

    const fieldMargin = 7;
    const fieldWidth = "90%";
    const labelIconSize = 20;
    const cvariant = "fbloxD";



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
        let requestPayload = updateMaster();
        let errorFlag = validateFields();
        if (!errorFlag) {
            setLoader?.(true);
    
            createAndUpdateSourceAndDestination(requestPayload, onSubmitCallback, authkeyBearer);
        }
    };

    const onSubmitCallback = (flag, data) => {
       
        if (flag) {
            setOpenDrawer(false);
            loadSourceData?.();
        } else {
            setLoader?.(false);
            toast.error("Failed to add source !!");
        }
    };

    const updateMaster = () => {
        let tempSource = { ...sourceMaster };
        tempSource[SOURCE_DESTINATION_KEY.TITLE] = title;
        tempSource[SOURCE_DESTINATION_KEY.DESCRIPTION] = description;
        tempSource[SOURCE_DESTINATION_KEY.CONFIG] = config;
        tempSource[SOURCE_DESTINATION_KEY.TYPE] = type;
        tempSource[SOURCE_DESTINATION_KEY.STATUS] = status;
        tempSource[SOURCE_DESTINATION_KEY.CONTAINERS_ID] = containerId;
        tempSource[SOURCE_DESTINATION_KEY.KIND] = CONTENT_TYPE.SOURCE;
        return tempSource;
    };

    const validateName = () => {
        let nameError = validate(sourceValidationSchema, SOURCE_DESTINATION_KEY.TITLE, title);
        setError({
            ...error,
            [SOURCE_DESTINATION_KEY.TITLE]: nameError
        });
    };

    const validateDescription = () => {
        let err = validate(sourceValidationSchema, SOURCE_DESTINATION_KEY.DESCRIPTION, description);
        setError({
            ...error,
            [SOURCE_DESTINATION_KEY.DESCRIPTION]: err
        });
    };

    const validateUrl = () => {
     
        let err = validate(sourceValidationSchema, SOURCE_DESTINATION_KEY.URL, config?.[SOURCE_DESTINATION_KEY.URL])
        setError({
            ...error,
            [SOURCE_DESTINATION_KEY.URL]: err
        })
    }

    const validateFields = () => {
        let nameError = validate(sourceValidationSchema, SOURCE_DESTINATION_KEY.TITLE, title);
        let descriptionError = validate(sourceValidationSchema, SOURCE_DESTINATION_KEY.DESCRIPTION, description);
        //let urlError = validate(sourceValidationSchema, SOURCE_DESTINATION_KEY.URL, url);

        let flag = nameError || descriptionError;

        setError({
            ...error,
            [SOURCE_DESTINATION_KEY.TITLE]: nameError,
            [SOURCE_DESTINATION_KEY.DESCRIPTION]: descriptionError,
        });

        return flag;
    };

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

    const onSourceTypeChange = (value) => {
        updateIsModifiedState(true)
        setType(value)       
    };

    const onUrlChange = (value) => {
        updateIsModifiedState(true)
        setConfig({ ...config, [SOURCE_DESTINATION_KEY.URL]: value })
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
                                <FiCodesandbox size={labelIconSize} color="inherit" />
                                <Text>Source Name</Text>
                            </HStack>
                        </Field.Label>
                        <Input
                            placeholder="Source Name"
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
                            onBlur={() => validateDescription?.()}
                        />
                        <Field.ErrorText fontSize={{ base: "xs", md: "sm" }}>{error?.[SOURCE_DESTINATION_KEY.DESCRIPTION]}</Field.ErrorText>
                    </Field.Root>

                    <Field.Root width="100%" color="brand.pureWhiteTxt" fontSize={{ base: "sm", md: "md" }} mb={6} invalid={error?.[SOURCE_DESTINATION_KEY.TYPE]}>
                        <Field.Label>
                            <HStack>
                                <MdOutlineShare size={labelIconSize} color="inherit" />
                                <Text>Type</Text>
                            </HStack>
                        </Field.Label>
                        <CustomSelect
                            sdata={sourceOption}
                            slabel=""
                            splaceholder="Select"
                            defaultSelected={type}
                            cselectCallback={(data) => onSourceTypeChange(data)}
                            cml={fieldMargin}
                            cwidth={fieldWidth}
                        />
                        <Field.ErrorText fontSize={{ base: "xs", md: "sm" }}>{error?.[SOURCE_DESTINATION_KEY.TYPE]}</Field.ErrorText>
                    </Field.Root>

                    <FieldUrl
                        url={config?.[SOURCE_DESTINATION_KEY.URL]}
                        setUrl={onUrlChange}
                        cml={fieldMargin}
                        cwidth={fieldWidth}
                        cvariant={cvariant}
                        labelIconSize={labelIconSize}
                        error={error?.[SOURCE_DESTINATION_KEY.URL]}
                        validate={validateUrl}
                    />

                    <Field.Root width="100%" color="brand.pureWhiteTxt" fontSize={{ base: "sm", md: "md" }} mt={6}>
                        <Field.Label>
                            <HStack>
                                <HiOutlineExclamationTriangle size={labelIconSize} color="inherit" />
                                <Text>Manage Source</Text>
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
                                <Button
                                    mt={6}
                                    variant={"delete"}
                                    width="33%"
                                    fontSize={{ base: "sm", md: "md" }}
                                    onClick={() => { }}
                                >
                                    Delete
                                </Button>
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
        </>
    );
}