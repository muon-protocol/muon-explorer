import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosInstance from 'src/utils/axios'

export const getSearchedData = createAsyncThunk('getSearchedData', async (value) => {
	try {
		const res1 = axiosInstance.get(`/api/v1/requests?page=1&limit=10&search=${value}`)
		const res2 = axiosInstance.get(`/api/v1/applications?page=1&limit=10&search=${value}`)
		const res3 = axiosInstance.get(`/api/v1/nodes?page=1&filter=all&q=${value}`)
		const allRes = await Promise.all([res1, res2, res3])
		return {
			reqs: allRes[0].data?.requests,
			apps: allRes[1].data?.applications,
			nodes: allRes[2]?.data?.result,
		}
	} catch (err) {
		throw err
	}
})

const SearchSlice = createSlice({
	name: 'search',
	initialState: {
		loading: false,

		searchedReqs: [],
		searchedApps: [],
		searchedNodes: [],
	},
	extraReducers: (builder) => {
		builder
			.addCase(getSearchedData.pending, (state) => {
				state.loading = true
				state.searchedReqs = []
				state.searchedApps = []
				state.searchedNodes = []
			})
			.addCase(getSearchedData.fulfilled, (state, action) => {
				state.loading = false
				state.searchedReqs = action.payload.reqs
				state.searchedApps = action.payload.apps
				state.searchedNodes = action.payload.nodes
			})
			.addCase(getSearchedData.rejected, (state) => {
				state.loading = false
			})

		// ---------------------------------------------------------------------
	},
})

export default SearchSlice.reducer
