/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppBarProps, PaletteMode, SwipeableDrawerProps, SxProps, Theme } from '@mui/material';
import { Settings } from 'configs/context/types';
import { ReactNode } from 'react';

export type Layout = 'vertical' | 'horizontal' | 'blank' | 'blankWithAppBar';

export type Skin = 'default' | 'bordered';

export type Mode = PaletteMode | 'semi-dark';

export type ContentWidth = 'full' | 'boxed';

export type AppBar = 'fixed' | 'static' | 'hidden';

export type Footer = 'fixed' | 'static' | 'hidden';

export type ThemeColor = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';

export type VerticalNavToggle = 'accordion' | 'collapse';

export type HorizontalMenuToggle = 'hover' | 'click';

export type BlankLayoutProps = {
	children: ReactNode;
};

export type BlankLayoutWithAppBarProps = {
	children: ReactNode;
};

export type NavSectionTitle = {
	auth?: boolean;
	action?: string;
	subject?: string;
	sectionTitle: string;
};

export type NavGroup = {
	icon?: string;
	title: string;
	auth?: boolean;
	action?: string;
	subject?: string;
	badgeContent?: string;
	children?: (NavGroup | NavLink)[];
	badgeColor?: 'default' | 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
};

export type NavLink = {
	icon?: string;
	path?: string;
	title: string;
	auth?: boolean;
	action?: string;
	subject?: string;
	disabled?: boolean;
	badgeContent?: string;
	externalLink?: boolean;
	openInNewTab?: boolean;
	badgeColor?: 'default' | 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
};

export type VerticalNavItemsType = (NavLink | NavGroup | NavSectionTitle)[];
export type HorizontalNavItemsType = (NavLink | NavGroup)[];

export type FooterProps = {
	sx?: SxProps<Theme>;
	content?: (props?: any) => ReactNode;
};

export type VerticalLayoutProps = {
	appBar?: {
		componentProps?: AppBarProps;
		content?: (props?: any) => ReactNode;
	};
	navMenu: {
		lockedIcon?: ReactNode;
		unlockedIcon?: ReactNode;
		navItems?: VerticalNavItemsType;
		content?: (props?: any) => ReactNode;
		branding?: (props?: any) => ReactNode;
		afterContent?: (props?: any) => ReactNode;
		beforeContent?: (props?: any) => ReactNode;
		componentProps?: Omit<SwipeableDrawerProps, 'open' | 'onOpen' | 'onClose'>;
	};
};

export type HorizontalLayoutProps = {
	appBar?: {
		componentProps?: AppBarProps;
		content?: (props?: any) => ReactNode;
		branding?: (props?: any) => ReactNode;
	};
	navMenu?: {
		sx?: SxProps<Theme>;
		navItems?: HorizontalNavItemsType;
		content?: (props?: any) => ReactNode;
	};
};

export type LayoutProps = {
	hidden: boolean;
	settings: Settings;
	children: ReactNode;
	footerProps?: FooterProps;
	contentHeightFixed?: boolean;
	scrollToTop?: (props?: any) => ReactNode;
	saveSettings: (values: Settings) => void;
	verticalLayoutProps: VerticalLayoutProps;
	horizontalLayoutProps?: HorizontalLayoutProps;
};

declare module '@mui/material/styles' {
	interface Palette {
		customColors: {
			dark: string;
			main: string;
			light: string;
			bodyBg: string;
			trackBg: string;
			avatarBg: string;
			darkPaperBg: string;
			lightPaperBg: string;
			tableHeaderBg: string;
		};
	}
	interface PaletteOptions {
		customColors?: {
			dark?: string;
			main?: string;
			light?: string;
			bodyBg?: string;
			trackBg?: string;
			avatarBg?: string;
			darkPaperBg?: string;
			lightPaperBg?: string;
			tableHeaderBg?: string;
		};
	}
}

declare module '@mui/material/Button' {
	interface ButtonPropsVariantOverrides {
		tonal: true;
	}
}

declare module '@mui/material/ButtonGroup' {
	interface ButtonGroupPropsVariantOverrides {
		tonal: true;
	}
}
