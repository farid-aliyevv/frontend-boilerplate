import { VerticalNavItemsType } from '../types';

const menuItems = (): VerticalNavItemsType => {
	return [
		{
			title: 'home',
			icon: 'tabler:smart-home',
			path: '/',
		},
	];
};

export default menuItems;
