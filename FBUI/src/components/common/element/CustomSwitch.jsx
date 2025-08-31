import { Flex, Switch } from "@chakra-ui/react";
import { memo, useState } from "react";
import CustomSpinnerOverlay from "./cards/CustomSpinnerOverlay";

function CustomSwitch(props) {
    const defaultValue = props.defaultValue
    const label = props.label ?? ""
    const onSwitchChange = props.onSwitchChange;
    const ckey = props.ckey
    const cheight = props.cheight
    const cp = props.cp ?? 3
    const switchLoader = props.switchLoader ?? false
    const [xchecked, setXchecked] = useState(defaultValue);
    const checked = props.checked ?? xchecked
    const setChecked = props.setChecked ?? setXchecked
    const cmt = props.cmt

    return (
        <Flex
            borderColor="brand.greyBrandBorder"
            borderWidth="1px"
            borderStyle="solid"
            width={"fit-content"}
            p={cp}
            key={ckey}
            height={cheight}
            mt={cmt}
        >
            <Switch.Root checked={checked} onCheckedChange={(e) => { setChecked(e.checked); onSwitchChange?.(e.checked) }}>
                <Switch.HiddenInput />
                <CustomSpinnerOverlay show={switchLoader} cml={7} cmt={2} csize={4} type={'syncLoader'} />
                {!switchLoader && (<Switch.Label color={"brand.pureWhiteTxt"} >{label}</Switch.Label>)}
                <Switch.Control bg={"brand.greyBrandBg"} _checked={{ bg: "brand.primaryBrandBg" }} />
            </Switch.Root>
        </Flex>
    );
}

export default memo(CustomSwitch);