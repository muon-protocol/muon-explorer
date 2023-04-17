import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const getAllNodes = createAsyncThunk(
    'getAllNodes',
    async ({ page = 1, q = '' }) => {
        try {
            const value = q ? `&q=${q}` : ''
            const { data } = await axios.get(`http://103.75.196.96/nodes?page=${page}&filter=all${value}`)
            return data
        }
        catch (err) {
            throw err
        }
    }
)

export const getActiveNodes = createAsyncThunk(
    'getActiveNodes',
    async () => {
        try {
            const { data } = await axios.get(`http://103.75.196.96/nodes?page=1&filter=online`)
            return data
        }
        catch (err) {
            throw err
        }
    }
)

export const getDeactiveNodes = createAsyncThunk(
    'getDeactiveNodes',
    async () => {
        try {
            const { data } = await axios.get(`http://103.75.196.96/nodes?page=1&filter=offline`)
            return data
        }
        catch (err) {
            throw err
        }
    }
)

const NodesSlice = createSlice({
    name: 'nodes',
    initialState: {
        loading: false,
        nodes: [],
        totalNodes: 0,
        activeNodes: 0,
        deactiveNodes: 0
    },
    extraReducers: builder => {
        builder
            .addCase(getAllNodes.pending, state => {
                state.loading = true
            })
            .addCase(getAllNodes.fulfilled, (state, action) => {
                state.loading = false
                state.nodes = action.payload.result
                state.totalNodes = action.payload.total_count
            })
            .addCase(getAllNodes.rejected, state => {
                state.loading = false
            })

        // ---------------------------------------------------------------------

        builder
            .addCase(getActiveNodes.pending, state => {
                state.loading = true
            })
            .addCase(getActiveNodes.fulfilled, (state, action) => {
                state.loading = false
                state.activeNodes = action.payload.total_count
            })
            .addCase(getActiveNodes.rejected, state => {
                state.loading = false
            })

        // ---------------------------------------------------------------------

        builder
            .addCase(getDeactiveNodes.pending, state => {
                state.loading = true
            })
            .addCase(getDeactiveNodes.fulfilled, (state, action) => {
                state.loading = false
                state.deactiveNodes = action.payload.total_count
            })
            .addCase(getDeactiveNodes.rejected, state => {
                state.loading = false
            })

        // ---------------------------------------------------------------------
    }
})

export default NodesSlice.reducer