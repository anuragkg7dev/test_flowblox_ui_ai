import { Button, Menu, Portal } from "@chakra-ui/react";

export default function CustomMenu(props) {

    const clabel = props.clabel;
    const sdata = props.sdata;
    const onSelect = props.onSelect;
    const cwidth = props.cwidth

    return (
        <Menu.Root onSelect={(e) => onSelect?.(e?.value)} >
            <Menu.Trigger asChild width={cwidth} bg="brand.pureBlackBg"
                color="brand.pureWhiteTxt"
                borderColor={"brand.greyBrandBorder"}
                borderWidth="1px"
                borderStyle="solid"
                _focus={{ borderColor: "brand.subBrandBg" }}>
                <Button variant="outline" size="sm">
                    {clabel || "Open"}
                </Button>
            </Menu.Trigger>
            <Portal>
                <Menu.Positioner>
                    <Menu.Content bg={'brand.pureBlackBg'}>
                        {sdata.map((option) => (
                            <Menu.Item key={option.value} value={option.value}  color="brand.pureWhiteTxt">
                                {option.label}
                            </Menu.Item>
                        ))}
                    </Menu.Content>
                </Menu.Positioner>
            </Portal>
        </Menu.Root>
    );
}