import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { createWrapper, HYDRATE } from 'next-redux-wrapper'

import DataSlice from './DataSlice'

const allReducers = combineReducers({
    data: DataSlice,
})

const masterReducer = (state, action) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state,
            ...action.payload
        }
        return nextState
    }
    else {
        return allReducers(state, action)
    }
}

const makeStore = () => configureStore({
    reducer: masterReducer,
    devTools: process.env.NODE_ENV === 'development'
})

export const wrapper = createWrapper(makeStore)