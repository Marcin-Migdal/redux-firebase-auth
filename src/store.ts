import { configureStore } from "@reduxjs/toolkit";
import authUserReducer from "./slices/auth-user-slice";

const store = configureStore({
    reducer: {
        authUser: authUserReducer,
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
