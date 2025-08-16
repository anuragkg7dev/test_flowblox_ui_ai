import { Box, Button, Field, Input, VStack } from "@chakra-ui/react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getCurrentDate } from "../util/DateUtil";

const CustomCalender = (props) => {
  const ckey = props.ckey
  const defaultDate = props.defaultDate ?? getCurrentDate(); // MM/dd/yyyy
  const maxMonth = props.maxMonth ?? 3;
  const maxDays = props.maxDays;
  const eonDateChange = props.eonDateChange;
  const cwidth = props.cwidth


  const [date, setDate] = useState(defaultDate); // MM/dd/yyyy

  // Get today's date
  const today = new Date();

  // Calculate max date (3 months from today)
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + maxMonth);
  if (maxDays) {
    maxDate.setDate(maxDate.getDate() + maxDays);
  }

  const onDateChange = (date) => {
    setDate(date)
    if (eonDateChange) {     
      eonDateChange(date)
    }
  }

  return (

    <Box>
      <DatePicker
        selected={date}
        onChange={(date) => onDateChange(date)}
        customInput={<CustomInput cwidth={cwidth}/>}
        minDate={today}
        maxDate={maxDate}
        calendarClassName="custom-calendar"
        wrapperClassName="custom-datepicker"
      />
      <style jsx>{`
        .custom-datepicker {
          width: 200px;          
        }
        .custom-calendar {
          background: #000000; 
          color: #ffffff;
          border: 1px solid #27272A; 
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        }
        .custom-calendar .react-datepicker__header {
          background: #27272A; 
          color: #ffffff;
          border-bottom: 1px solid #27272A;
        }
        .custom-calendar .react-datepicker__current-month {
          color: #ffffff !important; /* Explicitly set month name to white */
        }
        .custom-calendar .react-datepicker__day,
        .custom-calendar .react-datepicker__day-name {
          color: #ffffff;
        }
        .custom-calendar .react-datepicker__day:hover {
          background: #27272A; 
          
        }
        .custom-calendar .react-datepicker__day--selected,
        .custom-calendar .react-datepicker__day--keyboard-selected {
          background: #873AE1; /* Matches Chakra's blue.400 */
          color: #ffffff;
        }
        .custom-calendar .react-datepicker__triangle {
          border-bottom-color: #27272A;
        }
      `}</style>
    </Box>

  );
};

export default CustomCalender;

// Custom input component to match Chakra UI styling
const CustomInput = ({ value, onClick, cwidth }) => (
  <VStack
    borderColor="brand.greyBrandBorder"
    borderWidth="1px"
    borderStyle="solid"
    width={cwidth}
  >
    {/* <Input
      value={value}
      onClick={onClick}
      width="auto"
      border={"none"}
      _focus={{ border: "none" }}
      height={1}
    /> */}

    <Button
      key={`bte_Date`}
      variant="solid"
      width={"100%"}
      height="auto"     
      onClick={onClick}
    >
      {value}
    </Button>
    <Field.HelperText>Date</Field.HelperText>
  </VStack>
);

