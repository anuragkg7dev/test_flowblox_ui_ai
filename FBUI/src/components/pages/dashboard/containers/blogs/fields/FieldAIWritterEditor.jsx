import IconSwitch from "@/components/common/element/IconSwitch";
import { Field, HStack, Text, Textarea } from "@chakra-ui/react";
import { TfiCheckBox } from "react-icons/tfi";

export default function FieldAIWritterEditor(props) {
  const value = props.value;
  const setValue = props.setValue;
  const cml = props.cml;
  const cwidth = props.cwidth;
  const cvariant = props.variant ?? "fbloxD";
  const labelIconSize = props.labelIconSize
  const clabel = props.clabel
  const iconType = props.iconType

  const error = props.error
  const validate = props.validate

  console.log("val.... ", value)
  return (
    <>
      <Field.Root width="100%" color="brand.pureWhiteTxt" fontSize={{ base: "sm", md: "md" }} mb={6} invalid={error}>
        <Field.Label>
          <HStack>
            <TfiCheckBox size={labelIconSize} color="inherit" />
            <Text>{clabel}</Text>
          </HStack>
        </Field.Label>

        <Textarea
          width={cwidth}
          placeholder="Start typing..."
          variant={cvariant}
          ml={cml}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          height={"xs"}
          onBlur={() => validate?.()}
        />

        <Field.ErrorText ml={cml} fontSize={{ base: "xs", md: "sm" }}>{error}</Field.ErrorText>
      </Field.Root>

    </>
  );
}