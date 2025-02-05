import { createSlice } from "@reduxjs/toolkit";
import helper from "../../config/helper"

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isAuthenticated: false,
        token: null,
        user: null
    },
    reducers: {
        login: (state, action) => {
            const userData = helper.getUserData()
            state.isAuthenticated = true
            state.token = action.payload.token || userData.token
            state.user = action.payload || userData
        },
        logout: (state) => {
            helper.setUserData(null)
            state.isAuthenticated = false
            state.token = null
            state.user = null
        }
    }
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer
