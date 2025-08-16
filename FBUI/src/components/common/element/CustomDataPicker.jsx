import { Field, HStack, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import CustomClickableHover from './CustomClickableHover';

const CustomDataPicker = (props) => {
    const cwidth = props.cwidth
    const onChange = props.onChange
    const options = props.options ?? []
    const title = props.title
    const helperText = props.helperText
    const defaultSelected = props.defaultSelected
    const cml = props.cml
    const [selected, setSelected] = useState(defaultSelected);


    const getSelectedLabel = () => {
        const filteredOption = options.filter((x) => x.value == selected);
        return filteredOption.length > 0 ? filteredOption[0].label : 'Select';
    };

    return (
        <HStack justify={"center"}
            borderColor="brand.greyBrandBorder"
            borderWidth="1px"
            borderStyle="solid"
            width={cwidth}
            ml={cml}
            >

            <VStack>

                <CustomClickableHover
                    items={options ?? []}
                    title={title}
                    onClickItem={(x) => { setSelected(x); onChange?.(x); console.log(x); }}
                    buttonText={getSelectedLabel()}
                    cwidth="auto"
                />
                <Field.HelperText>{helperText}</Field.HelperText>


            </VStack>

        </HStack>

    );
};

export default CustomDataPicker;