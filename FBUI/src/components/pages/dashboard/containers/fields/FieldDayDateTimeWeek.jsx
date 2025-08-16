import CustomDateTimeFrequency from "@/components/common/element/CustomDateTimeFrequency";
import { Field, HStack, Text } from "@chakra-ui/react";
import { CiCalendar } from "react-icons/ci";
import { getDateTimeLabel } from "../ContainersUtil";

export default function FieldDayDateTimeWeek(props) {
  const frequency = props.frequency;

  const onCalenderChange = props.onCalenderChange;
  const onTimeChange = props.onTimeChange
  const onWeekChange = props.onWeekChange
  const onDayChange = props.onDayChange

  const defaultDate = props.defaultDate; // MM/dd/yyyy
  const defaultHour = props.defaultHour
  const defaultMinute = props.defaultMinute
  const defaultWeek = props.defaultWeek
  const defaultDay = props.defaultDay
  const defaultTimeZone = props.defaultTimeZone

  const cml = props.cml;
  const cwidth = props.cwidth;
  const labelIconSize = props.labelIconSize

  

  return (
    <>
      <Field.Root width="100%" color="brand.pureWhiteTxt" fontSize={{ base: "sm", md: "md" }} mt={6} >
        <Field.Label>
          <HStack>
            <CiCalendar size={labelIconSize} color="inherit" />
            <Text>{getDateTimeLabel(frequency) + ' Timezone :'+ defaultTimeZone}</Text>
          </HStack>
        </Field.Label>
        <CustomDateTimeFrequency
          frequency={frequency}

          onCalenderChange={onCalenderChange}
          onTimeChange={onTimeChange}
          onWeekChange={onWeekChange}
          onDayChange={onDayChange}

          defaultDate={defaultDate} // MM/dd/yyyy
          defaultHour={defaultHour}
          defaultMinute={defaultMinute}
          defaultWeek={defaultWeek}
          defaultDay={defaultDay}
          defaultTimeZone={defaultTimeZone}

          cml={cml}
          cwidth={cwidth}
        />
        <Field.ErrorText ml={cml} fontSize={{ base: "xs", md: "sm" }}>This field is required</Field.ErrorText>
      </Field.Root>
    </>
  );
}