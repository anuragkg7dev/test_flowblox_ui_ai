import { Flex, Switch } from "@chakra-ui/react";
import { memo, useState } from "react";

function CustomSwitch(props) {
    let label = props.label ?? ""
    let onSwitchChange = props.onSwitchChange;
    let ckey = props.ckey
    let defaultValue = props.defaultValue
    let cheight = props.cheight
    let cp = props.cp??3

    const [checked, setChecked] = useState(defaultValue);

    return (
        <Flex
            borderColor="brand.greyBrandBorder"
            borderWidth="1px"
            borderStyle="solid"
            width={"fit-content"}
            p={cp}
            key={ckey}
            cheight={cheight}
        >
            <Switch.Root checked={checked} onCheckedChange={(e) => { setChecked(e.checked); onSwitchChange?.(e.checked) }}>
                <Switch.HiddenInput />
                <Switch.Label color={"brand.pureWhiteTxt"} >{label}</Switch.Label>
                <Switch.Control bg={"brand.greyBrandBg"} _checked={{ bg: "brand.primaryBrandBg" }} />
            </Switch.Root>
        </Flex>
    );
}

export default memo(CustomSwitch);