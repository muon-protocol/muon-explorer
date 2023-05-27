import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import axiosInstance from 'src/utils/axios'

export const getApplications = createAsyncThunk(
    'getApplications',
    async ({ page = 1, limit = 10, search = '' }) => {
        try {
            const value = search ? `&search=${search}` : ''
            const { data } = await axiosInstance.get(`/applications?page=${page}&limit=${limit}${value}`)
            return data
        }
        catch (err) {
            throw err
        }
    }
)

export const getSearchedApplications = createAsyncThunk(
    'getSearchedApplications',
    async (value) => {
        try {
            const { data } = await axiosInstance.get(`/applications?page=1&limit=10&search=${value}`)
            return data
        }
        catch (err) {
            throw err
        }
    }
)

export const getSingleApplication = createAsyncThunk(
    'getSingleApplication',
    async (id) => {
        try {
            const { data } = await axiosInstance.get(`/applications/${id}`)
            return data
        }
        catch (err) {
            throw err
        }
    }
)

export const methodQuery = createAsyncThunk(
    'methodQuery',
    async ({ app = '', method = '', params = '' }) => {
        try {
            const { data } = await axios.get(`/query/v1/?app=${app}&method=${method}${params}`)
            return data
        }
        catch (err) {
            throw err
        }
    }
)

const ApplicationsSlice = createSlice({
    name: 'applications',
    initialState: {
        loading: false,
        applications: [],
        totalApps: 0,
        searchedApps: [],
        app: null
    },
    extraReducers: builder => {
        builder
            .addCase(getApplications.pending, state => {
                state.loading = true
            })
            .addCase(getApplications.fulfilled, (state, action) => {
                state.loading = false
                state.applications = action.payload.applications
                state.totalApps = action.payload.total
            })
            .addCase(getApplications.rejected, state => {
                state.loading = false
            })

        // ---------------------------------------------------------------------

        builder
            .addCase(getSearchedApplications.pending, state => {
                state.loading = true
            })
            .addCase(getSearchedApplications.fulfilled, (state, action) => {
                state.loading = false
                state.searchedApps = action.payload.applications
            })
            .addCase(getSearchedApplications.rejected, state => {
                state.loading = false
            })

        // ---------------------------------------------------------------------

        builder
            .addCase(getSingleApplication.pending, state => {
                state.loading = true
            })
            .addCase(getSingleApplication.fulfilled, (state, action) => {
                state.loading = false
                state.app = action.payload.application
            })
            .addCase(getSingleApplication.rejected, state => {
                state.loading = false
            })

        // ---------------------------------------------------------------------

        builder
            .addCase(methodQuery.pending, state => {
                state.loading = true
            })
            .addCase(methodQuery.fulfilled, (state) => {
                state.loading = false
            })
            .addCase(methodQuery.rejected, state => {
                state.loading = false
            })

        // ---------------------------------------------------------------------
    }
})

export default ApplicationsSlice.reducer