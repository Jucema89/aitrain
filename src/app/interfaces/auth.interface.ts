import { User } from "./user.interface";

export interface SingIn {
    success: boolean
    user: UserStore,
    token: string
    message?: string
    expires_date: number
    refresh_token: string
}

export interface UserStore {
    id: string
    email: string
    name: string
    lastName: string
    phone: string
    role: string
    image: string
    country: string
    state: string
    city: String
    type_person: TypePerson
    type_dni: TypeDNI
    dni: string
    birth_date: string
    user_validate_email: boolean
    google_register: boolean
    facebook_register: boolean
    plan_active: string
    active_account: boolean
    createdAt: string
    updatedAt: string

}

export type TypePerson = 'person' | 'company'
export type TypeDNI = 'CC' | 'NIT' | 'TE' | 'DNI'
export type Role =
    'superadmin' | 
    'admin' |
    'user_person' |
    'user_company'

export interface RequestRecoveryPassword {
    success: boolean;
    title: string,
    message: string;
}