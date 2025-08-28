import { CommonLabels } from "@/components/common/constants/CommonLabelConstants";
import IconSwitch from "@/components/common/element/IconSwitch";
import {
  Field,
  Heading,
  HStack
} from "@chakra-ui/react";


export default function CommonHeader(props) {
  const name = props.name ?? CommonLabels.MY_BLOX
  const showIcon = props.showIcon;
  const iconType = props.iconType;
  const cmb = props.cmb
  const cmt = props.cmt
  const cml = props.cml
  const cwidth = props.cwidth ?? "100%"
  const cjustifySelf = props.justifySelf ?? "center"
  const cboxSize = props.cboxSize ?? 5


  return (
    <HStack justifyContent="space-between"
      width={cwidth}
      ml={cml}
      mb={cmb}
      mt={cmt}
      justifySelf={cjustifySelf}
    >

      <Field.Root width="100%" color="brand.pureWhiteTxt" fontSize={{ base: "sm", md: "md" }}>
        <Field.Label>
          <HStack>
            {showIcon && (
              <IconSwitch type={iconType} boxSize={cboxSize} />
            )}
            <Heading size="lg" color={"brand.pureWhiteTxt"}>{name}</Heading>
          </HStack>
        </Field.Label>
      </Field.Root>

    </HStack>
  );
}
