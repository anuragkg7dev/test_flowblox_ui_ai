import CustomSelect from "@/components/common/element/CustomSelect";
import { Field, HStack, Text } from "@chakra-ui/react";
import { TbRefresh } from "react-icons/tb";
import { toneOfVoiceOption } from "../../../DashboardConstant";

export default function FieldToneOfVoice(props) {
  const toneOfVoice = props.toneOfVoice;
  const setToneOfVoice = props.setToneOfVoice;
  const cml = props.cml;
  const cwidth = props.cwidth;
  const labelIconSize = props.labelIconSize;

  return (
    <>
      <Field.Root width="100%" color="brand.pureWhiteTxt" fontSize={{ base: "sm", md: "md" }} mt={6} >
        <Field.Label>
          <HStack>
            <TbRefresh size={labelIconSize} color="inherit" />
            <Text>Tone of Voice</Text>
          </HStack>
        </Field.Label>
        <CustomSelect
          sdata={toneOfVoiceOption}
          defaultSelected={toneOfVoice}
          slabel=""
          splaceholder="Select"
          cselectCallback={(data) => setToneOfVoice(data)}
          cml={cml}
          cwidth={cwidth} />
        <Field.ErrorText fontSize={{ base: "xs", md: "sm" }}>This field is required</Field.ErrorText>
      </Field.Root>

    </>
  );
}