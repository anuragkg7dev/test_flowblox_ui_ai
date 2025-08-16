import CustomSelect from "@/components/common/element/CustomSelect";
import { Field, HStack, Text } from "@chakra-ui/react";
import { sourceOutputOption, strictnessOption } from "../../../DashboardConstant";
import { MdOutlineShare } from "react-icons/md";
import IconSwitch from "@/components/common/element/IconSwitch";
import { FiShield, FiShieldOff } from "react-icons/fi";

export default function FieldStrictness(props) {
  const strictness = props.strictness;
  const setStrictness = props.setStrictness;
  const cml = props.cml;
  const cwidth = props.cwidth;
  const labelIconSize = props.labelIconSize;
  const iconType = props.iconType ?? 'on'

  return (
    <>
      <Field.Root width="100%" color="brand.pureWhiteTxt" fontSize={{ base: "sm", md: "md" }} mt={6} >
        <Field.Label>
          <HStack>
            {iconType == 'on' ? <FiShield size={labelIconSize} color="inherit" /> : <FiShieldOff size={labelIconSize} color="inherit" />}

            <Text>Strictness</Text>
          </HStack>
        </Field.Label>
        <CustomSelect
          sdata={strictnessOption}
          defaultSelected={strictness}
          slabel=""
          splaceholder="Select"
          cselectCallback={(data) => setStrictness(data)}
          cml={cml}
          cwidth={cwidth} />
        <Field.ErrorText fontSize={{ base: "xs", md: "sm" }}>This field is required</Field.ErrorText>
      </Field.Root>
    </>
  );
}