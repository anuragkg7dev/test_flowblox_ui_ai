import { Status } from "@chakra-ui/react";
import React from "react";

function CustomStatusDot(props) {
    const type = props.type
    const cml = props.cml
    const cmr = props.cmr
    const cmt = props.cmt
    const cmb = props.cmb
    const csize = props.csize
    return (

        <Status.Root colorPalette={type} ml={cml} mr={cmr} mt={cmt} mb={cmb} size={csize} >
            <Status.Indicator />
            {` `}
        </Status.Root>

    )
}

export default React.memo(CustomStatusDot);
