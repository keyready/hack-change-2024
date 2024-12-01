import { createSlice } from '@reduxjs/toolkit';

import { PositionsSchema } from '../types/PositionsSchema';

const initialState: PositionsSchema = {
    data: undefined,
    isLoading: false,
    error: undefined,
};

export const PositionsSlice = createSlice({
    name: 'PositionsSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {},
});

export const { actions: PositionsActions } = PositionsSlice;
export const { reducer: PositionsReducer } = PositionsSlice;
