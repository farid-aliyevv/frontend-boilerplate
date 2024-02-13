import IconButton from '@mui/material/IconButton';
import Icon from 'components/icon';
import { useSettings } from 'configs/context/settingsContext';
import { Mode } from 'configs/theme/types';

const ModeToggler = () => {
	const { settings, saveSettings } = useSettings();

	const handleModeChange = (mode: Mode) => {
		saveSettings({ ...settings, mode: mode });
	};

	const handleModeToggle = () => {
		if (settings.mode === 'light') {
			handleModeChange('dark' as Mode);
		} else {
			handleModeChange('light' as Mode);
		}
	};

	return (
		<IconButton color="inherit" onClick={handleModeToggle}>
			<Icon fontSize="1.625rem" icon={settings.mode === 'dark' ? 'tabler:sun' : 'tabler:moon-stars'} />
		</IconButton>
	);
};

export default ModeToggler;
