export interface Role {
	key: number;
	name: string;
	description: string;
}

export interface User {
	key: number;
	email: string;
	fullName: string;
	status: boolean;
	phone: string;
}
