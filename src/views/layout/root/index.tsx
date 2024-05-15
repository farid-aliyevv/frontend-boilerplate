import { Page } from 'components/page';
import { Spinner } from 'components/spinner';
import { Suspense, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useLocation } from 'react-router-dom';

const RootLayout = () => {
	const { t } = useTranslation();
	const [currentPath, setCurrentPath] = useState('');

	const { pathname } = useLocation();

	useEffect(() => {
		setCurrentPath(pathname);
	}, [pathname]);

	return (
		<Suspense fallback={<Spinner page />}>
			<Page title={t(`pages:${currentPath}`)}>
				<Outlet />
			</Page>
		</Suspense>
	);
};

export default RootLayout;
