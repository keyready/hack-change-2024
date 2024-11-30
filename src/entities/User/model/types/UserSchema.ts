import { AuthErrorTypes, User, UserRoles } from './User';

export interface UserSchema {
    data?: User;
    roles?: UserRoles[];
    isLoading: boolean;
    isAuthLoading: boolean;
    error?: string;
    authError?: AuthErrorTypes;
}
