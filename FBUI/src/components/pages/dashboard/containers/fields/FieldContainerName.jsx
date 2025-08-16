import { containerValidationSchema } from "@/components/pages/dashboard/containers/validation/ContainerValidation";
import { validate } from "@/components/validation/ValidationUtil";
import { Field, HStack, Input, Text } from "@chakra-ui/react";
import { FiCodesandbox } from "react-icons/fi";
import { CONTAINERS_KEY } from "../ContainersConstant";

export default function FieldContainerName(props) {
  const containerName = props.containerName;
  const setContainerName = props.setContainerName;
  const cml = props.cml;
  const cwidth = props.cwidth;
  const cvariant = props.variant ?? "fbloxD";
  const labelIconSize = props.labelIconSize
  const error = props.error
  const validate = props.validate



  return (
    <>
      <Field.Root width="100%" color="brand.pureWhiteTxt" fontSize={{ base: "sm", md: "md" }} mb={6} invalid={error}  >
        <Field.Label>
          <HStack>
            <FiCodesandbox size={labelIconSize} color="inherit" />
            <Text>Container Name</Text>
          </HStack>
        </Field.Label>
        <Input
          placeholder="Container Name"
          onChange={(e) => setContainerName(e.target.value)}
          mb={2}
          variant={cvariant}
          value={containerName}
          ml={cml}
          width={cwidth}
          onBlur={() => validate?.()}
        />
        <Field.ErrorText ml={cml} fontSize={{ base: "xs", md: "sm" }}>{error}</Field.ErrorText>
      </Field.Root>

    </>
  );
}