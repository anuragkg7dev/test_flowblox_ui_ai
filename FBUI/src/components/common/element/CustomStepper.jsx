import { Box, Button, ButtonGroup, Flex, Steps, VStack, Text, HStack } from "@chakra-ui/react";
import { useState } from 'react';
import { FaCheck } from 'react-icons/fa';

export default function CustomStepper(props) {


    let steps = props.steps
    let currentStep = props.currentStep
    let completeContent = props.completeContent
    
    let colorPalette=props.colorPalette ??"blue"

    return (
        <Box maxW="700px" mx="auto" pt={10} px={4} >
            <Steps.Root step={currentStep} count={steps.length} colorPalette={colorPalette} >
                <Steps.List>
                    {steps.map((step, index) => (
                        <Steps.Item key={index} index={index}>
                            <Steps.Indicator>
                                <Steps.Status incomplete={step.icon} complete={<FaCheck />} />
                            </Steps.Indicator>
                            <Text>{step.title}</Text>
                        </Steps.Item>
                    ))}
                </Steps.List>
                {completeContent && (<Steps.CompletedContent>{completeContent}</Steps.CompletedContent> )}
            </Steps.Root>
        </Box>
    )
}

