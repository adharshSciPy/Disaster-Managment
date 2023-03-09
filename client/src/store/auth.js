import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",

    initialState: {
        isAuthenticated: false,
        role: ''
    },
    reducers: {
        setCollectionCenter: (state) => {
            state.isAuthenticated = true;
            state.role = 'collection'
        },

        setAdmin: (state) => {
            state.isAuthenticated = true;
            state.role = 'admin'
        },

        setReliefCenter: (state) => {
            state.isAuthenticated = true;
            state.role = 'relief'
        },

        logout: (state) => {
            state.role = ''
            state.isAuthenticated = false;

        }
    },
});

export const { setCollectionCenter, setAdmin, setReliefCenter, logout } = authSlice.actions;
export default authSlice.reducer;