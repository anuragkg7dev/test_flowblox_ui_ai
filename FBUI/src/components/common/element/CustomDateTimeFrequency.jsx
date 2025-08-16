import { FREQUENCY_TYPE } from '@/components/client/EdgeConstant';
import { HStack } from '@chakra-ui/react';
import CustomCalender from './CustomCalender';
import CustomDayPicker from './CustomDayPicker';
import CustomTimePicker from './CustomTimePicker';
import CustomWeekdayPicker from './CustomWeekdayPicker';


const CustomDateTimeFrequency = (props) => {
  const frequency = props.frequency ?? FREQUENCY_TYPE.CUSTOM

  const maxMonth = props.maxMonth ?? 3;
  const maxDays = props.maxDays;

  const cwidth = props.cwidth
  const iwidth = "100%"
  const cml = props.cml

  const defaultDate = props.defaultDate; // MM/dd/yyyy
  const defaultHour = props.defaultHour
  const defaultMinute = props.defaultMinute
  const defaultWeek = props.defaultWeek
  const defaultDay = props.defaultDay
  const defaultTimeZone = props.defaultTimeZone

  const onCalenderChange = props.onCalenderChange;
  const onTimeChange = props.onTimeChange
  const onWeekChange = props.onWeekChange
  const onDayChange = props.onDayChange



  return (
    <>
      <HStack width={cwidth} ml={cml}>
        {frequency == FREQUENCY_TYPE.CUSTOM && (<>
          <CustomCalender
            defaultDate={defaultDate} // MM/dd/yyyy
            maxMonth={maxMonth}
            maxDays={maxDays}
            eonDateChange={onCalenderChange} />
        </>)}

        {frequency == FREQUENCY_TYPE.WEEKLY && (<>
          <CustomWeekdayPicker
            defaultWeek={defaultWeek}
            cwidth={iwidth}
            onChange={onWeekChange} />
        </>)}

        {frequency == FREQUENCY_TYPE.MONTHLY && (<>
          <HStack>
            <CustomDayPicker
              defaultDay={defaultDay}
              onChange={onDayChange}
              cwidth={iwidth}
            />
          </HStack>
        </>)}

        <CustomTimePicker
          cwidth={iwidth}
          onChange={onTimeChange}
          defaultHour={defaultHour}
          defaultMinute={defaultMinute}
          defaultTimeZone={defaultTimeZone}
        />

      </HStack>
    </>
  );
};

export default CustomDateTimeFrequency;