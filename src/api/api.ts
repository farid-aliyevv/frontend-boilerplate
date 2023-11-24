import axios, { AxiosError, AxiosResponse } from 'axios';
import { ACCESS_TOKEN_KEY, USER_KEY } from 'config';

const baseURL = import.meta.env.VITE_BACKEND_URL;

export const api = axios.create({
	baseURL,
	headers: {
		'Content-Type': 'application/json',
	},
});

api.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem(ACCESS_TOKEN_KEY);
		if (token) {
			config.headers['Authorization'] = `Bearer ${token}`;
		}

		return config;
	},
	(error: AxiosError) => {
		return Promise.reject(error);
	},
);

api.interceptors.response.use(
	(response) => {
		return response;
	},
	(error: AxiosError) => {
		const { status } = error.response!;
		switch (status) {
			case 403:
				// If a 403 error is received, it likely means the token has expired.
				// You can remove the token from local storage and redirect the user to the login page.
				localStorage.removeItem(ACCESS_TOKEN_KEY);
				localStorage.removeItem(USER_KEY);
				window.location.href = '/login';
				break;
		}

		return Promise.reject(error);
	},
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

export const request = {
	get: <T>(url: string, config?: object) => axios.get<T>(url, config).then(responseBody),
	post: <T>(url: string, body: object) => axios.post<T>(url, body).then(responseBody),
};
