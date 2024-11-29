import { StateSchema } from '@/app/providers/StoreProvider';

export const getProfileData = (state: StateSchema) => state.$?.data;
export const getProfileIsLoading = (state: StateSchema) => state.$?.isLoading;
export const getProfileError = (state: StateSchema) => state.$?.error;
