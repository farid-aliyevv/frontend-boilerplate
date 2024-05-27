import { Grid, Typography } from '@mui/material';
import { PageHeader } from 'components/page-header';
import { useTranslation } from 'react-i18next';

import { Table } from './components/table';

export const Roles = () => {
	const { t } = useTranslation();

	return (
		<Grid container spacing={6}>
			<Grid item xs={12}>
				<PageHeader
					title={
						<Typography variant="h4" sx={{ mb: 4 }}>
							{t('roles:pageTitle')}
						</Typography>
					}
				/>
			</Grid>
			<Grid item xs={12}>
				<Table />
			</Grid>
		</Grid>
	);
};
