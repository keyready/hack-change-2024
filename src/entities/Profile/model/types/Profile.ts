import { UserRoles } from '@/entities/User';

export interface Profile {
    id: number;
    userId: number;
    avatar: string;
    roles: UserRoles[];

    firstname: string;
    lastname: string;
    middlename: string;
    description: string;

    division: string;
    department: string;
    position: string;

    lastOnline: Date;
}