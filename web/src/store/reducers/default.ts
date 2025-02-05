import { createSlice } from "@reduxjs/toolkit";

export const defaultSlice = createSlice({
    name: "loading",
    initialState: {
        loading: false
    },
    reducers: {
        showLoading: (state) => {
            state.loading = true
        },
        hideLoading: (state) => {
            state.loading = false
        }
    }
})

export const { showLoading, hideLoading } = defaultSlice.actions

export default defaultSlice.reducer