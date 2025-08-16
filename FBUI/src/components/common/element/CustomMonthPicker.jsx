import { Field, HStack, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import CustomClickableHover from './CustomClickableHover';

const CustomMonthPicker = (props) => {
    const defaultMonth = props.defaultMonth ?? 0
    const { cwidth, onChange } = props;
    const [monthIndex, setMonthIndex] = useState(defaultMonth);

    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    const getSelectOptions = (list) => {
        return list.map((x, index) => ({ label: String(x), value: index, index }));
    };

    return (
        <HStack
            justify="center"
            borderColor="brand.greyBrandBorder"
            borderWidth="1px"
            borderStyle="solid"
            width={cwidth}
        >
            <VStack>

                <CustomClickableHover
                    items={getSelectOptions(months)}
                    title="Months"
                    onClickItem={(x) => {
                        setMonthIndex(x);
                        onChange?.(x);
                        console.log(x);
                    }}
                    buttonText={months[monthIndex]}
                    cwidth="auto"
                />
                <Field.HelperText>{"Month"}</Field.HelperText>

            </VStack>
        </HStack>
    );
};

export default CustomMonthPicker;