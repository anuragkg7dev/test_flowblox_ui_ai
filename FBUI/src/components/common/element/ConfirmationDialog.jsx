import { Button, Dialog, HStack, Portal } from "@chakra-ui/react";

const ConfirmationDialog = (props) => {

    let show = props.show;
    let setShow = props.setShow;
    let header = props.header;
    let description = props.description;
    let onClose = props.onClose;
    let onOk = props.onOk;
    let closeLabel = props.closeLabel ?? "Close";
    let okLabel = props.okLabel ?? "Ok";

    return (<>
        <Dialog.Root open={show}  >
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content >
                        <Dialog.Header><strong>{header}</strong></Dialog.Header>
                        <Dialog.Body>{description}</Dialog.Body>

                        <Dialog.Footer>
                            <HStack spacing={4} pt={6} justify={"right"}>
                                <Button variant="outline" colorScheme="gray" onClick={() => { onClose() }}>
                                    {closeLabel}
                                </Button>
                                <Button colorScheme="blue" onClick={onOk}>{okLabel}</Button>
                            </HStack>
                        </Dialog.Footer>

                    </Dialog.Content>

                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    </>)
}

export default ConfirmationDialog;
