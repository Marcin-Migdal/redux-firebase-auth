import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User, signInWithEmailAndPassword } from "firebase/auth";

import { ISignInState } from "../pages/SignIn/sign-in-formik-config";
import { fb } from "../firebase/firebase";

type UserType = User | null;

interface IAuthUserInitialState {
    authUser: UserType;
    isLoading: boolean;
}

const initialState: IAuthUserInitialState = {
    authUser: null,
    isLoading: false,
};

export const signInWithEmail = createAsyncThunk("authUser/signInWithEmail", (credentials: ISignInState) => {
    const { email, password } = credentials;

    // Sign in users
    return signInWithEmailAndPassword(fb.auth.auth, email, password);
});

export const authUserSlice = createSlice({
    name: "authUser",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(signInWithEmail.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(signInWithEmail.fulfilled, (state, action) => {
            state.isLoading = false;
        });
        builder.addCase(signInWithEmail.rejected, (state, action) => {
            state.isLoading = false;
        });
    },
});

// Action creators are generated for each case reducer function

export const {} = authUserSlice.actions;

export default authUserSlice.reducer;
