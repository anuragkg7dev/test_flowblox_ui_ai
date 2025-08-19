import { CloseButton, Dialog, Portal } from "@chakra-ui/react";
import CustomeCloseIcon from "./CustomeCloseIcon";

export default function CustomCoverDialog(props) {

  let open = props.open;
  let setOpen = props.setOpen;
  let children = props.children;
  let csize = props.csize ?? "md"

  const onClose = () => {
    setOpen(false)
  }


  return (
    <Dialog.Root size="cover" placement="center" motionPreset="slide-in-bottom"
      open={open}
      onClose={() => setOpen && setOpen(false)}
    >
      {/* <Dialog.Trigger asChild>
        <Button variant="outline" size="sm">
          Open Dialog
        </Button>
      </Dialog.Trigger> */}
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content
            bg="brand.pureBlackBg"
            color="brand.pureWhiteTxt"
            border="0.1px solid"
            borderColor="brand.greyBrandBorder"
          >
            <Dialog.Header justifyContent="flex-end">
              <Dialog.CloseTrigger asChild>
                <CustomeCloseIcon onClose={onClose} />
              </Dialog.CloseTrigger>
            </Dialog.Header>
            <Dialog.Body>
              {children} {/* Render children here */}
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}
