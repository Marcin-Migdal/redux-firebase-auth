import React from "react";

import { Link } from "react-router-dom";

import "./styles.css";

export const HomePage = () => {
    return (
        <div className="homepage-container">
            <h1>Homepage</h1>
            <Link to="sign-in">
                <button>Sign in</button>
            </Link>
            <Link to="sign-up">
                <button>Sign up</button>
            </Link>
        </div>
    );
};
