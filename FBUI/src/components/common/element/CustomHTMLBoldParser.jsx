import { Box, Text } from "@chakra-ui/react"
import { replacePlaceholders } from "../util/StringUtil"

export default function CustomHTMLBoldParser(props) {

    let cmt = props.cmt ?? 0
    let cmb = props.cmb ?? 0
    let cml = props.cml ?? 0
    let cmr = props.cmr ?? 0
    
    let cfontSize = props.cfontSize
    let cfontWeight = props.cfontWeight ?? "bold"
    let ccolor = props.ccolor ?? "brand.bgDark"
    let replaceArr = props.replaceArr
    let htext = props.htext

    if (!htext) return null;

    const processedText = replacePlaceholders(htext, replaceArr);
    const parts = processedText.split(/<b>(.*?)<\/b>|<strong>(.*?)<\/strong>/g).filter(Boolean);

    let txtElement = parts.map((part, index) => {
        const isBold = index % 2 === 1; // Odd-indexed parts are inside <b> or <strong>

        return (
            <Text
                as="span"
                mt={cmt}
                fontSize={cfontSize}
                fontWeight={isBold ? cfontWeight : "normal"}
                color={ccolor}
                display="inline"
                key={index}
            >
                {part}
            </Text>
        );

    });

    return (<><Box mt={cmt} mb={cmb} ml={cml} mr={cmr}>{txtElement}</Box></>)
}

