import React, { ChangeEvent, useState } from "react";

import { handleGoogleSignIn as _handleGoogleSignIn, handleSignInWithEmail } from "../../service/auth";
import { Link } from "react-router-dom";

interface SignInFormData {
    userName?: string;
    email?: string;
    password?: string;
}

export const SignIn = () => {
    const [formData, setFormData] = useState<SignInFormData | undefined>(undefined);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await handleSignInWithEmail(formData);
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
            <h2>Sign in</h2>
            <form onSubmit={handleSubmit}>
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
                    <button>Sign in</button>
                    <Link to="/sign-up">
                        <button type="button">Sign up</button>
                    </Link>
                </div>
                <button type="button" onClick={handleGoogleSignIn}>
                    Sign in with Google
                </button>
            </form>
        </div>
    );
};
