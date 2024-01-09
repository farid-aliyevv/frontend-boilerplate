import { styled } from '@mui/material/styles';
import { forwardRef, ReactNode } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

type PageProps = {
	children: ReactNode;
	title?: string;
	className?: string;
	style?: React.CSSProperties;
};

const Root = styled('div')(() => ({
	minHeight: '100%',
}));

const Page = forwardRef<HTMLDivElement, PageProps>(({ children, title = '', ...props }, ref) => {
	const pageTitle = title ? title : import.meta.env.VITE_PROJECT_NAME;

	return (
		<Root ref={ref} {...props}>
			<HelmetProvider>
				<Helmet>
					<title>{pageTitle}</title>
				</Helmet>
				{children}
			</HelmetProvider>
		</Root>
	);
});

Page.displayName = 'Page';

export default Page;
