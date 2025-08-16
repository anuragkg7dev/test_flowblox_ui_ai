import CustomSelect from "@/components/common/element/CustomSelect";
import { Field, HStack, Text } from "@chakra-ui/react";
import { TbRefresh } from "react-icons/tb";
import { frquencyOption } from "../../DashboardConstant";

export default function FieldFrequency(props) {
  const frequency = props.frequency;
  const setFrequency = props.setFrequency;
  const onFrequencyUpdate = props.onFrequencyUpdate;
  const cml = props.cml;
  const cwidth = props.cwidth;
  const labelIconSize = props.labelIconSize;

  

  return (
    <>
      <Field.Root width="100%" color="brand.pureWhiteTxt" fontSize={{ base: "sm", md: "md" }} mt={6} >
        <Field.Label>
          <HStack>
            <TbRefresh size={labelIconSize} color="inherit" />
            <Text>Frequency</Text>
          </HStack>
        </Field.Label>
        <CustomSelect
          sdata={frquencyOption}
          slabel=""
          splaceholder="Select"
          cselectCallback={(data) => {onFrequencyUpdate(data);setFrequency(data)}}
          cml={cml}
          cwidth={cwidth} 
          defaultSelected={frequency}
          />
        <Field.ErrorText ml={cml} fontSize={{ base: "xs", md: "sm" }}>This field is required</Field.ErrorText>
      </Field.Root>

    </>
  );
}