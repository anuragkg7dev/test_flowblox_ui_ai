import CustomSelect from "@/components/common/element/CustomSelect";
import { Field, HStack, Text } from "@chakra-ui/react";
import { GiArtificialHive } from "react-icons/gi";
import { aiEngineOption } from "../../../DashboardConstant";

export default function FieldAIEngine(props) {
  const aiEngine = props.aiEngine;
  const setAiEngine = props.setAiEngine;
  const cml = props.cml;
  const cwidth = props.cwidth;
  const labelIconSize = props.labelIconSize;

  return (
    <>
      <Field.Root width="100%" color="brand.pureWhiteTxt" fontSize={{ base: "sm", md: "md" }} mt={6} >
        <Field.Label>
          <HStack>
            <GiArtificialHive size={labelIconSize} color="inherit" />
            <Text>Ai Engine</Text>
          </HStack>
        </Field.Label>
        <CustomSelect
          sdata={aiEngineOption}
          defaultSelected={aiEngine}
          slabel=""
          splaceholder="Select"
          cselectCallback={(data) => {setAiEngine(data); console.log(data);}}
          cml={cml}
          cwidth={cwidth} />
        <Field.ErrorText fontSize={{ base: "xs", md: "sm" }}>This field is required</Field.ErrorText>
      </Field.Root>

    </>
  );
}