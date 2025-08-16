import { Field, HStack, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import CustomClickableHover from './CustomClickableHover';

const CustomDayPicker = (props) => {
    const defaultDay = props.defaultDay ?? 1
    const cwidth = props.cwidth
    const onChange = props.onChange
    const [dayIndex, setDayIndex] = useState(defaultDay - 1);

    // Generate days 1 to 31 without suffixes
    const days = Array.from({ length: 31 }, (_, i) => String(i + 1));

    const getSelectOptions = (list) => {
        return list.map((x, index) => ({ label: String(x), value: index, index }));
    };

    return (
        <HStack
            justify="space-between"
            borderColor="brand.greyBrandBorder"
            borderWidth="1px"
            borderStyle="solid"
            width={cwidth}
            ml={1}
             mr={1}
        >
            <VStack>

                <CustomClickableHover
                    items={getSelectOptions(days)}
                    title="Days"
                    onClickItem={(x) => {
                        setDayIndex(x);
                        onChange?.(x);
                        console.log(x);
                    }}
                    buttonText={days[dayIndex]}
                    cwidth="auto"
                />
                <Field.HelperText>{"Day"}</Field.HelperText>
            </VStack>
        </HStack>
    );
};

export default CustomDayPicker;