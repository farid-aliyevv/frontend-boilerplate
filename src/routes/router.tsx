import { lazy, Suspense } from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';

import { PrivateRoute as PrivateRoutes } from './PrivateRoute';

const AuthLayout = lazy(() => import('views/layout/auth'));
const LoginPage = lazy(() => import('views/auth/login'));

const SuspenseLayout = () => (
	<Suspense fallback={<>Loading...</>}>
		<Outlet />
	</Suspense>
);

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
