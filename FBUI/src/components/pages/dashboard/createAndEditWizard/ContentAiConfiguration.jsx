
import CustomSelect from '@/components/common/element/CustomSelect';
import { clone } from '@/components/common/util/JsonUtil';
import { useAppConfigStore } from '@/components/store/AppConfigStore';
import { getValidateInitAsTrue, validateRequired } from '@/components/validation/ValidationUtil';
import {
  Box,
  Button,
  Field,
  Heading,
  HStack,
  Text,
  Textarea,
  VStack
} from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';

const ContentAiConfiguration = React.forwardRef((props, ref) => {

  let masterData = props.masterData
  let setMasterData = props.setMasterData

  const [toneOfVoice, setToneOfVoice] = useState(masterData?.aiConfigure?.toneOfVoice)
  const [aiFormality, setAiFormality] = useState(masterData?.aiConfigure?.aiFormality)
  const [aiEngine, setAiEngine] = useState(masterData?.aiConfigure?.aiEngine)
  const [aiModel, setAiModel] = useState(masterData?.aiConfigure?.aiModel)

  const [aiModelOption, setAiModelOption] = useState()

  const [toneOfVoiceValid, setToneOfVoiceValid] = useState(getValidateInitAsTrue());
  const [aiFormalityValid, setAiFormalityValid] = useState(getValidateInitAsTrue())
  const [aiEngineValid, setAiEngineValid] = useState(getValidateInitAsTrue())
  const [aiModelValid, setAiModelValid] = useState(getValidateInitAsTrue());

  const configuration = useAppConfigStore((state) => state.config);

  const validate = () => {
    let isValidTone = validateRequired(toneOfVoice, setToneOfVoiceValid)
    let isValidAiFormality = validateRequired(aiFormality, setAiFormalityValid)
    let isValidAiEngine = validateRequired(aiEngine, setAiEngineValid)
    let isValidAiModel = validateRequired(aiModel, setAiModelValid)
    updateMasterData()
    return isValidTone && isValidAiFormality && isValidAiEngine && isValidAiModel
  }

  const updateMasterData = () => {
    let updatedMasterData = clone(masterData)
    
    updatedMasterData.aiConfigure.toneOfVoice = toneOfVoice
    updatedMasterData.aiConfigure.aiFormality = aiFormality
    updatedMasterData.aiConfigure.aiEngine = aiEngine
    updatedMasterData.aiConfigure.aiModel = aiModel
    setMasterData(updatedMasterData)
  }

  const onChangeToneOfVoice = (e) => {
    setToneOfVoice(e.target.value)
    validateRequired(e.target.value, setToneOfVoiceValid)
  }
  const onChangeAiFormality = (selectedValue) => {

    setAiFormality(selectedValue)
    validateRequired(selectedValue, setAiEngineValid)
  }
  const onChangeAiEngine = (selectedValue) => {
    setAiEngine(selectedValue)
    validateRequired(selectedValue, setAiEngineValid)

    let aiModel = configuration["aiModel"] ?? []
    aiModel = aiModel.filter((model) => model.org == selectedValue)
    setAiModelOption(aiModel)
  }

  const onChangeAiModel = (selectedValue) => {
    setAiModel(selectedValue)
    validateRequired(selectedValue, setAiModelValid)
  }

  // Expose validate function to parent via ref
  React.useImperativeHandle(ref, () => ({ validate, }));

  return (
    <Box maxW="600px" mx="auto" py={10} px={4} >
      {/* Header */}
      <Heading mb={2}>Content Configuration</Heading>
      <Text fontSize="md" color="gray.600" mb={8}>
        Define what type of content you want to generate.
      </Text>

      {/* Form Inputs */}
      <VStack spacing={5} align="stretch">

        {/* Tone of voice */}

        <Field.Root required invalid={!toneOfVoiceValid.flag}>
          <Field.Label>
            <Text textStyle="md">Tone of voice </Text>
            <Field.RequiredIndicator />
          </Field.Label>
          <Textarea placeholder="Start typing..." variant="outline" value={toneOfVoice} onChange={e => onChangeToneOfVoice(e)} />
          <Field.ErrorText>{toneOfVoiceValid.error}</Field.ErrorText>
        </Field.Root>

        <Box>
          <HStack spacing={4} wrap="wrap" flexWrap="wrap" justify={"center"} marginBottom={"10px"}>

            {/* Ai Formality */}
            <Field.Root required marginBottom={"10px"} invalid={!aiFormalityValid.flag}>

              <CustomSelect
                sdata={configuration["tov_options"]}
                slabel={"Ai Formality"}
                splaceholder={"Select"}
                defaultSelected={aiFormality}
                cselectCallback={onChangeAiFormality}
              />
              <Field.ErrorText>{aiFormalityValid.error}</Field.ErrorText>
            </Field.Root>

            {/* Ai Engine */}
            <Field.Root required marginBottom={"10px"} invalid={!aiEngineValid.flag}>

              <CustomSelect
                sdata={configuration["aiOrg"]}
                slabel={"Ai Engine"}
                splaceholder={"Select"}
                defaultSelected={aiEngine}
                cselectCallback={onChangeAiEngine}
              />
              <Field.ErrorText>{aiEngineValid.error}</Field.ErrorText>
            </Field.Root>

            {/* Ai Model */}
            <Field.Root required marginBottom={"10px"} invalid={!aiModelValid.flag}>

              <CustomSelect
                sdata={aiModelOption}
                slabel={"Ai Model"}
                splaceholder={"Select"}
                defaultSelected={aiModel}
                cselectCallback={onChangeAiModel}
              />
              <Field.ErrorText>{aiModelValid.error}</Field.ErrorText>
            </Field.Root>

          </HStack>

        </Box>

      </VStack>
    </Box>
  );
});

export default ContentAiConfiguration;
