import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosInstance from 'src/utils/axios'

export const getChartData = createAsyncThunk(
    'getChartData',
    async ({ period = 21 }) => {
        try {
            const { data } = await axiosInstance.get(`/apps/deus/stats?period=${period}d`)
            return data
        }
        catch (err) {
            throw err
        }
    }
)

export const getRequests = createAsyncThunk(
    'getRequests',
    async ({ page = 0 }) => {
        try {
            const { data } = await axiosInstance.get(`/apps/deus/requests?page=${page}`)
            return data
        }
        catch (err) {
            throw err
        }
    }
)

export const getInfo = createAsyncThunk(
    'getInfo',
    async () => {
        try {
            const { data } = await axiosInstance.get('/apps/deus/info')
            return data
        }
        catch (err) {
            throw err
        }
    }
)

const AuthSlice = createSlice({
    name: 'auth',
    initialState: {
        chartLoading: false,
        requestsLoading: false,
        infoLoading: false,
        chartData: [],
        requests: [],
        info: null
    },
    extraReducers: builder => {
        builder
            .addCase(getChartData.pending, state => {
                state.chartLoading = true
            })
            .addCase(getChartData.fulfilled, (state, action) => {
                state.chartLoading = false
                state.chartData = action.payload
            })
            .addCase(getChartData.rejected, state => {
                state.chartLoading = false
            })

        // ---------------------------------------------------------------------

        builder
            .addCase(getRequests.pending, state => {
                state.requestsLoading = true
            })
            .addCase(getRequests.fulfilled, (state, action) => {
                state.requestsLoading = false
                state.requests = action.payload
            })
            .addCase(getRequests.rejected, state => {
                state.requestsLoading = false
            })

        // ---------------------------------------------------------------------

        builder
            .addCase(getInfo.pending, state => {
                state.infoLoading = true
            })
            .addCase(getInfo.fulfilled, (state, action) => {
                state.infoLoading = false
                state.info = action.payload
            })
            .addCase(getInfo.rejected, state => {
                state.infoLoading = false
            })

        // ---------------------------------------------------------------------
    }
})

export default AuthSlice.reducer