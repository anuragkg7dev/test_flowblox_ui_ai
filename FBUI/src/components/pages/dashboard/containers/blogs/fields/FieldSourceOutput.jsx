import CustomSelect from "@/components/common/element/CustomSelect";
import { Field, HStack, Text } from "@chakra-ui/react";
import { sourceOutputOption } from "../../../DashboardConstant";
import { MdOutlineShare } from "react-icons/md";

export default function FieldSourceOutput(props) {
  const sourceOutput = props.sourceOutput;
  const setSourceOutput = props.setSourceOutput;
  const cml = props.cml;
  const cwidth = props.cwidth;
  const labelIconSize = props.labelIconSize;
  const sources = props.sources

  const getSourceOptions = () => {
    if (sources && sources.length > 0) {
      return sources.map(x => ({ label: x.name, value: x.id }));
    }
    return [];
  };


  return (
    <>
      <Field.Root width="100%" color="brand.pureWhiteTxt" fontSize={{ base: "sm", md: "md" }} mt={6} >
        <Field.Label>
          <HStack>
            <MdOutlineShare size={labelIconSize} color="inherit" />
            <Text>Source Output</Text>
          </HStack>
        </Field.Label>
        <CustomSelect
          sdata={getSourceOptions()}
          slabel=""
          splaceholder="Select"
          cselectCallback={(data) => setSourceOutput(data)}
          cml={cml}
          cwidth={cwidth} />
        <Field.ErrorText fontSize={{ base: "xs", md: "sm" }}>This field is required</Field.ErrorText>
      </Field.Root>

    </>
  );
}