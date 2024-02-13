import './index.css';
import 'i18n';
import 'react-perfect-scrollbar/dist/css/styles.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { store } from 'app/store';
import ReactHotToast from 'components/react-hot-toast';
import { SettingsConsumer, SettingsProvider } from 'configs/context/settingsContext';
import ThemeComponent from 'configs/theme/ThemeComponent';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { router } from 'routes';

export const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<Provider store={store}>
				<SettingsProvider>
					<SettingsConsumer>
						{({ settings }) => {
							return (
								<ThemeComponent settings={settings}>
									<RouterProvider router={router} />
									<ReactHotToast>
										<Toaster
											position={settings.toastPosition}
											toastOptions={{ className: 'react-hot-toast' }}
										/>
									</ReactHotToast>
								</ThemeComponent>
							);
						}}
					</SettingsConsumer>
				</SettingsProvider>
			</Provider>
		</QueryClientProvider>
	</React.StrictMode>,
);
