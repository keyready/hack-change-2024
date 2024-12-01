import { SearchResults } from './SearchResults';

export interface SearchResultsSchema {
    data?: SearchResults;
    isLoading: boolean;
    error?: string;
}
