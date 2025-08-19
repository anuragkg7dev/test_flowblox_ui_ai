import { Text } from "@chakra-ui/react";

export default function CustomDateTimeDisplay(props) {
    const utcDate = new Date(props.cdate);
    const localDate = utcDate.toLocaleString();
    return <Text color={'brand.pureWhiteTxt'}>{localDate}</Text>;
}
