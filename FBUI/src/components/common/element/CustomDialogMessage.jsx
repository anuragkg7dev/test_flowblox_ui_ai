import { Button, Dialog, HStack, Portal } from "@chakra-ui/react";

const CustomDialogMessage = (props) => {
  let show = props.show;
  let setShow = props.setShow;
  let header = props.header;
  let description = props.description;
  let onClose = props.onClose;
  let closeLabel = props.closeLabel ?? "Close";
  let placement = props.placement;

  return (
    <>
      <Dialog.Root open={show} placement={placement}>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content
              bg="brand.darkGrey"
              color="brand.textLight"
              fontSize={{ base: "sm", md: "md" }}
              borderColor="brand.border"
              borderWidth="1px"
              borderStyle="solid"
            >
              <Dialog.Header>
                <strong>{header ?? ""}</strong>
              </Dialog.Header>
              <Dialog.Body>{description}</Dialog.Body>

              <Dialog.Footer>
                <HStack spacing={4} pt={6} justify={"right"}>
                  <Button
                    mt={8}
                    colorPalette="purple"
                    width="100%"
                    fontSize={{ base: "sm", md: "md" }}
                    onClick={() => {
                      onClose();
                    }}
                  >
                    {closeLabel}
                  </Button>
                </HStack>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  );
};

export default CustomDialogMessage;
