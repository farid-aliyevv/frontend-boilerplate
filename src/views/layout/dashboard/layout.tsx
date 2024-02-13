import Box, { BoxProps } from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import themeConfig from 'configs/theme/themeConfig';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import AppBar from './appBar';
import Navigation from './navigation';
import { LayoutProps } from './types';

const LayoutWrapper = styled('div')({
	height: '100%',
	display: 'flex',
});

const MainContentWrapper = styled(Box)<BoxProps>({
	flexGrow: 1,
	minWidth: 0,
	display: 'flex',
	minHeight: '100vh',
	flexDirection: 'column',
});

const ContentWrapper = styled('main')(({ theme }) => ({
	flexGrow: 1,
	width: '100%',
	padding: theme.spacing(6),
	transition: 'padding .25s ease-in-out',
	[theme.breakpoints.down('sm')]: {
		paddingLeft: theme.spacing(4),
		paddingRight: theme.spacing(4),
	},
}));

const Layout = (props: LayoutProps) => {
	const { settings, contentHeightFixed, verticalLayoutProps } = props;

	const { skin, contentWidth } = settings;
	const navigationBorderWidth = skin === 'bordered' ? 1 : 0;
	const { navigationSize, collapsedNavigationSize } = themeConfig;
	const navWidth = navigationSize;
	const collapsedNavWidth = collapsedNavigationSize;

	const [navVisible, setNavVisible] = useState<boolean>(false);

	const toggleNavVisibility = () => setNavVisible(!navVisible);

	return (
		<>
			<LayoutWrapper>
				<Navigation
					navWidth={navWidth}
					navVisible={navVisible}
					setNavVisible={setNavVisible}
					collapsedNavWidth={collapsedNavWidth}
					toggleNavVisibility={toggleNavVisibility}
					navigationBorderWidth={navigationBorderWidth}
					navMenuContent={verticalLayoutProps.navMenu.content}
					navMenuBranding={verticalLayoutProps.navMenu.branding}
					menuLockedIcon={verticalLayoutProps.navMenu.lockedIcon}
					verticalNavItems={verticalLayoutProps.navMenu.navItems}
					navMenuProps={verticalLayoutProps.navMenu.componentProps}
					menuUnlockedIcon={verticalLayoutProps.navMenu.unlockedIcon}
					afterNavMenuContent={verticalLayoutProps.navMenu.afterContent}
					beforeNavMenuContent={verticalLayoutProps.navMenu.beforeContent}
					{...props}
				/>
				<MainContentWrapper
					className="layout-content-wrapper"
					sx={{ ...(contentHeightFixed && { maxHeight: '100vh' }) }}
				>
					<AppBar
						toggleNavVisibility={toggleNavVisibility}
						appBarContent={verticalLayoutProps.appBar?.content}
						appBarProps={verticalLayoutProps.appBar?.componentProps}
						{...props}
					/>

					<ContentWrapper
						className="layout-page-content"
						sx={{
							...(contentHeightFixed && {
								overflow: 'hidden',
								'& > :first-of-type': { height: '100%' },
							}),
							...(contentWidth === 'boxed' && {
								mx: 'auto',
								'@media (min-width:1440px)': { maxWidth: 1440 },
								'@media (min-width:1200px)': { maxWidth: '100%' },
							}),
						}}
					>
						<Outlet />
					</ContentWrapper>
				</MainContentWrapper>
			</LayoutWrapper>
		</>
	);
};

export default Layout;
