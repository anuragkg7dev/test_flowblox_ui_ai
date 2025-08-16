import CustomSelect from "@/components/common/element/CustomSelect";
import { Field, HStack, Text } from "@chakra-ui/react";
import { GiAbstract089 } from "react-icons/gi";
import { aiModelOption } from "../../../DashboardConstant";

export default function FieldAiModel(props) {
  const aiModel = props.aiModel;
  const setAiModel = props.setAiModel;
  const cml = props.cml;
  const cwidth = props.cwidth;
  const labelIconSize = props.labelIconSize;
  const aiEngine = props.aiEngine;

  const getAiModelOption = (engine) => {
    console.log("filter model ", aiEngine)
    return aiModelOption.filter(x => x.engine == engine)
  }

  return (
    <>
      <Field.Root width="100%" color="brand.pureWhiteTxt" fontSize={{ base: "sm", md: "md" }} mt={6} >
        <Field.Label>
          <HStack>
            <GiAbstract089 size={labelIconSize} color="inherit" />
            <Text>Ai Model</Text>
          </HStack>
        </Field.Label>
        <CustomSelect
          sdata={getAiModelOption(aiEngine)}
          defaultSelected={aiModel}
          slabel=""
          splaceholder="Select"
          cselectCallback={(data) => setAiModel(data)}
          cml={cml}
          cwidth={cwidth} />
        <Field.ErrorText fontSize={{ base: "xs", md: "sm" }}>This field is required</Field.ErrorText>
      </Field.Root>

    </>
  );
}