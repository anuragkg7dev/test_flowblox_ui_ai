import { CONTENT_TYPE, FREQUENCY_TYPE } from "@/components/client/EdgeConstant";
import { createAndUpdateBlogContainers } from "@/components/client/EdgeFunctionRepository";
import { JWT_TOKEN } from "@/components/common/constants/AppRouterConstant";
import { ACTION, APP_CONFIG_KEYS, STATUS } from "@/components/common/constants/CommonConstant";
import CustomeCloseIcon from "@/components/common/element/CustomeCloseIcon";
import CustomLine from "@/components/common/element/CustomLine";
import { getDateString } from "@/components/common/util/DateUtil";
import { joinStrings } from "@/components/common/util/StringUtil";
import { useAppConfigStore } from "@/components/store/AppConfigStore";
import {
    Button,
    Field,
    HStack,
    Text,
    VStack
} from "@chakra-ui/react";
import { memo, useEffect, useState } from "react";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import { CONTAINERS_BLOG_BASE, CONTAINERS_KEY } from "../ContainersConstant";
import { getTagsArrayFromString } from "../ContainersUtil";
import FieldContainerName from "../fields/FieldContainerName";
import FieldDayDateTimeWeek from "../fields/FieldDayDateTimeWeek";
import FieldDescription from "../fields/FieldDescription";
import FieldFrequency from "../fields/FieldFrequency";
import FieldTagEditor from "../fields/FieldTagEditor";
import FieldNumberOfArticle from "./fields/FieldNumberOfArticle";
import FieldNumberOfWords from "./fields/FieldNumberOfWords";
import FieldSourceOutput from "./fields/FieldSourceOutput";
import { validate } from "@/components/validation/ValidationUtil";
import { containerValidationSchema } from "../validation/ContainerValidation";
import { toast } from "@/components/common/Notification";
import CustomLoaderButton from "@/components/common/element/CustomLoaderButton";
import ConfirmationDialog from "@/components/common/element/ConfirmationDialog";
import { CommonMessageLabels } from "@/components/common/constants/CommonLabelConstants";


function AddEditBlogsContainer(props) {

    const setOpenDrawer = props.setOpenDrawer;
    const drawerHeader = props.drawerHeader;
    const containerMaster = props.containerMaster
    const setContainerMaster = props.setContainerMaster
    const action = props.action
    const loadContainerData = props.loadContainerData
    const setLoader = props.setLoader
    const loader = props.loader

    const [containerName, setContainerName] = useState(containerMaster?.[CONTAINERS_KEY.NAME]);
    const [description, setDescription] = useState(containerMaster?.[CONTAINERS_KEY.DESCRIPTION]);
    const [frequency, setFrequency] = useState(containerMaster?.[CONTAINERS_KEY.FREQUENCY]);
    const [sourceOutput, setSourceOutput] = useState();

    const [noOfArticle, setNoOfArticle] = useState(containerMaster?.[CONTAINERS_KEY.QUANTITY]);
    const [noOfWords, setNoOfWords] = useState(containerMaster?.[CONTAINERS_KEY.WORD_COUNT]);
    const [publishDate, setPublishDate] = useState(containerMaster?.[CONTAINERS_KEY.PUBLISH_DATE]);
    const [hour, setHour] = useState(containerMaster?.[CONTAINERS_KEY.HOUR]);
    const [min, setMin] = useState(containerMaster?.[CONTAINERS_KEY.MINUTE]);
    const [dayOfWeek, setDayOfWeek] = useState(containerMaster?.[CONTAINERS_KEY.DAY_OF_WEEK]);
    const [dayOfMonth, setDayOfMonth] = useState(containerMaster?.[CONTAINERS_KEY.DAY_OF_MONTH]);
    const [timeZone, setTimeZone] = useState((containerMaster?.[CONTAINERS_KEY.TIMEZONE]) ?? (Intl?.DateTimeFormat()?.resolvedOptions()?.timeZone ?? 'UTC'));

    const [tags, setTags] = useState(getTagsArrayFromString(containerMaster?.[CONTAINERS_KEY.TAGS]));
    const [sources, setSources] = useState(containerMaster?.[CONTAINERS_KEY.SOURCES]);


    const [error, setError] = useState({});
    const [showConfirmation, setShowsConfirmation] = useState(false);
    const [isModified, setIsModified] = useState(false);

    const { config, setConfig, updateConfig } = useAppConfigStore();

    const authkeyBearer = config[JWT_TOKEN];

    const fieldMargin = 7
    const fieldWidth = "90%"
    const labelIconSize = 20
    const cvariant = "fbloxD"

    useEffect(() => {
        console.log("AKG Loading AddEditBlogsContainer...")
    }, []);


    const validateFields = () => {
        let containerNameError = validate(containerValidationSchema, CONTAINERS_KEY.NAME, containerName)
        let descriptionError = validate(containerValidationSchema, CONTAINERS_KEY.DESCRIPTION, description)
        let tagsError = validate(containerValidationSchema, CONTAINERS_KEY.TAGS, tags)


        setError({
            ...error,
            [CONTAINERS_KEY.NAME]: containerNameError,
            [CONTAINERS_KEY.DESCRIPTION]: descriptionError,
            [CONTAINERS_KEY.TAGS]: tagsError
        })

        return containerNameError || descriptionError || tagsError
    }

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

    const validateContainerName = () => {
        console.log("validateContainerName ")
        let containerNameError = validate(containerValidationSchema, CONTAINERS_KEY.NAME, containerName)
        setError({
            ...error,
            [CONTAINERS_KEY.NAME]: containerNameError
        })
    };

    const validateContainerDescription = () => {
      
        let err = validate(containerValidationSchema, CONTAINERS_KEY.DESCRIPTION, description)
        setError({
            ...error,
            [CONTAINERS_KEY.DESCRIPTION]: err
        })
    };


    const validateContainerTags = () => {

        let err = validate(containerValidationSchema, CONTAINERS_KEY.TAGS, tags)
        setError({
            ...error,
            [CONTAINERS_KEY.TAGS]: err
        })
    };

    const updateIsModifiedState = (newValue) => {
        if (newValue !== isModified) {
            setIsModified(newValue);
        }
    };

    const onContainerNameChange = (value) => {
        updateIsModifiedState(true)
        setContainerName(value)
    }

    const onDescriptionChange = (value) => {
        updateIsModifiedState(true)
        setDescription(value)
    }

    const onTagChange = (value) => {
        updateIsModifiedState(true)
        setTags(value)
    }

    const onNoOfArticleChange = (value) => {
        updateIsModifiedState(true)
        setNoOfArticle(value)
    }

    const onNoOfWordChange = (value) => {
        updateIsModifiedState(true)
        setNoOfWords(value)
    }

    const onSourceOutPutChange = (value) => {
        updateIsModifiedState(true)
        setSourceOutput(value)
    }

    const onFrequencyUpdate = (value) => {
        updateIsModifiedState(true)
        setFrequency(value)
        if (value == FREQUENCY_TYPE.CUSTOM) {
            setPublishDate(CONTAINERS_BLOG_BASE[CONTAINERS_KEY.PUBLISH_DATE])
            setDayOfMonth(undefined)
            setDayOfWeek(undefined)
        } else if (value == FREQUENCY_TYPE.MONTHLY) {
            setDayOfMonth(CONTAINERS_BLOG_BASE[CONTAINERS_KEY.DAY_OF_MONTH])
            setPublishDate(undefined)
            setDayOfWeek(undefined)
        } else if (value == FREQUENCY_TYPE.WEEKLY) {
            setDayOfWeek(CONTAINERS_BLOG_BASE[CONTAINERS_KEY.DAY_OF_WEEK])
            setDayOfMonth(undefined)
            setPublishDate(undefined)
        }
        setHour(CONTAINERS_BLOG_BASE[CONTAINERS_KEY.HOUR])
        setMin(CONTAINERS_BLOG_BASE[CONTAINERS_KEY.MINUTE])
    };

    const onCalenderChange = (date) => {
        updateIsModifiedState(true)
        console.log(date)
        setPublishDate(date)
    };

    const onTimeChange = (time) => {
        updateIsModifiedState(true)
        let tarray = time.split(':')
        setHour(tarray[0])
        setMin(tarray[1])
    };

    const onWeekChange = (week) => {
        updateIsModifiedState(true)
        setDayOfWeek(week)
    };
    const onDayChange = (day) => {
        updateIsModifiedState(true)
        setDayOfMonth(day)
    };

    const onSubmit = () => {
        let requestPayload = updateContainerMaster()
        let errorFlag = validateFields()
        if (!errorFlag) {
            setLoader(true)
            updateConfig(APP_CONFIG_KEYS.CONTAINER_MODIFIED, true);
            createAndUpdateBlogContainers(requestPayload, onSubmitCallback, authkeyBearer)
        }

    };

    const onSubmitCallback = (flag, data) => {
        if (flag) {
            loadContainerData();
            setOpenDrawer(false)
        } else {
            toast.error("Failed to add blox !!")
            setLoader(false)
        }

    }

    const updateContainerMaster = () => {

        let tempContainerMaster = { ...containerMaster }
        tempContainerMaster[CONTAINERS_KEY.NAME] = containerName;
        tempContainerMaster[CONTAINERS_KEY.DESCRIPTION] = description;
        tempContainerMaster[CONTAINERS_KEY.CONTENT_TYPE] = CONTENT_TYPE.ARTICLE_BLOG;
        tempContainerMaster[CONTAINERS_KEY.TAGS] = joinStrings(tags);
        tempContainerMaster[CONTAINERS_KEY.QUANTITY] = Number(noOfArticle);

        tempContainerMaster[CONTAINERS_KEY.WORD_COUNT] = Number(noOfWords);
        tempContainerMaster = updateAsPerFrequency(tempContainerMaster)        
        tempContainerMaster[CONTAINERS_KEY.TIMEZONE] = timeZone;
        setContainerMaster(tempContainerMaster)
        return tempContainerMaster
    };

    const updateAsPerFrequency = (tempContainerMaster) => {
       
        tempContainerMaster[CONTAINERS_KEY.FREQUENCY] = frequency;
        if (frequency == FREQUENCY_TYPE.CUSTOM) {
            tempContainerMaster[CONTAINERS_KEY.PUBLISH_DATE] = getDateString(publishDate);
            tempContainerMaster[CONTAINERS_KEY.DAY_OF_MONTH] = undefined;
            tempContainerMaster[CONTAINERS_KEY.DAY_OF_WEEK] = undefined;
        } else if (frequency == FREQUENCY_TYPE.MONTHLY) {
            tempContainerMaster[CONTAINERS_KEY.DAY_OF_MONTH] = dayOfMonth ? String(dayOfMonth) : undefined;
            tempContainerMaster[CONTAINERS_KEY.PUBLISH_DATE] = undefined
            tempContainerMaster[CONTAINERS_KEY.DAY_OF_WEEK] = undefined;
        } else if (frequency == FREQUENCY_TYPE.WEEKLY) {
            tempContainerMaster[CONTAINERS_KEY.DAY_OF_WEEK] = dayOfWeek ? String(dayOfWeek) : undefined;
            tempContainerMaster[CONTAINERS_KEY.DAY_OF_MONTH] = undefined;
            tempContainerMaster[CONTAINERS_KEY.PUBLISH_DATE] = undefined
        } else if (frequency == FREQUENCY_TYPE.DAILY) {
            tempContainerMaster[CONTAINERS_KEY.DAY_OF_WEEK] = undefined
            tempContainerMaster[CONTAINERS_KEY.DAY_OF_MONTH] = undefined;
            tempContainerMaster[CONTAINERS_KEY.PUBLISH_DATE] = undefined
        }
        tempContainerMaster[CONTAINERS_KEY.MINUTE] = min ? String(min) : undefined;
        tempContainerMaster[CONTAINERS_KEY.HOUR] = hour ? String(hour) : undefined;

        return tempContainerMaster
    };



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
                    bg="brand.bg" // Ensure background matches your theme
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

                    <FieldContainerName
                        containerName={containerName}
                        setContainerName={onContainerNameChange}
                        cml={fieldMargin}
                        cwidth={fieldWidth}
                        cvariant={cvariant}
                        labelIconSize={labelIconSize}
                        error={error?.[CONTAINERS_KEY.NAME]}
                        validate={validateContainerName}
                    />

                    <FieldDescription
                        description={description}
                        setDescription={onDescriptionChange}
                        cml={fieldMargin}
                        cwidth={fieldWidth}
                        cvariant={cvariant}
                        labelIconSize={labelIconSize}
                        error={error?.[CONTAINERS_KEY.DESCRIPTION]}
                        validate={validateContainerDescription}
                    />

                    <FieldTagEditor
                        tags={tags}
                        setTags={onTagChange}
                        cml={fieldMargin}
                        cwidth={fieldWidth}
                        cvariant={cvariant}
                        labelIconSize={labelIconSize}
                        error={error?.[CONTAINERS_KEY.TAGS]}
                        validate={validateContainerTags}
                    />


                    <CustomLine cmt={10} />

                    <FieldNumberOfArticle
                        noOfArticle={noOfArticle}
                        setNoOfArticle={onNoOfArticleChange}
                        cml={fieldMargin}
                        cwidth={fieldWidth}
                        cvariant={cvariant}
                        labelIconSize={labelIconSize}
                    />

                    <FieldNumberOfWords
                        noOfWords={noOfWords}
                        setNoOfWords={onNoOfWordChange}
                        onFrequencyUpdate={onFrequencyUpdate}
                        cml={fieldMargin}
                        cwidth={fieldWidth}
                        cvariant={cvariant}
                        labelIconSize={labelIconSize}
                    />

                    <FieldFrequency
                        frequency={frequency}
                        setFrequency={setFrequency}
                        onFrequencyUpdate={onFrequencyUpdate}
                        cml={fieldMargin}
                        cwidth={fieldWidth}
                        cvariant={cvariant}
                        labelIconSize={labelIconSize}
                    />

                    <FieldDayDateTimeWeek
                        frequency={frequency}

                        onCalenderChange={onCalenderChange}
                        onTimeChange={onTimeChange}
                        onWeekChange={onWeekChange}
                        onDayChange={onDayChange}

                        defaultDate={publishDate} // MM/dd/yyyy
                        defaultHour={hour}
                        defaultMinute={min}
                        defaultWeek={dayOfWeek}
                        defaultDay={dayOfMonth}
                        defaultTimeZone={timeZone}

                        cml={fieldMargin}
                        cwidth={fieldWidth}
                        cvariant={cvariant}
                        labelIconSize={labelIconSize}
                    />
                    {sources && sources.length > 0 && (
                        <FieldSourceOutput
                            sourceOutput={sourceOutput}
                            setSourceOutput={onSourceOutPutChange}
                            cml={fieldMargin}
                            cwidth={fieldWidth}
                            cvariant={cvariant}
                            labelIconSize={labelIconSize}
                        />
                    )}

                    <Field.Root width="100%" color="brand.pureWhiteTxt" fontSize={{ base: "sm", md: "md" }} mt={6} >
                        <Field.Label>
                            <HStack>
                                <HiOutlineExclamationTriangle size={labelIconSize} color="inherit" />
                                <Text>Manage Blox</Text>
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

                            {action == ACTION.EDIT && (<>
                                <Button
                                    mt={6}
                                    variant={"delete"}
                                    width="33%"
                                    fontSize={{ base: "sm", md: "md" }}
                                    onClick={() => { }}
                                >
                                    Delete
                                </Button>
                            </>)}

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

export default memo(AddEditBlogsContainer);