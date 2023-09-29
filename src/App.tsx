import { Navigate, Route, Routes } from "react-router-dom";
import React from "react";

import { HomePage, SignIn, SignUp } from "./pages";

import "./App.css";

//! TODO add MortiFormData
//! TODO add MortiToast
//! TODO add MortiModal

export const App = () => {
    return (
        <div className="app-container">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </div>
    );
};
