import { Positions } from '../model/types/Positions';

import { rtkApi } from '@/shared/api/rtkApi';

const PositionsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getPositions: build.query<Positions[], void>({
            query: () => ({
                url: `/api/positions`,
            }),
        }),
    }),
});

export const usePositions = PositionsApi.useGetPositionsQuery;
