import CustomTagInput from "@/components/common/element/CustomTagInput";
import { Field, HStack, Text } from "@chakra-ui/react";
import { FiTag } from "react-icons/fi";

export default function FieldTagEditor(props) {
  const tags = props.tags;
  const setTags = props.setTags;
  const cml = props.cml;
  const cwidth = props.cwidth;
  const cvariant = props.variant ?? "fbloxD";
  const labelIconSize = props.labelIconSize
  const error = props.error
  const validate = props.validate



  return (
    <>
      <Field.Root width="100%" color="brand.pureWhiteTxt" fontSize={{ base: "sm", md: "md" }} invalid={error} >
        <Field.Label>
          <HStack>
            <FiTag size={labelIconSize} color="inherit" />
            <Text>Tag Editor</Text>
          </HStack>
        </Field.Label>
        <CustomTagInput validate={validate} cml={cml} cwidth={cwidth} cvariant={cvariant} tags={tags} setTags={setTags} iconColorPalette="brand.pureBlackBg" />
        <Field.ErrorText ml={cml} fontSize={{ base: "xs", md: "sm" }}>{error}</Field.ErrorText>
      </Field.Root>
    </>
  );
}