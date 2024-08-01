import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    singInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    singInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    singUpstart: (state) => {
      state.loading = true;
      state.error = null;
    },
    singUpSuccess: (state) => {
      state.loading = false;
      state.error = null;
    },
    singUpFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deletStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    deletSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    deleteFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    signoutSuccess: (state) => {
      state.currentUser = null;
      state.error = null;
      state.loading = false;
    },
  },
});

export const {
  singInStart,
  signInSuccess,
  singInFailure,
  singUpStart,
  signUpSuccess,
  singUpFailure,
  updateStart,
  updateSuccess,
  updateFailure,
  deletStart,
  deletSuccess,
  deleteFailure,
  signoutSuccess,
} = userSlice.actions;

export default userSlice.reducer;
