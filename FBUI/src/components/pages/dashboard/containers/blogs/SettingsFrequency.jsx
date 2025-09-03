import { APP_CONFIG_KEYS } from "@/components/common/constants/CommonConstant";
import CustomLine from "@/components/common/element/CustomLine";
import { useAppConfigStore } from "@/components/store/AppConfigStore";
import { Button, Field, HStack, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { LuTriangleAlert } from "react-icons/lu";
import { CONTAINERS_BLOG_BASE, CONTAINERS_KEY } from "../ContainersConstant";
import { getBlogContainerFromresponse, getTagsArrayFromString } from "../ContainersUtil";
import FieldContainerName from "../fields/FieldContainerName";
import FieldDayDateTimeWeek from "../fields/FieldDayDateTimeWeek";
import FieldDescription from "../fields/FieldDescription";
import FieldFrequency from "../fields/FieldFrequency";
import FieldTagEditor from "../fields/FieldTagEditor";
import CommonHeader from "../headers/CommonHeader";
import FieldNumberOfArticle from "./fields/FieldNumberOfArticle";
import FieldNumberOfWords from "./fields/FieldNumberOfWords";
import FieldSourceOutput from "./fields/FieldSourceOutput";
import { validate } from "@/components/validation/ValidationUtil";
import { containerValidationSchema } from "../validation/ContainerValidation";
import { CONTENT_TYPE, FREQUENCY_TYPE } from "@/components/client/EdgeConstant";
import { toast } from "@/components/common/Notification";
import { getDateString } from "@/components/common/util/DateUtil";
import CustomLoaderButton from "@/components/common/element/CustomLoaderButton";
import { joinStrings } from "@/components/common/util/StringUtil";
import { createAndUpdateBlogContainers } from "@/components/client/EdgeFunctionRepository";

export default function SettingsFrequency(props) {

  const isModified = props.isModified
  const setIsModified = props.setIsModified

  const { config: xconfig, setConfig: setXConfig, updateConfig } = useAppConfigStore();
  let container = xconfig[APP_CONFIG_KEYS.CONTAINER_DATA]
  const authkeyBearer = xconfig[APP_CONFIG_KEYS.JWT_TOKEN];

  const [containerName, setContainerName] = useState(container?.[CONTAINERS_KEY.NAME]);
  const [description, setDescription] = useState(container?.[CONTAINERS_KEY.DESCRIPTION]);
  const [frequency, setFrequency] = useState(container?.[CONTAINERS_KEY.FREQUENCY]);
  const [sourceOutput, setSourceOutput] = useState();
  const [tags, setTags] = useState(getTagsArrayFromString(container?.[CONTAINERS_KEY.TAGS]))

  const [noOfArticle, setNoOfArticle] = useState(container?.[CONTAINERS_KEY.QUANTITY]);
  const [noOfWords, setNoOfWords] = useState(container?.[CONTAINERS_KEY.WORD_COUNT]);

  const [publishDate, setPublishDate] = useState(container?.[CONTAINERS_KEY.PUBLISH_DATE]);
  const [hour, setHour] = useState(container?.[CONTAINERS_KEY.HOUR]);
  const [min, setMin] = useState(container?.[CONTAINERS_KEY.MINUTE]);
  const [dayOfWeek, setDayOfWeek] = useState(container?.[CONTAINERS_KEY.DAY_OF_WEEK]);
  const [dayOfMonth, setDayOfMonth] = useState(container?.[CONTAINERS_KEY.DAY_OF_MONTH]);
  const [timeZone, setTimeZone] = useState((container?.[CONTAINERS_KEY.TIMEZONE]) ?? (Intl?.DateTimeFormat()?.resolvedOptions()?.timeZone ?? 'UTC'));
  const [sources, setSources] = useState(container?.[CONTAINERS_KEY.SOURCES]);

  let [loader, setLoader] = useState(false);
  const [error, setError] = useState({});

  const fieldMargin = 7;
  const fieldWidth = "90%";
  const labelIconSize = 20;
  const cvariant = "fbloxD";
  const vstackWidth = { base: "100%", md: "30%" };

  const onContainerNameChange = (value) => {
    setIsModified(true)
    setContainerName(value)
  }

  const onDescriptionChange = (value) => {
    setIsModified(true)
    setDescription(value)
  }

  const onTagChange = (value) => {
    setIsModified(true)
    setTags(value)
  }

  const onNoOfArticleChange = (value) => {
    setIsModified(true)
    setNoOfArticle(value)
  }

  const onNoOfWordsChange = (value) => {
    setIsModified(true)
    setNoOfWords(value)
  }

  const onSourceOutputChange = (value) => {
    setIsModified(true)
    setSourceOutput(value)
  }

  const onFrequencyUpdate = (value) => {
    setIsModified(true)
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
    setIsModified(true)
    setPublishDate(date)
  };

  const onTimeChange = (time) => {
    setIsModified(true)
    let tarray = time.split(':')
    setHour(tarray[0])
    setMin(tarray[1])
  };

  const onWeekChange = (week) => {
    setIsModified(true)
    setDayOfWeek(week)
  };
  const onDayChange = (day) => {
    setIsModified(true)
    setDayOfMonth(day)
  };

  const onSubmit = () => {
    let requestPayload = updateContainerMaster()
    let errorFlag = validateFields()
    if (!errorFlag) {
      setLoader(true)
      createAndUpdateBlogContainers(requestPayload, onSubmitCallback, authkeyBearer)
    }

  };

  const onSubmitCallback = (flag, data) => {
    if (flag) {
      setXConfig({
        ...xconfig,
        [APP_CONFIG_KEYS.CONTAINER_DATA]: getBlogContainerFromresponse(data), // Update current container data in context
        [APP_CONFIG_KEYS.CONTAINER_MODIFIED]: true  // This will reload the container list data
      });
      toast.success("Updated")
    } else {
      toast.error("Failed to add blox !!")
    }
    setLoader(false)

  }

  const validateContainerName = () => {
  
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

  const updateContainerMaster = () => {

    let tempContainerMaster = { ...container }
    tempContainerMaster[CONTAINERS_KEY.NAME] = containerName;
    tempContainerMaster[CONTAINERS_KEY.DESCRIPTION] = description;
    tempContainerMaster[CONTAINERS_KEY.CONTENT_TYPE] = CONTENT_TYPE.ARTICLE_BLOG;
    tempContainerMaster[CONTAINERS_KEY.TAGS] = joinStrings(tags);
    tempContainerMaster[CONTAINERS_KEY.QUANTITY] = Number(noOfArticle); 
    tempContainerMaster[CONTAINERS_KEY.WORD_COUNT] = Number(noOfWords);   
    tempContainerMaster = updateAsPerFrequency(tempContainerMaster)
    tempContainerMaster[CONTAINERS_KEY.TIMEZONE] = timeZone;
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
        }else if (frequency == FREQUENCY_TYPE.DAILY) {
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
      <CommonHeader cboxSize={7} cwidth={{ base: "100%", md: "82%" }} showIcon={true} iconType={"container"} cmt={4} cpl={4} name="Container Details" />

      <VStack
        w="100%" // Full viewport width
        display="flex"
        justifyContent="center"
        alignItems="center"
        p={4} // Optional padding for better spacing
      >
        <VStack
          key="main"
          align="center"
          justify="center"
          w={{ base: "100%", md: "80%" }} // Responsive width
          spacing={4}
        >
          <HStack
            width={"100%"}
            align={"flex-start"}
            justify={"space-between"}
            spacing={{ base: 4, md: 8 }}
            flexDirection={{ base: "column", md: "row" }}
          >
            <VStack width={vstackWidth} height={"100%"} align={"start"} mt={6}>
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
            </VStack>

            <VStack width={vstackWidth} height={"100%"} align={"start"} mt={6}>
              <FieldDescription
                description={description}
                setDescription={onDescriptionChange}
                cml={fieldMargin}
                cwidth={"100%"}
                cvariant={cvariant}
                labelIconSize={labelIconSize}
                error={error?.[CONTAINERS_KEY.DESCRIPTION]}
                validate={validateContainerDescription}
              />
            </VStack>
            <VStack width={vstackWidth} height={"100%"} align={"start"} mt={6}>
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
            </VStack>
          </HStack>
        </VStack>
      </VStack>

      <CustomLine />

      <CommonHeader cboxSize={7} cwidth={{ base: "100%", md: "82%" }} showIcon={true} iconType={"frequency"} cmt={4} cpl={4} name="Frequency Settings" />

      <VStack w="100%" // Full viewport width
        display="flex"
        justifyContent="center"
        alignItems="center"
        p={4} >



        <VStack
          key="main"
          align="center"
          justify="center"
          w={{ base: "100%", md: "80%" }} // Responsive width
          spacing={4}
        >
          <HStack
            width={"100%"}
            align={"flex-start"}
            justify={"space-between"}
            spacing={{ base: 4, md: 8 }}
            flexDirection={{ base: "column", md: "row" }}
          >
            <VStack key="tag" width={vstackWidth} height={"100%"} align={"start"} >
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
                setNoOfWords={onNoOfWordsChange}
                cml={fieldMargin}
                cwidth={fieldWidth}
                cvariant={cvariant}
                labelIconSize={labelIconSize}
              />

            </VStack>
            <VStack key="articleCountFrq" width={vstackWidth}>


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
            </VStack>

            <VStack key="dateNSource" width={vstackWidth}>


              {sources && sources.length > 0 && (
                <FieldSourceOutput
                  sourceOutput={sourceOutput}
                  setSourceOutput={onSourceOutputChange}
                  cml={fieldMargin}
                  cwidth={fieldWidth}
                  cvariant={cvariant}
                  labelIconSize={labelIconSize}
                />
              )}

              <Field.Root width="100%" color="brand.pureWhiteTxt" fontSize={{ base: "sm", md: "md" }} mt={6}>
                <Field.Label>
                  <HStack>
                    <LuTriangleAlert size={labelIconSize} color="inherit" />
                    <Text>Set Changes</Text>
                  </HStack>
                </Field.Label>
                <HStack ml={fieldMargin} justify={"flex-start"} color="brand.pureWhiteTxt" fontSize={{ base: "sm", md: "md" }}  >


                  <Button
                    height={"30px"}
                    variant={"fbloxD"}
                    fontSize={{ base: "sm", md: "md" }}
                    onClick={() => { }}
                  >
                    Cancel
                  </Button>

                  <CustomLoaderButton
                    cheight={"30px"}
                    cvariant={"fblox"}
                    cloadingText={"Set"}
                    loader={loader}
                    onClickBtn={onSubmit}
                    clabel={'set'}
                  />

                </HStack>
              </Field.Root>

            </VStack>
          </HStack>
        </VStack>
      </VStack>



    </>
  );
}
