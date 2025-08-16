import { Field, HStack, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import CustomClickableHover from './CustomClickableHover';

const CustomTimePicker = (props) => {
    const cwidth = props.cwidth
    const onChange = props.onChange
    const defaultHour = props.defaultHour ?? '00'
    const defaultMinute = props.defaultMinute ?? '00'
    const [hour, setHour] = useState(defaultHour);
    const [minute, setMinute] = useState(defaultMinute);
    const [timeZone, setTimeZone] = useState(props.defaultTimeZone?? (Intl?.DateTimeFormat()?.resolvedOptions()?.timeZone ?? 'UTC'));


    const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
    const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

    const HOUR = 'hour'
    const MINUTE = 'minute'

    const handleChange = (type, value) => {
        if (type === HOUR) setHour(value);
        if (type === MINUTE) setMinute(value);

        const time = `${type === 'hour' ? value : hour}:${type === 'minute' ? value : minute}`;
        onChange?.(time);
    };

    const getSelectOPtions = (list) => {
        return list.map((x) => ({ label: String(x), value: String(x) }));
    };

    return (
        <HStack justify={"center"}
            borderColor="brand.greyBrandBorder"
            borderWidth="1px"
            borderStyle="solid"
            width={cwidth}>


            {/* <Text pt={2} mr={1} ml={1}>{"HH"}</Text> */}
            <VStack>
                <HStack >
                    <CustomClickableHover
                        items={getSelectOPtions(hours)}
                        title="Hours"
                        onClickItem={(x) => { handleChange(HOUR, x) }}
                        buttonText={hour}
                    />


                    <CustomClickableHover
                        items={getSelectOPtions(minutes)}
                        title="Minutes"
                        onClickItem={(x) => { handleChange(MINUTE, x) }}
                        buttonText={minute}
                    />

                </HStack>
                <Field.HelperText>HH MM</Field.HelperText>
            </VStack>


            {/* <Text mt={1} ml={1} pr={2}>{timeZone}</Text> */}
        </HStack>

    );
};

export default CustomTimePicker;