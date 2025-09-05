import { HStack, Tag, Text } from "@chakra-ui/react"
import CustomeCloseIcon from "./CustomeCloseIcon"
import { memo } from "react"
import { UX } from "../constants/CommonConstant"

function CustomTag(props) {

    let ckey = props.ckey ?? "ctag"
    let cmt = props.cmt != undefined ? props.cmt : 2
    let name = props.name ?? 2
    let cbg = props.cbg ?? "brand.subBrandBg"
    let txtColor = props.txtColor ?? "brand.pureWhiteTxt"
    let cpx = props.cpx != undefined ? props.cpx : 2
    let csize = props.csize ?? "md"

    let id = props.id
    let cvariant = props.cvariant
    let closeSize = props.closeSize ?? "3xs"
    let onClick = props.onClick
    let iconColorPalette = props.iconColorPalette ?? "brand.pureBlackBg"

    return (
        <>
            <Tag.Root key={ckey} mt={cmt} size={csize} rounded="full" bg={cbg} variant={'subtle'} >
                <Tag.Label >
                    <HStack px={cpx}>
                        <Text key={'tx_'+ckey} color={txtColor} fontWeight="bold"> {name} </Text>
                        {onClick && (<>
                            <CustomeCloseIcon
                                id={id}
                                ckey={ckey + "_close"}
                                cbg={cbg}
                                cvariant={cvariant}
                                csize={closeSize}
                                onClose={onClick}
                                iconColorPalette={iconColorPalette}
                            />
                        </>)}
                    </HStack>
                </Tag.Label>
            </Tag.Root>
        </>
    )
}

export default memo(CustomTag);
