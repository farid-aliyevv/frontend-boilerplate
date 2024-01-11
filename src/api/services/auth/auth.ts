import { request } from 'api';

import { LoginRequestDto, LoginResponseDto } from './auth.dto';

export const auth = {
	login: (data: LoginRequestDto) => request.post<LoginResponseDto>('/auth/login', data),
};
