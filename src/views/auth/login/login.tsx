import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

export const Login = () => {
	const { t } = useTranslation();
	const location = useLocation();
	const from = location.state ? location.state.from : undefined;
	console.log(from);

	return <Typography variant="h1">{t('hello')}</Typography>;
};
