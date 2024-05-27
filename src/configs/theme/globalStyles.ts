import { Theme } from '@mui/material/styles';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const GlobalStyles = (_theme: Theme) => {
	return {
		'.demo-space-x > *': {
			marginTop: '1rem !important',
			marginRight: '1rem !important',
		},
		'.demo-space-y > *:not(:last-of-type)': {
			marginBottom: '1rem',
		},
		'.MuiGrid-container.match-height .MuiCard-root': {
			height: '100%',
		},
		'.iconify g, .iconify path': {
			strokeWidth: 1.5,
		},
	};
};

export default GlobalStyles;
