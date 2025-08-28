import { Button, Field, HStack, Separator, Text, VStack } from "@chakra-ui/react";
import CommonHeader from "../headers/CommonHeader";
import FieldToneOfVoice from "./fields/FieldToneOfVoice";
import FieldStrictness from "./fields/FieldStrictness";
import FieldAIEngine from "./fields/FieldAIEngine";
import FieldAiModel from "./fields/FieldAiModel";
import { useState } from "react";
import CustomLine from "@/components/common/element/CustomLine";
import FieldAIWritterEditor from "./fields/FieldAIWritterEditor";
import { LuTriangleAlert } from "react-icons/lu";
import { useAppConfigStore } from "@/components/store/AppConfigStore";
import { APP_CONFIG_KEYS } from "@/components/common/constants/CommonConstant";
import { CONTAINERS_KEY } from "../ContainersConstant";
import CustomLoaderButton from "@/components/common/element/CustomLoaderButton";
import { containerValidationSchema } from "../validation/ContainerValidation";
import { validate } from "@/components/validation/ValidationUtil";
import { createAndUpdateBlogContainers } from "@/components/client/EdgeFunctionRepository";
import { toast } from "@/components/common/Notification";
import { JWT_TOKEN } from "@/components/common/constants/AppRouterConstant";
import { getBlogContainerFromresponse } from "../ContainersUtil";

export default function SettingsAIAgent(props) {

  const isModified = props.isModified
  const setIsModified = props.setIsModified

  const { config: xconfig, setConfig: setXConfig, updateConfig } = useAppConfigStore();
  let container = xconfig[APP_CONFIG_KEYS.CONTAINER_DATA];
  const authkeyBearer = xconfig[JWT_TOKEN];

  let [toneOfVoice, setToneOfVoice] = useState(container[CONTAINERS_KEY.TONE_OF_VOICE]);
  let [strictness, setStrictness] = useState(container[CONTAINERS_KEY.STRICTNESS]);
  let [aiEngineW, setAiEngineW] = useState(container[CONTAINERS_KEY.AI_ENGINE_W]);
  let [aiModelW, setAiModelW] = useState(container[CONTAINERS_KEY.AI_MODEL_W]);
  let [aiWritterPrompt, setAiWritterPrompt] = useState(container?.[CONTAINERS_KEY.AI_WRITER_PROMPT]);
  let [aiEditorPrompt, setAiEditorPrompt] = useState(container?.[CONTAINERS_KEY.AI_EDITOR_PROMPT]);
  let [writterStrictness, setWritterStrictness] = useState(container?.[CONTAINERS_KEY.AI_WRITER_STRICTNESS]);
  let [editorStrictness, setEditorStrictness] = useState(container?.[CONTAINERS_KEY.AI_EDITOR_STRICTNESS]);

  let [loader, setLoader] = useState(false);
  const [error, setError] = useState({});

  const fieldMargin = 7;
  const fieldWidth = "90%";
  const labelIconSize = 20;
  const cvariant = "fbloxD";
  const vstackWidth = { base: "100%", md: "45%" };
  const sectionWidth = { base: "100%", md: "80%" };

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
      updateConfig({
        ...xconfig,
        [APP_CONFIG_KEYS.CONTAINER_DATA]: getBlogContainerFromresponse(data), // update current container data in context
        [APP_CONFIG_KEYS.CONTAINER_MODIFIED]: true  // This will reload the container list data
      });
      setIsModified(false)
      toast.success("Updated")
    } else {
      toast.error("Failed to add blox !!")

    }
    setLoader(false)

  }

  const updateContainerMaster = () => {
    let tempContainerMaster = { ...container }
    tempContainerMaster[CONTAINERS_KEY.TONE_OF_VOICE] = toneOfVoice;
    tempContainerMaster[CONTAINERS_KEY.AI_ENGINE_W] = aiEngineW;
    tempContainerMaster[CONTAINERS_KEY.AI_MODEL_W] = aiModelW;
    tempContainerMaster[CONTAINERS_KEY.STRICTNESS] = strictness;
    tempContainerMaster[CONTAINERS_KEY.AI_WRITER_PROMPT] = aiWritterPrompt;
    tempContainerMaster[CONTAINERS_KEY.AI_EDITOR_PROMPT] = aiEditorPrompt;
    tempContainerMaster[CONTAINERS_KEY.AI_WRITER_STRICTNESS] = writterStrictness;
    tempContainerMaster[CONTAINERS_KEY.AI_EDITOR_STRICTNESS] = editorStrictness;

    tempContainerMaster[CONTAINERS_KEY.HOUR] = String(container[CONTAINERS_KEY.HOUR])
    tempContainerMaster[CONTAINERS_KEY.MINUTE] = String(container[CONTAINERS_KEY.MINUTE])
    tempContainerMaster[CONTAINERS_KEY.DAY_OF_WEEK] = String(container[CONTAINERS_KEY.DAY_OF_WEEK])
    tempContainerMaster[CONTAINERS_KEY.DAY_OF_MONTH] = String(container[CONTAINERS_KEY.DAY_OF_MONTH])
    return tempContainerMaster
  };

  const validateAiWriterPrompt = () => {

    let err = validate(containerValidationSchema, CONTAINERS_KEY.AI_WRITER_PROMPT, aiWritterPrompt)
    setError({
      ...error,
      [CONTAINERS_KEY.AI_WRITER_PROMPT]: err
    })
  };

  const validateAiEditorPrompt = () => {

    let err = validate(containerValidationSchema, CONTAINERS_KEY.AI_EDITOR_PROMPT, aiEditorPrompt)
    setError({
      ...error,
      [CONTAINERS_KEY.AI_EDITOR_PROMPT]: err
    })
  };

  const validateFields = () => {


    let aiWriterPromptErr = validate(containerValidationSchema, CONTAINERS_KEY.AI_WRITER_PROMPT, aiWritterPrompt)
    let aiEditorPromptErr = validate(containerValidationSchema, CONTAINERS_KEY.AI_EDITOR_PROMPT, aiEditorPrompt)


    setError({
      ...error,
      [CONTAINERS_KEY.NAME]: aiWriterPromptErr,
      [CONTAINERS_KEY.DESCRIPTION]: aiEditorPromptErr
    })

    return aiWriterPromptErr || aiEditorPromptErr
  }



  const onToneOfVoiceChange = (value) => {
    setIsModified(true)
    setToneOfVoice(value)
  };

  const onAiEngineWChange = (value) => {
    setIsModified(true)
    setAiEngineW(value)
  };

  const onAiModelWChange = (value) => {
    setIsModified(true)
    setAiModelW(value)
  };

  const onStrictnessChange = (value) => {
    setIsModified(true)
    setStrictness(value)
  };

  const onAiWritterPromptChange = (value) => {
    setIsModified(true)
    setAiWritterPrompt(value)
  };

  const onAiEditorPromptChange = (value) => {
    setIsModified(true)
    setAiEditorPrompt(value)
  };

  const onWritterStrictnessChange = (value) => {
    setIsModified(true)
    setWritterStrictness(value)
  };

  const onEditorStrictnessChange = (value) => {
    setIsModified(true)
    setEditorStrictness(value)
  };

  return (
    <>
      <CommonHeader
        cboxSize={7}
        cwidth={{ base: "100%", md: "82%" }}
        showIcon={true}
        iconType={"lightning"}
        cmt={4}
        cml={10}
        name="AI Settings"
      />

      <VStack
        w="100%" // Full viewport width
        display="flex"
        justifyContent="center"
        alignItems="center"
        p={4} // Optional padding for better spacing
        mb={10}
      >
        <HStack w={"80%"} align="center" justifyContent="center">
          <FieldToneOfVoice
            toneOfVoice={toneOfVoice}
            setToneOfVoice={onToneOfVoiceChange}
            cml={fieldMargin}
            cwidth={fieldWidth}
            cvariant={cvariant}
            labelIconSize={labelIconSize}
          />
          <FieldStrictness
            strictness={strictness}
            setStrictness={onStrictnessChange}
            cml={fieldMargin}
            cwidth={fieldWidth}
            cvariant={cvariant}
            labelIconSize={labelIconSize}
            withBox={false}
          />
          <FieldAIEngine
            aiEngine={aiEngineW}
            setAiEngine={onAiEngineWChange}
            cml={fieldMargin}
            cwidth={fieldWidth}
            cvariant={cvariant}
            labelIconSize={labelIconSize}
          />
          <FieldAiModel
            aiModel={aiModelW}
            setAiModel={onAiModelWChange}
            cml={fieldMargin}
            cwidth={fieldWidth}
            cvariant={cvariant}
            labelIconSize={labelIconSize}
            aiEngine={aiEngineW}
          />
        </HStack>
      </VStack>

      <CustomLine />



      <VStack
        w="100%" // Full viewport width
        display="flex"
        justifyContent="center"
        alignItems="center"
        p={4} // Optional padding for better spacing
      >
        <HStack
          width="80%"
          align="flex-start"
          justify="space-between"
          spacing={{ base: 4, md: 8 }}
          flexDirection={{ base: "column", md: "row" }}
        >
          <VStack width={vstackWidth} align="center">
            <CommonHeader
              cboxSize={7}
              showIcon={true}
              iconType={"person"}
              cmt={4}
              cmb={4}
              name="AI Writer"
            />
            <VStack
              key="main"
              align="center"
              justify="center"
              w="100%"
              spacing={4}
            >
              <FieldAIWritterEditor
                value={aiWritterPrompt}
                setValue={onAiWritterPromptChange}
                clabel={"Ai Writer Style & Formatting"}
                iconType={"checked"}
                cml={fieldMargin}
                cwidth={fieldWidth}
                cvariant={cvariant}
                labelIconSize={labelIconSize}
                error={error?.[CONTAINERS_KEY.AI_WRITER_PROMPT]}
                validate={validateAiWriterPrompt}
              />
              <FieldStrictness
                strictness={writterStrictness}
                setStrictness={onWritterStrictnessChange}
                cml={fieldMargin}
                cwidth={fieldWidth}
                cvariant={cvariant}
                labelIconSize={labelIconSize}
              />
            </VStack>
          </VStack>

          <VStack width={vstackWidth} align="center">
            <CommonHeader
              cboxSize={7}
              showIcon={true}
              iconType={"person"}
              cmt={4}
              cmb={4}
              name="AI Editor"
            />
            <VStack
              key="main"
              align="center"
              justify="center"
              w="100%"
              spacing={4}
            >
              <FieldAIWritterEditor
                value={aiEditorPrompt}
                setValue={onAiEditorPromptChange}
                clabel={"Approval & Consistency"}
                iconType={"checked"}
                cml={fieldMargin}
                cwidth={fieldWidth}
                cvariant={cvariant}
                labelIconSize={labelIconSize}
                error={error?.[CONTAINERS_KEY.AI_EDITOR_PROMPT]}
                validate={validateAiEditorPrompt}
              />
              <FieldStrictness
                strictness={editorStrictness}
                setStrictness={onEditorStrictnessChange}
                cml={fieldMargin}
                cwidth={fieldWidth}
                cvariant={cvariant}
                labelIconSize={labelIconSize}
                iconType={"off"}
              />
            </VStack>
          </VStack>
        </HStack>
      </VStack>

      <HStack
        align="flex-start"
        justify="flex-end"
        spacing={{ base: 4, md: 8 }}
        flexDirection={{ base: "column", md: "row" }}
        width={"90%"}
      >
        <Field.Root
          width={"auto"}
          color="brand.pureWhiteTxt"
          fontSize={{ base: "sm", md: "md" }}
          mt={6}
        >
          <Field.Label>
            <HStack>
              <LuTriangleAlert size={labelIconSize} color="inherit" />
              <Text>Set Changes</Text>
            </HStack>
          </Field.Label>
          <HStack
            ml={fieldMargin}
            justifyContent="flex-end"
            color="brand.pureWhiteTxt"
            fontSize={{ base: "sm", md: "md" }}
          >
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
      </HStack>
    </>
  );
}
