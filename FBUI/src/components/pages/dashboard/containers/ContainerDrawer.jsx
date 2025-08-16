import { Drawer, Portal } from "@chakra-ui/react";
import { memo } from "react";
;

function ContainerDrawer(props) {
    let open = props.open;
    let setOpen = props.setOpen;
    let children = props.children;
    let csize = props.csize ?? "md"
    
    return (
        <Drawer.Root
            open={open}
            onClose={() => setOpen && setOpen(false)}
            closeOnOverlayClick={false}
            size={csize}>
            <Portal>
                <Drawer.Backdrop />
                <Drawer.Positioner>
                    <Drawer.Content
                        bg="brand.pureBlackBg"
                        color="brand.pureWhiteTxt"
                        borderLeft="0.1px solid"
                        borderLeftColor="brand.greyBrandBorder"
                        borderRight="0.1px solid"
                        borderRightColor="brand.greyBrandBorder"
                        width={"50%"}
                    >

                        <Drawer.Body spaceY="4" p={{ base: 2, md: 3 }} fontSize={{ base: "2xs", md: "xs" }} color="brand.pureWhiteTxt">
                            {children} {/* Render children here */}
                        </Drawer.Body>
                    </Drawer.Content>
                </Drawer.Positioner>
            </Portal>
        </Drawer.Root>
    );
}

export default memo(ContainerDrawer);