import { createSlice } from '@reduxjs/toolkit';

import { SearchResultsSchema } from '../types/SearchResultsSchema';

const initialState: SearchResultsSchema = {
    data: undefined,
    isLoading: false,
    error: undefined,
};

export const SearchResultsSlice = createSlice({
    name: 'SearchResultsSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {},
});

export const { actions: SearchResultsActions } = SearchResultsSlice;
export const { reducer: SearchResultsReducer } = SearchResultsSlice;
