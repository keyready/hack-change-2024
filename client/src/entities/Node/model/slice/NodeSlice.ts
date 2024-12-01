import { createSlice } from '@reduxjs/toolkit';

import { NodeSchema } from '../types/NodeSchema';

const initialState: NodeSchema = {
    data: undefined,
    isLoading: false,
    error: undefined,
};

export const NodeSlice = createSlice({
    name: 'NodeSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {},
});

export const { actions: NodeActions } = NodeSlice;
export const { reducer: NodeReducer } = NodeSlice;
