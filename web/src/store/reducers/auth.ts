import { createSlice } from "@reduxjs/toolkit";
import helper from "../../config/helper"
const userData = helper.getUserData()

const authSlice = createSlice({
    name: "auth",
    initialState: {
        isAuthenticated: userData?.isAuthenticated || false,
        user: userData || null
    },
    reducers: {
        login: (state, action) => {
            helper.setUserData({ ...action.payload, isAuthenticated: true })
            state.isAuthenticated = true || userData?.isAuthenticated
            state.user = action.payload || userData
        },
        logout: (state) => {
            helper.setUserData(null)
            state.isAuthenticated = false
            state.user = null
        }
    }
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer
