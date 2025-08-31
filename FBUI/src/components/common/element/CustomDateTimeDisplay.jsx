import { Text } from "@chakra-ui/react";

export default function CustomDateTimeDisplay(props) {
    const utcDate = new Date(props.cdate);
    const localDate = utcDate.toLocaleString();
    const cfontSize = props.cfontSize
    const cmt = props.cmt
    
    return <Text mt={cmt}fontSize={cfontSize} color={'brand.pureWhiteTxt'}>{localDate}</Text>;
}
