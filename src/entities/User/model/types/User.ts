export interface Tokens {
    accessToken: string;
    refreshToken: string;
}

export enum UserRoles {
    GUEST = 'guest',
    EMPLOYER = 'employer',
    LEAD = 'lead',
}

export enum AuthErrorTypes {
    BAD_CREDENTIALS = 'bad_credentials',
    NOT_FOUND = 'not_found',
    USER_EXIST = 'user_exist',
}

export interface ServerUser {
    id: number;

    mail: string;
    phone: string;
    password: string;

    firstname: string;
    lastname: string;
    position: string;
}

export type User = Partial<ServerUser>;
