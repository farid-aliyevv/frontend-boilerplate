export interface User {
	id: string;
	username: string;
}

export interface AuthState {
	currentUser: User | null;
	isLoggedIn: boolean;
}
