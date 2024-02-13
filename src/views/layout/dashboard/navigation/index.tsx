/* eslint-disable @typescript-eslint/no-explicit-any */
import Box, { BoxProps } from '@mui/material/Box';
import List from '@mui/material/List';
import { createTheme, responsiveFontSizes, styled, ThemeProvider } from '@mui/material/styles';
import themeConfig from 'configs/theme/themeConfig';
import themeOptions from 'configs/theme/ThemeOptions';
import { useRef, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { hexToRGBA } from 'utils/hex-to-rgba';

import { LayoutProps } from '../types';
import Drawer from './components/drawer';
import NavHeader from './components/header';
import VerticalNavItems from './components/nav-items';

interface Props {
	navWidth: number;
	navVisible: boolean;
	collapsedNavWidth: number;
	hidden: LayoutProps['hidden'];
	navigationBorderWidth: number;
	toggleNavVisibility: () => void;
	settings: LayoutProps['settings'];
	setNavVisible: (value: boolean) => void;
	saveSettings: LayoutProps['saveSettings'];
	navMenuContent: LayoutProps['verticalLayoutProps']['navMenu']['content'];
	navMenuBranding: LayoutProps['verticalLayoutProps']['navMenu']['branding'];
	menuLockedIcon: LayoutProps['verticalLayoutProps']['navMenu']['lockedIcon'];
	verticalNavItems: LayoutProps['verticalLayoutProps']['navMenu']['navItems'];
	navMenuProps: LayoutProps['verticalLayoutProps']['navMenu']['componentProps'];
	menuUnlockedIcon: LayoutProps['verticalLayoutProps']['navMenu']['unlockedIcon'];
	afterNavMenuContent: LayoutProps['verticalLayoutProps']['navMenu']['afterContent'];
	beforeNavMenuContent: LayoutProps['verticalLayoutProps']['navMenu']['beforeContent'];
}

const StyledBoxForShadow = styled(Box)<BoxProps>(({ theme }) => ({
	top: 60,
	left: -8,
	zIndex: 2,
	opacity: 0,
	position: 'absolute',
	pointerEvents: 'none',
	width: 'calc(100% + 15px)',
	height: theme.mixins.toolbar.minHeight,
	transition: 'opacity .15s ease-in-out',
	background: `linear-gradient(${theme.palette.background.paper} ${
		theme.direction === 'rtl' ? '95%' : '5%'
	},${hexToRGBA(theme.palette.background.paper, 0.85)} 30%,${hexToRGBA(
		theme.palette.background.paper,
		0.5,
	)} 65%,${hexToRGBA(theme.palette.background.paper, 0.3)} 75%,transparent)`,
	'&.scrolled': {
		opacity: 1,
	},
}));

const Navigation = (props: Props) => {
	const {
		hidden,
		settings,
		afterNavMenuContent,
		beforeNavMenuContent,
		navigationBorderWidth,
		navMenuContent: userNavMenuContent,
	} = props;

	const [groupActive, setGroupActive] = useState<string[]>([]);
	const [currentActiveGroup, setCurrentActiveGroup] = useState<string[]>([]);

	const shadowRef = useRef(null);

	const { afterVerticalNavMenuContentPosition, beforeVerticalNavMenuContentPosition } = themeConfig;

	const navMenuContentProps = {
		...props,
		groupActive,
		setGroupActive,
		currentActiveGroup,
		setCurrentActiveGroup,
	};

	let darkTheme = createTheme(themeOptions(settings, 'dark'));

	if (themeConfig.responsiveFontSizes) {
		darkTheme = responsiveFontSizes(darkTheme);
	}

	const handleInfiniteScroll = (ref: HTMLElement) => {
		if (ref) {
			// @ts-expect-error abc
			ref._getBoundingClientRect = ref.getBoundingClientRect;

			ref.getBoundingClientRect = () => {
				// @ts-expect-error abc
				const original = ref._getBoundingClientRect();

				return { ...original, height: Math.floor(original.height) };
			};
		}
	};

	const scrollMenu = (container: any) => {
		if (beforeVerticalNavMenuContentPosition === 'static' || !beforeNavMenuContent) {
			container = hidden ? container.target : container;
			if (shadowRef && container.scrollTop > 0) {
				// @ts-expect-error abc
				if (!shadowRef.current.classList.contains('scrolled')) {
					// @ts-expect-error abc
					shadowRef.current.classList.add('scrolled');
				}
			} else {
				// @ts-expect-error abc
				shadowRef.current.classList.remove('scrolled');
			}
		}
	};

	const ScrollWrapper = hidden ? Box : PerfectScrollbar;

	return (
		<ThemeProvider theme={darkTheme}>
			<Drawer {...props} navigationBorderWidth={navigationBorderWidth}>
				<NavHeader {...props} />
				{beforeNavMenuContent && beforeVerticalNavMenuContentPosition === 'fixed'
					? beforeNavMenuContent(navMenuContentProps)
					: null}
				{(beforeVerticalNavMenuContentPosition === 'static' || !beforeNavMenuContent) && (
					<StyledBoxForShadow ref={shadowRef} />
				)}
				<Box sx={{ position: 'relative', overflow: 'hidden' }}>
					{/* @ts-expect-error abc */}
					<ScrollWrapper
						{...(hidden
							? {
									onScroll: (container: any) => scrollMenu(container),
									sx: { height: '100%', overflowY: 'auto', overflowX: 'hidden' },
							  }
							: {
									options: { wheelPropagation: false },
									onScrollY: (container: any) => scrollMenu(container),
									containerRef: (ref: any) => handleInfiniteScroll(ref),
							  })}
					>
						{beforeNavMenuContent && beforeVerticalNavMenuContentPosition === 'static'
							? beforeNavMenuContent(navMenuContentProps)
							: null}
						{userNavMenuContent ? (
							userNavMenuContent(navMenuContentProps)
						) : (
							<List className="nav-items" sx={{ pt: 0, '& > :first-of-type': { mt: '0' } }}>
								<VerticalNavItems
									groupActive={groupActive}
									setGroupActive={setGroupActive}
									currentActiveGroup={currentActiveGroup}
									setCurrentActiveGroup={setCurrentActiveGroup}
									{...props}
								/>
							</List>
						)}
						{afterNavMenuContent && afterVerticalNavMenuContentPosition === 'static'
							? afterNavMenuContent(navMenuContentProps)
							: null}
					</ScrollWrapper>
				</Box>
				{afterNavMenuContent && afterVerticalNavMenuContentPosition === 'fixed'
					? afterNavMenuContent(navMenuContentProps)
					: null}
			</Drawer>
		</ThemeProvider>
	);
};

export default Navigation;
