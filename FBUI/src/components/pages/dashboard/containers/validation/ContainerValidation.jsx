import * as Yup from 'yup';
import { CONTAINERS_KEY, SOURCE_DESTINATION_KEY } from '../ContainersConstant';

export const containerValidationSchema = {
    [CONTAINERS_KEY.NAME]: Yup.string()
        .default('')
        .min(3, 'Minimum 3 characters')
        .max(100, 'Maximum 100 characters')
        .required('Container name is required'),
    [CONTAINERS_KEY.DESCRIPTION]: Yup.string()
        .default('')
        .min(50, 'Minimum 50 characters')
        .max(1000, 'Maximum 1000 characters')
        .required('Description is required'),
    [CONTAINERS_KEY.TAGS]: Yup.array()
        .of(Yup.string().min(2, 'Each tag must be at least 2 characters').max(20, 'Each tag must be at most 20 characters').required('Tag is required'))
        .min(1, 'At least 1 tag is required')
        .max(10, 'Maximum 10 tags allowed')
        .required('Tags are required'),
    [CONTAINERS_KEY.AI_WRITER_PROMPT]: Yup.string()
        .default('')
        .min(50, 'Minimum 50 characters')
        .max(500, 'Maximum 500 characters')
        .required('Writer Prompt is required'),
    [CONTAINERS_KEY.AI_EDITOR_PROMPT]: Yup.string()
        .default('')
        .min(50, 'Minimum 50 characters')
        .max(500, 'Maximum 500 characters')
        .required('Editor Prompt is required'),
}; 


export const destinationValidationSchema = {
    [SOURCE_DESTINATION_KEY.TITLE]: Yup.string()
        .default('')
        .min(3, 'Minimum 3 characters')
        .max(100, 'Maximum 100 characters')
        .required('Container name is required'),
    [SOURCE_DESTINATION_KEY.DESCRIPTION]: Yup.string()
        .default('')
        .min(10, 'Minimum 10 characters')
        .max(100, 'Maximum 100 characters')
        .required('Description is required'),
    [SOURCE_DESTINATION_KEY.URL]: Yup.string()
        .url('Must be a valid URL')
        .required('URL is required'),
};

export const sourceValidationSchema = {
    [SOURCE_DESTINATION_KEY.TITLE]: Yup.string()
        .default('')
        .min(3, 'Minimum 3 characters')
        .max(100, 'Maximum 100 characters')
        .required('Container name is required'),
    [SOURCE_DESTINATION_KEY.DESCRIPTION]: Yup.string()
        .default('')
        .min(10, 'Minimum 10 characters')
        .max(100, 'Maximum 100 characters')
        .required('Description is required'),
    [SOURCE_DESTINATION_KEY.URL]: Yup.string()
        .url('Must be a valid URL')
        .required('URL is required'),
};
