
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
  NumberInput,
  Text,
  Textarea,
  VStack
} from '@chakra-ui/react';
import React, { useState } from 'react';

const ContentPublicationConfiguration = React.forwardRef((props, ref) => {

  let masterData = props.masterData
  let setMasterData = props.setMasterData

  const [outputSource, setOutputSource] = useState(masterData?.publishConfig.outputSource)
  const [noOfArticles, setNoOfArticles] = useState(masterData?.publishConfig.noOfArticles)
  const [frequency, setFrequency] = useState(masterData?.publishConfig.frequency)
  const [avgWordCount, setAvgWordCount] = useState(masterData?.publishConfig.avgWordCount)

  const [outputSourceValid, setOutputSourceValid] = useState(getValidateInitAsTrue())
  const [noOfArticlesValid, setNoOfArticlesValid] = useState(getValidateInitAsTrue())
  const [frequencyValid, setFrequencyValid] = useState(getValidateInitAsTrue());
  const [avgWordCountValid, setAvgWordCountValid] = useState(getValidateInitAsTrue());

  const configuration = useAppConfigStore((state) => state.config);

  const validate = () => {
    let isValidOpenSource = validateRequired(outputSource, setOutputSourceValid)
    let isValidNoOfArticle = validateRequired(noOfArticles, setNoOfArticlesValid)
    let isValidFrequency = validateRequired(frequency, setFrequencyValid)
    let isValidAvgWordCount = validateRequired(avgWordCount, setAvgWordCountValid)
    updateMasterData()
    return isValidOpenSource && isValidNoOfArticle && isValidFrequency && isValidAvgWordCount
  }

  const updateMasterData = () => {
    let updatedMasterData = clone(masterData)
    updatedMasterData.publishConfig.outputSource = outputSource
    updatedMasterData.publishConfig.noOfArticles = noOfArticles
    updatedMasterData.publishConfig.frequency = frequency
    updatedMasterData.publishConfig.avgWordCount = avgWordCount
    setMasterData(updatedMasterData)
  }

  const onChangeOutputSource = (selectedValue) => {

    setOutputSource(selectedValue)
    validateRequired(selectedValue, setOutputSourceValid)
  }
  const onChangeNoOfArticle = (data) => {
    setNoOfArticles(data?.valueAsNumber)
    validateRequired(data?.valueAsNumber, setNoOfArticlesValid)
  }

  const onChangeFrequency = (selectedValue) => {
    setFrequency(selectedValue)
    validateRequired(selectedValue, setFrequencyValid)
  }

  const onChangeAvgWordCount = (data) => {
    setAvgWordCount(data?.valueAsNumber)
    validateRequired(data?.valueAsNumber, setAvgWordCountValid)
  }

  // Expose validate function to parent via ref
  React.useImperativeHandle(ref, () => ({ validate, }));

  return (
    <Box maxW="600px" mx="auto" py={10} px={4} >
      {/* Header */}
      <Heading mb={2}>Publication Settings</Heading>
      <Text fontSize="md" color="gray.600" mb={8}>
        Configure how articles are generated and published
      </Text>

      {/* Form Inputs */}
      <VStack spacing={5} align="stretch">

        <Box>
          <HStack spacing={4} wrap="wrap" flexWrap="wrap" justify={"center"} marginBottom={"10px"}>

            {/* Output Source */}
            <Field.Root required marginBottom={"10px"} invalid={!outputSourceValid.flag}>
              <CustomSelect
                sdata={configuration?.["optsrc_options"]}
                slabel={"Output Source"}
                splaceholder={"Select"}
                defaultSelected={outputSource}
                cselectCallback={onChangeOutputSource}
              />
              <Field.ErrorText>{outputSourceValid.error}</Field.ErrorText>
            </Field.Root>

            {/* Number of Articles */}
            <Field.Root required marginBottom={"10px"} invalid={!noOfArticlesValid.flag}>

              <Field.Label>
                <Text textStyle="md">Number of Articles </Text>
                <Field.RequiredIndicator />
              </Field.Label>

              <NumberInput.Root defaultValue="1"
                size="sm" width="320px"
                value={noOfArticles}
                onValueChange={onChangeNoOfArticle} >
                <NumberInput.Control />
                <NumberInput.Input />
              </NumberInput.Root>

              <Field.ErrorText>{noOfArticlesValid.error}</Field.ErrorText>
            </Field.Root>

            {/* Frequency */}
            <Field.Root required marginBottom={"10px"} invalid={!frequencyValid.flag}>

              <CustomSelect
                sdata={configuration?.["freq_options"]}
                slabel={"Frequency"}
                splaceholder={"Select"}
                defaultSelected={frequency}
                cselectCallback={onChangeFrequency}
              />
              <Field.ErrorText>{frequencyValid.error}</Field.ErrorText>
            </Field.Root>

            {/* Average word count*/}
            <Field.Root required marginBottom={"10px"} invalid={!avgWordCountValid.flag}>

              <Field.Label>
                <Text textStyle="md">Average word count</Text>
                <Field.RequiredIndicator />
              </Field.Label>

              <NumberInput.Root defaultValue="1"
                size="sm" width="320px"
                value={avgWordCount}
                onValueChange={onChangeAvgWordCount} >
                <NumberInput.Control />
                <NumberInput.Input />
              </NumberInput.Root>

              <Field.ErrorText>{avgWordCountValid.error}</Field.ErrorText>
            </Field.Root>

          </HStack>

        </Box>


      </VStack>
    </Box>
  );
});

export default ContentPublicationConfiguration;
