export interface Tokens {
    access_token: string;
    refresh_token: string;
}

export enum UserRoles {
    GUEST = 'guest',
    EMPLOYER = 'employer',
    LEAD = 'lead',
}

export interface ServerUser {
    id: number;

    mail: string;
    phone: string;
    password: string;
}

export type User = Partial<ServerUser>;
