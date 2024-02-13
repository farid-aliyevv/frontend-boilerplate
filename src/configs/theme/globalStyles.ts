import { Theme } from '@mui/material/styles';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const GlobalStyles = (_theme: Theme) => {
	return {
		'.MuiGrid-container.match-height .MuiCard-root': {
			height: '100%',
		},
		'.iconify g, .iconify path': {
			strokeWidth: 1.5,
		},
	};
};

export default GlobalStyles;
