import { Field, HStack, Text, Textarea } from "@chakra-ui/react";
import { HiOutlinePencilSquare } from "react-icons/hi2";

export default function FieldDescription(props) {
  const description = props.description;
  const setDescription = props.setDescription;
  const cml = props.cml;
  const cwidth = props.cwidth;
  const cvariant = props.variant ?? "fbloxD";
  const labelIconSize = props.labelIconSize
  const error = props.error
  const validate = props.validate



  return (
    <>
      <Field.Root width="100%" color="brand.pureWhiteTxt" fontSize={{ base: "sm", md: "md" }} mb={6} invalid={error}>
        <Field.Label>
          <HStack>
            <HiOutlinePencilSquare size={labelIconSize} color="inherit" />
            <Text>Description</Text>
          </HStack>
        </Field.Label>

        <Textarea
          width={cwidth}
          placeholder="Start typing..."
          variant={cvariant}
          ml={cml}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onBlur={() => validate?.()}
          autoresize
          maxH={"300px"}
        />

        <Field.ErrorText ml={cml} fontSize={{ base: "xs", md: "sm" }}>{error}</Field.ErrorText>
      </Field.Root>

    </>
  );
}