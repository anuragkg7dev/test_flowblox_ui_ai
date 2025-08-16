import CustomNumericSlider from "@/components/common/element/CustomNumericSlider";
import { Field, HStack, Text } from "@chakra-ui/react";
import { useEffect } from "react";
import { FaRegFileLines } from "react-icons/fa6";

export default function FieldNumberOfArticle(props) {
  const noOfArticle = props.noOfArticle;
  const setNoOfArticle = props.setNoOfArticle;
  const cml = props.cml;
  const cwidth = props.cwidth;
  const cvariant = props.variant ?? "fbloxD";
  const labelIconSize = props.labelIconSize;

    useEffect(() => {
      console.log('AKG FieldNumberOfArticle ', noOfArticle)
    }, []);

  return (
    <>
      <Field.Root width="100%" color="brand.pureWhiteTxt" fontSize={{ base: "sm", md: "md" }} mt={6} >
        <Field.Label>
          <HStack>
            <FaRegFileLines size={labelIconSize} color="inherit" />
            <Text>Number Articles</Text>
          </HStack>
        </Field.Label>
        <CustomNumericSlider defaultValue={noOfArticle} onChangeSlider={setNoOfArticle} cml={cml} cwidth={cwidth} cvariant={cvariant} />
        <Field.ErrorText ml={cml} fontSize={{ base: "xs", md: "sm" }}>This field is required</Field.ErrorText>
      </Field.Root>


    </>
  );
}