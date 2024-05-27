import { Box, Button } from '@mui/material';
import Icon from 'components/icon';
import { Modal } from 'components/modal';
import { CustomTextField } from 'components/mui/text-field';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { CreateRoleForm } from '../create/create-role-form';

interface TableHeaderProps {
	value: string;
	handleFilter: (val: string) => void;
}

export const TableHeader = ({ value, handleFilter }: TableHeaderProps) => {
	const { t } = useTranslation();
	const [open, setOpen] = useState<boolean>(false);

	const handleDialogToggle = () => setOpen((open) => !open);

	return (
		<>
			<Box
				sx={{
					p: 5,
					pb: 3,
					display: 'flex',
					flexWrap: 'wrap',
					alignItems: 'center',
					justifyContent: 'space-between',
				}}
			>
				<CustomTextField
					value={value}
					sx={{ mr: 4, mb: 2 }}
					placeholder={t('search')}
					fullWidth={false}
					onChange={(e) => handleFilter(e.target.value)}
				/>
				<Button variant="contained" sx={{ mb: 2, '& svg': { mr: 2 } }} onClick={handleDialogToggle}>
					<Icon fontSize="1.125rem" icon="tabler:plus" />
					{t('add')}
				</Button>
			</Box>
			<Modal open={open} title={t('roles:add')} onClose={handleDialogToggle}>
				<CreateRoleForm handleDialogToggle={handleDialogToggle} />
			</Modal>
		</>
	);
};
