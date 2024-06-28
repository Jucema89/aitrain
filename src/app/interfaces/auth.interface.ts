import { User } from "./user.interface";

export interface SingIn {
    user: User,
    // role: Role,
    token: string
    expires_date: number
    refresh_token: string
}

export interface UserStore {
    user: User,
    // role: Role,
}

export interface RequestRecoveryPassword {
    success: boolean;
    message: string;
}