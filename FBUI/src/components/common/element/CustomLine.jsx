import { Box, Separator } from "@chakra-ui/react";
import { memo } from "react";


function CustomLine(props) {
    let ckey = props.ckey
    let cwidth = props.cwidth ?? "100%";
    let cmt = props.cmt
    let cmb = props.cmb
    let border = props.border ?? '0.1px solid'
    let color = props.color ?? 'brand.greyBrandBorder'

    return (<Separator key={ckey} width={cwidth} height="0" mt={cmt} mb={cmb} borderTop={border} borderTopColor={color} />);
}

export default memo(CustomLine);