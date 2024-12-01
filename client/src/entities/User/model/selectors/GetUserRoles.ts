import { UserRoles } from '../types/User';

import { StateSchema } from '@/app/providers/StoreProvider';

export const getUserRoles = (state: StateSchema) =>
    state.user?.roles || [UserRoles.LEAD, UserRoles.GUEST, UserRoles.EMPLOYER];
