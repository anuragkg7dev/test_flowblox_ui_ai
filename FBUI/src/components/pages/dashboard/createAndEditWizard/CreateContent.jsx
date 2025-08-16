

import { scribeTypes } from '@/components/common/Options/ScribeOptions';
import { toast } from '@/components/common/Notification';
import { clone } from '@/components/common/util/JsonUtil';
import { getValidateInitAsTrue, validateRequired } from '@/components/validation/ValidationUtil';
import {
  Box,
  Button,
  Card,
  Field,
  Flex,
  Heading,
  HStack,
  Icon,
  Input,
  Text,
  Textarea,
  VStack
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

const CreateContent = React.forwardRef((props, ref) => {

  let masterData = props.masterData
  let setMasterData = props.setMasterData

  const [topic, setTopic] = useState(masterData?.createConfig?.topic)
  const [description, setDescription] = useState(masterData?.createConfig?.description)
  const [selectedType, setSelectedType] = useState(masterData?.createConfig?.selectedType);
  const [keywords, setKeywords] = useState(masterData?.createConfig?.keywords)

  const [topicValid, setTopicValid] = useState(getValidateInitAsTrue())
  const [descriptionValid, setDescriptionValid] = useState(getValidateInitAsTrue())
  const [selectedTypeValid, setSelectedTypeValid] = useState(getValidateInitAsTrue());
  const [keywordsValid, setKeywordsValid] = useState(getValidateInitAsTrue())

  useEffect(() => {
    setTopic(masterData?.createConfig?.topic ?? '');
    setDescription(masterData?.createConfig?.description ?? '');
    setSelectedType(masterData?.createConfig?.selectedType ?? '');
    setKeywords(masterData?.createConfig?.keywords ?? '');
  }, [masterData]);

  const validate = () => {
    updateMasterData();
    let isValidTopic = validateRequired(topic, setTopicValid)
    let isValidDesc = validateRequired(description, setDescriptionValid)
    let isValidSelectType = validateRequired(selectedType, setSelectedTypeValid)
    let isValidKeyWord = validateRequired(keywords, setKeywordsValid)   
    return isValidTopic && isValidDesc && isValidSelectType && isValidKeyWord
  }

  const updateMasterData = () => {
    let updatedMasterData = clone(masterData)
    updatedMasterData.createConfig.topic = topic
    updatedMasterData.createConfig.description = description
    updatedMasterData.createConfig.selectedType = selectedType
    updatedMasterData.createConfig.keywords = keywords
    setMasterData(updatedMasterData)    
  }

  const onChangeTopic = (e) => {
    setTopic(e.target.value)
    validateRequired(e.target.value, setTopicValid)
  }

  const onChangeDescription = (e) => {
    setDescription(e.target.value)
    validateRequired(e.target.value, setDescriptionValid)
  }

  const onChangeSelectType = (name) => {
    setSelectedType(name)
    validateRequired(name, setSelectedTypeValid)
  }

  const onChangeKeyword = (e) => {
    setKeywords(e.target.value)
    validateRequired(e.target.value, setKeywordsValid)
  }

  // Expose validate function to parent via ref
  React.useImperativeHandle(ref, () => ({ validate, }));

  return (
    <Box maxW="600px" mx="auto" py={10} px={4} >
      {/* Header */}
      <Heading mb={2}>Create New Scribe</Heading>
      <Text fontSize="md" color="gray.600" mb={8}>
        Fill out the details below to get started.
      </Text>

      {/* Form Inputs */}
      <VStack spacing={5} align="stretch">
        {/* Name */}


        <Field.Root required invalid={!topicValid.flag}>
          <Field.Label>
            <Text textStyle="md">Name </Text>
            <Field.RequiredIndicator />
          </Field.Label>
          <Input placeholder="Enter scribe name" value={topic} onChange={e => onChangeTopic(e)} />
          <Field.ErrorText>{topicValid.error}</Field.ErrorText>
        </Field.Root>


        {/* Description */}
        <Field.Root required invalid={!descriptionValid.flag}>
          <Field.Label>
            <Text textStyle="md">Description</Text>
            <Field.RequiredIndicator />
          </Field.Label>
          <Textarea placeholder="Write a short description..." rows={4} value={description} onChange={e => onChangeDescription(e)} />
          <Field.ErrorText>{descriptionValid.error}</Field.ErrorText>
        </Field.Root>


        {/* Blog Types - Card Group */}
        <Box>
          <Field.Root required marginBottom={"10px"} invalid={!selectedTypeValid.flag}>
            <Field.Label>
              <Text textStyle="md">Scribe Types  </Text>
              <Field.RequiredIndicator />
            </Field.Label>


            <HStack spacing={4} wrap="wrap" flexWrap="wrap" justify={"center"} marginBottom={"10px"}>
              {scribeTypes.map((btype) => {
                return (
                  <Card.Root
                    key={btype.name}
                    onClick={() => onChangeSelectType(btype.name)}
                    cursor="pointer"
                    border={selectedType == btype.name ? '2px solid' : '1px solid'}
                    borderColor={selectedType == btype.name ? 'blue.400' : 'gray.200'}
                    _hover={{ borderColor: 'blue.300' }}
                    transition="all 0.2s"
                    borderRadius="md"
                    minW="250px" >
                    <Card.Body textAlign="center" py={3} px={4}>
                      <Flex width="100%" height="100%" align="center" justify="center">
                        <VStack>
                          <Icon as={btype.icon} />
                          <Card.Title mt="2">{btype.name}</Card.Title>
                          <Card.Description>{btype.description}</Card.Description>
                        </VStack>
                      </Flex>
                    </Card.Body>
                    <Card.Footer>
                    </Card.Footer>
                  </Card.Root>)
              })}



            </HStack>
            <Field.ErrorText>{selectedTypeValid.error}</Field.ErrorText>
          </Field.Root>

          {/* Initial Topic Tags */}
          <Field.Root required invalid={!keywordsValid.flag}>
            <Field.Label>
              <Text textStyle="md">Initial Topic Tags (Comma Seperated)</Text>
              <Field.RequiredIndicator />
            </Field.Label>
            <Input placeholder="Travel, Spain, Sea" value={keywords} onChange={e => onChangeKeyword(e)} />
            <Field.HelperText>You can add more tags later in the dashboard</Field.HelperText>
            <Field.ErrorText>{keywordsValid.error}</Field.ErrorText>
          </Field.Root>

        </Box>

      </VStack>
    </Box>
  );
});

export default CreateContent;
