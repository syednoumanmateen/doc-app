import { configureStore } from "@reduxjs/toolkit";
import defaultReducer from "./reducers/default";
import authReducer from "./reducers/auth";

const store = configureStore({
    reducer: {
        loading: defaultReducer,
        auth: authReducer
    }
})

export default store