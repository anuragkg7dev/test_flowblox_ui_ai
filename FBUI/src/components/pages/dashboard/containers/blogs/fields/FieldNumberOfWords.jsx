import CustomNumericSlider from "@/components/common/element/CustomNumericSlider";
import { Field, HStack, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { TfiText } from "react-icons/tfi";

export default function FieldNumberOfWords(props) {
  const noOfWords = props.noOfWords;
  const setNoOfWords = props.setNoOfWords;
  const cml = props.cml;
  const cwidth = props.cwidth;
  const cvariant = props.variant ?? "fbloxD";
  const labelIconSize = props.labelIconSize;


  return (
    <>
      <Field.Root width="100%" color="brand.pureWhiteTxt" fontSize={{ base: "sm", md: "md" }} mt={6} >
        <Field.Label>
          <HStack>
            <TfiText size={labelIconSize} color="inherit" />
            <Text>Number Words</Text>
          </HStack>
        </Field.Label>
        <CustomNumericSlider cvariant={cvariant} onChangeSlider={(value) => setNoOfWords(value)} defaultValue={noOfWords} cml={cml} cwidth={cwidth} cmin={100} cmax={5000} />
        <Field.ErrorText ml={cml} fontSize={{ base: "xs", md: "sm" }}>This field is required</Field.ErrorText>
      </Field.Root>
    </>
  );
}