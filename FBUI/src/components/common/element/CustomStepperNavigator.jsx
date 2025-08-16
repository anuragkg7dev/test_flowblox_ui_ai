import { Box, Button, ButtonGroup, HStack } from "@chakra-ui/react";
import { GrNext } from "react-icons/gr";

export default function CustomStepperNavigator(props) {


    let steps = props.steps
    let currentStep = props.currentStep
    let setCurrentStep = props.setCurrentStep
    let validate = props.validate
    let nextBtnLabel = props.nextBtnLabel ?? "Next"
    let prevBtnLabel = props.prevBtnLabel ?? "Previous"
    let completeBtnLabel = props.completeBtnLabel ?? nextBtnLabel
    let onFinish = props.onFinish
    let onClose = props.onClose

    const handleNext = () => {
        if (currentStep == steps.length - 1) {
            if (onFinish) {
                onFinish(currentStep)
            }
        }
        else if (currentStep < steps.length) {
            if (validate && validate(currentStep)) {

                // setCurrentStep(prev => prev == 0 ? 1 : prev + 1);
            } else {
                console.log("Validation Failed for Step ", currentStep)
            }
        }
    };

    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    return (<>


        <HStack spacing={4} pt={6} justify={"left"} width={"100%"}>
            <Button variant="outline" colorScheme="gray" onClick={()=>{onClose()}}  >
                {"Close"}
            </Button>
        </HStack>
        <HStack spacing={4} pt={6} justify={"right"}>
            <Button variant="outline" colorScheme="gray" onClick={handlePrev}
                isDisabled={currentStep === 1} >
                {prevBtnLabel}
            </Button>
            <Button colorScheme="blue" onClick={handleNext}
                isDisabled={currentStep === steps.length} >{currentStep == steps.length - 1 ? completeBtnLabel : nextBtnLabel}</Button>
        </HStack>




    </>
    )
}

