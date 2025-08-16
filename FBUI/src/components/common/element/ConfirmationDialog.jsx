import { Button, Dialog, HStack, Portal, Status, Text, useBreakpointValue } from "@chakra-ui/react";
import { STATUS } from "../constants/CommonConstant";

const ConfirmationDialog = (props) => {

    let show = props.show;
    let setShow = props.setShow;
    let header = props.header;
    let description = props.description;
    let onClose = props.onClose ?? setShow;
    let onOk = props.onOk ?? setShow;;
    let closeLabel = props.closeLabel ?? "Close";
    let okLabel = props.okLabel ?? "Ok";
    let status = props.status ?? STATUS.INFO;
    // Responsive dialog width and font sizes
    const dialogWidth = useBreakpointValue({
        base: "90%", // Mobile
        sm: "80%",   // Small tablet
        md: "500px", // Tablet/Laptop
        lg: "600px", // Desktop
    });

    const fontSizeHeader = useBreakpointValue({
        base: "md",
        md: "lg",
    });

    const fontSizeBody = useBreakpointValue({
        base: "sm",
        md: "md",
    });

    const buttonSize = useBreakpointValue({
        base: "sm",
        md: "md",
    });

    const getStatusColor = (status) => {
        if (status === STATUS.ERROR) {
            return "red";
        } else if (status === STATUS.INFO) {
            return "blue";
        } else if (status === STATUS.WARNING) {
            return "orange";
        } else if (status === STATUS.SUCCESS) {
            return "green";
        }
        return "blue"; // Fallback
    };

    return (
        <Dialog.Root open={show} motionPreset="slideInBottom" >
            <Portal>
                <Dialog.Backdrop bg="blackAlpha.600" />
                <Dialog.Positioner>
                    <Dialog.Content
                        color='brand.pureWhiteTxt'
                        bg="brand.OffBlackBg"
                        maxW={dialogWidth}
                        mx="auto"
                        borderRadius="md"
                        boxShadow="lg"
                        p={{ base: 4, md: 6 }} // Responsive padding
                        border="0.1px solid"
                        borderColor="brand.greyBrandBorder"
                    >
                        <Dialog.Header>
                            <HStack spacing={{ base: 2, md: 4 }}>
                                <Status.Root colorPalette={getStatusColor(status)}>
                                    <Status.Indicator />
                                </Status.Root>
                                <strong fontSize={fontSizeHeader}>{header}</strong>
                            </HStack>
                        </Dialog.Header>

                        <Dialog.Body fontSize={fontSizeBody} py={{ base: 2, md: 4 }}>
                            <Text whiteSpace="pre-line">{description}</Text>
                        </Dialog.Body>

                        <Dialog.Footer>
                            <HStack
                                spacing={{ base: 2, md: 4 }}
                                pt={{ base: 4, md: 6 }}
                                justify="end"
                            >
                                <Button
                                    variant="fblox"

                                    size={buttonSize}
                                    onClick={() => onClose?.(false) ?? setShow?.(false)}

                                >
                                    {closeLabel}
                                </Button>
                                <Button
                                    variant="fbloxD"
                                    size={buttonSize}
                                    onClick={onOk}
                                >
                                    {okLabel}
                                </Button>
                            </HStack>
                        </Dialog.Footer>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root >
    );
};

export default ConfirmationDialog;