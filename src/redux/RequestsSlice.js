import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosInstance from 'src/utils/axios'

export const getRequests = createAsyncThunk(
    'getRequests',
    async ({ page = 1, limit = 10, search = '', app = '' }) => {
        try {
            const value = search ? `&search=${search}` : ''
            const value2 = app ? `&app=${app}` : ''
            const { data } = await axiosInstance.get(`/api/v1/requests?page=${page}&limit=${limit}${value}${value2}`)
            return data
        }
        catch (err) {
            throw err
        }
    }
)

export const getSearchedRequests = createAsyncThunk(
    'getSearchedRequests',
    async (value) => {
        try {
            const { data } = await axiosInstance.get(`/api/v1/requests?page=1&limit=10&search=${value}`)
            return data
        }
        catch (err) {
            throw err
        }
    }
)

export const getRequestHistory = createAsyncThunk(
    'getRequestHistory',
    async ({ range = 21, app = '' }) => {
        try {
            const value = app ? `&app=${app}` : ''
            const { data } = await axiosInstance.get(`/api/v1/requests/history?range=${range}${value}`)
            return data
        }
        catch (err) {
            throw err
        }
    }
)

export const getSingleRequest = createAsyncThunk(
    'getSingleRequest',
    async (id) => {
        try {
            const { data } = await axiosInstance.get(`/api/v1/requests/${id}`)
            return data
        }
        catch (err) {
            throw err
        }
    }
)

const RequestsSlice = createSlice({
    name: 'requests',
    initialState: {
        historyLoading: false,
        requestsHistory: [],

        requestsLoading: false,
        requests: [],
        totalReqs: 0,
        searchedReqs: [],

        request: null
    },
    extraReducers: builder => {
        builder
            .addCase(getRequests.pending, state => {
                state.requestsLoading = true
            })
            .addCase(getRequests.fulfilled, (state, action) => {
                state.requestsLoading = false
                state.requests = action.payload.requests
                state.totalReqs = action.payload.total
            })
            .addCase(getRequests.rejected, state => {
                state.requestsLoading = false
            })

        // ---------------------------------------------------------------------

        builder
            .addCase(getSearchedRequests.pending, state => {
                state.requestsLoading = true
            })
            .addCase(getSearchedRequests.fulfilled, (state, action) => {
                state.requestsLoading = false
                state.searchedReqs = action.payload.requests
            })
            .addCase(getSearchedRequests.rejected, state => {
                state.requestsLoading = false
            })

        // ---------------------------------------------------------------------

        builder
            .addCase(getRequestHistory.pending, state => {
                state.historyLoading = true
            })
            .addCase(getRequestHistory.fulfilled, (state, action) => {
                state.historyLoading = false
                state.requestsHistory = action.payload.history
            })
            .addCase(getRequestHistory.rejected, state => {
                state.historyLoading = false
            })

        // ---------------------------------------------------------------------

        builder
            .addCase(getSingleRequest.pending, state => {
                state.historyLoading = true
            })
            .addCase(getSingleRequest.fulfilled, (state, action) => {
                state.historyLoading = false
                state.request = action.payload.request
            })
            .addCase(getSingleRequest.rejected, state => {
                state.historyLoading = false
            })

        // ---------------------------------------------------------------------
    }
})

export default RequestsSlice.reducer