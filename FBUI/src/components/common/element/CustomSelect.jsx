import { createListCollection, Portal, Select } from "@chakra-ui/react"
import { useMemo, useState } from "react"

export default function CustomSelect(props) {
    let soptions = props.sdata ?? []

    let slabel = props.slabel
    let splaceholder = props.splaceholder
    let defaultSelected = props.defaultSelected
    let cselectCallback = props.cselectCallback
    let smultiple = props.smultiple ?? false
    let cwidth = props.cwidth ?? "320px"

    const sdata = useMemo(() => {
        return createListCollection({ items: soptions })
    }, [soptions])

    const [selected, setSelected] = useState(defaultSelected)

    const onSelectValueChange = (items) => {
        let selectedValue = undefined
        if (items && items.length > 0) {
            if (smultiple) {
                selectedValue = items.map(x => x.value)
            } else {
                selectedValue = items[0].value
            }
        }
        setSelected(selectedValue)
        if (cselectCallback) cselectCallback(selectedValue)
    }

    return (
        <Select.Root
            multiple={smultiple}
            collection={sdata}
            value={[selected]}
            onValueChange={(e) => onSelectValueChange(e.items)}
            size="sm"
            width={cwidth}
            color="brand.textLight"
            bg="brand.bgDark"
            fontSize={{ base: "sm", md: "md" }}
            borderColor="brand.border"
        >
            <Select.HiddenSelect />
            <Select.Label>{slabel}</Select.Label>
            <Select.Control
                borderColor="brand.border"
                borderWidth="1px"
                borderStyle="solid"
                _focus={{ borderColor: "brand.accent" }}
                _hover={{ borderColor: "brand.accent" }}
            >
                <Select.Trigger   borderColor="brand.border">
                    <Select.ValueText placeholder={splaceholder} />
                </Select.Trigger>
                <Select.IndicatorGroup>
                    <Select.Indicator/>
                </Select.IndicatorGroup>
            </Select.Control>

            <Select.Positioner>
                <Select.Content bg="gray.900">
                    {sdata.items.map((data) => (
                        <Select.Item item={data} key={data.value} _hover={{ bg: "gray.700" }}>
                            {data.label}
                            <Select.ItemIndicator />
                        </Select.Item>
                    ))}
                </Select.Content>
            </Select.Positioner>
        </Select.Root>
    )
}