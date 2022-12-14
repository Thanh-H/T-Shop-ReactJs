import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        login: {
            userInfor: null,
            isFetching: false,
            error: false,
            isLoggedIn: false
        },
        register: {
            isFetching: false,
            error: false,
            success: false
        },
    },
    reducers: {
        loginStart: (state) => {
            state.login.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.login.isFetching = false;
            state.login.userInfor = action.payload;
            state.login.isLoggedIn = true;
            state.login.error = false;
        },
        loginFailed: (state) => {
            state.login.isFetching = false;
            state.login.error = true;

        },
        registerStart: (state) => {
            state.register.isFetching = true;
        },
        registerSuccess: (state) => {
            state.register.isFetching = false;
            state.register.error = false;
            state.register.success = true;
        },
        registerFailed: (state) => {
            state.register.isFetching = false;
            state.register.error = true;
            state.register.success = false;
        },

        logOutSuccess: (state) => {
            state.login.isFetching = false;
            state.login.userInfor = null;
            state.login.error = false;
            state.login.isLoggedIn = false;
        },
        logOutFailed: (state) => {
            state.login.isFetching = false;
            state.login.error = true;

        },
        logOutStart: (state) => {
            state.login.isFetching = true;
        },

    }
});

export const {
    loginStart,
    loginFailed,
    loginSuccess,
    registerStart,
    registerSuccess,
    registerFailed,
    logOutStart,
    logOutSuccess,
    logOutFailed
} = authSlice.actions;

export default authSlice.reducer;

