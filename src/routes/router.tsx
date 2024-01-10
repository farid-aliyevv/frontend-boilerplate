import Page from 'components/page';
import Spinner from 'components/spinner';
import { lazy, Suspense, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { createBrowserRouter, Navigate, Outlet, useLocation } from 'react-router-dom';

import { PrivateRoute as PrivateRoutes } from './PrivateRoute';

const AuthLayout = lazy(() => import('views/layout/auth'));
const LoginPage = lazy(() => import('views/auth/login'));
const NotFoundPage = lazy(() => import('views/misc/404'));

const RootLayout = () => {
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
		element: <RootLayout />,
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
			{
				path: '/404',
				element: <NotFoundPage />,
			},
			{
				path: '*',
				element: <Navigate replace to="/404" />,
			},
		],
	},
]);
