import { Text } from '@chakra-ui/react';
import React from 'react';

const CustomDate = (props) => {

  let iDate = props.iDate
  let cKey = props.cKey ?? "cd"
  let timeStyle = props.timeStyle //'short'
  let dateStyle = props.dateStyle??'medium'

  // Parse the server date and convert to local timezone
  const localDate = new Date(iDate);
  
  const formattedDate = localDate.toLocaleString(navigator.language, {
    dateStyle: dateStyle, // e.g., "May 14, 2025"
    timeStyle: timeStyle, // e.g., "3:30 PM"
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, // Browser's timezone
  });

  return <Text key={"cdtxt_" + cKey}>{formattedDate}</Text>;
};

export default CustomDate;