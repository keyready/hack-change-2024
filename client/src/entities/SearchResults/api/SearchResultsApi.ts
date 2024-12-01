import { SearchResults } from '../model/types/SearchResults';

import { rtkApi } from '@/shared/api/rtkApi';

const SearchResultsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getSearchResults: build.query<SearchResults[], { search: string; position: string }>({
            query: ({ search, position }) => ({
                url: `/api/search?search=${search}&position=${position}`,
            }),
        }),
    }),
});

export const useSearchResults = SearchResultsApi.useGetSearchResultsQuery;
