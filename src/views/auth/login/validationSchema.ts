import * as Yup from 'yup';

export const validationSchema = (t) => {
	return Yup.object().shape({
		email: Yup.string().email(t('invalidEmail')).required(t('required')),
		password: Yup.string().required(t('required')),
	});
};
