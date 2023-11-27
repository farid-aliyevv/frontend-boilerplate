import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
	return (
		<div>
			<div>top</div>
			<Outlet />
			<div>bottom</div>
		</div>
	);
};

export default AuthLayout;
