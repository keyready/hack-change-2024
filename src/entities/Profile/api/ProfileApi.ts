import { Profile } from '../model/types/Profile';

import { rtkApi } from '@/shared/api/rtkApi';

const ProfileApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getProfile: build.query<Profile[], void>({
            query: () => ({
                url: `/api/Profile`,
            }),
        }),
    }),
});

export const useProfile = ProfileApi.useGetProfileQuery;
