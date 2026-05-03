export type AuthCredentials = {
	email: string;
	password: string;
};

export type AuthResponse = {
	accessToken: string;
};

export type CurrentUser = {
	sub: string;
	email: string;
};
