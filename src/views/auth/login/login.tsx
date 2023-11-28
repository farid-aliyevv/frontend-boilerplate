import { useTranslation } from 'react-i18next';

export const Login = () => {
	const { t } = useTranslation();

	return <div>{t('hello')}</div>;
};
