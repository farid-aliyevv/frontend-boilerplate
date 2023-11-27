import React, { lazy } from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';

const AuthLayout = lazy(() => import('views/layout/auth'));
const LoginPage = lazy(() => import('views/auth/login'));

const SuspenseLayout = () => (
	<React.Suspense fallback={<>Loading...</>}>
		<Outlet />
	</React.Suspense>
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
						path: 'login',
						element: <LoginPage />,
					},
				],
			},
		],
	},
]);
