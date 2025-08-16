import { createListCollection, Portal, Select } from "@chakra-ui/react";
import { useMemo, useState } from "react";

export default function CustomSelect(props) {
    
    let soptions = props.sdata ?? [];
    let slabel = props.slabel;
    let splaceholder = props.splaceholder;
    let defaultSelected = props.defaultSelected;
    let cselectCallback = props.cselectCallback;
    let smultiple = props.smultiple ?? false;
    let cwidth = props.cwidth ?? "320px";
    let cml = props.cml
    let cborderColor = props.cborderColor ?? "brand.greyBrandBorder"

    const [xselected, setXselected] = useState(defaultSelected);
    let selected = props.selected ?? xselected
    let setSelected = props.setSelected ?? setXselected

    const sdata = useMemo(() => {
        return createListCollection({ items: soptions });
    }, [soptions]); 

    const onSelectValueChange = (items) => {
        let selectedValue = undefined;
        if (items && items.length > 0) {
            if (smultiple) {
                selectedValue = items.map((x) => x.value);
            } else {
                selectedValue = items[0].value;
            }
        }
        setSelected(selectedValue);
        if (cselectCallback) cselectCallback(selectedValue);
    };


    return (
        <Select.Root
            multiple={smultiple}
            collection={sdata}
            value={[selected]}
            onValueChange={(e) => onSelectValueChange(e.items)}
            size="sm"
            width={cwidth}
            ml={cml}

        >
            <Select.HiddenSelect />
            <Select.Label>{slabel}</Select.Label>
            <Select.Control

            >
                <Select.Trigger bg="brand.pureBlackBg"
                    color="brand.pureWhiteTxt"
                    borderColor={cborderColor}
                    borderWidth="1px"
                    borderStyle="solid"
                    _focus={{ borderColor: "brand.subBrandBg" }}
                >
                    <Select.ValueText placeholder={splaceholder} />
                </Select.Trigger>
                <Select.IndicatorGroup>
                    <Select.Indicator />
                </Select.IndicatorGroup>
            </Select.Control>

            <Select.Positioner>
                <Select.Content
                    bg="brand.pureBlackBg"
                    color="brand.pureWhiteTxt"
                    borderColor={cborderColor}
                    borderWidth="1px"
                    borderStyle="solid"
                >
                    {sdata.items.map((data) => (
                        <Select.Item item={data} key={data.value}>
                            {data.label}
                            <Select.ItemIndicator />
                        </Select.Item>
                    ))}
                </Select.Content>
            </Select.Positioner>
        </Select.Root>
    );
}
