import { Field, HStack, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import CustomClickableHover from './CustomClickableHover';

const CustomWeekdayPicker = (props) => {
    const cwidth = props.cwidth
    const onChange = props.onChange
    const defaultWeek = props.defaultWeek
    const [weekdayIndex, setWeekdayIndex] = useState(defaultWeek??0);


    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thusday', 'Friday', 'Saturday']


    const getSelectOPtions = (list) => {
        return list.map((x, index) => ({ label: String(x), value: index }));
    };

    return (
        <HStack justify={"center"}
            borderColor="brand.greyBrandBorder"
            borderWidth="1px"
            borderStyle="solid"
            width={cwidth}>

            <VStack>
                
                <CustomClickableHover
                    items={getSelectOPtions(weekdays)}
                    title="Weekdays"
                    onClickItem={(x) => { setWeekdayIndex(x); onChange?.(x); console.log(x); }}
                    buttonText={weekdays[weekdayIndex]}
                    cwidth="auto"
                />
                 <Field.HelperText>{"Weekday"}</Field.HelperText>


            </VStack>
           
        </HStack>

    );
};

export default CustomWeekdayPicker;