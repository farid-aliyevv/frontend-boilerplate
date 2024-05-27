import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import { PrivateRoute as PrivateRoutes } from './PrivateRoute';

const RootLayout = lazy(() => import('views/layout/root'));
const AuthLayout = lazy(() => import('views/layout/auth'));
const DashboardLayout = lazy(() => import('views/layout/dashboard'));

const LoginPage = lazy(() => import('views/auth/login'));

const HomePage = lazy(() => import('views/dashboard/home'));
const RolesPage = lazy(() => import('views/dashboard/roles'));

const NotFoundPage = lazy(() => import('views/misc/404'));

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
						element: <DashboardLayout />,
						children: [
							{
								index: true,
								element: <HomePage />,
							},
							{
								path: '/roles',
								element: <RolesPage />,
							},
						],
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
