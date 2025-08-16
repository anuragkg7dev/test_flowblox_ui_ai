import { Icon, IconButton } from "@chakra-ui/react";
import { memo } from "react";
import { IoCloseSharp } from "react-icons/io5";


function CustomCloseIcon(props) {
    let ckey = props.ckey
    let onClose = props.onClose;
    let cbg = props.cbg ?? "brand.OffBlackBg"
    let iconColorPalette = props.iconColorPalette ?? "brand.pureWhiteBg"
    let csize = props.csize ?? { base: "sm", md: "md" }
    let cvariant = props.cvariant ?? "ghost"
    let id = props.id

    return (
        <IconButton
            key={ckey}
            aria-label="Close"
            bg={cbg}
            variant={cvariant}
            size={csize}
            onClick={(event) => {
                if (onClose) {
                    event.stopPropagation();
                    if (id) {
                        onClose(id)
                    } else {
                        onClose();
                    }

                }
            }}>
            <Icon as={IoCloseSharp} color={iconColorPalette} />
        </IconButton>
    );
}

export default memo(CustomCloseIcon);