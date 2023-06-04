import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { axiosInstanceSSR, axiosInstanceCSR } from 'src/utils/axios'

export const getAllNodes = createAsyncThunk(
    'getAllNodes',
    async ({ page = 1, q = '', ssr = false }) => {
        try {
            const value = q ? `&q=${q}` : ''
            // Both SSR and CSR
            const instance = ssr ? axiosInstanceSSR : axiosInstanceCSR
            const { data } = await instance.get(`/nodes?page=${page}&filter=all${value}`)
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
            // SSR Only
            const { data } = await axiosInstanceSSR.get(`/nodes?page=1&filter=online`)
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
            // SSR Only
            const { data } = await axiosInstanceSSR.get(`/nodes?page=1&filter=offline`)
            return data
        }
        catch (err) {
            throw err
        }
    }
)

export const getSearchedNodes = createAsyncThunk(
    'getSearchedNodes',
    async (value) => {
        try {
            // CSR Only
            const { data } = await axiosInstanceCSR.get(`/nodes?page=1&filter=all&q=${value}`)
            return data
        }
        catch (err) {
            throw err
        }
    }
)

export const getSingleNode = createAsyncThunk(
    'getSingleNode',
    async (id) => {
        try {
            // SSR Only
            const { data } = await axiosInstanceSSR.get(`/nodes/${id}/status`)
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
        activeNodes: [],
        totalNodesCount: 0,
        activeNodesCount: 0,
        deactiveNodesCount: 0,
        searchedNodes: [],
        node: null
    },
    extraReducers: builder => {
        builder
            .addCase(getAllNodes.pending, state => {
                state.loading = true
            })
            .addCase(getAllNodes.fulfilled, (state, action) => {
                state.loading = false
                state.nodes = action.payload.result
                state.totalNodesCount = action.payload.total_count
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
                state.activeNodes = action.payload.result
                state.activeNodesCount = action.payload.total_count
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
                state.deactiveNodesCount = action.payload.total_count
            })
            .addCase(getDeactiveNodes.rejected, state => {
                state.loading = false
            })

        // ---------------------------------------------------------------------

        builder
            .addCase(getSearchedNodes.pending, state => {
                state.loading = true
            })
            .addCase(getSearchedNodes.fulfilled, (state, action) => {
                state.loading = false
                state.searchedNodes = action.payload.result
            })
            .addCase(getSearchedNodes.rejected, state => {
                state.loading = false
            })

        // ---------------------------------------------------------------------

        builder
            .addCase(getSingleNode.pending, state => {
                state.loading = true
            })
            .addCase(getSingleNode.fulfilled, (state, action) => {
                state.loading = false
                state.node = action.payload.result
            })
            .addCase(getSingleNode.rejected, state => {
                state.loading = false
            })

        // ---------------------------------------------------------------------
    }
})

export default NodesSlice.reducer