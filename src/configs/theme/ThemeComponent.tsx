import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles';
import { Settings } from 'configs/context/types';
import { ReactNode } from 'react';

import GlobalStyling from './globalStyles';
import themeConfig from './themeConfig';
import themeOptions from './ThemeOptions';

interface Props {
	settings: Settings;
	children: ReactNode;
}

const ThemeComponent = (props: Props) => {
	const { settings, children } = props;
	let theme = createTheme(themeOptions(settings, 'light'));

	if (themeConfig.responsiveFontSizes) {
		theme = responsiveFontSizes(theme);
	}

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<GlobalStyles styles={() => GlobalStyling(theme)} />
			{children}
		</ThemeProvider>
	);
};

export default ThemeComponent;
