import { Node } from '../model/types/Node';

import { rtkApi } from '@/shared/api/rtkApi';

const NodeApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getNode: build.query<Node[], void>({
            query: () => ({
                url: `/api/get_hierarchy`,
            }),
        }),
    }),
});

export const useNode = NodeApi.useGetNodeQuery;
