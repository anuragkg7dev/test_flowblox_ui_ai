import { Field, HStack, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import { SiCurl } from "react-icons/si";

export default function SquarespaceDetails(props) {
  const config = props.config;
  const cml = props.cml;
  const cwidth = props.cwidth;
  const cvariant = props.variant ?? "fbloxD";
  const labelIconSize = props.labelIconSize
  const error = props.error
  const validate = props.validate

  const [url, setUrl] = useState(config?.url ?? '')

  return (
    <>
      <Field.Root width="100%" color="brand.pureWhiteTxt" fontSize={{ base: "sm", md: "md" }} mb={6} invalid={error}>
        <Field.Label>
          <HStack>
            <SiCurl size={labelIconSize} color="inherit" />
            <Text>URL</Text>
          </HStack>
        </Field.Label>
        <Input
          placeholder="Squarespace URL"
          onChange={(e) => { setUrl(e.target.value); updateConfig('url', e.target.value); }}
          mb={2}
          variant={cvariant}
          value={url}
          ml={cml}
          width={cwidth}
          onBlur={() => validate?.()}
        />
        <Field.ErrorText ml={cml} fontSize={{ base: "xs", md: "sm" }}>{error}</Field.ErrorText>
      </Field.Root>

    </>
  );
}