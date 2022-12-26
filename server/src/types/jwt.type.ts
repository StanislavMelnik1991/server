import { ROLE } from '../constants/user.constants';

export type JwtPayload = { id: number; email: string; role: ROLE };
