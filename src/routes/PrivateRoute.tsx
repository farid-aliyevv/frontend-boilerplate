import { ACCESS_TOKEN_KEY } from 'config';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export const PrivateRoute = () => {
	const location = useLocation();
	const token = localStorage.getItem(ACCESS_TOKEN_KEY);

	if (!token) {
		return <Navigate replace to="/login" state={{ from: location }} />;
	}

	return <Outlet />;
};
