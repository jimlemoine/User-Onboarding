import * as yup from 'yup';

const formSchema = yup.object().shape({
    name: yup
        .string()
        .trim()
        .required('Please input your name, it is required'),
    email: yup
        .string()
        .email('Must be a valid email address!')
        .required('Please input your email address, it is required'),
    password: yup
        .string()
        .trim()
        .min(7, 'Password must be 7 characters or more'),
    terms: yup
        .boolean()
        .required('Please agree to the terms of service')
        .oneOf([true], 'Please agree to the terms of service')
})

export default formSchema;