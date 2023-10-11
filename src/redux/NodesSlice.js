import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axiosInstance from 'src/utils/axios'

export const getAllNodes = createAsyncThunk('getAllNodes', async ({ page = 1, q = '' }) => {
	try {
		const value = q ? `&q=${q}` : ''
		const { data } = await axiosInstance.get(`/api/v1/nodes?page=${page}&filter=all${value}`)
		return data
	} catch (err) {
		throw err
	}
})

export const getActiveNodes = createAsyncThunk('getActiveNodes', async () => {
	try {
		const { data } = await axiosInstance.get(`/api/v1/nodes?page=1&filter=online`)
		return data
	} catch (err) {
		throw err
	}
})

export const getDeactiveNodes = createAsyncThunk('getDeactiveNodes', async () => {
	try {
		const { data } = await axiosInstance.get(`/api/v1/nodes?page=1&filter=offline`)
		return data
	} catch (err) {
		throw err
	}
})

export const getSingleNode = createAsyncThunk('getSingleNode', async (id) => {
	try {
		const { data } = await axiosInstance.get(`/api/v1/nodes/${id}/status`)
		return data
	} catch (err) {
		throw err
	}
})

const NodesSlice = createSlice({
	name: 'nodes',
	initialState: {
		loading: false,
		nodes: [],
		activeNodes: [],
		totalNodesCount: 0,
		activeNodesCount: 0,
		deactiveNodesCount: 0,
		node: null,
	},
	extraReducers: (builder) => {
		builder
			.addCase(getAllNodes.pending, (state) => {
				state.loading = true
			})
			.addCase(getAllNodes.fulfilled, (state, action) => {
				state.loading = false
				state.nodes = action.payload.result
				state.totalNodesCount = action.payload.total_count
			})
			.addCase(getAllNodes.rejected, (state) => {
				state.loading = false
			})

		// ---------------------------------------------------------------------

		builder
			.addCase(getActiveNodes.pending, (state) => {
				state.loading = true
			})
			.addCase(getActiveNodes.fulfilled, (state, action) => {
				state.loading = false
				state.activeNodes = action.payload.result
				state.activeNodesCount = action.payload.total_count
			})
			.addCase(getActiveNodes.rejected, (state) => {
				state.loading = false
			})

		// ---------------------------------------------------------------------

		builder
			.addCase(getDeactiveNodes.pending, (state) => {
				state.loading = true
			})
			.addCase(getDeactiveNodes.fulfilled, (state, action) => {
				state.loading = false
				state.deactiveNodesCount = action.payload.total_count
			})
			.addCase(getDeactiveNodes.rejected, (state) => {
				state.loading = false
			})

		// ---------------------------------------------------------------------

		builder
			.addCase(getSingleNode.pending, (state) => {
				state.loading = true
			})
			.addCase(getSingleNode.fulfilled, (state, action) => {
				state.loading = false
				state.node = action.payload.result
			})
			.addCase(getSingleNode.rejected, (state) => {
				state.loading = false
			})

		// ---------------------------------------------------------------------
	},
})

export default NodesSlice.reducer
