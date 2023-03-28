import { createSlice } from "@reduxjs/toolkit";


export const authSlice = createSlice({
  name: "auth",

  initialState: {
    isAuthenticated: false,
    id: "",
  },
  reducers: {
    setCollectionCenter: (state, action) => {
      state.isAuthenticated = true;
      state.role = "collection";
      state.id = action.payload
    },

    setAdmin: (state, action) => {
      state.isAuthenticated = true;
      state.role = "admin";
      state.id = action.payload
    },

    setReliefCenter: (state ,action) => {
      state.isAuthenticated = true;
      state.role = "relief";
      state.id = action.payload
    },

    logout: (state) => {
      state.role = "";
      state.isAuthenticated = false;
    },
  },
});

export const { setCollectionCenter, setAdmin, setReliefCenter, logout } =
  authSlice.actions;
export default authSlice.reducer;
