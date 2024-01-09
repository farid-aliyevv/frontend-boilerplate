import Page from 'components/page';
import Spinner from 'components/spinner';
import { lazy, Suspense, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { createBrowserRouter, Outlet, useLocation } from 'react-router-dom';

import { PrivateRoute as PrivateRoutes } from './PrivateRoute';

const AuthLayout = lazy(() => import('views/layout/auth'));
const LoginPage = lazy(() => import('views/auth/login'));

const SuspenseLayout = () => {
	const { t } = useTranslation();
	const [currentPath, setCurrentPath] = useState('');

	const { pathname } = useLocation();

	useEffect(() => {
		setCurrentPath(pathname);
	}, [pathname]);

	return (
		<Suspense fallback={<Spinner />}>
			<Page title={t(`pages:${currentPath}`)}>
				<Outlet />
			</Page>
		</Suspense>
	);
};

export const router = createBrowserRouter([
	{
		path: '/',
		element: <SuspenseLayout />,
		children: [
			{
				element: <AuthLayout />,
				children: [
					{
						path: '/login',
						element: <LoginPage />,
					},
				],
			},
			{
				element: <PrivateRoutes />,
				children: [
					{
						index: true,
						element: <div>Index</div>,
					},
					{
						path: '/protected',
						element: <div>Protected</div>,
					},
				],
			},
		],
	},
]);
