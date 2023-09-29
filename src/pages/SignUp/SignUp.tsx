import React, { ChangeEvent, useState } from "react";

import { handleGoogleSignIn as _handleGoogleSignIn, handleSignUpWithEmailAndPassword } from "../../service/auth";
import { CustomFormData } from "../../components";
import { Link } from "react-router-dom";

interface SignUpFormData {
    userName?: string;
    email?: string;
    password?: string;
}

export const SignUp = () => {
    const [formData, setFormData] = useState<SignUpFormData | undefined>(undefined);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await handleSignUpWithEmailAndPassword(formData, "pl");
        } catch (error) {
            // handling errors
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await _handleGoogleSignIn("pl");
        } catch (error) {
            // handling errors
        }
    };

    const changeFormDataState = (e: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    return (
        <div>
            <h2>Sign up</h2>
            <CustomFormData onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input
                        type="text"
                        name="userName"
                        placeholder="Username"
                        onChange={changeFormDataState}
                        value={formData?.userName || ""}
                    />
                </div>
                <div>
                    <label>Email</label>
                    <input type="email" name="email" placeholder="Email" onChange={changeFormDataState} value={formData?.email || ""} />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        autoComplete="on"
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={changeFormDataState}
                        value={formData?.password || ""}
                    />
                </div>
                <div>
                    <Link to="/sign-in">
                        <button type="button">Sign in</button>
                    </Link>
                    <button>Sign up</button>
                </div>
                <button type="button" onClick={handleGoogleSignIn}>
                    Sign in with Google
                </button>
            </CustomFormData>
        </div>
    );
};
