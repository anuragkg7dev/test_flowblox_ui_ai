import { Text } from "@chakra-ui/react";

export default function CustomDateTimeDisplay(props) {
    const utcDate = new Date(props.cdate);
    const localDate = utcDate.toLocaleString();
    const cfontSize = props.cfontSize
    const cmt = props.cmt
    const ccolor = props.ccolor ?? 'brand.pureWhiteTxt'

    return <Text mt={cmt} fontSize={cfontSize} color={ccolor}>{localDate}</Text>;
}
