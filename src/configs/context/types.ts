import { ReactNode } from 'react';

import { AppBar, ContentWidth, Footer, Mode, Skin, ThemeColor, VerticalNavToggle } from '../theme/types';

export type Settings = {
	skin: Skin;
	mode: Mode;
	appBar?: AppBar;
	footer?: Footer;
	navHidden?: boolean; // navigation menu
	appBarBlur: boolean;
	navCollapsed: boolean;
	themeColor: ThemeColor;
	contentWidth: ContentWidth;
	layout?: 'vertical' | 'horizontal';
	lastLayout?: 'vertical' | 'horizontal';
	verticalNavToggleType: VerticalNavToggle;
	toastPosition?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
};

export type PageSpecificSettings = {
	skin?: Skin;
	mode?: Mode;
	appBar?: AppBar;
	footer?: Footer;
	navHidden?: boolean; // navigation menu
	appBarBlur?: boolean;
	navCollapsed?: boolean;
	themeColor?: ThemeColor;
	contentWidth?: ContentWidth;
	layout?: 'vertical' | 'horizontal';
	lastLayout?: 'vertical' | 'horizontal';
	verticalNavToggleType?: VerticalNavToggle;
	toastPosition?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
};

export type SettingsContextValue = {
	settings: Settings;
	saveSettings: (updatedSettings: Settings) => void;
};

export interface SettingsProviderProps {
	children: ReactNode;
	pageSettings?: PageSpecificSettings | void;
}
