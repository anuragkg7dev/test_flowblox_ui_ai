import { USERS_KEY } from '@/components/common/constants/CommonConstant';
import * as Yup from 'yup';

export const usersValidationSchema = {
    [USERS_KEY.FNAME]: Yup.string()
        .default('')
        .min(3, 'Minimum 3 characters')
        .max(30, 'Maximum 30 characters')
        .required('Container name is required'),
    [USERS_KEY.LNAME]: Yup.string()
        .default('')
        .min(3, 'Minimum 3 characters')
        .max(30, 'Maximum 30 characters')
        .required('Container name is required'),
    [USERS_KEY.ADDRESS]: Yup.string()
        .default('')
        .min(3, 'Minimum 3 characters')
        .max(300, 'Maximum 300 characters')
        .required('Container name is required'),
    [USERS_KEY.CONTACT]: Yup.string()
        .default('')
        .min(5, 'Minimum 5 characters')
        .max(15, 'Maximum 15 characters')
        .required('Writer Prompt is required'),
};

