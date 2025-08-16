"use client"

import { HStack, Input, Slider } from "@chakra-ui/react"
import { useState } from "react"
import { FaCircle } from "react-icons/fa"

export default function CustomNumericSlider(props) {
    let defaultValue = props.defaultValue ?? 1
    let cmax = props.cmax ?? 10
    let cmin = props.cmin ?? 1
    let ccolor = props.ccolor ?? "brand.primaryBrandBg"
    let coffcolor = props.coffcolor ?? "brand.greyBrandBorder"
    let onChangeSlider = props.onChangeSlider
    let cmt = props.cmt
    let cmb = props.cmb
    let cml = props.cml
    let height = props.height ?? "4px"
    let ckey = props.ckey
    let cwidth = props.cwidth ?? "100%"
    let cmaxW = props.cmaxW ?? "100%"
    let cvariant = props.cvariant ?? "fbloxD"


    const [sliderValue, setSliderValue] = useState([defaultValue])

    const onChange = (value) => {
        setSliderValue(value);
        onChangeSlider?.(value?.[0]);     
    }

    return (
        <HStack mt={cmt} mb={cmb} ml={cml} width={cwidth} >
            <HStack justify="flex-start" align="center" width={"80%"} border={'0.1px solid'} borderColor={"brand.greyBrandBorder"} rounded="sm" height={10}>
                <Slider.Root
                    maxW={cmaxW}
                    value={sliderValue}
                    key={ckey}
                    defaultValue={[defaultValue]}
                    width={"100%"}
                    max={cmax}
                    min={cmin}
                    onValueChange={(e) => {  onChange(e.value); }}
                    variant={"solid"}
                    color={ccolor}
                    pl={2}
                    pr={2}

                >
                    <Slider.Control>
                        <Slider.Track bg={coffcolor} height={height} >
                            <Slider.Range bg={ccolor} />
                        </Slider.Track>
                        <Slider.Thumb index={0} boxSize={4} color={ccolor} borderColor={ccolor} >
                            <FaCircle color={ccolor} />
                        </Slider.Thumb>
                    </Slider.Control>
                </Slider.Root>
            </HStack>

            <Input
                placeholder=""
                onChange={(e) => {onChangeSlider(e.target.value); setSliderValue([e.target.value])}}
                variant={cvariant}
                value={sliderValue}
                width={"20%"}
            />
        </HStack>
    )
}
